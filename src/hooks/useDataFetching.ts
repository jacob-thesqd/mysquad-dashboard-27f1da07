
import { useQuery, useQueryClient, QueryKey } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProjectData } from "@/utils/dataUtils";
import { toast } from "sonner";

// Cache time in minutes
const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

// Define allowed table names as a type for better type safety
type AllowedTable = "active_projects_mv" | "master_project_view_mv";

// Pagination options interface
export interface PaginationOptions {
  pageIndex: number;
  pageSize: number;
  searchTerm?: string;
}

// Pagination result interface
export interface PaginationResult<T> {
  data: T[];
  count: number;
  pageCount: number;
}

export function useDataFetching(
  queryKey: QueryKey, 
  tableName: AllowedTable, 
  options = { enabled: true },
  paginationOptions?: PaginationOptions
) {
  const queryClient = useQueryClient();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isSearching, setIsSearching] = useState(false);

  // Default pagination values if not provided
  const pageIndex = paginationOptions?.pageIndex ?? 0;
  const pageSize = paginationOptions?.pageSize ?? 1000; // Changed default from 500 to 1000
  const searchTerm = paginationOptions?.searchTerm ?? '';

  // Calculate start and end for pagination
  const start = pageIndex * pageSize;
  const end = start + pageSize - 1;

  // Fetch data with pagination
  const {
    data = [],
    isLoading,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: [...queryKey, pageIndex, pageSize, searchTerm],
    queryFn: async () => {
      try {
        console.log(`Fetching data from ${tableName} with range: ${start}-${end}`);
        
        // If search term is provided and not empty, use the RPC search function
        if (searchTerm && searchTerm.length > 2) {
          setIsSearching(true);
          const { data: searchData, error: searchError } = await supabase
            .rpc('search_text_in_table', {
              p_table_name: tableName,
              p_search_text: searchTerm
            });
          
          if (searchError) {
            console.error(`Error searching in ${tableName}:`, searchError);
            throw new Error(searchError.message);
          }
          
          // The search results come back as an array of { result_row: {...} } objects
          // Transform them to match our expected format
          const transformedData = searchData.map((item: { result_row: any }) => item.result_row);
          
          // Set total count for pagination
          setTotalCount(transformedData.length);
          
          console.log(`Found ${transformedData.length} search results in ${tableName}`);
          
          // Return a slice for the current page
          return transformedData.slice(start, end + 1) as ProjectData[];
        }
        
        setIsSearching(false);
        let query = supabase.from(tableName).select('*', { count: 'exact' });
        
        // Add search filter if provided but not using RPC search
        if (searchTerm) {
          // This is a simple example - you might need to adjust based on your search fields
          query = query.or(`name.ilike.%${searchTerm}%,church.ilike.%${searchTerm}%`);
        }
        
        // Add pagination
        const { data, error, count } = await query.range(start, end);
        
        if (error) {
          console.error(`Error fetching data from ${tableName}:`, error);
          throw new Error(error.message);
        }
        
        // Store the total count
        if (count !== null) {
          setTotalCount(count);
        }
        
        console.log(`Fetched ${data?.length || 0} rows from ${tableName}`);
        return data as ProjectData[];
      } catch (err) {
        console.error(`Error fetching data from ${tableName}:`, err);
        toast.error(`Failed to load data: ${(err as Error).message}`);
        throw err;
      }
    },
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
    ...options
  });

  // Prefetch next page
  useEffect(() => {
    if (!isLoading && !isFetching && data.length > 0 && !isSearching) {
      const nextPageIndex = pageIndex + 1;
      const nextPageStart = nextPageIndex * pageSize;
      const nextPageEnd = nextPageStart + pageSize - 1;
      
      // Only prefetch if there are more pages
      if (totalCount > nextPageStart) {
        // Prefetch next page
        queryClient.prefetchQuery({
          queryKey: [...queryKey, nextPageIndex, pageSize, searchTerm],
          queryFn: async () => {
            try {
              let query = supabase.from(tableName).select('*');
              
              if (searchTerm) {
                query = query.or(`name.ilike.%${searchTerm}%,church.ilike.%${searchTerm}%`);
              }
              
              const { data, error } = await query.range(nextPageStart, nextPageEnd);
              
              if (error) throw new Error(error.message);
              return data as ProjectData[];
            } catch (err) {
              console.error(`Error prefetching next page from ${tableName}:`, err);
              return [];
            }
          },
          staleTime: CACHE_TIME
        });
      }
    }
  }, [pageIndex, pageSize, data, isLoading, isFetching, queryClient, queryKey, tableName, searchTerm, totalCount, isSearching]);

  // Calculate total page count
  const pageCount = Math.ceil(totalCount / pageSize);

  return { 
    data, 
    isLoading, 
    error, 
    refetch, 
    isFetching,
    isSearching,
    pagination: {
      pageIndex,
      pageSize,
      pageCount,
      totalCount
    }
  };
}

// Helper function to fetch all pages of data (for legacy support)
export async function fetchAllPages(tableName: AllowedTable): Promise<ProjectData[]> {
  const pageSize = 1000;
  let page = 0;
  let hasMore = true;
  let allData: ProjectData[] = [];

  while (hasMore) {
    const start = page * pageSize;
    const { data, error, count } = await supabase
      .from(tableName)
      .select("*", { count: "exact" })
      .range(start, start + pageSize - 1);

    if (error) throw new Error(error.message);
    
    if (data && data.length > 0) {
      allData = [...allData, ...(data as ProjectData[])];
      page++;
      
      // Check if we've received all data
      if (count !== null && allData.length >= count) {
        hasMore = false;
      }
    } else {
      hasMore = false;
    }
  }

  return allData;
}
