
import React, { useEffect, useRef } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useVirtualizer } from '@tanstack/react-virtual';
import TableCellContent from "./TableCellContent";
import ColumnFilterPopover from "./ColumnFilterPopover";
import { DateFilter } from "./DateFilterPopover";
import DateFilterPopover from "./DateFilterPopover";

// Helper to format column names
const formatColumnName = (name: string): string => {
  return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Get the width class for a column
const getColumnWidthClass = (column: string): string => {
  if (['products', 'active_task_ids'].includes(column)) {
    return 'w-[250px] max-w-[250px]';
  }
  if (['church'].includes(column)) {
    return 'w-[300px] max-w-[300px]';
  }
  return 'min-w-[180px]';
};

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
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Calculate approximate row height
  const estimatedRowHeight = 48; // Adjust based on your actual row height

  // Set up virtualizer for table rows
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => estimatedRowHeight,
    overscan: 20 // Increased from 10 to 20 to show more rows
  });

  // Get virtualized rows
  const virtualRows = rowVirtualizer.getVirtualItems();

  // Calculate total height of all rows
  const totalHeight = data.length * estimatedRowHeight;

  // Log virtualization details
  useEffect(() => {
    console.log(`Virtualizing ${data.length} rows, showing ${virtualRows.length} virtual rows`);
  }, [data.length, virtualRows.length]);

  // When the data changes or columns change, scroll back to top
  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0;
    }
  }, [data, columns]);

  return <div ref={tableContainerRef} className="flex-1 border rounded-md overflow-hidden my-0">
    
        <div className="min-w-full">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                {columns.map(column => <TableHead key={column} className={`relative ${getColumnWidthClass(column)}`}>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleSort(column)} className="flex items-center gap-1 hover:text-primary">
                        {formatColumnName(column)}
                        {sortColumn === column && (sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                      </button>
                      <div className="ml-auto flex items-center">
                        {dateColumns.includes(column) ? <DateFilterPopover column={column} isOpen={dateFilterPopoverOpen[column] || false} onOpenChange={open => setDateFilterPopoverOpen({
                      ...dateFilterPopoverOpen,
                      [column]: open
                    })} currentFilter={dateFilters[column]} onApplyFilter={applyDateFilter} onClearFilter={clearDateFilter} /> : <ColumnFilterPopover column={formatColumnName(column)} isOpen={filterPopoverOpen[column] || false} onOpenChange={open => setFilterPopoverOpen({
                      ...filterPopoverOpen,
                      [column]: open
                    })} columnValues={getUniqueColumnValues(column)} selectedValues={selectedFilters[column] || []} onFilterChange={handleFilterSelectionChange} onClearFilters={clearColumnFilters} />}
                      </div>
                    </div>
                  </TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-8">
                    Loading data...
                  </TableCell>
                </TableRow> : error ? <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-8 text-red-500">
                    Error loading data: {(error as Error).message}
                  </TableCell>
                </TableRow> : data.length === 0 ? <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-8">
                    No projects found
                  </TableCell>
                </TableRow> : <>
                  {/* Spacer row at the top */}
                  {virtualRows.length > 0 && <tr>
                      <td style={{
                  height: `${virtualRows[0].start}px`
                }} />
                    </tr>}
                  
                  {/* Virtual rows */}
                  {virtualRows.map(virtualRow => {
                const project = data[virtualRow.index];
                return <TableRow key={virtualRow.key} data-index={virtualRow.index} ref={rowVirtualizer.measureElement}>
                        {columns.map(column => <TableCell key={`${virtualRow.index}-${column}`} className={getColumnWidthClass(column)}>
                            <div className="overflow-x-auto hide-scrollbar">
                              <TableCellContent value={project[column]} column={column} isDateColumn={dateColumns.includes(column)} rowData={project} />
                            </div>
                          </TableCell>)}
                      </TableRow>;
              })}
                  
                  {/* Spacer row at the bottom */}
                  {virtualRows.length > 0 && <tr>
                      <td style={{
                  height: `${Math.max(0, totalHeight - (virtualRows[virtualRows.length - 1]?.end || 0))}px`
                }} />
                    </tr>}
                </>}
            </TableBody>
          </Table>
        </div>
      
    </div>;
};

export default DataTable;

    //<ScrollArea className="h-full"></ScrollArea>
