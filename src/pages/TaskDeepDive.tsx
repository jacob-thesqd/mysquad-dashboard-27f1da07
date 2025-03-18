
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, ArrowRight, CalendarClock, CheckCircle, Circle, Clock, Compass, Github, Users } from "lucide-react";
import { formatDistance, format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DecisionLogItem {
  task_id: string;
  account: number;
  type: string;
  aa_designer_chosen: string | null;
  aa_designer_chosen_data: any | null;
  aa_all_choices: any[] | null;
  aa_markdown_narrative: string | null;
  metadata: any;
  created_at: string;
}

const TaskDeepDive = () => {
  const [identifier, setIdentifier] = useState<string>("");
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["aaDecisionLog", identifier],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_aa_decision_log', {
        p_identifier: identifier
      });
      
      if (error) {
        console.error("Error fetching decision log:", error);
        throw new Error(error.message);
      }
      
      return data as DecisionLogItem[];
    },
    enabled: false // Don't run query on component mount, only when user submits
  });

  // Filter out duplicate entries based on all fields except created_at
  const uniqueData = useMemo(() => {
    if (!data) return [];
    
    const seen = new Map();
    return data.filter(item => {
      // Create a key based on all fields except created_at
      const key = JSON.stringify({
        task_id: item.task_id,
        account: item.account,
        type: item.type,
        aa_designer_chosen: item.aa_designer_chosen,
        aa_designer_chosen_data: item.aa_designer_chosen_data,
        aa_all_choices: item.aa_all_choices,
        aa_markdown_narrative: item.aa_markdown_narrative,
        metadata: item.metadata
      });
      
      if (seen.has(key)) {
        return false;
      }
      
      seen.set(key, true);
      return true;
    });
  }, [data]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    
    setSearchPerformed(true);
    await refetch();
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case "activated":
        return <CheckCircle className="text-green-500 mr-2" />;
      case "deactivated":
        return <Circle className="text-red-500 mr-2" />;
      case "assign":
        return <Users className="text-blue-500 mr-2" />;
      case "queued_assign":
        return <Clock className="text-yellow-500 mr-2" />;
      case "trigger":
        return <Activity className="text-purple-500 mr-2" />;
      default:
        return <Compass className="text-gray-500 mr-2" />;
    }
  };

  const getItemTitle = (item: DecisionLogItem) => {
    switch (item.type) {
      case "activated":
        return `Task activated: Status changed`;
      case "deactivated":
        return `Task deactivated: Status changed`;
      case "assign":
        return `Task assigned to ${item.aa_designer_chosen}`;
      case "queued_assign":
        return "Task queued for assignment";
      case "trigger":
        return "Auto-assign process triggered";
      default:
        return `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} event`;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistance(date, new Date(), { addSuffix: true });
    } catch (e) {
      return "Unknown date";
    }
  };

  const formatTimeCentral = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Format in Central Time (UTC-6)
      return format(date, "MMM d, yyyy 'at' h:mm:ss a 'CT'");
    } catch (e) {
      return "Invalid date";
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Task Deep Dive</h1>
      
      <form onSubmit={handleSearch} className="space-y-4 mb-8">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="identifier">Task ID or Account Number</Label>
          <div className="flex space-x-2">
            <Input
              id="identifier"
              placeholder="Enter Task ID or Account Number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Search</Button>
          </div>
        </div>
      </form>

      {searchPerformed && (
        <div className="mt-6">
          {isLoading && (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {error && (
            <Card className="bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800">
              <CardContent className="p-4">
                <p className="text-red-600 dark:text-red-400">Error loading data: {error.toString()}</p>
              </CardContent>
            </Card>
          )}

          {uniqueData && uniqueData.length === 0 && !isLoading && (
            <Card className="bg-gray-50 dark:bg-gray-900/10">
              <CardContent className="p-4">
                <p className="text-muted-foreground">No timeline data found for "{identifier}". Try a different Task ID or Account Number.</p>
              </CardContent>
            </Card>
          )}

          {uniqueData && uniqueData.length > 0 && !isLoading && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <h2 className="text-xl font-semibold">Activity Timeline</h2>
                {uniqueData[0] && (
                  <span className="text-sm text-muted-foreground">
                    for {uniqueData[0].task_id !== identifier ? 'Account #' : 'Task '} 
                    {uniqueData[0].task_id !== identifier ? uniqueData[0].account : uniqueData[0].task_id}
                    {uniqueData[0].metadata?.account_info?.church_name && ` (${uniqueData[0].metadata.account_info.church_name})`}
                  </span>
                )}
              </div>
              
              <ScrollArea className="h-[calc(100vh-220px)] pr-4 overflow-y-auto">
                <div className="relative ml-6 border-l-2 border-border pl-8 pb-10">
                  {uniqueData.map((item, index) => (
                    <div key={index} className="mb-8 relative">
                      {/* Timeline dot */}
                      <div className="absolute -left-[54px] mt-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background mr-2">
                        {getItemIcon(item.type)}
                      </div>
                      
                      <Card className="transition-all hover:shadow-md">
                        <CardContent className="p-5">
                          <div className="mb-3 flex justify-between items-start">
                            <h3 className="font-semibold">{getItemTitle(item)}</h3>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center text-xs text-muted-foreground cursor-help">
                                    <CalendarClock className="h-3 w-3 mr-1" />
                                    {formatTimeAgo(item.created_at)}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{formatTimeCentral(item.created_at)}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          
                          <div className="space-y-3">
                            {item.task_id && item.task_id !== identifier && (
                              <p className="text-sm flex items-center">
                                <Github className="h-4 w-4 mr-1.5 text-muted-foreground" />
                                Task ID: <span className="font-mono ml-1">{item.task_id}</span>
                              </p>
                            )}
                            
                            {item.aa_markdown_narrative && (
                              <div className="text-sm mt-2 p-3 bg-muted rounded-md">
                                <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none">
                                  {item.aa_markdown_narrative}
                                </ReactMarkdown>
                              </div>
                            )}
                            
                            {item.aa_designer_chosen_data && (
                              <div className="mt-2">
                                <h4 className="text-sm font-medium mb-1">Designer Data</h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                                  {Object.entries(item.aa_designer_chosen_data)
                                    .filter(([key]) => !['task_ids', 'draft_date'].includes(key))
                                    .map(([key, value]) => (
                                      <div key={key} className="p-2 bg-muted rounded">
                                        <span className="font-medium">{key.replace(/_/g, ' ')}:</span> {value?.toString()}
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )}
                            
                            {item.metadata && item.type === "trigger" && (
                              <div className="mt-2">
                                <h4 className="text-sm font-medium mb-1">Account Status</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                  {Object.entries(item.metadata)
                                    .filter(([key, value]) => value !== null && !['non_design_employee_data'].includes(key))
                                    .map(([key, value]) => (
                                      <div key={key} className="p-2 bg-muted rounded">
                                        <span className="font-medium">{key.replace(/_/g, ' ')}:</span> {value?.toString()}
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )}
                            
                            {(item.type === "activated" || item.type === "deactivated") && item.metadata && (
                              <div className="mt-2 flex items-center">
                                <div className="font-medium text-sm mr-2">Status Change:</div>
                                <div className="flex items-center">
                                  <span className="text-sm px-2 py-1 bg-muted rounded-md">{item.metadata.status_before.toUpperCase()}</span>
                                  <ArrowRight className="mx-2 h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm px-2 py-1 bg-muted rounded-md">{item.metadata.status_after.toUpperCase()}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      )}
      
      {!searchPerformed && (
        <Card className="bg-muted border-border">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Task & Account Timeline Viewer</h2>
            <p className="text-muted-foreground mb-4">
              Enter a Task ID or Account Number above to view the detailed timeline of auto-assignment events, 
              status changes, and other relevant activities.
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Circle className="text-green-500 h-5 w-5" />
                <span>Task activated events</span>
              </div>
              <div className="flex items-center space-x-2">
                <Circle className="text-red-500 h-5 w-5" />
                <span>Task deactivated events</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="text-blue-500 h-5 w-5" />
                <span>Task assignment events</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="text-purple-500 h-5 w-5" />
                <span>Auto-assign trigger events</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaskDeepDive;
