
import React from "react";
import { NotionPage } from "@/components/notion/NotionPage";
//import { useNotionPage } from "@/hooks/useNotionPage";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const AutoAssigner = () => {
  const notionPageId = "1bce83f731f6808a80a6e861e59f4a25";
  const { recordMap, isLoading, error } = useNotionPage(notionPageId);

  const handleRetry = () => {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error loading Notion content</AlertTitle>
        <AlertDescription className="space-y-4">
          <p>{error instanceof Error ? error.message : "Failed to load the Notion page. Please try again later."}</p>
          <Button onClick={handleRetry} variant="outline" size="sm" className="mt-2">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!recordMap) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No content available</AlertTitle>
        <AlertDescription>
          The Notion page content could not be loaded. Please check the page ID and try again.
        </AlertDescription>
      </Alert>
    );
  }

  return <NotionPage recordMap={recordMap} />;
};
