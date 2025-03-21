import React from "react";
import { NotionPage } from "@/components/notion/NotionPage";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const AutoAssigner = () => {
  const notionPageId = "1bce83f731f6808a80a6e861e59f4a25";
  const notionToken = "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";

  // No need for the useNotionPage hook anymore since the loading state is managed inside NotionPage
  return (
    <div className="notion-wrapper" style={{ fontFamily: 'Inter, sans-serif' }}>
      <NotionPage pageId={notionPageId} token={notionToken} />
    </div>
  );
};

export default AutoAssigner;