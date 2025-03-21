
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { notion } from "@/lib/notion";
import { ExtendedRecordMap } from "notion-types";

// Cache time in milliseconds (2 hours)
const CACHE_TIME = 2 * 60 * 60 * 1000;

export function useNotionPage(pageId: string) {
  const fetchNotionPage = async (): Promise<ExtendedRecordMap> => {
    try {
      console.log('Fetching Notion page:', pageId);
      const recordMap = await notion.getPage(pageId);
      console.log('Notion page fetched successfully');
      return recordMap;
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
    queryFn: fetchNotionPage,
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
    retry: 2,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!pageId
  });

  return {
    recordMap,
    loading,
    error: error ? (error instanceof Error ? error.message : "Failed to fetch Notion page") : null,
    refetch
  };
}
