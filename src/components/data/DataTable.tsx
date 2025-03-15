
import React, { useState, useEffect } from "react";
import VirtualizedTable from "./VirtualizedTable";
import { DateFilter } from "./DateFilterPopover";

// Default column width
const DEFAULT_COLUMN_WIDTH = 180;

interface DataTableProps {
  data: any[];
  columns: string[];
  dateColumns: string[];
  arrayColumns: string[];
  isLoading: boolean;
  error: any;
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  selectedFilters: Record<string, string[]>;
  dateFilters: Record<string, DateFilter>;
  filterPopoverOpen: Record<string, boolean>;
  dateFilterPopoverOpen: Record<string, boolean>;
  handleSort: (column: string) => void;
  getUniqueColumnValues: (column: string) => string[];
  handleFilterSelectionChange: (column: string, value: string, checked: boolean) => void;
  clearColumnFilters: (column: string) => void;
  setFilterPopoverOpen: (value: Record<string, boolean>) => void;
  setDateFilterPopoverOpen: (value: Record<string, boolean>) => void;
  applyDateFilter: (column: string, filter: DateFilter) => void;
  clearDateFilter: (column: string) => void;
}

const DataTable: React.FC<DataTableProps> = (props) => {
  // State for column widths
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  
  // State for column order
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  
  console.log("DataTable received data:", props.data?.length || 0, "items");
  console.log("DataTable received columns:", props.columns?.length || 0, "columns");
  
  // Initialize column order and widths when columns change
  useEffect(() => {
    if (props.columns && props.columns.length > 0 && columnOrder.length === 0) {
      console.log("Initializing column order with:", props.columns);
      setColumnOrder([...props.columns]);
      
      const initialWidths: Record<string, number> = {};
      props.columns.forEach(column => {
        if (['products', 'active_task_ids'].includes(column)) {
          initialWidths[column] = 250;
        } else if (['church'].includes(column)) {
          initialWidths[column] = 300;
        } else {
          initialWidths[column] = DEFAULT_COLUMN_WIDTH;
        }
      });
      setColumnWidths(initialWidths);
    }
  }, [props.columns, columnOrder.length]);

  // Add debug logging for render
  useEffect(() => {
    console.log("Data to render:", props.data?.length || 0, "items");
    if (props.data && props.data.length > 0) {
      console.log("First row sample:", props.data[0]);
    }
  }, [props.data]);

  const handleColumnResize = (column: string, width: number) => {
    setColumnWidths(prev => ({
      ...prev,
      [column]: width
    }));
  };

  const handleColumnReorder = (newOrder: string[]) => {
    console.log("New column order:", newOrder);
    setColumnOrder(newOrder);
  };

  return (
    <VirtualizedTable
      {...props}
      columnWidths={columnWidths}
      columnOrder={columnOrder.length > 0 ? columnOrder : props.columns}
      onColumnResize={handleColumnResize}
      onColumnReorder={handleColumnReorder}
    />
  );
};

export default DataTable;
