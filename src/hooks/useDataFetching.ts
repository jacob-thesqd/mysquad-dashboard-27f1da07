
import { useQuery, useQueryClient, QueryKey } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProjectData } from "@/utils/dataUtils";
import { toast } from "sonner";

// Cache time in minutes
const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

// Define allowed table names as a type for better type safety
type AllowedTable = "active_projects_mv" | "master_project_view_mv";

export function useDataFetching(queryKey: QueryKey, tableName: AllowedTable, options = { enabled: true }) {
  const queryClient = useQueryClient();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Fetch active projects data
  const {
    data = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        console.log(`Fetching data from ${tableName}...`);
        if (tableName === "active_projects_mv") {
          const { data, error } = await supabase.from(tableName).select("*");
          if (error) {
            console.error(`Error fetching data from ${tableName}:`, error);
            throw new Error(error.message);
          }
          console.log(`Successfully fetched ${data.length} rows from ${tableName}`);
          return data as ProjectData[];
        } else {
          // For master_project_view_mv, use pagination to fetch all rows
          const result = await fetchAllPages(tableName);
          console.log(`Successfully fetched ${result.length} rows from ${tableName} (paginated)`);
          return result;
        }
      } catch (err) {
        console.error(`Error fetching data from ${tableName}:`, err);
        toast.error(`Failed to load data: ${(err as Error).message}`);
        throw err;
      }
    },
    staleTime: CACHE_TIME, // Data considered fresh for 5 minutes
    gcTime: CACHE_TIME,    // Keep in cache for 5 minutes (was cacheTime in v4)
    ...options
  });

  // Load data in the background when the component mounts
  useEffect(() => {
    if (isInitialLoad && options.enabled) {
      // Prefetch and cache data
      queryClient.prefetchQuery({
        queryKey,
        queryFn: async () => {
          try {
            console.log(`Prefetching data from ${tableName}...`);
            if (tableName === "active_projects_mv") {
              const { data, error } = await supabase.from(tableName).select("*");
              if (error) {
                console.error(`Error prefetching data from ${tableName}:`, error);
                throw new Error(error.message);
              }
              console.log(`Successfully prefetched ${data.length} rows from ${tableName}`);
              return data as ProjectData[];
            } else {
              const result = await fetchAllPages(tableName);
              console.log(`Successfully prefetched ${result.length} rows from ${tableName} (paginated)`);
              return result;
            }
          } catch (err) {
            console.error(`Error prefetching data from ${tableName}:`, err);
            return [];
          }
        },
        staleTime: CACHE_TIME
      });
      setIsInitialLoad(false);
    }
  }, [queryClient, queryKey, tableName, isInitialLoad, options.enabled]);

  return { data, isLoading, error, refetch };
}

// Helper function to fetch all pages of data
async function fetchAllPages(tableName: AllowedTable): Promise<ProjectData[]> {
  const pageSize = 1000;
  let page = 0;
  let hasMore = true;
  let allData: ProjectData[] = [];

  console.log(`Starting paginated fetch from ${tableName} with page size ${pageSize}`);

  while (hasMore) {
    const start = page * pageSize;
    console.log(`Fetching page ${page + 1} (rows ${start} to ${start + pageSize - 1})...`);

    const { data, error, count } = await supabase
      .from(tableName)
      .select("*", { count: "exact" })
      .range(start, start + pageSize - 1);

    if (error) {
      console.error(`Error fetching page ${page + 1}:`, error);
      throw new Error(error.message);
    }
    
    if (data && data.length > 0) {
      console.log(`Received ${data.length} rows for page ${page + 1}`);
      allData = [...allData, ...(data as ProjectData[])];
      page++;
      
      // Check if we've received all data
      if (count !== null && allData.length >= count) {
        console.log(`Reached total count: ${count} rows`);
        hasMore = false;
      }
    } else {
      console.log(`No more data received for page ${page + 1}`);
      hasMore = false;
    }
  }

  console.log(`Completed paginated fetch, total rows: ${allData.length}`);
  return allData;
}
