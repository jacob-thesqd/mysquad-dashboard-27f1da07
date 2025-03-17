
import React, { useState } from "react";
import { useTaskAudits } from "@/hooks/useTaskAudits";
import { TaskAudit } from "@/types/audit";
import { AuditSidebar } from "@/components/audits/AuditSidebar";
import { AuditDetail } from "@/components/audits/AuditDetail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Audits = () => {
  const { pendingAudits, completedAudits, isLoading, markAsComplete, getTaskDetails } = useTaskAudits();
  const [selectedAudit, setSelectedAudit] = useState<TaskAudit | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');

  const handleSelectAudit = (audit: TaskAudit) => {
    setSelectedAudit(audit);
  };

  const handleMarkComplete = (rowId: string) => {
    markAsComplete.mutate(rowId);
  };

  return (
    <div className="p-8 h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-bold mb-6">Task Audits</h1>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'pending' | 'completed')} className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending" className="relative">
            Pending
            {pendingAudits.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {pendingAudits.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          <div className="md:col-span-1 border rounded-lg">
            <TabsContent value="pending" className="h-full m-0">
              <AuditSidebar
                audits={pendingAudits}
                selectedAuditId={selectedAudit?.row_id || null}
                onSelectAudit={handleSelectAudit}
                isLoading={isLoading}
              />
            </TabsContent>
            
            <TabsContent value="completed" className="h-full m-0">
              <AuditSidebar
                audits={completedAudits}
                selectedAuditId={selectedAudit?.row_id || null}
                onSelectAudit={handleSelectAudit}
                isLoading={isLoading}
              />
            </TabsContent>
          </div>
          
          <div className="md:col-span-2">
            <AuditDetail
              audit={selectedAudit}
              onMarkComplete={handleMarkComplete}
              isLoading={isLoading}
              isCompleting={markAsComplete.isPending}
              onFetchTaskDetails={getTaskDetails}
            />
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Audits;
