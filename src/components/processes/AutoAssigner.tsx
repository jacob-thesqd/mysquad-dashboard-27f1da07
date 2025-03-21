
import React, { useEffect, useState } from "react";
import { AUTO_ASSIGNER_PAGE_ID, getNotionPage } from "@/lib/notion";
import NotionPage from "@/components/notion/NotionPage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react"; 

const AutoAssigner = () => {
  const [recordMap, setRecordMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching auto-assigner documentation...");
        const data = await getNotionPage(AUTO_ASSIGNER_PAGE_ID);
        
        if (data) {
          console.log("Auto-assigner documentation loaded successfully");
          setRecordMap(data);
          setError(null);
        } else {
          console.error("Failed to load documentation");
          setError("Unable to load the documentation. Please try again later.");
        }
      } catch (err) {
        console.error("Error in auto-assigner component:", err);
        setError("Error loading documentation. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return <NotionPage recordMap={recordMap} loading={loading} error={error} />;
};

export default AutoAssigner;
