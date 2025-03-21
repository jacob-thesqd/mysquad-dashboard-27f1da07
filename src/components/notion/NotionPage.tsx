import React, { useEffect, useState } from "react";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
// Import required CSS
import "react-notion-x/src/styles.css";
// Optional Prism syntax highlighting
import 'prismjs/themes/prism-tomorrow.css';
// Optional KaTeX math formula support
import 'katex/dist/katex.min.css';

// Additional components for enhanced rendering
import { Code } from 'react-notion-x/build/third-party/code'
import { Collection } from 'react-notion-x/build/third-party/collection'
import { Equation } from 'react-notion-x/build/third-party/equation'
import { Modal } from 'react-notion-x/build/third-party/modal'

// Import NotionAPI without requiring server calls
import { NotionAPI } from 'notion-client'

interface NotionPageProps {
  pageId?: string;
}

export const NotionPage: React.FC<NotionPageProps> = ({ 
  pageId = "1bce83f731f6808a80a6e861e59f4a25"
}) => {
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotionPage = async () => {
      try {
        setLoading(true);
        
        // Use the unofficial client which doesn't require CORS
        const notion = new NotionAPI();
        
        // Fetch the page with the unofficial client
        const pageData = await notion.getPage(pageId);
        
        setRecordMap(pageData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Notion page:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setLoading(false);
      }
    };

    if (pageId) {
      fetchNotionPage();
    }
  }, [pageId]);

  // Show loading state
  if (loading) {
    return (
      <div className="notion-container" style={{ 
        fontFamily: 'Inter, sans-serif',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px'
      }}>
        <div className="loading">
          Loading Notion page...
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="notion-container" style={{ 
        fontFamily: 'Inter, sans-serif',
        padding: '20px',
        color: '#E11D48'
      }}>
        <div className="error">
          <h3>Error loading Notion page</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Show content when loaded
  return (
    <div className="notion-container" style={{ fontFamily: 'Inter, sans-serif' }}>
      {recordMap ? (
        <NotionRenderer
          recordMap={recordMap}
          fullPage={false}
          darkMode={false}
          components={{
            // Add enhanced components
            Code,
            Collection,
            Equation,
            Modal
          }}
          mapPageUrl={id => `/${id}`}
        />
      ) : (
        <div>No content available</div>
      )}
    </div>
  );
};

export default NotionPage;