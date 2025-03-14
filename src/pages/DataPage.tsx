
import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, CheckCircle, Layers } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import DataTable from "@/components/data/DataTable";
import { DateFilter } from "@/components/data/DateFilterPopover";
import {
  ProjectData,
  HIDDEN_COLUMNS,
  DATE_COLUMNS,
  isArrayColumn,
  isDateColumn,
  isNumber,
  getColumnRange,
  filterProjects,
  sortProjects,
  getUniqueColumnValues
} from "@/utils/dataUtils";

const DataPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [numberRangeFilters, setNumberRangeFilters] = useState<Record<string, {
    min: number;
    max: number;
  }>>({});
  const [dateFilters, setDateFilters] = useState<Record<string, DateFilter>>({});
  const [filterPopoverOpen, setFilterPopoverOpen] = useState<Record<string, boolean>>({});
  const [dateFilterPopoverOpen, setDateFilterPopoverOpen] = useState<Record<string, boolean>>({});

  // Fetch data from Supabase
  const {
    data: projects = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["activeProjects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("active_projects_mv").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data as ProjectData[];
    }
  });

  // Get all column names from first project
  const columns = useMemo(() => {
    if (projects.length === 0) return [];
    return Object.keys(projects[0]).filter(column => !HIDDEN_COLUMNS.includes(column));
  }, [projects]);

  // Identify number columns for slider filtering
  const numberColumns = useMemo(() => 
    columns.filter(column => 
      projects.length > 0 && 
      isNumber(projects[0][column]) && 
      !isArrayColumn(projects, column) && 
      column !== 'account' // Exclude 'account' column from number filters
    ), 
    [columns, projects.length]
  );

  // Identify date columns for date filtering
  const dateColumns = useMemo(() => 
    columns.filter(column => 
      projects.length > 0 && 
      isDateColumn(column)
    ), 
    [columns, projects.length]
  );

  // Identify array columns for special filtering
  const arrayColumns = useMemo(() => 
    columns.filter(column => 
      projects.length > 0 && 
      isArrayColumn(projects, column)
    ), 
    [columns, projects.length]
  );

  // Initialize range filters for number columns
  useEffect(() => {
    if (projects.length > 0) {
      const initialRanges: Record<string, { min: number; max: number }> = {};
      numberColumns.forEach(column => {
        const range = getColumnRange(projects, column);
        initialRanges[column] = range;
      });
      setNumberRangeFilters(initialRanges);
    }
  }, [projects.length > 0, numberColumns.join(',')]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => 
    filterProjects(projects, searchTerm, selectedFilters, numberRangeFilters, dateFilters),
    [projects, searchTerm, selectedFilters, numberRangeFilters, dateFilters]
  );

  const sortedProjects = useMemo(() => 
    sortProjects(filteredProjects, sortColumn, sortDirection),
    [filteredProjects, sortColumn, sortDirection]
  );

  // Handle sort toggle
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Handle filter selection changes for multiselect
  const handleFilterSelectionChange = (column: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const current = prev[column] || [];
      if (checked) {
        return {
          ...prev,
          [column]: [...current, value]
        };
      } else {
        return {
          ...prev,
          [column]: current.filter(item => item !== value)
        };
      }
    });
  };

  // Clear all filters for a column
  const clearColumnFilters = (column: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[column];
      return newFilters;
    });
  };

  // Get unique values for a column for filter dropdowns
  const getUniqueValues = (column: string): string[] => {
    return getUniqueColumnValues(projects, column);
  };

  // Handle number range filter change
  const handleRangeChange = (column: string, values: number[]) => {
    setNumberRangeFilters(prev => ({
      ...prev,
      [column]: {
        min: values[0],
        max: values[1]
      }
    }));
  };

  // Apply date filter
  const applyDateFilter = (column: string, filter: DateFilter) => {
    setDateFilters(prev => ({
      ...prev,
      [column]: filter
    }));
  };

  // Clear date filter
  const clearDateFilter = (column: string) => {
    setDateFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[column];
      return newFilters;
    });
  };

  return (
    <div className="h-full w-full flex flex-col">
      <Tabs defaultValue="active" className="w-full h-full">
        <div className="border-b px-6 py-2">
          <TabsList>
            <TabsTrigger value="active" className="flex items-center gap-2">
              <CheckCircle size={16} />
              Account Active Projects View
            </TabsTrigger>
            <TabsTrigger value="master" className="flex items-center gap-2">
              <Layers size={16} />
              Master Projects View
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="active" className="flex-1 h-[calc(100%-3rem)]">
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-80">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search projects..." 
                  className="pl-8" 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)} 
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  Showing {sortedProjects.length} of {projects.length} projects
                </span>
              </div>
            </div>
            
            <DataTable 
              projects={sortedProjects}
              columns={columns}
              dateColumns={dateColumns}
              arrayColumns={arrayColumns}
              isLoading={isLoading}
              error={error}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              selectedFilters={selectedFilters}
              dateFilters={dateFilters}
              filterPopoverOpen={filterPopoverOpen}
              dateFilterPopoverOpen={dateFilterPopoverOpen}
              handleSort={handleSort}
              getUniqueColumnValues={getUniqueValues}
              handleFilterSelectionChange={handleFilterSelectionChange}
              clearColumnFilters={clearColumnFilters}
              setFilterPopoverOpen={setFilterPopoverOpen}
              setDateFilterPopoverOpen={setDateFilterPopoverOpen}
              applyDateFilter={applyDateFilter}
              clearDateFilter={clearDateFilter}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="master" className="h-full">
          <div className="p-4 h-full flex items-center justify-center">
            <p className="text-muted-foreground">Master Projects View will be implemented in the future.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataPage;
