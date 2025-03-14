
import React from "react";
import { ExternalLink, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatInTimeZone } from "date-fns-tz";
import { parseISO, isValid } from "date-fns";

// Check if a value is a ClickUp task ID
const isClickUpTaskId = (value: string): boolean => {
  return typeof value === 'string' && value.startsWith('86d');
};

// Format date values with timezone
const formatDateValue = (value: any, column: string): string => {
  if (!value) return "";
  
  try {
    // Try to parse as ISO date
    const date = typeof value === 'string' ? parseISO(value) : new Date(value);
    if (isValid(date)) {
      // Format with timezone (CST = America/Chicago)
      if (typeof value === 'string' && value.includes('T')) {
        return formatInTimeZone(date, 'America/Chicago', 'MMM d, yyyy h:mm a zzz');
      } else {
        return formatInTimeZone(date, 'America/Chicago', 'MMM d, yyyy');
      }
    }
  } catch (e) {
    // If parsing fails, return original value
  }
  
  return String(value);
};

// Check if a column is a boolean field that should use special rendering
const isBooleanField = (column: string): boolean => {
  return ['auto_assign_override', 'aa_exclude'].includes(column);
};

// Check if a column is for auto-assign status
const isAutoAssignStatusField = (column: string): boolean => {
  return column === 'auto_assign_status';
};

// Check if a column is the time estimated minutes field
const isTimeEstimatedField = (column: string): boolean => {
  console.log('col: ',column)
  return column === 'time_estimated_mins';
};

// Get the badge color for auto-assign status value
const getAutoAssignStatusColor = (value: string): string => {
  switch (value?.toLowerCase()) {
    case 'complete':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'waiting':
      return 'bg-gray-100 text-gray-600 border-gray-200';
    case 'queued':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'error':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-blue-100 text-blue-800 border-blue-200';
  }
};

interface TableCellContentProps {
  value: any;
  column: string;
  isDateColumn: boolean;
}

const TableCellContent: React.FC<TableCellContentProps> = ({ value, column, isDateColumn }) => {
  // Handle null/undefined values - return empty span
  if (value === null || value === undefined) return <span></span>;

  // Handle time_estimated_mins as a number
  if (isTimeEstimatedField(column)) {
    return <span>{Number.isFinite(Number(value)) ? Number(value) : ""}</span>;
  }

  // Handle boolean fields for auto_assign_override and aa_exclude
  if (isBooleanField(column)) {
    if (value === true) {
      return <Check size={16} className="text-green-500" />;
    } else {
      return <span></span>; // Empty for false values
    }
  }

  // Handle auto-assign status with colored badges
  if (isAutoAssignStatusField(column)) {
    if (!value) return <span></span>;
    return (
      <Badge 
        variant="outline" 
        className={`${getAutoAssignStatusColor(value)} whitespace-nowrap`}
      >
        {String(value)}
      </Badge>
    );
  }

  // Handle date fields
  if (isDateColumn) {
    return <span>{formatDateValue(value, column)}</span>;
  }

  // Render account as badge with specific color
  if (column === 'account') {
    return <Badge variant="secondary" className="bg-purple-100 text-purple-800">{value}</Badge>;
  }

  // Render arrays as badge lists
  if (Array.isArray(value)) {
    return (
      <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar">
        {value.map((item, index) => {
          if (isClickUpTaskId(String(item))) {
            return (
              <a 
                key={index} 
                href={`https://app.clickup.com/t/${item}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block flex-shrink-0"
              >
                <Badge 
                  variant="outline" 
                  className="bg-blue-50 text-blue-800 border-blue-200 cursor-pointer hover:bg-blue-100 flex items-center gap-1 whitespace-nowrap inline-flex"
                >
                  <span className="truncate">{String(item).substring(0, 10)}</span>
                  <ExternalLink size={12} />
                </Badge>
              </a>
            );
          }
          return (
            <Badge 
              key={index} 
              variant="outline" 
              className="bg-blue-50 text-blue-800 border-blue-200 whitespace-nowrap flex-shrink-0"
            >
              {String(item)}
            </Badge>
          );
        })}
      </div>
    );
  }

  // Handle ClickUp task IDs
  if (isClickUpTaskId(String(value))) {
    return (
      <a 
        href={`https://app.clickup.com/t/${value}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-block"
      >
        <Badge 
          variant="outline" 
          className="bg-blue-50 text-blue-800 border-blue-200 cursor-pointer hover:bg-blue-100 flex items-center gap-1 whitespace-nowrap inline-flex w-fit"
        >
          <span className="truncate">{String(value).substring(0, 10)}</span>
          <ExternalLink size={12} />
        </Badge>
      </a>
    );
  }
  
  return <span>{String(value)}</span>;
};

export default TableCellContent;
