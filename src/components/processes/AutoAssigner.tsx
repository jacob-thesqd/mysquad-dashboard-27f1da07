import React from "react";
import { NotionEmbed } from "@/components/notion/NotionPage";

export const AutoAssigner = () => {
  const notionPageId = "1bce83f731f6808a80a6e861e59f4a25";
  
  return (
    <div className="notion-wrapper">
      <NotionEmbed pageId={notionPageId} height={800} />
    </div>
  );
};

export default AutoAssigner;