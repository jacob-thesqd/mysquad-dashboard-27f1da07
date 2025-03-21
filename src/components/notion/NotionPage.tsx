import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface NotionEmbedProps {
  pageId: string;
  height?: string | number;
}

export const NotionEmbed: React.FC<NotionEmbedProps> = ({
  pageId,
  height = "800px"
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Set a timeout to handle cases where the iframe doesn't load correctly
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 5000); // 5 second timeout
    
    return () => clearTimeout(timer);
  }, [loading]);
  
  const handleIframeLoad = () => {
    setLoading(false);
  };
  
  const handleIframeError = () => {
    setLoading(false);
    setError(new Error("Failed to load the embedded Notion page"));
  };
  
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    // Force reload by creating a new URL with a timestamp
    const iframe = document.getElementById('notion-iframe') as HTMLIFrameElement;
    if (iframe) {
      const url = new URL(iframe.src);
      url.searchParams.set('t', Date.now().toString());
      iframe.src = url.toString();
    }
  };
  
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error loading Notion content</AlertTitle>
        <AlertDescription className="space-y-4">
          <p>{error.message}</p>
          <Button onClick={handleRetry} variant="outline" size="sm" className="mt-2">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  
  const notionUrl = `https://notion.so/${pageId.replace(/-/g, '')}`;
  
  return (
    <div className="notion-embed-container" style={{ fontFamily: "Inter, sans-serif" }}>
      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-32 w-full" />
        </div>
      )}
      
      <iframe
        id="notion-iframe"
        src={notionUrl}
        title="Notion Page"
        width="100%"
        height={height}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        style={{ 
          border: "none", 
          borderRadius: "4px",
          display: loading ? "none" : "block"
        }}
        allow="clipboard-write"
        loading="lazy"
      />
    </div>
  );
};

export default NotionEmbed;