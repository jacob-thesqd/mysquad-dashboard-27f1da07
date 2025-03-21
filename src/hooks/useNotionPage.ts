
import { useState, useEffect } from "react";
import { getNotionPage } from "@/lib/notion";
import { ExtendedRecordMap } from "notion-types";

export function useNotionPage(pageId: string) {
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = async () => {
    try {
      setLoading(true);
      console.log('Fetching Notion page:', pageId);
      const data = await getNotionPage(pageId);
      
      if (data) {
        console.log('Notion page fetched successfully');
        setRecordMap(data);
        setError(null);
      } else {
        setError("Failed to load Notion page");
      }
    } catch (err) {
      console.error("Error fetching Notion page:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch Notion page");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [pageId]);

  const refetch = () => {
    fetchPage();
  };

  return {
    recordMap,
    loading,
    error,
    refetch
  };
}
