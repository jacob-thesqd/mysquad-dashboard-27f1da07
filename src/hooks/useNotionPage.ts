
import { useQuery } from "@tanstack/react-query";
import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";

// Create a singleton NotionAPI instance with the integration token
const notion = new NotionAPI({
  authToken: "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"
});

export function useNotionPage(pageId: string) {
  const {
    data: recordMap,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notion-page", pageId],
    queryFn: async () => {
      try {
        const response = await notion.getPage(pageId);
        return response;
      } catch (error) {
        console.error("Error fetching Notion page:", error);
        throw error;
      }
    },
  });

  return {
    recordMap,
    isLoading,
    error,
  };
}
