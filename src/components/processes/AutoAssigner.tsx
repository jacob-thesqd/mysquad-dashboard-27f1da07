
import React from "react";
import { AUTO_ASSIGNER_PAGE_ID } from "@/lib/notion";
import { useNotionPage } from "@/hooks/useNotionPage";
import NotionPage from "@/components/notion/NotionPage";

const AutoAssigner = () => {
  const { recordMap, loading, error } = useNotionPage(AUTO_ASSIGNER_PAGE_ID);

  return (
    <NotionPage recordMap={recordMap} loading={loading} error={error} />
  );
};

export default AutoAssigner;
