
import React from "react";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import "react-notion-x/src/styles.css";

// Optionally include code syntax highlighting (required prismjs)
// import 'prismjs/themes/prism-tomorrow.css'

// Optionally include KaTeX support (required katex)
// import 'katex/dist/katex.min.css'

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
