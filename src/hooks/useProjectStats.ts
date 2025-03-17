
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DailyMetric {
  count: string;
  type: string;
}

export interface TaskTrendData {
  date: string;
  task_count: number;
  type: string;
}

export interface ProjectStats {
  tasksCreatedToday: number;
  designTasksCreatedToday: number;
  tasksAutoAssignedToday: number;
  tasksInQueue: number;
  queuedToday: number;
  medianAASeconds: number;
  timeSeriesData: TaskTrendData[];
}

export const useProjectStats = () => {
  const [chartDays, setChartDays] = useState(13); // Default to 2 weeks of data

  // Fetch daily metrics
  const { data: metricsData, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ["dailyMetrics"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_daily_metrics");
      
      if (error) {
        console.error("Error fetching daily metrics:", error);
        return [];
      }
      
      return data as DailyMetric[];
    }
  });

  // Fetch time series data for the chart
  const { data: trendData, isLoading: isLoadingTrends } = useQuery({
    queryKey: ["taskTrends", chartDays],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_task_trends", { 
        days: chartDays 
      });
      
      if (error) {
        console.error("Error fetching task trends:", error);
        return [];
      }
      
      return data as TaskTrendData[];
    }
  });

  // Process the metrics data into our stats object
  const getMetricValue = (type: string): number => {
    if (!metricsData) return 0;
    const metric = metricsData.find(m => m.type === type);
    return metric ? parseFloat(metric.count) : 0;
  };

  const isLoading = isLoadingMetrics || isLoadingTrends;

  return {
    stats: {
      tasksCreatedToday: getMetricValue("tasks_created_today"),
      designTasksCreatedToday: getMetricValue("design_video_tasks_created_today"),
      tasksAutoAssignedToday: getMetricValue("aa_today"),
      tasksInQueue: getMetricValue("total_queued"),
      queuedToday: getMetricValue("queued_today"),
      medianAASeconds: getMetricValue("median_aa_seconds"),
      timeSeriesData: trendData || []
    },
    isLoading,
    setChartDays
  };
};
