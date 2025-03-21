
import React from 'react';
import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap } from 'notion-types';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Import styles for the Notion renderer
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';

interface NotionPageProps {
  recordMap: ExtendedRecordMap | null;
  loading?: boolean;
  error?: string | null;
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
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No documentation available</h3>
        <p className="text-muted-foreground mt-2">
          The Notion page could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="notion-container">
      <NotionRenderer 
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        disableHeader={true}
        // Type-corrected component overrides
        components={{
          // Add custom components here if needed
        }}
      />
    </div>
  );
};

export default NotionPage;
