
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// Cache time in milliseconds (2 hours)
const CACHE_TIME = 2 * 60 * 60 * 1000;

interface AutoAssignerDocsResponse {
  markdown: string;
}

export function useAutoAssignerDocs() {
  const fetchDocumentation = async (): Promise<string> => {
    try {
      const response = await fetch("https://sis1.thesqd.com/webhook/8136931f-c2d6-4350-adce-49db3b8b3863");
      console.log('Fetching documentation');
        
      if (!response.ok) {
        throw new Error(`Failed to fetch documentation: ${response.status}`);
      }
        
      const data: AutoAssignerDocsResponse = await response.json();
      console.log('Documentation fetched successfully');
      
      return data.markdown || "";
    } catch (err) {
      console.error("Error fetching documentation:", err);
      throw err;
    }
  };

  const { 
    data: markdown = "", 
    isLoading: loading, 
    error,
    refetch
  } = useQuery({
    queryKey: ["autoAssignerDocs"],
    queryFn: fetchDocumentation,
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
    retry: 2
  });

  return {
    markdown,
    loading,
    error: error ? (error instanceof Error ? error.message : "Failed to fetch documentation") : null,
    refetch
  };
}
