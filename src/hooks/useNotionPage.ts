import { useState, useEffect } from "react";
import { ExtendedRecordMap } from "notion-types";
import { NotionAPI } from "notion-client";

// Create a server-compatible client
const createNotionClient = () => {
  try {
    // Browser-safe initialization
    return new NotionAPI({
      apiBaseUrl: process.env.REACT_APP_NOTION_API_PROXY || "https://notion-api.splitbee.io/v1",
    });
  } catch (err) {
    console.error("Failed to initialize Notion client:", err);
    return null;
  }
};

export function useNotionPage(pageId: string) {
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!pageId) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Alternative 1: Use the public Notion API proxy
        const response = await fetch(`https://notion-api.splitbee.io/v1/page/${pageId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch Notion page: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (isMounted) {
          setRecordMap(data);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching Notion page:", err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to load the Notion page"));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [pageId]);

  return { recordMap, isLoading, error };
}

export default useNotionPage;