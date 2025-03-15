
import React, { useState, useRef, useEffect } from "react";
import { ArrowUp, ArrowDown, GripVertical } from "lucide-react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import TableCellContent from "./TableCellContent";
import ColumnFilterPopover from "./ColumnFilterPopover";
import { DateFilter } from "./DateFilterPopover";
import DateFilterPopover from "./DateFilterPopover";
import { cn } from "@/lib/utils";

// Helper to format column names
const formatColumnName = (name: string): string => {
  return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

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

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  dateColumns,
  arrayColumns,
  isLoading,
  error,
  sortColumn,
  sortDirection,
  selectedFilters,
  dateFilters,
  filterPopoverOpen,
  dateFilterPopoverOpen,
  handleSort,
  getUniqueColumnValues,
  handleFilterSelectionChange,
  clearColumnFilters,
  setFilterPopoverOpen,
  setDateFilterPopoverOpen,
  applyDateFilter,
  clearDateFilter
}) => {
  // State for column widths
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  
  // State for column order
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  
  // Initialize column order and widths when columns change
  useEffect(() => {
    if (columns.length > 0 && columnOrder.length === 0) {
      setColumnOrder([...columns]);
      
      const initialWidths: Record<string, number> = {};
      columns.forEach(column => {
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
  }, [columns, columnOrder.length]);

  // For drag and drop column reordering
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  
  // For column resizing
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const tableRef = useRef<HTMLTableElement>(null);

  // Handle column resize start
  const handleResizeStart = (e: React.MouseEvent, column: string) => {
    e.preventDefault();
    e.stopPropagation();
    setResizingColumn(column);
    setStartX(e.clientX);
    setStartWidth(columnWidths[column] || DEFAULT_COLUMN_WIDTH);
    
    // Add global event listeners
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  // Handle column resize move
  const handleResizeMove = (e: MouseEvent) => {
    if (resizingColumn) {
      const diff = e.clientX - startX;
      const newWidth = Math.max(100, startWidth + diff); // Minimum width of 100px
      
      setColumnWidths(prev => ({
        ...prev,
        [resizingColumn]: newWidth
      }));
    }
  };

  // Handle column resize end
  const handleResizeEnd = () => {
    setResizingColumn(null);
    
    // Remove global event listeners
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };
  
  // Handle drag start
  const handleDragStart = (e: React.DragEvent, column: string) => {
    setDraggedColumn(column);
    e.dataTransfer.effectAllowed = 'move';
    // Use a transparent image as drag ghost
    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);
  };
  
  // Handle drag over
  const handleDragOver = (e: React.DragEvent, column: string) => {
    e.preventDefault();
    if (draggedColumn && draggedColumn !== column) {
      setDragOverColumn(column);
    }
  };
  
  // Handle drop
  const handleDrop = (e: React.DragEvent, targetColumn: string) => {
    e.preventDefault();
    if (draggedColumn && draggedColumn !== targetColumn) {
      const newOrder = [...columnOrder];
      const draggedIdx = newOrder.indexOf(draggedColumn);
      const targetIdx = newOrder.indexOf(targetColumn);
      
      // Remove the dragged column
      newOrder.splice(draggedIdx, 1);
      // Insert at the target position
      newOrder.splice(targetIdx, 0, draggedColumn);
      
      setColumnOrder(newOrder);
    }
    setDraggedColumn(null);
    setDragOverColumn(null);
  };
  
  // Handle drag end
  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  // Get ordered columns
  const orderedColumns = columnOrder.length > 0 ? columnOrder : columns;

  return (
    <div className="flex-1 border rounded-md overflow-hidden mb-2">
      <ScrollArea className="h-full" orientation="both">
        <div className="min-w-full">
          <Table ref={tableRef}>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                {orderedColumns.map(column => (
                  <TableHead 
                    key={column} 
                    className={cn(
                      "relative select-none group",
                      draggedColumn === column ? "opacity-50" : "",
                      dragOverColumn === column ? "bg-muted" : ""
                    )}
                    style={{ 
                      width: `${columnWidths[column] || DEFAULT_COLUMN_WIDTH}px`, 
                      minWidth: `${columnWidths[column] || DEFAULT_COLUMN_WIDTH}px`,
                      maxWidth: `${columnWidths[column] || DEFAULT_COLUMN_WIDTH}px`,
                    }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, column)}
                    onDragOver={(e) => handleDragOver(e, column)}
                    onDrop={(e) => handleDrop(e, column)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="flex items-center gap-2">
                      <div className="cursor-move pr-2" onMouseDown={(e) => e.stopPropagation()}>
                        <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
                      </div>
                      <button 
                        onClick={() => handleSort(column)} 
                        className="flex items-center gap-1 hover:text-primary"
                      >
                        {formatColumnName(column)}
                        {sortColumn === column && (
                          sortDirection === "asc" 
                            ? <ArrowUp className="h-3 w-3" /> 
                            : <ArrowDown className="h-3 w-3" />
                        )}
                      </button>
                      <div className="ml-auto flex items-center">
                        {dateColumns.includes(column) ? (
                          <DateFilterPopover
                            column={column}
                            isOpen={dateFilterPopoverOpen[column] || false}
                            onOpenChange={(open) => 
                              setDateFilterPopoverOpen({...dateFilterPopoverOpen, [column]: open})
                            }
                            currentFilter={dateFilters[column]}
                            onApplyFilter={applyDateFilter}
                            onClearFilter={clearDateFilter}
                          />
                        ) : (
                          <ColumnFilterPopover 
                            column={formatColumnName(column)}
                            isOpen={filterPopoverOpen[column] || false}
                            onOpenChange={(open) => 
                              setFilterPopoverOpen({...filterPopoverOpen, [column]: open})
                            }
                            columnValues={getUniqueColumnValues(column)}
                            selectedValues={selectedFilters[column] || []}
                            onFilterChange={handleFilterSelectionChange}
                            onClearFilters={clearColumnFilters}
                          />
                        )}
                      </div>
                    </div>
                    {/* Column resize handle */}
                    <div 
                      className="absolute right-0 top-0 h-full w-2 cursor-col-resize group-hover:bg-primary/20"
                      onMouseDown={(e) => handleResizeStart(e, column)}
                    />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-8">
                    Loading data...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-8 text-red-500">
                    Error loading data: {(error as Error).message}
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-8">
                    No projects found
                  </TableCell>
                </TableRow>
              ) : (
                data.map((project, index) => (
                  <TableRow key={index}>
                    {orderedColumns.map(column => (
                      <TableCell 
                        key={`${index}-${column}`} 
                        style={{ 
                          width: `${columnWidths[column] || DEFAULT_COLUMN_WIDTH}px`,
                          minWidth: `${columnWidths[column] || DEFAULT_COLUMN_WIDTH}px`,
                          maxWidth: `${columnWidths[column] || DEFAULT_COLUMN_WIDTH}px`
                        }}
                      >
                        <div className="overflow-x-auto hide-scrollbar">
                          <TableCellContent 
                            value={project[column]}
                            column={column}
                            isDateColumn={dateColumns.includes(column)}
                            rowData={project}  
                          />
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default DataTable;
