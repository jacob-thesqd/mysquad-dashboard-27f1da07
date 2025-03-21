import { useState, useEffect } from "react";
import { getNotionPage } from "@/lib/notion";
import { ExtendedRecordMap } from "notion-types";
import { useQuery } from "@tanstack/react-query";

export function useNotionPage(pageId: string) {
  const fetchPage = async () => {
    try {
      console.log('Fetching Notion page:', pageId);
      const data = await getNotionPage(pageId);
      
      if (!data) {
        throw new Error("Failed to load Notion page");
      }
      
      console.log('Notion page fetched successfully');
      return data;
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