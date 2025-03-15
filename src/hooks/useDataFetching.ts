
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
        
        // Simplified approach to get all data without pagination or complex checks
        const { data, error } = await supabase
          .from(tableName)
          .select('*');
        
        if (error) {
          console.error(`Error fetching data from ${tableName}:`, error);
          throw new Error(error.message);
        }
        
        console.log(`Successfully fetched ${data?.length || 0} rows from ${tableName}`, data ? data[0] : null);
        
        // Force check that data is an array
        if (!data || !Array.isArray(data)) {
          console.error(`Received non-array data from ${tableName}`, data);
          return [];
        }
        
        return data as ProjectData[];
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

  return { 
    data: Array.isArray(data) ? data : [], 
    isLoading, 
    error, 
    refetch 
  };
}
