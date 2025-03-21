import { useState, useEffect } from "react";
import { ExtendedRecordMap } from "notion-types";
import { NotionAPI } from "notion-client";

export function useNotionPage(pageId: string) {
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNotionPage = async () => {
      if (!pageId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        // Use the unofficial client
        const notion = new NotionAPI();
        
        // Fetch the page with the unofficial client
        const pageData = await notion.getPage(pageId);
        
        setRecordMap(pageData);
      } catch (err) {
        console.error("Error fetching Notion page:", err);
        setError(err instanceof Error ? err : new Error("Failed to load the Notion page"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotionPage();
  }, [pageId]);

  return { recordMap, isLoading, error };
}

export default useNotionPage;