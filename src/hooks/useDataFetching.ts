
import { useQuery, useQueryClient, QueryKey } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProjectData } from "@/utils/dataUtils";
import { toast } from "sonner";

// Cache time in minutes
const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

export function useDataFetching(queryKey: QueryKey, tableName: string, options = { enabled: true }) {
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
        if (tableName === "active_projects_mv") {
          const { data, error } = await supabase.from(tableName).select("*");
          if (error) throw new Error(error.message);
          return data as ProjectData[];
        } else {
          // For master_project_view_mv, use pagination to fetch all rows
          return await fetchAllPages(tableName);
        }
      } catch (err) {
        console.error(`Error fetching data from ${tableName}:`, err);
        toast.error(`Failed to load data: ${(err as Error).message}`);
        throw err;
      }
    },
    staleTime: CACHE_TIME, // Data considered fresh for 5 minutes
    cacheTime: CACHE_TIME, // Keep in cache for 5 minutes
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
            if (tableName === "active_projects_mv") {
              const { data, error } = await supabase.from(tableName).select("*");
              if (error) throw new Error(error.message);
              return data as ProjectData[];
            } else {
              return await fetchAllPages(tableName);
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
async function fetchAllPages(tableName: string): Promise<ProjectData[]> {
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
