import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const AutoAssigner = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="notion-wrapper" style={{ fontFamily: "Inter, sans-serif" }}>
      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-32 w-full" />
        </div>
      )}
      
      <iframe 
        src="https://thesqd.notion.site/ebd/1bbe83f731f6802eab2cdb2c9038c658" 
        width="100%" 
        height="900" 
        frameBorder="0" 
        onLoad={handleIframeLoad}
        style={{ 
          display: isLoading ? "none" : "block",
          border: "none",
          borderRadius: "4px"
        }}
      />
    </div>
  );
};

export default AutoAssigner;