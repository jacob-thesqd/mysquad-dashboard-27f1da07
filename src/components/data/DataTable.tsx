
import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import TableCellContent from "./TableCellContent";
import ColumnFilterPopover from "./ColumnFilterPopover";
import DateFilterPopover from "./DateFilterPopover";
import { DateFilter } from "./DateFilterPopover";

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
  projects: any[];
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
  projects,
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
  return (
    <div className="flex-1 border rounded-md overflow-hidden mb-2">
      <ScrollArea className="h-full" orientation="both">
        <div className="min-w-full">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                {columns.map(column => (
                  <TableHead key={column} className={`relative ${getColumnWidthClass(column)}`}>
                    <div className="flex items-center gap-2">
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
              ) : projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-8">
                    No projects found
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project, index) => (
                  <TableRow key={index}>
                    {columns.map(column => (
                      <TableCell key={`${index}-${column}`} className={getColumnWidthClass(column)}>
                        <div className="overflow-x-auto hide-scrollbar">
                          <TableCellContent 
                            value={project[column]} 
                            column={column}
                            isDateColumn={dateColumns.includes(column)}
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
