
import React from "react";
import { Filter, X, Check } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface ColumnFilterPopoverProps {
  column: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  columnValues: string[];
  selectedValues: string[];
  onFilterChange: (column: string, value: string, checked: boolean) => void;
  onClearFilters: (column: string) => void;
}

const ColumnFilterPopover: React.FC<ColumnFilterPopoverProps> = ({
  column,
  isOpen,
  onOpenChange,
  columnValues,
  selectedValues,
  onFilterChange,
  onClearFilters
}) => {
  return (
    <>
      {selectedValues.length > 0 && (
        <Badge variant="secondary" className="mr-1 px-1 py-0 h-5">
          {selectedValues.length}
        </Badge>
      )}
      
      <Popover open={isOpen} onOpenChange={onOpenChange}>
        <PopoverTrigger>
          <div className={`h-6 w-7 px-1 flex items-center justify-center rounded border ${selectedValues.length ? 'bg-blue-50 border-blue-200' : ''}`}>
            <Filter className="h-3 w-3" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0" align="start">
          <Command>
            <CommandInput placeholder={`Search ${column}...`} />
            <div className="flex items-center px-2 pt-1">
              <div className="ml-auto flex gap-1">
                <button
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                  onClick={() => onClearFilters(column)}
                >
                  <X className="h-3 w-3" /> Clear
                </button>
              </div>
            </div>
            <CommandList className="p-2 max-h-52">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {columnValues.map(value => {
                  const isSelected = selectedValues.includes(value);
                  return (
                    <CommandItem
                      key={value}
                      onSelect={() => onFilterChange(column, value, !isSelected)}
                      className="flex items-center gap-2"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={checked => onFilterChange(column, value, !!checked)}
                        />
                        <span>{value}</span>
                      </div>
                      {isSelected && <Check className="h-4 w-4 text-blue-600" />}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ColumnFilterPopover;
