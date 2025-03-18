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
  valueFormatter?: (value: number) => string;
  ytdAverage?: number;
  compareDirection?: 'higher-is-better' | 'lower-is-better';
}
const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  description,
  filterParam,
  changePercent,
  isLoading = false,
  valueFormatter,
  ytdAverage,
  compareDirection = 'higher-is-better'
}) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    if (filterParam) {
      navigate(`/data?tab=master&filter=${encodeURIComponent(filterParam)}`);
    }
  };
  const formattedValue = valueFormatter ? valueFormatter(value) : value.toLocaleString();
  const formattedYtdAvg = ytdAverage !== undefined ? valueFormatter ? valueFormatter(ytdAverage) : ytdAverage.toLocaleString() : undefined;

  // Determine if current performance is better than average
  const isBetter = ytdAverage !== undefined && (compareDirection === 'higher-is-better' && value > ytdAverage || compareDirection === 'lower-is-better' && value < ytdAverage);
  return <Card className={`transition-all duration-200 hover:shadow-md ${filterParam ? 'cursor-pointer' : ''}`} onClick={handleCardClick}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {isLoading ? <div className="h-8 w-24 animate-pulse bg-gray-200 dark:bg-gray-700 rounded mt-1"></div> : <h3 className={`text-2xl font-bold mt-1 ${isBetter ? 'text-green-500' : ytdAverage !== undefined ? 'text-red-500' : ''}`}>
                {formattedValue}
              </h3>}
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
            {ytdAverage !== undefined && <p className="text-xs text-muted-foreground mt-1">
                YTD Daily Avg: {formattedYtdAvg}
              </p>}
            {changePercent !== undefined && <div className={`text-xs flex items-center mt-1 ${changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <span>
                  {changePercent >= 0 ? '↑' : '↓'} {Math.abs(changePercent)}%
                </span>
                <span className="text-muted-foreground ml-1">vs yesterday</span>
              </div>}
          </div>
          
        </div>
      </CardContent>
    </Card>;
};
export default StatsCard;