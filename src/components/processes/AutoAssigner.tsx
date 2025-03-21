
import React, { useState, useEffect } from "react";
import { AUTO_ASSIGNER_PAGE_ID } from "@/lib/notion";
import NotionPage from "@/components/notion/NotionPage";
import { useNotionPage } from "@/hooks/useNotionPage";
import AutoAssignerMarkdown from "./AutoAssignerMarkdown";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react"; 

const AutoAssigner = () => {
  const [useMarkdownFallback, setUseMarkdownFallback] = useState(false);
  const { recordMap, loading, error } = useNotionPage(AUTO_ASSIGNER_PAGE_ID);

  // If there's an error with Notion, use the markdown fallback
  useEffect(() => {
    if (error) {
      console.log("Using markdown fallback due to Notion error:", error);
      setUseMarkdownFallback(true);
    }
  }, [error]);

  if (useMarkdownFallback) {
    return <AutoAssignerMarkdown />;
  }

  return <NotionPage recordMap={recordMap} loading={loading} error={error} />;
};

export default AutoAssigner;
