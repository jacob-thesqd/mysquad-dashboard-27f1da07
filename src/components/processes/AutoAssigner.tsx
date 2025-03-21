
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import NotionPage from "@/components/notion/NotionPage";
import { useNotionPage } from "@/hooks/useNotionPage";

// Notion page ID for Auto-Assigner documentation
const AUTO_ASSIGNER_PAGE_ID = "1bce83f731f6808a80a6e861e59f4a25";

const AutoAssigner = () => {
  const { recordMap, loading, error, refetch } = useNotionPage(AUTO_ASSIGNER_PAGE_ID);

  return (
    <NotionPage 
      recordMap={recordMap} 
      loading={loading} 
      error={error}
    />
  );
};

export default AutoAssigner;
