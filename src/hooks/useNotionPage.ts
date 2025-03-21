
import { ExtendedRecordMap } from "notion-types";
import { useQuery } from "@tanstack/react-query";
import { fetchNotionPage } from "@/api/notionApi";

export function useNotionPage(pageId: string) {
  const fetchPage = async () => {
    try {
      console.log('Fetching Notion page:', pageId);
      const recordMap = await fetchNotionPage(pageId);
      
      if (!recordMap) {
        throw new Error("Failed to load Notion page");
      }
      
      console.log('Notion page fetched successfully');
      return recordMap as ExtendedRecordMap;
    } catch (err) {
      console.error("Error fetching Notion page:", err);
      throw err;
    }
  };

  const { 
    data: recordMap, 
    isLoading: loading, 
    error,
    refetch
  } = useQuery({
    queryKey: ["notionPage", pageId],
    queryFn: fetchPage,
    retry: 1,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour to reduce API calls
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });

  return {
    recordMap,
    loading,
    error: error ? (error instanceof Error ? error.message : "Failed to fetch Notion page") : null,
    refetch
  };
}
