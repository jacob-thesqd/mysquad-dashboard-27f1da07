
import React from "react";
import MarkdownDisplay from "@/components/common/MarkdownDisplay";
import { useMarkdownDocs } from "@/hooks/useMarkdownDocs";

const AUTO_ASSIGNER_DOCS_ENDPOINT = "https://sis1.thesqd.com/webhook/8136931f-c2d6-4350-adce-49db3b8b3863";

const AutoAssignerMarkdown = () => {
  const { markdown, loading, error, refetch } = useMarkdownDocs(
    AUTO_ASSIGNER_DOCS_ENDPOINT,
    "autoAssignerDocs"
  );

  return <MarkdownDisplay markdown={markdown} loading={loading} error={error} />;
};

export default AutoAssignerMarkdown;
