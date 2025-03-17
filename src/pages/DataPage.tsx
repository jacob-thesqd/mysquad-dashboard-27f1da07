import React, { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, CheckCircle, Layers, Download } from "lucide-react";
import DataTable from "@/components/data/DataTable";
import { DateFilter } from "@/components/data/DateFilterPopover";
import { ProjectData, HIDDEN_COLUMNS, DATE_COLUMNS, isArrayColumn, isDateColumn, isNumber, getColumnRange, filterProjects, sortProjects, getUniqueColumnValues } from "@/utils/dataUtils";
import { useDataFetching, PaginationOptions } from "@/hooks/useDataFetching";
import { toast } from "sonner";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
const DEFAULT_PAGE_SIZE = 1000;
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
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const paginationOptions: PaginationOptions = {
    pageIndex,
    pageSize,
    searchTerm
  };
  const {
    data: activeProjects = [],
    isLoading: isActiveLoading,
    error: activeError,
    pagination: activePagination,
    refetch: refetchActive,
    isFetching: isActiveFetching
  } = useDataFetching(["activeProjects"], "active_projects_mv", {
    enabled: activeTab === "active"
  }, activeTab === "active" ? paginationOptions : undefined);
  const {
    data: masterProjects = [],
    isLoading: isMasterLoading,
    error: masterError,
    pagination: masterPagination,
    refetch: refetchMaster,
    isFetching: isMasterFetching
  } = useDataFetching(["masterProjects"], "master_project_view_mv", {
    enabled: activeTab === "master"
  }, activeTab === "master" ? paginationOptions : undefined);
  const currentProjects = useMemo(() => {
    return activeTab === "active" ? activeProjects : masterProjects;
  }, [activeTab, activeProjects, masterProjects]);
  const isLoading = activeTab === "active" ? isActiveLoading : isMasterLoading;
  const isFetching = activeTab === "active" ? isActiveFetching : isMasterFetching;
  const error = activeTab === "active" ? activeError : masterError;
  const pagination = activeTab === "active" ? activePagination : masterPagination;
  const columns = useMemo(() => {
    if (currentProjects.length === 0) return [];
    return Object.keys(currentProjects[0]).filter(column => !HIDDEN_COLUMNS.includes(column));
  }, [currentProjects]);
  const numberColumns = useMemo(() => columns.filter(column => currentProjects.length > 0 && isNumber(currentProjects[0][column]) && !isArrayColumn(currentProjects, column) && column !== 'account'), [columns, currentProjects]);
  const dateColumns = useMemo(() => columns.filter(column => currentProjects.length > 0 && isDateColumn(column)), [columns, currentProjects.length]);
  const arrayColumns = useMemo(() => columns.filter(column => currentProjects.length > 0 && isArrayColumn(currentProjects, column)), [columns, currentProjects]);
  React.useEffect(() => {
    if (currentProjects.length > 0) {
      const initialRanges: Record<string, {
        min: number;
        max: number;
      }> = {};
      numberColumns.forEach(column => {
        const range = getColumnRange(currentProjects, column);
        initialRanges[column] = range;
      });
      setNumberRangeFilters(initialRanges);
    }
  }, [currentProjects.length > 0, numberColumns.join(',')]);
  const filteredProjects = useMemo(() => filterProjects(currentProjects, searchTerm, selectedFilters, numberRangeFilters, dateFilters), [currentProjects, searchTerm, selectedFilters, numberRangeFilters, dateFilters]);
  const sortedProjects = useMemo(() => sortProjects(filteredProjects, sortColumn, sortDirection), [filteredProjects, sortColumn, sortDirection]);
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
      const newFilters = {
        ...prev
      };
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
      const newFilters = {
        ...prev
      };
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
    setPageIndex(0);
  };
  const handlePageChange = (newPageIndex: number) => {
    if (newPageIndex >= 0 && newPageIndex < pagination.pageCount) {
      setPageIndex(newPageIndex);
    }
  };
  const handleLoadAll = async () => {
    try {
      setIsLoadingAll(true);
      toast.info("Loading all data, this may take a moment...");
      setPageSize(10000);
      if (activeTab === "active") {
        await refetchActive();
      } else {
        await refetchMaster();
      }
      toast.success("All data loaded successfully!");
    } catch (error) {
      toast.error("Failed to load all data. Try using pagination instead.");
      console.error("Load all data error:", error);
    } finally {
      setIsLoadingAll(false);
    }
  };
  const handleExportCSV = () => {
    if (currentProjects.length === 0) {
      toast.error("No data to export");
      return;
    }
    const headers = columns.join(',');
    const csvRows = [headers];
    sortedProjects.forEach(project => {
      const values = columns.map(column => {
        const value = project[column];
        if (value === null || value === undefined) return '';
        if (Array.isArray(value)) return `"${value.join('; ')}"`;
        if (typeof value === 'object') return `"${JSON.stringify(value)}"`;
        return `"${value}"`;
      });
      csvRows.push(values.join(','));
    });
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], {
      type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${activeTab}_projects_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Data exported successfully!");
  };
  const renderPagination = () => {
    if (pagination?.pageCount <= 1 || sortedProjects.length === 0) {
      return null;
    }
    return <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page {pageIndex + 1} of {pagination?.pageCount || 1}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(pageIndex - 1)} className={pageIndex === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
            </PaginationItem>
            
            {Array.from({
            length: Math.min(5, pagination?.pageCount || 1)
          }, (_, i) => {
            let pageNum = pageIndex;
            if (pageIndex < 2) {
              pageNum = i;
            } else if (pageIndex >= (pagination?.pageCount || 1) - 2) {
              pageNum = (pagination?.pageCount || 1) - 5 + i;
            } else {
              pageNum = pageIndex - 2 + i;
            }
            if (pageNum >= 0 && pageNum < (pagination?.pageCount || 1)) {
              return <PaginationItem key={pageNum}>
                      <PaginationLink isActive={pageIndex === pageNum} onClick={() => handlePageChange(pageNum)}>
                        {pageNum + 1}
                      </PaginationLink>
                    </PaginationItem>;
            }
            return null;
          })}
            
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(pageIndex + 1)} className={pageIndex >= (pagination?.pageCount || 1) - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>;
  };
  return <div className="h-full w-full flex flex-col">
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
                <Input placeholder="Search projects..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 mr-4">
                  
                  <span className="text-xs font-small">
                    Showing {sortedProjects.length} of {pagination?.totalCount || 0} projects
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLoadAll} disabled={isLoadingAll} className="mr-2">
                  {isLoadingAll ? "Loading..." : "Load All"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportCSV} disabled={isLoading || currentProjects.length === 0}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
            
            <DataTable data={sortedProjects} columns={columns} dateColumns={dateColumns} arrayColumns={arrayColumns} isLoading={isLoading || isFetching} error={error} sortColumn={sortColumn} sortDirection={sortDirection} selectedFilters={selectedFilters} dateFilters={dateFilters} filterPopoverOpen={filterPopoverOpen} dateFilterPopoverOpen={dateFilterPopoverOpen} handleSort={handleSort} getUniqueColumnValues={getUniqueValues} handleFilterSelectionChange={handleFilterSelectionChange} clearColumnFilters={clearColumnFilters} setFilterPopoverOpen={setFilterPopoverOpen} setDateFilterPopoverOpen={setDateFilterPopoverOpen} applyDateFilter={applyDateFilter} clearDateFilter={clearDateFilter} />

            {renderPagination()}
          </div>
        </TabsContent>
        
        <TabsContent value="master" className="flex-1 h-[calc(100%-3rem)]">
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-80">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search projects..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 mr-4">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Showing {sortedProjects.length} of {pagination?.totalCount || 0} projects
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLoadAll} disabled={isLoadingAll} className="mr-2">
                  {isLoadingAll ? "Loading..." : "Load All"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportCSV} disabled={isLoading || currentProjects.length === 0}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
            
            <DataTable data={sortedProjects} columns={columns} dateColumns={dateColumns} arrayColumns={arrayColumns} isLoading={isLoading || isFetching} error={error} sortColumn={sortColumn} sortDirection={sortDirection} selectedFilters={selectedFilters} dateFilters={dateFilters} filterPopoverOpen={filterPopoverOpen} dateFilterPopoverOpen={dateFilterPopoverOpen} handleSort={handleSort} getUniqueColumnValues={getUniqueValues} handleFilterSelectionChange={handleFilterSelectionChange} clearColumnFilters={clearColumnFilters} setFilterPopoverOpen={setFilterPopoverOpen} setDateFilterPopoverOpen={setDateFilterPopoverOpen} applyDateFilter={applyDateFilter} clearDateFilter={clearDateFilter} />

            {renderPagination()}
          </div>
        </TabsContent>
      </Tabs>
    </div>;
};
export default DataPage;