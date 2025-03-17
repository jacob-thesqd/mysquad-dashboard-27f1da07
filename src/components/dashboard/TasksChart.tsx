
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TimeSeriesDataPoint } from "@/hooks/useProjectStats";

interface TasksChartProps {
  data: TimeSeriesDataPoint[];
  isLoading?: boolean;
}

const TasksChart: React.FC<TasksChartProps> = ({ data, isLoading = false }) => {
  const [showDesignOnly, setShowDesignOnly] = useState(false);

  const handleToggleChange = () => {
    setShowDesignOnly(!showDesignOnly);
  };

  if (isLoading) {
    return (
      <Card className="col-span-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Task Creation Trend (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="w-full h-[250px] animate-pulse bg-gray-200 dark:bg-gray-700 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Task Creation Trend (Last 7 Days)</CardTitle>
          <Toggle pressed={showDesignOnly} onPressedChange={handleToggleChange}>
            {showDesignOnly ? "Design/Video Only" : "All Tasks"}
          </Toggle>
        </div>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`${value} tasks`, ""]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            {!showDesignOnly && (
              <Bar 
                dataKey="allTasks" 
                name="All Tasks" 
                fill="#4f46e5" 
                radius={[4, 4, 0, 0]} 
              />
            )}
            <Bar 
              dataKey="designTasks" 
              name="Design/Video Tasks" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TasksChart;
