import React, { useState, useMemo } from "react";
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
import { 
  CheckCircle, 
  Layers, 
  Search, 
  ArrowUp, 
  ArrowDown, 
  Filter, 
  SlidersHorizontal,
  X,
  Check,
  ExternalLink
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { format, isValid, parseISO } from "date-fns";

// Define type for project data
type ProjectData = {
  [key: string]: any;
};

// Columns to hide
const HIDDEN_COLUMNS = ['active_products', 'aa_trigger', 'last_activated_by', 'last_deactivated_by'];

// Helper to format column names
const formatColumnName = (name: string): string => {
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Check if a value is a number
const isNumber = (value: any): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

// Check if a column contains array values
const isArrayColumn = (data: ProjectData[], column: string): boolean => {
  return data.some(item => Array.isArray(item[column]));
};

// Extract unique items from arrays across all rows for a column
const extractUniqueArrayItems = (data: ProjectData[], column: string): string[] => {
  const uniqueItems = new Set<string>();
  
  data.forEach(item => {
    if (Array.isArray(item[column])) {
      item[column].forEach((val: any) => {
        if (val !== null && val !== "") {
          uniqueItems.add(String(val));
        }
      });
    }
  });
  
  return Array.from(uniqueItems).sort();
};

// Format date values
const formatDateValue = (value: any): string => {
  if (!value) return "—";
  
  try {
    // Try to parse as ISO date
    const date = typeof value === 'string' ? parseISO(value) : new Date(value);
    
    if (isValid(date)) {
      // Check if it has time component
      if (typeof value === 'string' && value.includes('T')) {
        return format(date, 'MMM d, yyyy h:mm a');
      } else {
        return format(date, 'MMM d, yyyy');
      }
    }
  } catch (e) {
    // If parsing fails, return original value
  }
  
  return String(value);
};

// Check if a string is a ClickUp task ID
const isClickUpTaskId = (value: string): boolean => {
  return typeof value === 'string' && value.startsWith('86d');
};

const DataPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [numberRangeFilters, setNumberRangeFilters] = useState<Record<string, { min: number, max: number }>>({});
  const [filterPopoverOpen, setFilterPopoverOpen] = useState<Record<string, boolean>>({});

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
    ), [columns, projects.length]
  );

  // Identify array columns for special filtering
  const arrayColumns = useMemo(() => 
    columns.filter(column => 
      projects.length > 0 && isArrayColumn(projects, column)
    ), [columns, projects.length]
  );

  // Get min and max values for number columns
  const getColumnRange = (column: string) => {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    
    projects.forEach(project => {
      const value = Number(project[column]);
      if (!isNaN(value)) {
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    });
    
    return { min, max };
  };

  // Initialize range filters for number columns
  React.useEffect(() => {
    if (projects.length > 0) {
      const initialRanges: Record<string, { min: number, max: number }> = {};
      
      numberColumns.forEach(column => {
        const range = getColumnRange(column);
        initialRanges[column] = range;
      });
      
      setNumberRangeFilters(initialRanges);
    }
  }, [projects.length > 0, numberColumns.join(',')]);

  // Filter projects based on search term and filters
  const filteredProjects = projects.filter(project => {
    // If no search term, return all projects
    if (!searchTerm) return true;
    
    // Check if any column value includes the search term
    return Object.values(project).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }).filter(project => {
    // Apply column-specific filters
    for (const [column, filterValues] of Object.entries(selectedFilters)) {
      if (!filterValues || filterValues.length === 0) continue;
      
      if (isArrayColumn(projects, column)) {
        // For array columns, check if any selected filter value exists in the array
        if (!Array.isArray(project[column]) || !project[column].some((val: any) => 
          filterValues.includes(String(val))
        )) {
          return false;
        }
      } else {
        // For non-array columns, check if the value matches any of the selected filters
        if (!filterValues.includes(String(project[column]))) {
          return false;
        }
      }
    }
    
    // Apply number range filters
    for (const [column, range] of Object.entries(numberRangeFilters)) {
      const value = Number(project[column]);
      if (!isNaN(value) && (value < range.min || value > range.max)) {
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
  const getUniqueColumnValues = (column: string): string[] => {
    // For array columns, extract unique items from within arrays
    if (isArrayColumn(projects, column)) {
      return extractUniqueArrayItems(projects, column);
    }

    // For normal columns
    const values = new Set<string>();
    projects.forEach(project => {
      if (project[column] !== null && project[column] !== "") {
        values.add(String(project[column]));
      }
    });
    return Array.from(values).sort();
  };

  // Handle filter selection changes for multiselect
  const handleFilterSelectionChange = (column: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const current = prev[column] || [];
      
      if (checked) {
        return { ...prev, [column]: [...current, value] };
      } else {
        return { ...prev, [column]: current.filter(item => item !== value) };
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

  // Handle number range filter change
  const handleRangeChange = (column: string, values: number[]) => {
    setNumberRangeFilters(prev => ({
      ...prev,
      [column]: { min: values[0], max: values[1] }
    }));
  };

  // Get the width class for a column
  const getColumnWidthClass = (column: string): string => {
    if (['church', 'products', 'active_task_ids'].includes(column)) {
      return 'min-w-[300px]';
    }
    return 'min-w-[180px]';
  };

  // Render array values as badges
  const renderCellContent = (value: any, column: string) => {
    if (value === null) return "—";
    
    // Handle date fields
    if (column.includes('date') || column.includes('time') || column.includes('created_at') || column.includes('updated_at')) {
      return formatDateValue(value);
    }
    
    // Render account as badge with specific color
    if (column === 'account') {
      return <Badge variant="secondary" className="bg-purple-100 text-purple-800">{value}</Badge>;
    }
    
    // Render arrays as badge lists
    if (Array.isArray(value)) {
      return (
        <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar">
          {value.map((item, index) => {
            if (isClickUpTaskId(String(item))) {
              return (
                <a 
                  key={index}
                  href={`https://app.clickup.com/t/${item}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block flex-shrink-0"
                >
                  <Badge 
                    variant="outline" 
                    className="bg-blue-50 text-blue-800 border-blue-200 cursor-pointer hover:bg-blue-100 flex items-center gap-1 whitespace-nowrap"
                  >
                    {String(item).substring(0, 10)}
                    <ExternalLink size={12} />
                  </Badge>
                </a>
              );
            }
            return (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-blue-50 text-blue-800 border-blue-200 whitespace-nowrap flex-shrink-0"
              >
                {String(item)}
              </Badge>
            );
          })}
        </div>
      );
    }
    
    // Handle ClickUp task IDs
    if (isClickUpTaskId(String(value))) {
      return (
        <a 
          href={`https://app.clickup.com/t/${value}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Badge 
            variant="outline" 
            className="bg-blue-50 text-blue-800 border-blue-200 cursor-pointer hover:bg-blue-100 flex items-center gap-1 whitespace-nowrap"
          >
            {String(value).substring(0, 10)}
            <ExternalLink size={12} />
          </Badge>
        </a>
      );
    }
    
    return String(value);
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
              <ScrollArea className="h-full" orientation="both">
                <div className="min-w-full">
                  <Table>
                    <TableHeader className="sticky top-0 bg-background z-10">
                      <TableRow>
                        {columns.map((column) => (
                          <TableHead key={column} className={`relative ${getColumnWidthClass(column)}`}>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleSort(column)}
                                className="flex items-center gap-1 hover:text-primary"
                              >
                                {formatColumnName(column)}
                                {sortColumn === column && (
                                  sortDirection === "asc" ? 
                                  <ArrowUp className="h-3 w-3" /> : 
                                  <ArrowDown className="h-3 w-3" />
                                )}
                              </button>
                              <div className="ml-auto flex items-center">
                                {selectedFilters[column]?.length > 0 && (
                                  <Badge variant="secondary" className="mr-1 px-1 py-0 h-5">
                                    {selectedFilters[column].length}
                                  </Badge>
                                )}
                                
                                {/* All columns use multiselect filtering - account column included */}
                                <Popover 
                                  open={filterPopoverOpen[column]} 
                                  onOpenChange={(open) => setFilterPopoverOpen({...filterPopoverOpen, [column]: open})}
                                >
                                  <PopoverTrigger>
                                    <div className={`h-6 w-7 px-1 flex items-center justify-center rounded border ${
                                      selectedFilters[column]?.length ? 'bg-blue-50 border-blue-200' : ''
                                    }`}>
                                      <Filter className="h-3 w-3" />
                                    </div>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-72 p-0" align="start">
                                    <Command>
                                      <CommandInput placeholder={`Search ${formatColumnName(column)}...`} />
                                      <div className="flex items-center px-2 pt-1">
                                        <div className="ml-auto flex gap-1">
                                          <button
                                            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                                            onClick={() => clearColumnFilters(column)}
                                          >
                                            <X className="h-3 w-3" /> Clear
                                          </button>
                                        </div>
                                      </div>
                                      <CommandList className="p-2 max-h-52">
                                        <CommandEmpty>No results found.</CommandEmpty>
                                        <CommandGroup>
                                          {getUniqueColumnValues(column).map((value) => {
                                            const isSelected = selectedFilters[column]?.includes(value) || false;
                                            return (
                                              <CommandItem
                                                key={value}
                                                onSelect={() => {
                                                  handleFilterSelectionChange(column, value, !isSelected);
                                                }}
                                                className="flex items-center gap-2"
                                              >
                                                <div className="flex items-center gap-2 flex-1">
                                                  <Checkbox 
                                                    checked={isSelected}
                                                    onCheckedChange={(checked) => {
                                                      handleFilterSelectionChange(column, value, !!checked);
                                                    }}
                                                  />
                                                  <span>{value}</span>
                                                </div>
                                                {isSelected && <Check className="h-4 w-4 text-blue-600" />}
                                              </CommandItem>
                                            );
                                          })}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
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
                              <TableCell key={`${index}-${column}`} className={getColumnWidthClass(column)}>
                                <div className="overflow-x-auto hide-scrollbar">
                                  {renderCellContent(project[column], column)}
                                </div>
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
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
