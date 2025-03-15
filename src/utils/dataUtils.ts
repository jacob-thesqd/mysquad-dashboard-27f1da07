import { parseISO, isValid } from "date-fns";
import { DateFilter } from "@/components/data/DateFilterPopover";

// Define type for project data
export type ProjectData = {
  [key: string]: any;
};

// Columns to hide
export const HIDDEN_COLUMNS = [
  'active_products', 
  'aa_trigger', 
  'last_activated_by', 
  'last_deactivated_by', 
  'cu_queued',
  'status_color',
  'assignee',
  'space_name',
  'task_dependencies'
];

// Columns that should be treated as dates for formatting
export const DATE_COLUMNS = [
  'date', 
  'created_at', 
  'updated_at', 
  'start_date', 
  'end_date', 
  'last_activated', 
  'last_deactivated'
];

// Check if a value is a number
export const isNumber = (value: any): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

// Check if a column contains array values
export const isArrayColumn = (data: ProjectData[], column: string): boolean => {
  return data.some(item => Array.isArray(item[column]));
};

// Extract unique items from arrays across all rows for a column
export const extractUniqueArrayItems = (data: ProjectData[], column: string): string[] => {
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

// Check if a column should be treated as a date
export const isDateColumn = (column: string): boolean => {
  // Explicitly exclude specific non-date columns that might be detected as dates
  if (column === 'time_estimated_mins') return false;
  return DATE_COLUMNS.includes(column) || ((column.includes('date') || column.includes('time')) && column !== 'time_estimated_mins');
};

// Parse date value for filtering
export const parseDateForFilter = (value: any): Date | null => {
  if (!value) return null;
  try {
    const date = typeof value === 'string' ? parseISO(value) : new Date(value);
    return isValid(date) ? date : null;
  } catch (e) {
    return null;
  }
};

// Compare dates for filtering
export const compareDates = (value: any, filterValue: Date | null, operator: string, endValue?: Date | null): boolean => {
  if (!value || !filterValue) {
    // Handle null checks based on operator
    if (operator === 'null') return value === null || value === "";
    if (operator === 'notnull') return value !== null && value !== "";
    if (!filterValue) return false;
  }
  const dateValue = parseDateForFilter(value);
  if (!dateValue) {
    // If value couldn't be parsed as a date, handle null operators
    if (operator === 'null') return true;
    if (operator === 'notnull') return false;
    return false;
  }

  // For non-null operators when filterValue is not set
  if (!filterValue && operator !== 'null' && operator !== 'notnull') return false;

  // Compare based on operator
  switch (operator) {
    case 'eq':
      return dateValue.getTime() === filterValue.getTime();
    case 'neq':
      return dateValue.getTime() !== filterValue.getTime();
    case 'gt':
      return dateValue.getTime() > filterValue.getTime();
    case 'lt':
      return dateValue.getTime() < filterValue.getTime();
    case 'gte':
      return dateValue.getTime() >= filterValue.getTime();
    case 'lte':
      return dateValue.getTime() <= filterValue.getTime();
    case 'between':
      if (!endValue) return false;
      return dateValue.getTime() >= filterValue.getTime() && dateValue.getTime() <= endValue.getTime();
    case 'null':
      return value === null || value === "";
    case 'notnull':
      return value !== null && value !== "";
    default:
      return false;
  }
};

// Get min and max values for number columns
export const getColumnRange = (data: ProjectData[], column: string) => {
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;
  data.forEach(project => {
    const value = Number(project[column]);
    if (!isNaN(value)) {
      min = Math.min(min, value);
      max = Math.max(max, value);
    }
  });
  return { min, max };
};

// Memoization helper for expensive operations
const memoize = <T extends (...args: any[]) => any>(
  func: T, 
  resolver?: (...args: Parameters<T>) => string
): T => {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    
    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

// Filter projects based on search term, column filters, number ranges, and date filters
export const memoizedFilterProjects = memoize(
  (
    projects: ProjectData[],
    searchTerm: string,
    selectedFilters: Record<string, string[]>,
    numberRangeFilters: Record<string, { min: number; max: number }>,
    dateFilters: Record<string, DateFilter>
  ): ProjectData[] => {
    // Early return for common cases
    if (
      !searchTerm && 
      Object.keys(selectedFilters).length === 0 && 
      Object.keys(dateFilters).length === 0
    ) {
      return projects;
    }
    
    return projects.filter(project => {
      // Search term filtering
      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        const matchesSearch = Object.values(project).some(value => 
          value !== null && String(value).toLowerCase().includes(searchTermLower)
        );
        
        if (!matchesSearch) return false;
      }

      // Apply column-specific filters
      for (const [column, filterValues] of Object.entries(selectedFilters)) {
        if (!filterValues || filterValues.length === 0) continue;
        
        if (isArrayColumn([project], column)) {
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

      // Apply date filters
      for (const [column, filter] of Object.entries(dateFilters)) {
        if (!compareDates(
          project[column], 
          filter.value || null, 
          filter.operator, 
          filter.endValue || null
        )) {
          return false;
        }
      }
      
      return true;
    });
  },
  // Custom resolver to create cache key
  (projects, searchTerm, selectedFilters, numberRangeFilters, dateFilters) => {
    return `${searchTerm}|${JSON.stringify(selectedFilters)}|${JSON.stringify(numberRangeFilters)}|${JSON.stringify(dateFilters)}`;
  }
);

// Replace the original filterProjects with the memoized version
export const filterProjects = memoizedFilterProjects;

// Sort projects based on sort column and direction
export const memoizedSortProjects = memoize(
  (
    projects: ProjectData[],
    sortColumn: string | null,
    sortDirection: "asc" | "desc"
  ): ProjectData[] => {
    if (!sortColumn) return projects;
    
    return [...projects].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      if (aValue === bValue) return 0;
      if (aValue === null) return 1;
      if (bValue === null) return -1;
      
      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === "asc" ? comparison : -comparison;
    });
  },
  (projects, sortColumn, sortDirection) => {
    // Use stable stringify for array values as cache key
    return `${sortColumn || 'none'}|${sortDirection}`;
  }
);

// Replace the original sortProjects with the memoized version
export const sortProjects = memoizedSortProjects;

// Get unique values for a column to use in filter dropdowns
export const getUniqueColumnValues = (projects: ProjectData[], column: string): string[] => {
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
