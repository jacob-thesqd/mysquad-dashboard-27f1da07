import React, { useState, useEffect } from "react";
import { TaskAudit, TaskDetails } from "@/types/audit";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, AlertCircle, Link as LinkIcon, FileText, Tag, Calendar } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { ScrollArea } from "@/components/ui/scroll-area";
interface AuditDetailProps {
  audit: TaskAudit | null;
  onMarkComplete: (rowId: string) => void;
  isLoading: boolean;
  isCompleting: boolean;
  onFetchTaskDetails: (taskId: string) => Promise<TaskDetails>;
}
export function AuditDetail({
  audit,
  onMarkComplete,
  isLoading,
  isCompleting,
  onFetchTaskDetails
}: AuditDetailProps) {
  const [taskDetails, setTaskDetails] = useState<TaskDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  useEffect(() => {
    if (audit) {
      setIsLoadingDetails(true);
      onFetchTaskDetails(audit.task_id).then(details => {
        setTaskDetails(details);
      }).catch(error => {
        console.error("Error fetching task details:", error);
      }).finally(() => {
        setIsLoadingDetails(false);
      });
    } else {
      setTaskDetails(null);
    }
  }, [audit, onFetchTaskDetails]);
  if (isLoading) {
    return <div className="space-y-4">
        <Skeleton className="w-3/4 h-8" />
        <Skeleton className="w-full h-48" />
        <Skeleton className="w-full h-32" />
      </div>;
  }
  if (!audit) {
    return <div className="flex flex-col items-center justify-center h-full">
        <AlertCircle className="w-8 h-8 text-muted-foreground" />
        <h3 className="text-l font-medium text-base">No audit selected</h3>
        <p className="text-xs text-muted-foreground">Select an audit from the sidebar to view details</p>
      </div>;
  }
  return <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="space-y-6 pr-4">
        <Card className="pt-2">
          <CardContent className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold mb-1">Status</h4>
                <div className="flex items-center">
                  {audit.row_updated ? <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">Completed</span>
                    </div> : <div className="flex items-center text-amber-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">Pending</span>
                    </div>}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">Reason</h4>
                <p className="text-sm">{audit.reason == 'keywords_found_desc' ? "Keywords Found (Description)" : audit.reason}</p>
              </div>
            </div>

            {audit.data.keywordsFoundDesc && <div>
                <h4 className="text-sm font-semibold mb-1">Keywords Found</h4>
                <p className="text-sm bg-muted py-2 px-4 rounded font-normal rounded-full">{audit.data.keywordsFoundDesc}</p>
              </div>}

            {audit.data.googleLinks && audit.data.googleLinks.length > 0 && <div>
                <h4 className="text-sm font-semibold mb-1">Google Links</h4>
                <ul className="text-sm space-y-1">
                  {audit.data.googleLinks.map((link, index) => <li key={index} className="flex items-center">
                      <LinkIcon className="w-3 h-3 mr-1" />
                      <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {link}
                      </a>
                    </li>)}
                </ul>
              </div>}

            {audit.data.taskData.assignees && audit.data.taskData.assignees.length > 0 && <div>
                <h4 className="text-sm font-semibold mb-1">Assignees</h4>
                <div className="flex flex-wrap gap-2">
                  {audit.data.taskData.assignees.map(assignee => <div key={assignee.id} className="flex items-center space-x-2 bg-muted p-2 rounded-full">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={assignee.profilePicture} alt={assignee.username} />
                        <AvatarFallback>{assignee.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{assignee.username}</span>
                    </div>)}
                </div>
              </div>}
          </CardContent>
          <CardFooter>
            <Button onClick={() => onMarkComplete(audit.row_id)} disabled={!!audit.row_updated || isCompleting} className="w-full">
              {audit.row_updated ? 'Already Completed' : isCompleting ? 'Marking as Complete...' : 'Mark as Complete'}
            </Button>
          </CardFooter>
        </Card>

        {isLoadingDetails ? <div className="space-y-4 mt-6">
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-64" />
            <Skeleton className="w-full h-32" />
          </div> : taskDetails ? <Card>
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{taskDetails.name}</CardTitle>
                {taskDetails.status && <div className="px-3 py-1 text-xs rounded-full" style={{
              backgroundColor: `${taskDetails.status.color}20`,
              color: taskDetails.status.color
            }}>
                    {taskDetails.status.status}
                  </div>}
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-6">
              {taskDetails.description && <div className="prose prose-sm max-w-none">
                  <h4 className="text-sm font-semibold mb-2 flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    Description
                  </h4>
                  <div className="bg-muted/50 p-4 rounded-md overflow-hidden text-sm">
                    <ReactMarkdown>{taskDetails.description}</ReactMarkdown>
                  </div>
                </div>}

              {taskDetails.tags && taskDetails.tags.length > 0 && <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {taskDetails.tags.map((tag, index) => <span key={index} className="px-2 py-1 text-xs rounded-full" style={{
                backgroundColor: `${tag.tag_bg}20`,
                color: tag.tag_bg
              }}>
                        {tag.name}
                      </span>)}
                  </div>
                </div>}

              {taskDetails.checklists && taskDetails.checklists.length > 0 && <div>
                  <h4 className="text-sm font-semibold mb-2">Checklists</h4>
                  <div className="space-y-4">
                    {taskDetails.checklists.map(checklist => <div key={checklist.id} className="bg-muted/50 p-3 rounded-md">
                        <h5 className="font-medium text-sm mb-2">{checklist.name} ({checklist.resolved}/{checklist.resolved + checklist.unresolved})</h5>
                        <ul className="space-y-1">
                          {checklist.items.map(item => <li key={item.id} className="flex items-start text-sm">
                              <div className={`w-4 h-4 mt-0.5 mr-2 rounded-sm border ${item.resolved ? 'bg-primary border-primary' : 'border-muted-foreground'} flex items-center justify-center`}>
                                {item.resolved && <CheckCircle className="w-3 h-3 text-primary-foreground" />}
                              </div>
                              <span className={item.resolved ? 'line-through text-muted-foreground' : ''}>
                                {item.name}
                              </span>
                            </li>)}
                        </ul>
                      </div>)}
                  </div>
                </div>}

              <div className="grid grid-cols-3 gap-4 text-sm">
                {taskDetails.time_estimate > 0 && <div>
                    <h4 className="font-semibold mb-1">Estimated Time</h4>
                    <p>{Math.round(taskDetails.time_estimate / 60000)} minutes</p>
                  </div>}
                
                <div>
                  <h4 className="font-semibold mb-1 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Created
                  </h4>
                  <p>{new Date(parseInt(taskDetails.date_created)).toLocaleString()}</p>
                </div>
                
                {taskDetails.custom_fields && taskDetails.custom_fields.some(field => field.name === "Go Live Date" && field.value) && <div>
                    <h4 className="font-semibold mb-1">Go Live Date</h4>
                    <p>
                      {new Date(parseInt(taskDetails.custom_fields.find(field => field.name === "Go Live Date")?.value as string)).toLocaleDateString()}
                    </p>
                  </div>}
              </div>
            </CardContent>
          </Card> : null}
      </div>
    </ScrollArea>;
}