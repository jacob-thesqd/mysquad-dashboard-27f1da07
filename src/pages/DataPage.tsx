import React, { useState, useMemo, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, CheckCircle, Layers } from "lucide-react";
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
import { useDataFetching } from "@/hooks/useDataFetching";
import { toast } from "sonner";

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
  const [activeTab, setActiveTab] = useState<string>("active");

  const {
    data: activeProjects = [],
    isLoading: isActiveLoading,
    error: activeError
  } = useDataFetching(["activeProjects"], "active_projects_mv");

  const {
    data: masterProjects = [],
    isLoading: isMasterLoading,
    error: masterError
  } = useDataFetching(["masterProjects"], "master_project_view_mv");

  const currentProjects = useMemo(() => {
    return activeTab === "active" ? activeProjects : masterProjects;
  }, [activeTab, activeProjects, masterProjects]);

  const isLoading = activeTab === "active" ? isActiveLoading : isMasterLoading;
  const error = activeTab === "active" ? activeError : masterError;

  const columns = useMemo(() => {
    if (currentProjects.length === 0) return [];
    return Object.keys(currentProjects[0]).filter(column => !HIDDEN_COLUMNS.includes(column));
  }, [currentProjects]);

  const numberColumns = useMemo(() => 
    columns.filter(column => 
      currentProjects.length > 0 && 
      isNumber(currentProjects[0][column]) && 
      !isArrayColumn(currentProjects, column) && 
      column !== 'account'
    ), 
    [columns, currentProjects.length]
  );

  const dateColumns = useMemo(() => 
    columns.filter(column => 
      currentProjects.length > 0 && 
      isDateColumn(column)
    ), 
    [columns, currentProjects.length]
  );

  const arrayColumns = useMemo(() => 
    columns.filter(column => 
      currentProjects.length > 0 && 
      isArrayColumn(currentProjects, column)
    ), 
    [columns, currentProjects.length]
  );

  React.useEffect(() => {
    if (currentProjects.length > 0) {
      const initialRanges: Record<string, { min: number; max: number }> = {};
      numberColumns.forEach(column => {
        const range = getColumnRange(currentProjects, column);
        initialRanges[column] = range;
      });
      setNumberRangeFilters(initialRanges);
    }
  }, [currentProjects.length > 0, numberColumns.join(',')]);

  const filteredProjects = useMemo(() => 
    filterProjects(currentProjects, searchTerm, selectedFilters, numberRangeFilters, dateFilters),
    [currentProjects, searchTerm, selectedFilters, numberRangeFilters, dateFilters]
  );

  const sortedProjects = useMemo(() => 
    sortProjects(filteredProjects, sortColumn, sortDirection),
    [filteredProjects, sortColumn, sortDirection]
  );

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

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

  const clearColumnFilters = (column: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[column];
      return newFilters;
    });
  };

  const getUniqueValues = (column: string): string[] => {
    return getUniqueColumnValues(currentProjects, column);
  };

  const handleRangeChange = (column: string, values: number[]) => {
    setNumberRangeFilters(prev => ({
      ...prev,
      [column]: {
        min: values[0],
        max: values[1]
      }
    }));
  };

  const applyDateFilter = (column: string, filter: DateFilter) => {
    setDateFilters(prev => ({
      ...prev,
      [column]: filter
    }));
  };

  const clearDateFilter = (column: string) => {
    setDateFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[column];
      return newFilters;
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSortColumn(null);
    setSortDirection("asc");
    setSelectedFilters({});
    setDateFilters({});
    setFilterPopoverOpen({});
    setDateFilterPopoverOpen({});
  };

  return (
    <div className="h-full w-full flex flex-col">
      <Tabs defaultValue="active" className="w-full h-full" onValueChange={handleTabChange}>
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
                  Showing {sortedProjects.length} of {activeProjects.length} projects
                </span>
              </div>
            </div>
            
            <DataTable 
              data={sortedProjects}
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
        
        <TabsContent value="master" className="flex-1 h-[calc(100%-3rem)]">
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
                  Showing {sortedProjects.length} of {masterProjects.length} projects
                </span>
              </div>
            </div>
            
            <DataTable 
              data={sortedProjects}
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
      </Tabs>
    </div>
  );
};

export default DataPage;
