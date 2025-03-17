
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TimeSeriesData } from "@/hooks/useProjectStats";

interface TasksChartProps {
  data: TimeSeriesData[];
  isLoading?: boolean;
}

const TasksChart: React.FC<TasksChartProps> = ({
  data,
  isLoading = false
}) => {
  const [showDesignOnly, setShowDesignOnly] = useState(false);
  const handleToggleChange = () => {
    setShowDesignOnly(!showDesignOnly);
  };

  // Process and prepare the data for the chart
  const prepareChartData = () => {
    if (!data || data.length === 0) return [];

    // Group by date
    const dateGroups = data.reduce((acc, item) => {
      if (!acc[item.date]) {
        acc[item.date] = {
          date: item.date,
          allTasks: 0,
          designTasks: 0
        };
      }
      if (item.type === 'total') {
        acc[item.date].allTasks = item.task_count;
      } else if (item.type === 'design/video') {
        acc[item.date].designTasks = item.task_count;
      }
      return acc;
    }, {} as Record<string, any>);

    // Convert to array and sort by date
    return Object.values(dateGroups).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };
  
  const chartData = prepareChartData();
  
  if (isLoading) {
    return <Card className="col-span-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Task Creation Trend (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="w-full h-[250px] animate-pulse bg-gray-200 dark:bg-gray-700 rounded"></div>
        </CardContent>
      </Card>;
  }
  
  return <Card className="col-span-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Task Creation Trend</CardTitle>
          
        </div>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={value => {
            // Format date to be more readable
            const date = new Date(value);
            return date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            });
          }} />
            <YAxis />
            <Tooltip formatter={value => [`${value} tasks`, ""]} labelFormatter={label => `Date: ${new Date(label).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          })}`} />
            <Legend />
            {!showDesignOnly && <Bar dataKey="allTasks" name="All Tasks" fill="#4f46e5" radius={[4, 4, 0, 0]} />}
            <Bar dataKey="designTasks" name="Design/Video Tasks" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>;
};

export default TasksChart;
