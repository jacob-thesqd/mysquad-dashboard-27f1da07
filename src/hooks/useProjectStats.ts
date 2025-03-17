
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays } from "date-fns";

export interface ProjectStats {
  tasksCreatedToday: number;
  designTasksCreatedToday: number;
  tasksAutoAssignedToday: number;
  tasksInQueue: number;
  timeSeriesData: TimeSeriesDataPoint[];
}

export interface TimeSeriesDataPoint {
  date: string;
  allTasks: number;
  designTasks: number;
}

export const useProjectStats = () => {
  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");

  // Fetch tasks created today
  const { data: tasksCreatedToday, isLoading: isLoadingTasksToday } = useQuery({
    queryKey: ["tasksCreatedToday"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("search_text_in_table", {
        p_table_name: "master_project_view_mv",
        p_search_text: `date_created:${todayStr}`
      });
      
      if (error) {
        console.error("Error fetching tasks created today:", error);
        return 0;
      }
      
      return data?.length || 0;
    }
  });

  // Fetch design/video tasks created today
  const { data: designTasksCreatedToday, isLoading: isLoadingDesignTasksToday } = useQuery({
    queryKey: ["designTasksCreatedToday"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("search_text_in_table", {
        p_table_name: "master_project_view_mv", 
        p_search_text: `date_created:${todayStr} space_name:Blue,Red`
      });
      
      if (error) {
        console.error("Error fetching design tasks created today:", error);
        return 0;
      }
      
      return data?.length || 0;
    }
  });

  // Fetch tasks auto-assigned today
  const { data: tasksAutoAssignedToday, isLoading: isLoadingAutoAssignedToday } = useQuery({
    queryKey: ["tasksAutoAssignedToday"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("search_text_in_table", {
        p_table_name: "master_project_view_mv",
        p_search_text: `date_auto_assigned:${todayStr}`
      });
      
      if (error) {
        console.error("Error fetching tasks auto-assigned today:", error);
        return 0;
      }
      
      return data?.length || 0;
    }
  });

  // Fetch tasks in queue
  const { data: tasksInQueue, isLoading: isLoadingTasksInQueue } = useQuery({
    queryKey: ["tasksInQueue"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("search_text_in_table", {
        p_table_name: "master_project_view_mv",
        p_search_text: "auto_assign_status:queued"
      });
      
      if (error) {
        console.error("Error fetching tasks in queue:", error);
        return 0;
      }
      
      return data?.length || 0;
    }
  });

  // Fetch time series data for the chart (last 7 days)
  const { data: timeSeriesData, isLoading: isLoadingTimeSeriesData } = useQuery({
    queryKey: ["timeSeriesData"],
    queryFn: async () => {
      const timeSeriesPoints: TimeSeriesDataPoint[] = [];
      
      // Fetch data for the last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = subDays(today, i);
        const dateStr = format(date, "yyyy-MM-dd");
        const formattedDate = format(date, "MMM dd");
        
        // Get all tasks for this day
        const { data: allTasksData, error: allTasksError } = await supabase.rpc("search_text_in_table", {
          p_table_name: "master_project_view_mv",
          p_search_text: `date_created:${dateStr}`
        });
        
        if (allTasksError) {
          console.error(`Error fetching all tasks for ${dateStr}:`, allTasksError);
        }
        
        // Get design tasks for this day
        const { data: designTasksData, error: designTasksError } = await supabase.rpc("search_text_in_table", {
          p_table_name: "master_project_view_mv", 
          p_search_text: `date_created:${dateStr} space_name:Blue,Red`
        });
        
        if (designTasksError) {
          console.error(`Error fetching design tasks for ${dateStr}:`, designTasksError);
        }
        
        timeSeriesPoints.push({
          date: formattedDate,
          allTasks: allTasksData?.length || 0,
          designTasks: designTasksData?.length || 0
        });
      }
      
      return timeSeriesPoints;
    }
  });

  const isLoading = 
    isLoadingTasksToday || 
    isLoadingDesignTasksToday || 
    isLoadingAutoAssignedToday || 
    isLoadingTasksInQueue || 
    isLoadingTimeSeriesData;

  return {
    stats: {
      tasksCreatedToday: tasksCreatedToday || 0,
      designTasksCreatedToday: designTasksCreatedToday || 0,
      tasksAutoAssignedToday: tasksAutoAssignedToday || 0,
      tasksInQueue: tasksInQueue || 0,
      timeSeriesData: timeSeriesData || []
    },
    isLoading
  };
};
