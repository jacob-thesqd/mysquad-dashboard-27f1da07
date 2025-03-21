
import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, ArrowRight, CalendarClock, CheckCircle, Circle, Clock, Compass, Users } from "lucide-react";
import { formatDistance, format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [searchType, setSearchType] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [statusAfterFilter, setStatusAfterFilter] = useState<string>("");
  const [statusBeforeFilter, setStatusBeforeFilter] = useState<string>("");
  
  // Fetch possible statuses for dropdowns
  const { data: statusOptions } = useQuery({
    queryKey: ["statusOptions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clickup_statuses')
        .select('status')
        .order('status', { ascending: true });
      
      if (error) {
        console.error("Error fetching statuses:", error);
        throw new Error(error.message);
      }
      
      return data.map(item => item.status);
    }
  });

  // Fetch event types directly from aa_decision_log table
  const { data: eventTypes } = useQuery({
    queryKey: ["eventTypes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('aa_decision_log')
        .select('type')
        .not('type', 'is', null)
        .order('type', { ascending: true });
      
      if (error) {
        console.error("Error fetching event types:", error);
        throw new Error(error.message);
      }
      
      // Get unique types
      const types = new Set(data.map(item => item.type));
      return Array.from(types);
    }
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["aaDecisionLog", identifier, searchType, typeFilter, statusAfterFilter, statusBeforeFilter],
    queryFn: async () => {
      // Determine the appropriate p_identifier based on filters and search type
      const p_identifier = identifier || typeFilter || statusAfterFilter || statusBeforeFilter || "";
      const p_search_type = identifier ? searchType : typeFilter ? "type" : statusAfterFilter ? "status_after" : statusBeforeFilter ? "status_before" : "all";
      
      const { data, error } = await supabase.rpc('get_aa_decision_log', {
        p_identifier,
        p_search_type
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
    setSearchPerformed(true);
    await refetch();
  };

  // Apply additional filters to data if needed
  const filteredData = useMemo(() => {
    if (!uniqueData) return [];
    
    return uniqueData.filter(item => {
      let matches = true;
      
      // Apply type filter if set
      if (typeFilter && typeFilter !== "all_types" && item.type !== typeFilter) {
        matches = false;
      }
      
      // Apply status_after filter if set
      if (statusAfterFilter && 
          statusAfterFilter !== "all_status_after" && 
          (!item.metadata?.status_after || 
           item.metadata.status_after !== statusAfterFilter)) {
        matches = false;
      }
      
      // Apply status_before filter if set
      if (statusBeforeFilter && 
          statusBeforeFilter !== "all_status_before" && 
          (!item.metadata?.status_before || 
           item.metadata.status_before !== statusBeforeFilter)) {
        matches = false;
      }
      
      return matches;
    });
  }, [uniqueData, typeFilter, statusAfterFilter, statusBeforeFilter]);

  // Convert object keys to sentence case
  const toSentenceCase = (key: string): string => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Format metadata object with sentence case keys and handle nested objects/arrays
  const formatMetadata = (metadata: any): any => {
    if (!metadata) return {};
    
    const formattedMetadata: any = {};
    Object.entries(metadata).forEach(([key, value]) => {
      const newKey = toSentenceCase(key);
      
      // Handle nested objects
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        formattedMetadata[newKey] = formatMetadata(value);
      } 
      // Handle arrays
      else if (Array.isArray(value)) {
        formattedMetadata[newKey] = value;
      }
      // Handle primitives
      else {
        formattedMetadata[newKey] = value;
      }
    });
    
    return formattedMetadata;
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case "activated":
        return <CheckCircle className="text-green-500" />;
      case "deactivated":
        return <Circle className="text-red-500" />;
      case "assign":
        return <Users className="text-blue-500" />;
      case "queued_assign":
        return <Clock className="text-yellow-500" />;
      case "trigger":
        return <Activity className="text-purple-500" />;
      default:
        return <Compass className="text-gray-500" />;
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
      case "assignee_manual_update":
        return `Task manually assigned to ${item.metadata?.changed_to || "someone"}`;
      case "queued":
        return `Task placed in queue`;
      default:
        return `${item.type.charAt(0).toUpperCase() + item.type.slice(1).replace(/_/g, ' ')} event`;
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

  const clearFilters = () => {
    setTypeFilter("");
    setStatusAfterFilter("");
    setStatusBeforeFilter("");
    setSearchType("all");
    setIdentifier("");
  };

  const hasActiveFilters = typeFilter || statusAfterFilter || statusBeforeFilter;

  // Effect to trigger search when filters change
  useEffect(() => {
    if (typeFilter || statusAfterFilter || statusBeforeFilter) {
      refetch();
      setSearchPerformed(true);
    }
  }, [typeFilter, statusAfterFilter, statusBeforeFilter, refetch]);

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
              className="w-2/3" // Made search bar less wide
            />
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Search type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="task_id">Task ID</SelectItem>
                <SelectItem value="account">Account</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="w-32">Search</Button> {/* Made button slightly wider */}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Type Filter */}
          <div>
            <Label htmlFor="type-filter">Event Type</Label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger id="type-filter">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_types">All Types</SelectItem>
                {eventTypes?.map((type) => (
                  <SelectItem key={type} value={type}>{toSentenceCase(type)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Status After Filter */}
          <div>
            <Label htmlFor="status-after-filter">Status After</Label>
            <Select value={statusAfterFilter} onValueChange={setStatusAfterFilter}>
              <SelectTrigger id="status-after-filter">
                <SelectValue placeholder="Select status after" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_status_after">All Status After</SelectItem>
                {statusOptions?.map((status) => (
                  <SelectItem key={`after-${status}`} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Status Before Filter */}
          <div>
            <Label htmlFor="status-before-filter">Status Before</Label>
            <Select value={statusBeforeFilter} onValueChange={setStatusBeforeFilter}>
              <SelectTrigger id="status-before-filter">
                <SelectValue placeholder="Select status before" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_status_before">All Status Before</SelectItem>
                {statusOptions?.map((status) => (
                  <SelectItem key={`before-${status}`} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {hasActiveFilters && (
          <div className="flex justify-end">
            <Button 
              type="button" 
              variant="outline" 
              onClick={clearFilters}
              size="sm"
            >
              Clear Filters
            </Button>
          </div>
        )}
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

          {filteredData && filteredData.length === 0 && !isLoading && (
            <Card className="bg-gray-50 dark:bg-gray-900/10">
              <CardContent className="p-4">
                <p className="text-muted-foreground">No timeline data found with the current filters. Try different filters or search criteria.</p>
              </CardContent>
            </Card>
          )}

          {filteredData && filteredData.length > 0 && !isLoading && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <h2 className="text-xl font-semibold">Activity Timeline</h2>
                {filteredData[0] && identifier && (
                  <span className="text-sm text-muted-foreground">
                    for {filteredData[0].task_id !== identifier ? 'Account #' : 'Task '} 
                    {filteredData[0].task_id !== identifier ? filteredData[0].account : filteredData[0].task_id}
                    {filteredData[0].metadata?.account_info?.church_name && ` (${filteredData[0].metadata.account_info.church_name})`}
                  </span>
                )}
              </div>
              
              <ScrollArea className="h-[calc(100vh-350px)] pr-4 overflow-y-auto">
                <div className="relative ml-6 border-l-2 border-border pl-8 pb-10">
                  {filteredData.map((item, index) => (
                    <div key={index} className="mb-8 relative">
                      {/* Timeline dot */}
                      <div className="absolute -left-[46px] mt-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background mr-2">
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
                                        <span className="font-medium">{toSentenceCase(key)}:</span> {value?.toString()}
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )}
                            
                            {item.type === "trigger" && item.metadata && (
                              <div className="mt-2">
                                <h4 className="text-sm font-medium mb-1">Account Status</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                  {Object.entries(formatMetadata(item.metadata))
                                    .filter(([key, value]) => value !== null && !['non_design_employee_data'].includes(key.toLowerCase()))
                                    .map(([key, value]) => (
                                      <div key={key} className="p-2 bg-muted rounded">
                                        <span className="font-medium">{key}:</span> {value?.toString()}
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )}
                            
                            {item.type === "queued" && item.metadata && (
                              <div className="mt-2">
                                <h4 className="text-sm font-medium mb-1">Queue Status</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                  {Object.entries(formatMetadata(item.metadata))
                                    .filter(([key, value]) => value !== null && !['non_design_employee_data'].includes(key.toLowerCase()))
                                    .map(([key, value]) => (
                                      <div key={key} className="p-2 bg-muted rounded">
                                        <span className="font-medium">{key}:</span> {value?.toString()}
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )}
                            
                            {item.type === "queued_assign" && item.metadata && (
                              <div className="mt-2">
                                <h4 className="text-sm font-medium mb-1">Queue Assignment Details</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                  {Object.entries(formatMetadata(item.metadata))
                                    .filter(([key, value]) => value !== null && !['non_design_employee_data'].includes(key.toLowerCase()))
                                    .map(([key, value]) => (
                                      <div key={key} className="p-2 bg-muted rounded">
                                        <span className="font-medium">{key}:</span> {value?.toString()}
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )}
                            
                            {item.type === "assignee_manual_update" && item.metadata && (
                              <div className="mt-2">
                                <h4 className="text-sm font-medium mb-1">Manual Assignment Details</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                  {Object.entries(formatMetadata(item.metadata))
                                    .filter(([key, value]) => value !== null)
                                    .map(([key, value]) => {
                                      // Handle arrays and objects specially
                                      if (Array.isArray(value)) {
                                        return (
                                          <div key={key} className="p-2 bg-muted rounded col-span-2">
                                            <span className="font-medium">{key}:</span>
                                            <div className="mt-1 pl-2 border-l-2 border-gray-300">
                                              {value.map((item, i) => (
                                                <div key={i} className="text-xs">{item}</div>
                                              ))}
                                            </div>
                                          </div>
                                        );
                                      } else if (value !== null && typeof value === 'object') {
                                        return (
                                          <div key={key} className="p-2 bg-muted rounded col-span-2">
                                            <span className="font-medium">{key}:</span>
                                            <div className="mt-1 pl-2 border-l-2 border-gray-300">
                                              {Object.entries(value).map(([subKey, subValue]) => (
                                                <div key={subKey} className="text-xs">
                                                  <span className="font-medium">{toSentenceCase(subKey)}:</span> {subValue?.toString()}
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        );
                                      } else {
                                        return (
                                          <div key={key} className="p-2 bg-muted rounded">
                                            <span className="font-medium">{key}:</span> {value?.toString()}
                                          </div>
                                        );
                                      }
                                    })}
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
              Search by Task ID or Account Number, or use the filters to view assignment events, 
              status changes, and other relevant activities.
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-500 h-5 w-5" />
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
              <div className="flex items-center space-x-2">
                <Clock className="text-yellow-500 h-5 w-5" />
                <span>Task queue events</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaskDeepDive;
