
import { useQuery } from "@tanstack/react-query";
import { ExtendedRecordMap } from "notion-types";
import { notionApi } from "@/services/notionApi";

export function useNotionPage(pageId: string) {
  const {
    data: recordMap,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notion-page", pageId],
    queryFn: async () => {
      try {
        // Use our browser-compatible API service instead of notion-client directly
        const response = await notionApi.getPage({ pageId });
        return response;
      } catch (error) {
        console.error("Error fetching Notion page:", error);
        throw error;
      }
    },
    retry: 2, // Retry failed requests twice
  });

  return {
    recordMap,
    isLoading,
    error,
  };
}
