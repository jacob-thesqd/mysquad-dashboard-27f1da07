
import React, { useState, useEffect } from "react";
import { AUTO_ASSIGNER_PAGE_ID } from "@/lib/notion";
import NotionPage from "@/components/notion/NotionPage";
import { useNotionPage } from "@/hooks/useNotionPage";
import AutoAssignerMarkdown from "./AutoAssignerMarkdown";
import { useToast } from "@/hooks/use-toast";

const AUTO_ASSIGNER_RETRY_LIMIT = 2;

const AutoAssigner = () => {
  const [useMarkdownFallback, setUseMarkdownFallback] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();
  
  const { 
    recordMap, 
    loading, 
    error, 
    refetch 
  } = useNotionPage(AUTO_ASSIGNER_PAGE_ID);

  // If there's an error with Notion, use the markdown fallback
  useEffect(() => {
    if (error && !useMarkdownFallback) {
      console.log("Notion error encountered:", error);
      
      if (retryCount < AUTO_ASSIGNER_RETRY_LIMIT) {
        // Try to refetch before falling back
        console.log(`Retrying fetch (${retryCount + 1}/${AUTO_ASSIGNER_RETRY_LIMIT})...`);
        setRetryCount(prev => prev + 1);
        refetch();
      } else {
        console.log("Using markdown fallback due to Notion error:", error);
        setUseMarkdownFallback(true);
        toast({
          title: "Fallback Documentation",
          description: "Using simplified documentation due to loading issues.",
          variant: "default"
        });
      }
    }
  }, [error, useMarkdownFallback, retryCount, refetch, toast]);

  const handleTryNotion = () => {
    setUseMarkdownFallback(false);
    setRetryCount(0);
    refetch();
  };

  if (useMarkdownFallback) {
    return <AutoAssignerMarkdown onTryNotion={handleTryNotion} />;
  }

  return <NotionPage recordMap={recordMap} loading={loading} error={error} refetch={refetch} />;
};

export default AutoAssigner;
