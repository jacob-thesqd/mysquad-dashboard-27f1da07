
import React from "react";
import { TaskAudit } from "@/types/audit";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, AlertCircle, Link as LinkIcon } from "lucide-react";

interface AuditDetailProps {
  audit: TaskAudit | null;
  onMarkComplete: (rowId: string) => void;
  isLoading: boolean;
  isCompleting: boolean;
}

export function AuditDetail({ 
  audit, 
  onMarkComplete, 
  isLoading,
  isCompleting
}: AuditDetailProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="w-3/4 h-8" />
        <Skeleton className="w-full h-48" />
        <Skeleton className="w-full h-32" />
      </div>
    );
  }

  if (!audit) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <AlertCircle className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium">No audit selected</h3>
        <p className="text-muted-foreground">Select an audit from the sidebar to view details</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{audit.data.taskData.taskName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-1">Task ID</h4>
              <p className="text-sm">{audit.task_id}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Created</h4>
              <p className="text-sm">{new Date(audit.created_at).toLocaleString()}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Status</h4>
              <div className="flex items-center">
                {audit.row_updated ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">Completed</span>
                  </div>
                ) : (
                  <div className="flex items-center text-amber-600">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">Pending</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Reason</h4>
              <p className="text-sm">{audit.reason}</p>
            </div>
          </div>

          {audit.data.keywordsFoundDesc && (
            <div>
              <h4 className="text-sm font-semibold mb-1">Keywords Found</h4>
              <p className="text-sm bg-muted p-2 rounded">{audit.data.keywordsFoundDesc}</p>
            </div>
          )}

          {audit.data.googleLinks && audit.data.googleLinks.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-1">Google Links</h4>
              <ul className="text-sm space-y-1">
                {audit.data.googleLinks.map((link, index) => (
                  <li key={index} className="flex items-center">
                    <LinkIcon className="w-3 h-3 mr-1" />
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {audit.data.taskData.assignees && audit.data.taskData.assignees.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-1">Assignees</h4>
              <div className="flex flex-wrap gap-2">
                {audit.data.taskData.assignees.map((assignee) => (
                  <div key={assignee.id} className="flex items-center space-x-2 bg-muted p-2 rounded">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={assignee.profilePicture} alt={assignee.username} />
                      <AvatarFallback>{assignee.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{assignee.username}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => onMarkComplete(audit.row_id)}
            disabled={!!audit.row_updated || isCompleting}
            className="w-full"
          >
            {audit.row_updated 
              ? 'Already Completed' 
              : isCompleting 
                ? 'Marking as Complete...' 
                : 'Mark as Complete'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
