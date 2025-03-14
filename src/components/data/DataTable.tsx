import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { ProjectData } from '@/utils/dataUtils';
import { DATE_COLUMNS, isDateColumn } from '@/utils/dataUtils';
import TableCellContent from './TableCellContent';
import { useDebounce } from '@/hooks/useDebounce';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Columns } from 'lucide-react';
import { NumberRangeFilter } from './NumberRangeFilter';
import { DateFilterPopover } from './DateFilterPopover';

interface DataTableProps {
  data: ProjectData[];
  columns: ColumnDef<ProjectData>[];
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const debouncedGlobalFilter = useDebounce(globalFilter, 500);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<{ [columnId: string]: string[] }>({});
  const [numberRangeFilters, setNumberRangeFilters] = React.useState<{ [columnId: string]: { min: number; max: number } }>({});
  const [dateFilters, setDateFilters] = React.useState<{ [columnId: string]: { operator: string; value: Date | null; endValue?: Date | null } }>({});
  const [sorting, setSorting] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      globalFilter: debouncedGlobalFilter,
      columnVisibility,
      columnFilters,
      sorting,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          type="text"
          placeholder="Search all columns..."
          value={globalFilter ?? ""}
          onChange={e => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Columns className="h-4 w-4 mr-2" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-2">
            {table
              .getAllColumns()
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} className="w-[200px]">
                      {header.isSortable ? (
                        <Button
                          variant="ghost"
                          onClick={header.column.getToggleSortingHandler()}
                          className="h-8 data-[state=active]:bg-secondary"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getIsSorted() === "asc" ? (
                            <ArrowUp className="ml-2 h-4 w-4" />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ArrowDown className="ml-2 h-4 w-4" />
                          ) : null}
                        </Button>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                      {/* Render column-specific filter components */}
                      {header.column.columnDef.id && (
                        <>
                          {/* Number Range Filter */}
                          {typeof data[0][header.column.columnDef.id] === 'number' && (
                            <NumberRangeFilter
                              columnId={header.column.columnDef.id}
                              onRangeChange={(min, max) => {
                                setNumberRangeFilters(prev => ({
                                  ...prev,
                                  [header.column.columnDef.id]: { min, max },
                                }));
                              }}
                            />
                          )}
                          {/* Date Filter */}
                          {isDateColumn(header.column.columnDef.id) && (
                            <DateFilterPopover
                              columnId={header.column.columnDef.id}
                              onFilterChange={(operator, value, endValue) => {
                                setDateFilters(prev => ({
                                  ...prev,
                                  [header.column.columnDef.id]: { operator, value, endValue },
                                }));
                              }}
                            />
                          )}
                        </>
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    <TableCellContent 
                      value={cell.getValue()} 
                      column={cell.column.id} 
                      isDateColumn={isDateColumn(cell.column.id)}
                      row={row.original}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
