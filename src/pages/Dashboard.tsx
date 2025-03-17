
import React from "react";
import { useNavigate } from "react-router-dom";
import { useProjectStats } from "@/hooks/useProjectStats";
import StatsCard from "@/components/dashboard/StatsCard";
import TasksChart from "@/components/dashboard/TasksChart";
import { 
  CalendarPlus, 
  Layers, 
  CheckSquare, 
  Clock, 
  AlarmClock, 
  Timer 
} from "lucide-react";

const Dashboard = () => {
  const { stats, isLoading } = useProjectStats();
  const navigate = useNavigate();
  
  const formatSeconds = (seconds: number): string => {
    if (seconds < 60) return `${seconds.toFixed(1)}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds.toFixed(0)}s`;
  };

  // Handle the case when stats is undefined during initial load
  const safeStats = stats || {
    tasksCreatedToday: 0,
    tasksCreatedAvg: 0,
    designTasksCreatedToday: 0,
    designTasksCreatedAvg: 0,
    tasksAutoAssignedToday: 0,
    tasksAutoAssignedAvg: 0,
    tasksInQueue: 0,
    tasksInQueueAvg: 0,
    queuedToday: 0,
    queuedTodayAvg: 0,
    medianAASeconds: 0,
    medianAASecondsAvg: 0,
    timeSeriesData: []
  };

  return (
    <div className="p-8 h-full overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-6">
        <StatsCard 
          title="Tasks Created Today" 
          value={safeStats.tasksCreatedToday} 
          icon={<CalendarPlus size={24} />}
          filterParam={`date_created:${new Date().toISOString().split('T')[0]}`}
          isLoading={isLoading}
          ytdAverage={safeStats.tasksCreatedAvg}
          compareDirection="higher-is-better"
        />
        
        <StatsCard 
          title="Design/Video Tasks Today" 
          value={safeStats.designTasksCreatedToday} 
          icon={<Layers size={24} />}
          filterParam={`date_created:${new Date().toISOString().split('T')[0]} space_name:Blue,Red`}
          isLoading={isLoading}
          ytdAverage={safeStats.designTasksCreatedAvg}
          compareDirection="higher-is-better"
        />
        
        <StatsCard 
          title="Auto-Assigned Today" 
          value={safeStats.tasksAutoAssignedToday} 
          icon={<CheckSquare size={24} />}
          filterParam={`date_auto_assigned:${new Date().toISOString().split('T')[0]}`}
          isLoading={isLoading}
          ytdAverage={safeStats.tasksAutoAssignedAvg}
          compareDirection="higher-is-better"
        />
        
        <StatsCard 
          title="Tasks In Queue" 
          value={safeStats.tasksInQueue} 
          icon={<Clock size={24} />}
          filterParam="auto_assign_status:queued"
          isLoading={isLoading}
          ytdAverage={safeStats.tasksInQueueAvg}
          compareDirection="lower-is-better"
        />

        <StatsCard 
          title="Added to Queue Today" 
          value={safeStats.queuedToday} 
          icon={<AlarmClock size={24} />}
          filterParam={`date_queued:${new Date().toISOString().split('T')[0]}`}
          isLoading={isLoading}
          ytdAverage={safeStats.queuedTodayAvg}
          compareDirection="lower-is-better"
        />

        <StatsCard 
          title="Median Auto-Assign Time" 
          value={safeStats.medianAASeconds} 
          icon={<Timer size={24} />}
          valueFormatter={formatSeconds}
          isLoading={isLoading}
          ytdAverage={safeStats.medianAASecondsAvg}
          compareDirection="lower-is-better"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <TasksChart data={safeStats.timeSeriesData} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Dashboard;
