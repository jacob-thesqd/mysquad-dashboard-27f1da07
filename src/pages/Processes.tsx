
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AutoAssigner from "@/components/processes/AutoAssigner";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotionPage } from "@/hooks/useNotionPage";

// Notion page ID for Auto-Assigner documentation
const AUTO_ASSIGNER_PAGE_ID = "1bce83f731f6808a80a6e861e59f4a25";

const processes = [
  { id: "auto-assigner", name: "Auto-Assigner" },
  { id: "task-reviewer", name: "Task Reviewer" },
  { id: "quality-checker", name: "Quality Checker" },
];

const Processes = () => {
  const [activeProcess, setActiveProcess] = useState("auto-assigner");
  const { refetch } = useNotionPage(AUTO_ASSIGNER_PAGE_ID);
  useDocumentTitle("Processes");

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Processes</h1>
            <p className="text-muted-foreground">
              View and manage system processes documentation
            </p>
          </div>
          {activeProcess === "auto-assigner" && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => refetch()}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Docs
            </Button>
          )}
        </div>

        <Card className="p-6">
          <Tabs defaultValue="auto-assigner" onValueChange={setActiveProcess} value={activeProcess}>
            <TabsList className="mb-6 w-full sm:w-auto">
              {processes.map((process) => (
                <TabsTrigger key={process.id} value={process.id} className="px-4 py-2">
                  {process.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="auto-assigner" className="mt-6">
              <AutoAssigner />
            </TabsContent>
            
            <TabsContent value="task-reviewer">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">Task Reviewer Documentation</h3>
                <p className="text-muted-foreground mt-2">
                  Documentation for this process is coming soon.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="quality-checker">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">Quality Checker Documentation</h3>
                <p className="text-muted-foreground mt-2">
                  Documentation for this process is coming soon.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Processes;
