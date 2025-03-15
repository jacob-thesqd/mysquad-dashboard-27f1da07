import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, CheckCircle, Layers, RefreshCw } from "lucide-react";
import DataTable from "@/components/data/DataTable";
import { Button } from "@/components/ui/button";
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
import { DateFilter } from "@/components/data/DateFilterPopover";

const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const DataPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
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
  const [lastRefreshTime, setLastRefreshTime] = useState<Date>(new Date());
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const {
    data: activeProjects = [],
    isLoading: isActiveLoading,
    error: activeError,
    refetch: refetchActive
  } = useDataFetching(["activeProjects", lastRefreshTime], "active_projects_mv");

  const {
    data: masterProjects = [],
    isLoading: isMasterLoading,
    error: masterError,
    refetch: refetchMaster
  } = useDataFetching(["masterProjects", lastRefreshTime], "master_project_view_mv");

  useEffect(() => {
    console.log("Active projects data:", activeProjects);
    console.log("Active projects length:", activeProjects.length);
    if (activeProjects.length > 0) {
      console.log("Active projects sample:", activeProjects[0]);
    }

    console.log("Master projects data:", masterProjects);
    console.log("Master projects length:", masterProjects.length);
    if (masterProjects.length > 0) {
      console.log("Master projects sample:", masterProjects[0]);
    }
  }, [activeProjects, masterProjects]);

  useEffect(() => {
    if (activeError) console.error("Active projects error:", activeError);
    if (masterError) console.error("Master projects error:", masterError);
  }, [activeError, masterError]);

  const currentProjects = useMemo(() => {
    return activeTab === "active" ? activeProjects : masterProjects;
  }, [activeTab, activeProjects, masterProjects]);

  const isLoading = activeTab === "active" ? isActiveLoading : isMasterLoading;
  const error = activeTab === "active" ? activeError : masterError;

  const columns = useMemo(() => {
    if (!currentProjects || currentProjects.length === 0) return [];
    const firstProject = currentProjects[0];
    if (!firstProject) return [];
    return Object.keys(firstProject).filter(column => !HIDDEN_COLUMNS.includes(column));
  }, [currentProjects]);

  const numberColumns = useMemo(() => 
    columns.filter(column => 
      currentProjects.length > 0 && 
      isNumber(currentProjects[0][column]) && 
      !isArrayColumn(currentProjects, column) && 
      column !== 'account'
    ), 
    [columns, currentProjects]
  );

  const dateColumns = useMemo(() => 
    columns.filter(column => 
      currentProjects.length > 0 && 
      isDateColumn(column)
    ), 
    [columns]
  );

  const arrayColumns = useMemo(() => 
    columns.filter(column => 
      currentProjects.length > 0 && 
      isArrayColumn(currentProjects, column)
    ), 
    [columns, currentProjects]
  );

  useEffect(() => {
    if (currentProjects.length > 0 && numberColumns.length > 0) {
      const initialRanges: Record<string, { min: number; max: number }> = {};
      numberColumns.forEach(column => {
        if (!numberRangeFilters[column]) {
          const range = getColumnRange(currentProjects, column);
          initialRanges[column] = range;
        }
      });
      
      if (Object.keys(initialRanges).length > 0) {
        setNumberRangeFilters(prev => ({
          ...prev,
          ...initialRanges
        }));
      }
    }
  }, [currentProjects.length, numberColumns, numberRangeFilters]);

  const filteredProjects = useMemo(() => {
    if (!currentProjects || currentProjects.length === 0) return [];
    console.log("Filtering projects:", currentProjects.length);
    return filterProjects(currentProjects, debouncedSearchTerm, selectedFilters, numberRangeFilters, dateFilters);
  }, [currentProjects, debouncedSearchTerm, selectedFilters, numberRangeFilters, dateFilters]);

  const sortedProjects = useMemo(() => {
    if (!filteredProjects || filteredProjects.length === 0) return [];
    console.log("Sorting filtered projects:", filteredProjects.length);
    return sortProjects(filteredProjects, sortColumn, sortDirection);
  }, [filteredProjects, sortColumn, sortDirection]);

  const handleRefresh = useCallback(() => {
    setLastRefreshTime(new Date());
    toast.success(`Refreshing ${activeTab} projects data`);
  }, [activeTab]);

  const handleSort = useCallback((column: string) => {
    setSortColumn(prevColumn => {
      if (prevColumn === column) {
        setSortDirection(prev => prev === "asc" ? "desc" : "asc");
        return column;
      } else {
        setSortDirection("asc");
        return column;
      }
    });
  }, []);

  const handleFilterSelectionChange = useCallback((column: string, value: string, checked: boolean) => {
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
  }, []);

  const clearColumnFilters = useCallback((column: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[column];
      return newFilters;
    });
  }, []);

  const getUniqueValues = useCallback((column: string): string[] => {
    return getUniqueColumnValues(currentProjects, column);
  }, [currentProjects]);

  const handleRangeChange = useCallback((column: string, values: number[]) => {
    setNumberRangeFilters(prev => ({
      ...prev,
      [column]: {
        min: values[0],
        max: values[1]
      }
    }));
  }, []);

  const applyDateFilter = useCallback((column: string, filter: DateFilter) => {
    setDateFilters(prev => ({
      ...prev,
      [column]: filter
    }));
  }, []);

  const clearDateFilter = useCallback((column: string) => {
    setDateFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[column];
      return newFilters;
    });
  }, []);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    setSortColumn(null);
    setSortDirection("asc");
    setSelectedFilters({});
    setDateFilters({});
    setFilterPopoverOpen({});
    setDateFilterPopoverOpen({});
  }, []);

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
        
        <TabsContent value="active" className="flex-1 h-[calc(100%-3rem)]" data-tab-content="active">
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
              <div className="flex items-center gap-4">
                <Button 
                  onClick={handleRefresh} 
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw size={16} />
                  Refresh Data
                </Button>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Showing {sortedProjects?.length || 0} of {activeProjects?.length || 0} projects
                  </span>
                </div>
              </div>
            </div>
            
            <DataTable 
              data={sortedProjects || []}
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
        
        <TabsContent value="master" className="flex-1 h-[calc(100%-3rem)]" data-tab-content="master">
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
              <div className="flex items-center gap-4">
                <Button 
                  onClick={handleRefresh} 
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw size={16} />
                  Refresh Data
                </Button>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Showing {sortedProjects?.length || 0} of {masterProjects?.length || 0} projects
                  </span>
                </div>
              </div>
            </div>
            
            <DataTable 
              data={sortedProjects || []}
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
