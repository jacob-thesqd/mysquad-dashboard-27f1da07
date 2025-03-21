
import React from 'react';
import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap } from 'notion-types';
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Import the required CSS for react-notion-x
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';

interface NotionPageProps {
  recordMap: ExtendedRecordMap | null;
  loading: boolean;
  error: string | null;
}

const NotionPage: React.FC<NotionPageProps> = ({ recordMap, loading, error }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-8 w-1/3 mt-6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (!recordMap) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          No data found. Please check the page ID.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ScrollArea className="h-[70vh] pr-4">
      <div className="notion-app notion-root dark:text-white">
        <NotionRenderer 
          recordMap={recordMap} 
          fullPage={false}
          darkMode={document.documentElement.classList.contains('dark')}
          disableHeader
        />
      </div>
    </ScrollArea>
  );
};

export default NotionPage;
