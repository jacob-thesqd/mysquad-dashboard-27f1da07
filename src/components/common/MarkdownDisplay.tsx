
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarkdownDisplayProps {
  markdown: string;
  loading?: boolean;
  error?: string | null;
  refetch?: () => void;
}

const MarkdownDisplay: React.FC<MarkdownDisplayProps> = ({ markdown, loading, error, refetch }) => {
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
        <AlertDescription className="flex flex-col gap-2">
          {error}
          {refetch && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => refetch()}
              className="self-start mt-2"
            >
              Try Again
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  if (!markdown) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No documentation available</h3>
        <p className="text-muted-foreground mt-2">
          Documentation content could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownDisplay;
