
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProjectStats } from "@/hooks/useProjectStats";
import StatsCard from "@/components/dashboard/StatsCard";
import TasksChart from "@/components/dashboard/TasksChart";
import { CalendarPlus, Layers, CheckSquare, Clock, AlarmClock } from "lucide-react";

const Dashboard = () => {
  const { stats, isLoading } = useProjectStats();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Check if we need to navigate to data page with a filter
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam) {
      navigate(`/data?tab=master&filter=${filterParam}`);
    }
  }, [searchParams, navigate]);

  return (
    <div className="p-8 h-full overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard 
          title="Tasks Created Today" 
          value={stats.tasksCreatedToday} 
          icon={<CalendarPlus size={24} />}
          filterParam={`date_created:${new Date().toISOString().split('T')[0]}`}
          isLoading={isLoading}
        />
        
        <StatsCard 
          title="Design/Video Tasks Today" 
          value={stats.designTasksCreatedToday} 
          icon={<Layers size={24} />}
          description="From Red & Blue Accounts"
          filterParam={`date_created:${new Date().toISOString().split('T')[0]} space_name:Blue,Red`}
          isLoading={isLoading}
        />
        
        <StatsCard 
          title="Auto-Assigned Today" 
          value={stats.tasksAutoAssignedToday} 
          icon={<CheckSquare size={24} />}
          filterParam={`date_auto_assigned:${new Date().toISOString().split('T')[0]}`}
          isLoading={isLoading}
        />
        
        <StatsCard 
          title="Tasks In Queue" 
          value={stats.tasksInQueue} 
          icon={<Clock size={24} />}
          filterParam="auto_assign_status:queued"
          isLoading={isLoading}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <TasksChart data={stats.timeSeriesData} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Dashboard;
