
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description?: string;
  filterParam?: string;
  changePercent?: number;
  isLoading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  description,
  filterParam,
  changePercent,
  isLoading = false
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (filterParam) {
      navigate(`/data?tab=master&filter=${encodeURIComponent(filterParam)}`);
    }
  };

  return (
    <Card 
      className={`transition-all duration-200 hover:shadow-md ${filterParam ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {isLoading ? (
              <div className="h-8 w-24 animate-pulse bg-gray-200 dark:bg-gray-700 rounded mt-1"></div>
            ) : (
              <h3 className="text-2xl font-bold mt-1">{value.toLocaleString()}</h3>
            )}
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
            {changePercent !== undefined && (
              <div className={`text-xs flex items-center mt-1 ${changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <span>
                  {changePercent >= 0 ? '↑' : '↓'} {Math.abs(changePercent)}%
                </span>
                <span className="text-muted-foreground ml-1">vs yesterday</span>
              </div>
            )}
          </div>
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
