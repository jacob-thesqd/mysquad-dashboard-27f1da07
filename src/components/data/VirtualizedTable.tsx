
import React, { useCallback, useRef, useState, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
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

interface VirtualizedTableProps {
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
  columnWidths: Record<string, number>;
  columnOrder: string[];
  onColumnResize: (column: string, width: number) => void;
  onColumnReorder: (newOrder: string[]) => void;
}

const VirtualizedTable: React.FC<VirtualizedTableProps> = ({
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
  clearDateFilter,
  columnWidths,
  columnOrder,
  onColumnResize,
  onColumnReorder
}) => {
  // For drag and drop column reordering
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  
  // For column resizing
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const tableRef = useRef<HTMLTableElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  // Debug data on mount and changes
  useEffect(() => {
    console.log("VirtualizedTable data:", data?.length || 0, "items");
    console.log("VirtualizedTable columns:", columns?.length || 0, "columns");
    console.log("VirtualizedTable isLoading:", isLoading);
    console.log("VirtualizedTable error:", error);
    if (data && data.length > 0) {
      console.log("First row:", data[0]);
    }
  }, [data, columns, isLoading, error]);

  // Get ordered columns - make sure we have a valid array
  const orderedColumns = Array.isArray(columnOrder) && columnOrder.length > 0 
    ? columnOrder 
    : Array.isArray(columns) ? columns : [];

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
      
      onColumnResize(resizingColumn, newWidth);
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
      const newOrder = [...(Array.isArray(columnOrder) ? columnOrder : columns)];
      const draggedIdx = newOrder.indexOf(draggedColumn);
      const targetIdx = newOrder.indexOf(targetColumn);
      
      if (draggedIdx !== -1 && targetIdx !== -1) {
        // Remove the dragged column
        newOrder.splice(draggedIdx, 1);
        // Insert at the target position
        newOrder.splice(targetIdx, 0, draggedColumn);
        
        onColumnReorder(newOrder);
      }
    }
    setDraggedColumn(null);
    setDragOverColumn(null);
  };
  
  // Handle drag end
  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  // Table virtualization - only create virtualizer if we have data
  const rowVirtualizer = useVirtualizer({
    count: isLoading || error ? 1 : ((data && data.length) || 1),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40, // row height estimate
    overscan: 5,
  });

  // For loading state
  if (isLoading) {
    return (
      <div ref={parentRef} className="flex-1 border rounded-md overflow-hidden mb-2">
        <ScrollArea className="h-full" orientation="both">
          <div className="min-w-full">
            <Table ref={tableRef}>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  {Array.isArray(orderedColumns) && orderedColumns.map(column => (
                    <TableHead 
                      key={column} 
                      className="relative select-none group"
                      style={{ 
                        width: `${columnWidths[column] || DEFAULT_COLUMN_WIDTH}px`, 
                        minWidth: `${columnWidths[column] || DEFAULT_COLUMN_WIDTH}px`,
                        maxWidth: `${columnWidths[column] || DEFAULT_COLUMN_WIDTH}px`,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {formatColumnName(column)}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={orderedColumns.length || 1} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                      <p>Loading data...</p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </div>
    );
  }

  // For error state
  if (error) {
    return (
      <div ref={parentRef} className="flex-1 border rounded-md overflow-hidden mb-2">
        <ScrollArea className="h-full" orientation="both">
          <div className="min-w-full">
            <Table ref={tableRef}>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  {Array.isArray(orderedColumns) && orderedColumns.map(column => (
                    <TableHead 
                      key={column} 
                      className="relative select-none group"
                      style={{ 
                        width: `${columnWidths[column] || DEFAULT_COLUMN_WIDTH}px`, 
                        minWidth: `${columnWidths[column] || DEFAULT_COLUMN_WIDTH}px`,
                        maxWidth: `${columnWidths[column] || DEFAULT_COLUMN_WIDTH}px`,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {formatColumnName(column)}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={orderedColumns.length || 1} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center p-8 text-red-500">
                      <p>Error loading data: {(error as Error).message || JSON.stringify(error)}</p>
                      <p className="mt-2 text-sm text-muted-foreground">Please try refreshing the page.</p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </div>
    );
  }

  // For empty data state (after loading is complete)
  if (!data || data.length === 0) {
    return (
      <div ref={parentRef} className="flex-1 border rounded-md overflow-hidden mb-2">
        <ScrollArea className="h-full" orientation="both">
          <div className="min-w-full">
            <Table ref={tableRef}>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  {Array.isArray(orderedColumns) && orderedColumns.map(column => (
                    <TableHead 
                      key={column} 
                      className="relative select-none group"
                      style={{ 
                        width: `${columnWidths[column] || DEFAULT_COLUMN_WIDTH}px`, 
                        minWidth: `${columnWidths[column] || DEFAULT_COLUMN_WIDTH}px`,
                        maxWidth: `${columnWidths[column] || DEFAULT_COLUMN_WIDTH}px`,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {formatColumnName(column)}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={orderedColumns.length || 1} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center p-8">
                      <p>No projects found</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Try changing your filters or refreshing the data.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </div>
    );
  }

  console.log("Data to render:", data.length, "items");
  console.log("First row sample:", data[0]);

  // We have data to display
  return (
    <div ref={parentRef} className="flex-1 border rounded-md overflow-hidden mb-2 h-full">
      <ScrollArea className="h-full" orientation="both">
        <div 
          className="min-w-full"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative'
          }}
        >
          <Table ref={tableRef}>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                {Array.isArray(orderedColumns) && orderedColumns.map(column => (
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
              {rowVirtualizer.getVirtualItems().map(virtualRow => {
                const rowIndex = virtualRow.index;
                const project = data[rowIndex];
                
                if (!project) {
                  console.warn(`No project found at index ${rowIndex}`);
                  return null;
                }
                
                return (
                  <TableRow 
                    key={rowIndex}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    {Array.isArray(orderedColumns) && orderedColumns.map(column => (
                      <TableCell 
                        key={`${rowIndex}-${column}`} 
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
                );
              })}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default VirtualizedTable;
