
import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Date filter operators
export const DATE_OPERATORS = [
  { value: 'eq', label: 'Equal to' },
  { value: 'neq', label: 'Not equal to' },
  { value: 'gt', label: 'After' },
  { value: 'lt', label: 'Before' },
  { value: 'gte', label: 'On or after' },
  { value: 'lte', label: 'On or before' },
  { value: 'between', label: 'Between' },
  { value: 'null', label: 'Is empty' },
  { value: 'notnull', label: 'Is not empty' }
];

// Define type for date filter
export type DateFilter = {
  operator: string;
  value?: Date;
  endValue?: Date;
};

interface DateFilterPopoverProps {
  column: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentFilter?: DateFilter;
  onApplyFilter: (column: string, filter: DateFilter) => void;
  onClearFilter: (column: string) => void;
}

const DateFilterPopover: React.FC<DateFilterPopoverProps> = ({
  column,
  isOpen,
  onOpenChange,
  currentFilter,
  onApplyFilter,
  onClearFilter
}) => {
  const dateFilterForm = useForm({
    defaultValues: {
      operator: currentFilter?.operator || "eq" as string,
      date: currentFilter?.value as Date | undefined,
      endDate: currentFilter?.endValue as Date | undefined
    }
  });

  const applyDateFilter = () => {
    const values = dateFilterForm.getValues();
    onApplyFilter(column, {
      operator: values.operator,
      value: values.date,
      endValue: values.operator === 'between' ? values.endDate : undefined
    });
    onOpenChange(false);
  };

  const clearFilter = () => {
    onClearFilter(column);
    onOpenChange(false);
  };

  // Render filter badge
  const renderDateFilterBadge = () => {
    if (!currentFilter) return null;
    
    const operator = DATE_OPERATORS.find(op => op.value === currentFilter.operator);
    let label = "";
    
    switch (currentFilter.operator) {
      case 'eq':
        label = currentFilter.value ? `= ${format(currentFilter.value, 'MMM d, yyyy')}` : '';
        break;
      case 'neq':
        label = currentFilter.value ? `≠ ${format(currentFilter.value, 'MMM d, yyyy')}` : '';
        break;
      case 'gt':
        label = currentFilter.value ? `> ${format(currentFilter.value, 'MMM d, yyyy')}` : '';
        break;
      case 'lt':
        label = currentFilter.value ? `< ${format(currentFilter.value, 'MMM d, yyyy')}` : '';
        break;
      case 'gte':
        label = currentFilter.value ? `≥ ${format(currentFilter.value, 'MMM d, yyyy')}` : '';
        break;
      case 'lte':
        label = currentFilter.value ? `≤ ${format(currentFilter.value, 'MMM d, yyyy')}` : '';
        break;
      case 'between':
        label = currentFilter.value && currentFilter.endValue 
          ? `${format(currentFilter.value, 'MMM d')} - ${format(currentFilter.endValue, 'MMM d, yyyy')}` 
          : '';
        break;
      case 'null':
        label = 'Is empty';
        break;
      case 'notnull':
        label = 'Not empty';
        break;
    }
    
    return (
      <Badge variant="secondary" className="mr-1 px-1 py-0 h-5">
        {label}
      </Badge>
    );
  };

  return (
    <>
      {renderDateFilterBadge()}
      <Popover open={isOpen} onOpenChange={onOpenChange}>
        <PopoverTrigger>
          <div className={`h-6 w-7 px-1 flex items-center justify-center rounded border ${currentFilter ? 'bg-blue-50 border-blue-200' : ''}`}>
            <CalendarIcon className="h-3 w-3" />
          </div>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-84 p-4">
          <Form {...dateFilterForm}>
            <div className="space-y-4">
              <FormField
                control={dateFilterForm.control}
                name="operator"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-xs font-medium">Filter type</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Select operator" />
                      </SelectTrigger>
                      <SelectContent>
                        {DATE_OPERATORS.map(op => (
                          <SelectItem key={op.value} value={op.value} className="text-xs">
                            {op.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              {dateFilterForm.watch('operator') !== 'null' && dateFilterForm.watch('operator') !== 'notnull' && (
                <FormField
                  control={dateFilterForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-xs font-medium">
                        {dateFilterForm.watch('operator') === 'between' ? 'Start date' : 'Date'}
                      </FormLabel>
                      <div>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          className="rounded-md border pointer-events-auto"
                        />
                      </div>
                    </FormItem>
                  )}
                />
              )}
              
              {dateFilterForm.watch('operator') === 'between' && (
                <FormField
                  control={dateFilterForm.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-xs font-medium">End date</FormLabel>
                      <div>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          className="rounded-md border pointer-events-auto"
                        />
                      </div>
                    </FormItem>
                  )}
                />
              )}
            </div>
            
            <div className="flex justify-between mt-4 gap-2">
              <Button variant="outline" size="sm" onClick={clearFilter} className="text-xs">
                Clear
              </Button>
              <Button type="button" size="sm" onClick={applyDateFilter} className="text-xs">
                Apply
              </Button>
            </div>
          </Form>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DateFilterPopover;
