
import React from "react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatInTimeZone } from "date-fns-tz";
import { parseISO, isValid } from "date-fns";

// Check if a value is a ClickUp task ID
const isClickUpTaskId = (value: string): boolean => {
  return typeof value === 'string' && value.startsWith('86d');
};

// Format date values with timezone
const formatDateValue = (value: any, column: string): string => {
  if (!value) return "—";
  
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

interface TableCellContentProps {
  value: any;
  column: string;
  isDateColumn: boolean;
}

const TableCellContent: React.FC<TableCellContentProps> = ({ value, column, isDateColumn }) => {
  if (value === null) return <span>—</span>;

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
