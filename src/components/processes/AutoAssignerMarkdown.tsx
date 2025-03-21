/*
import React from "react";
import MarkdownDisplay from "@/components/common/MarkdownDisplay";
import { useMarkdownDocs } from "@/hooks/useMarkdownDocs";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const AUTO_ASSIGNER_DOCS_ENDPOINT = "https://sis1.thesqd.com/webhook/8136931f-c2d6-4350-adce-49db3b8b3863";

interface AutoAssignerMarkdownProps {
  onTryNotion?: () => void;
}

const AutoAssignerMarkdown: React.FC<AutoAssignerMarkdownProps> = ({ onTryNotion }) => {
  const { markdown, loading, error, refetch } = useMarkdownDocs(
    AUTO_ASSIGNER_DOCS_ENDPOINT,
    "autoAssignerDocs"
  );

  return (
    <div className="space-y-4">
      {onTryNotion && (
        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onTryNotion}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Notion Version
          </Button>
        </div>
      )}
      
      <MarkdownDisplay markdown={markdown} loading={loading} error={error} refetch={refetch} />
    </div>
  );
};

export default AutoAssignerMarkdown;*/
