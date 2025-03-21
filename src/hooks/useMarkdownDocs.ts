
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// Cache time in milliseconds (2 hours)
const CACHE_TIME = 2 * 60 * 60 * 1000;

interface MarkdownResponse {
  markdown: string;
}

export function useMarkdownDocs(endpoint: string, queryKey: string) {
  const fetchMarkdown = async (): Promise<string> => {
    try {
      console.log(`Fetching markdown from ${endpoint}`);
      const response = await fetch(endpoint);
        
      if (!response.ok) {
        throw new Error(`Failed to fetch markdown: ${response.status}`);
      }
        
      const data: MarkdownResponse = await response.json();
      console.log('Markdown fetched successfully');
      
      return data.markdown || "";
    } catch (err) {
      console.error("Error fetching markdown:", err);
      throw err;
    }
  };

  const { 
    data: markdown = "", 
    isLoading: loading, 
    error,
    refetch
  } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchMarkdown,
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
    retry: 2,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });

  return {
    markdown,
    loading,
    error: error ? (error instanceof Error ? error.message : `Failed to fetch ${queryKey}`) : null,
    refetch
  };
}
