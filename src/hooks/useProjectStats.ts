
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Define interfaces for the API responses
export interface DailyMetric {
  count: string;
  type: string;
}

export interface TimeSeriesData {
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
  timeSeriesData: TimeSeriesData[];
}

export const useProjectStats = () => {
  const query = useQuery({
    queryKey: ['projectStats'],
    queryFn: async (): Promise<ProjectStats> => {
      // Fetch the daily metrics
      const { data: metricsData, error: metricsError } = await supabase.rpc('get_daily_metrics');
      
      if (metricsError) {
        console.error('Error fetching daily metrics:', metricsError);
        throw new Error('Failed to fetch daily metrics');
      }
      
      // Fetch the time series data
      const { data: trendsData, error: trendsError } = await supabase.rpc('get_task_trends', { days: 13 });
      
      if (trendsError) {
        console.error('Error fetching task trends:', trendsError);
        throw new Error('Failed to fetch task trends');
      }
      
      // Cast the metrics data to the correct type
      const typedMetricsData = metricsData as unknown as DailyMetric[];
      
      // Parse the metrics data into the ProjectStats format
      const stats: ProjectStats = {
        tasksCreatedToday: Number(typedMetricsData.find(m => m.type === 'tasks_created_today')?.count || 0),
        designTasksCreatedToday: Number(typedMetricsData.find(m => m.type === 'design_video_tasks_created_today')?.count || 0),
        tasksAutoAssignedToday: Number(typedMetricsData.find(m => m.type === 'aa_today')?.count || 0),
        tasksInQueue: Number(typedMetricsData.find(m => m.type === 'total_queued')?.count || 0),
        queuedToday: Number(typedMetricsData.find(m => m.type === 'queued_today')?.count || 0),
        medianAASeconds: Number(typedMetricsData.find(m => m.type === 'median_aa_seconds')?.count || 0),
        timeSeriesData: trendsData as TimeSeriesData[],
      };
      
      return stats;
    },
    refetchInterval: 60000, // Refetch every minute
  });

  return {
    stats: query.data,
    isLoading: query.isLoading || !query.data,
    error: query.error
  };
};
