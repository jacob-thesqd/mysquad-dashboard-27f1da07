import React from "react";
import { TaskAudit } from "@/types/audit";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
interface AuditSidebarProps {
  audits: TaskAudit[];
  selectedAuditId: string | null;
  onSelectAudit: (audit: TaskAudit) => void;
  isLoading: boolean;
}
export function AuditSidebar({
  audits,
  selectedAuditId,
  onSelectAudit,
  isLoading
}: AuditSidebarProps) {
  if (isLoading) {
    return <div className="w-full h-full p-4 space-y-4">
        {Array.from({
        length: 5
      }).map((_, i) => <Skeleton key={i} className="w-full h-24" />)}
      </div>;
  }
  if (!audits || audits.length === 0) {
    return <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No audits found</p>
      </div>;
  }
  return <ScrollArea className="h-[calc(100vh-13rem)] pr-4">
      <div className="space-y-4 pb-4 p-2">
        {audits.map(audit => <Card key={audit.row_id} className={`cursor-pointer transition-all hover:shadow-md ${selectedAuditId === audit.row_id ? 'border-primary ring-1 ring-primary' : ''}`} onClick={() => onSelectAudit(audit)}>
            <CardContent className="pl-3 py-3">
              <div className="space-y-2">
                <div className="text-sm flex justify-between">
                  <span className="font-medium truncate">
                    {audit.data.taskData.taskName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(audit.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Task ID: {audit.task_id}
                </div>
                <div className="text-xs">
                  <span className="px-2 py-1 text-xs rounded-full bg-muted">
                    {audit.reason == 'keywords_found_desc' ? "Keywords Found (Description)" : audit.reason}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>
    </ScrollArea>;
}