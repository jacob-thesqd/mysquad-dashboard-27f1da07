
import React from "react";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";

// Import required CSS
import "react-notion-x/src/styles.css";
// Optional Prism syntax highlighting
import 'prismjs/themes/prism-tomorrow.css';
// Optional KaTeX math formula support
import 'katex/dist/katex.min.css';

interface NotionPageProps {
  recordMap: ExtendedRecordMap;
}

export const NotionPage: React.FC<NotionPageProps> = ({ recordMap }) => {
  return (
    <div className="notion-container">
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        // You can add custom components or overrides here if needed
        // components={{
        //   code: Code,
        //   collection: Collection,
        //   ...
        // }}
      />
    </div>
  );
};
