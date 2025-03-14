import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable";
import { CheckCircle, Layers, Search, ArrowUp, ArrowDown, Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

// Define type for project data
type ProjectData = {
  [key: string]: any;
};

const DataPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  // Fetch data from Supabase
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ["activeProjects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("active_projects_mv")
        .select("*");
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data as ProjectData[];
    }
  });

  // Get all column names from first project
  const columns = projects.length > 0 ? Object.keys(projects[0]) : [];

  // Filter projects based on search term
  const filteredProjects = projects.filter(project => {
    // If no search term, return all projects
    if (!searchTerm) return true;
    
    // Check if any column value includes the search term
    return Object.values(project).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }).filter(project => {
    // Apply column-specific filters
    for (const [column, filterValue] of Object.entries(selectedFilters)) {
      if (filterValue && String(project[column]) !== filterValue) {
        return false;
      }
    }
    return true;
  });

  // Sort projects based on sort column and direction
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (aValue === bValue) return 0;
    if (aValue === null) return 1;
    if (bValue === null) return -1;
    
    const comparison = aValue < bValue ? -1 : 1;
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Handle sort toggle
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Get unique values for a column to use in filter dropdowns
  const getUniqueColumnValues = (column: string) => {
    const values = new Set<string>();
    projects.forEach(project => {
      if (project[column] !== null) {
        values.add(String(project[column]));
      }
    });
    return Array.from(values);
  };

  // Handle filter change
  const handleFilterChange = (column: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [column]: value
    }));
  };

  // Clear filter for a column
  const clearFilter = (column: string) => {
    setSelectedFilters(prev => {
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  Showing {sortedProjects.length} of {projects.length} projects
                </span>
              </div>
            </div>
            
            <div className="flex-1 border rounded-md overflow-hidden">
              <ScrollArea className="h-full w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((column) => (
                        <TableHead key={column} className="relative">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSort(column)}
                              className="flex items-center gap-1 hover:text-primary"
                            >
                              {column}
                              {sortColumn === column && (
                                sortDirection === "asc" ? 
                                <ArrowUp className="h-3 w-3" /> : 
                                <ArrowDown className="h-3 w-3" />
                              )}
                            </button>
                            <div className="ml-auto">
                              <Select
                                value={selectedFilters[column] || ""}
                                onValueChange={(value) => 
                                  value ? handleFilterChange(column, value) : clearFilter(column)
                                }
                              >
                                <SelectTrigger className="h-6 w-7 px-1">
                                  <Filter className="h-3 w-3" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="">All</SelectItem>
                                  {getUniqueColumnValues(column).map((value) => (
                                    <SelectItem key={value} value={value}>
                                      {value}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="text-center py-8">
                          Loading data...
                        </TableCell>
                      </TableRow>
                    ) : error ? (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="text-center py-8 text-red-500">
                          Error loading data: {(error as Error).message}
                        </TableCell>
                      </TableRow>
                    ) : sortedProjects.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="text-center py-8">
                          No projects found
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedProjects.map((project, index) => (
                        <TableRow key={index}>
                          {columns.map((column) => (
                            <TableCell key={`${index}-${column}`}>
                              {project[column] !== null ? String(project[column]) : "—"}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
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
