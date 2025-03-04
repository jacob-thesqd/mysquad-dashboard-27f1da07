
import { useCallback } from "react";
import { Handle, Position, NodeProps, useReactFlow } from "reactflow";
import { Equipment } from "@/types/equipment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EquipmentNode = ({ id, data, selected }: NodeProps<Equipment>) => {
  const { setNodes, deleteElements } = useReactFlow();
  const isActive = data.active;
  const progress = data.progress ?? 0;
  const isBottleneck = data.bottleneck;
  const utilization = data.utilization;
  
  const handleDelete = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    
    deleteElements({
      nodes: [{ id }],
    });
  }, [id, deleteElements]);
  
  return (
    <Card 
      className={`w-60 shadow-lg ${isActive ? 'ring-2 ring-primary' : ''} ${isBottleneck ? 'ring-2 ring-destructive' : ''} ${data.placeholder ? 'opacity-60' : ''}`}
    >
      <CardHeader className="py-2 px-4 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium leading-none truncate" title={data.name}>
          {data.name}
        </CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7" 
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Equipment</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="px-4 py-2 space-y-2">
        <div className="text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Cycle Time:</span>
            <span>{data.cycleTime}s</span>
          </div>
          <div className="flex justify-between">
            <span>Throughput:</span>
            <span>{data.throughput} units/hr</span>
          </div>
          {data.maxCapacity && data.maxCapacity > 1 && (
            <div className="flex justify-between">
              <span>Capacity:</span>
              <span>{data.maxCapacity} units</span>
            </div>
          )}
          {utilization !== undefined && (
            <div className="mt-2">
              <div className="flex justify-between mb-1">
                <span>Utilization:</span>
                <span className={isBottleneck ? 'text-destructive font-semibold' : ''}>
                  {utilization}%
                </span>
              </div>
              <Progress 
                value={utilization} 
                max={100} 
                className={isBottleneck ? 'bg-destructive/20' : ''}
              />
            </div>
          )}
          {isActive && progress > 0 && (
            <div className="mt-2">
              <div className="flex justify-between mb-1">
                <span>Progress:</span>
                <span>{Math.round(progress * 100)}%</span>
              </div>
              <Progress value={progress * 100} max={100} className="animate-pulse" />
            </div>
          )}
        </div>
      </CardContent>
      {/* Add handles on all four sides for more flexible connections */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        isConnectable={!data.placeholder}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
        isConnectable={!data.placeholder}
      />
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
        isConnectable={!data.placeholder}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
        isConnectable={!data.placeholder}
      />
    </Card>
  );
};

export default EquipmentNode;
