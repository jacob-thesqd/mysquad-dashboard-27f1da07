
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ReactMarkdown from "react-markdown";
import { notionBlocksToMarkdown } from "@/utils/notionParser";

const AutoAssigner = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<string>("");

  useEffect(() => {
    const fetchDocumentation = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://sis1.thesqd.com/webhook/8136931f-c2d6-4350-adce-49db3b8b3863");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch documentation: ${response.status}`);
        }
        
        const data = await response.json();
        const markdownContent = notionBlocksToMarkdown(data);
        setMarkdown(markdownContent);
        setError(null);
      } catch (err) {
        console.error("Error fetching documentation:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch documentation");
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentation();
  }, []);

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

  return (
    <ScrollArea className="max-h-[70vh]">
      <div className="prose prose-stone dark:prose-invert max-w-none">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </ScrollArea>
  );
};

export default AutoAssigner;
