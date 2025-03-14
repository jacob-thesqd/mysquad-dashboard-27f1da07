
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterX } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface NumberRangeFilterProps {
  columnId: string;
  onRangeChange: (min: number, max: number) => void;
}

export const NumberRangeFilter: React.FC<NumberRangeFilterProps> = ({ 
  columnId,
  onRangeChange 
}) => {
  const [minValue, setMinValue] = React.useState<string>('');
  const [maxValue, setMaxValue] = React.useState<string>('');
  const [isOpen, setIsOpen] = React.useState(false);

  const handleApply = () => {
    const min = minValue === '' ? Number.MIN_SAFE_INTEGER : Number(minValue);
    const max = maxValue === '' ? Number.MAX_SAFE_INTEGER : Number(maxValue);
    onRangeChange(min, max);
    setIsOpen(false);
  };

  const handleClear = () => {
    setMinValue('');
    setMaxValue('');
    onRangeChange(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-6 gap-1 text-xs px-2 w-7">
          <FilterX size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium mb-2">Filter by range</p>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Min"
                className="h-8 text-xs"
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
              />
              <span className="text-xs">to</span>
              <Input
                type="number"
                placeholder="Max"
                className="h-8 text-xs"
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={handleClear} className="text-xs">
              Clear
            </Button>
            <Button size="sm" onClick={handleApply} className="text-xs">
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
