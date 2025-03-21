import React from "react";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";

// Import required CSS
import "react-notion-x/src/styles.css";
// Optional Prism syntax highlighting
import "prismjs/themes/prism-tomorrow.css";
// Optional KaTeX math formula support
import "katex/dist/katex.min.css";

// Additional components for enhanced rendering
import { Code } from "react-notion-x/build/third-party/code";
import { Collection } from "react-notion-x/build/third-party/collection";
import { Equation } from "react-notion-x/build/third-party/equation";
import { Modal } from "react-notion-x/build/third-party/modal";

interface NotionPageProps {
  recordMap: ExtendedRecordMap;
}

export const NotionPage: React.FC<NotionPageProps> = ({ recordMap }) => {
  return (
    <div className="notion-container" style={{ fontFamily: "Inter, sans-serif" }}>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        components={{
          Code,
          Collection,
          Equation,
          Modal
        }}
        mapPageUrl={id => `/${id}`}
      />
    </div>
  );
};

export default NotionPage;