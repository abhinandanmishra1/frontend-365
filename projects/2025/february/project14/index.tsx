import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData extends Record<string, any>> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  onSave?: (data: TData[]) => void;
  searchableColumns?: string[];
  filterableColumns?: {
    id: string;
    options: { label: string; value: string }[];
  }[];
}

const DataTable = <TData extends Record<string, any>>({
  columns,
  data,
  onSave,
  searchableColumns = [],
  filterableColumns = [],
}: DataTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [tableData, setTableData] = useState<TData[]>(data);
  const [editable, setEditable] = useState<Record<number, boolean>>({});
  const [focusedCell, setFocusedCell] = useState<string | null>(null);

  const updateData = (rowIndex: number, columnId: string, value: string) => {
    setFocusedCell(`${rowIndex}_${columnId}`);
    setTableData((oldData) =>
      oldData.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row
      )
    );
  };

  const handleSave = (rowIndex: number) => {
    onSave?.(tableData);
    setEditable((prev) => ({ ...prev, [rowIndex]: false }));
  };

  const handleEditRow = (rowIndex: number, cellId: string) => {
    setEditable((prev) => ({ ...prev, [rowIndex]: !prev[rowIndex] }));
    setFocusedCell(cellId);
  };

  const enhancedColumns = useMemo(
    () =>
      columns.map((col) => ({
        ...col,
        cell: ({ row, column, getValue }: any) => {
          return editable[row.index] ? (
            <Input
              type="text"
              autoFocus={focusedCell === `${row.index}_${column.id}`}
              value={getValue() as string}
              onChange={(e) => updateData(row.index, column.id, e.target.value)}
              className="h-8 w-full"
            />
          ) : (
            <span>{getValue() as string}</span>
          );
        },
      })),
    [columns, editable, focusedCell]
  );

  const table = useReactTable({
    data: tableData,
    columns: enhancedColumns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    enableSorting: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Advanced Data Table</span>
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search all columns..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-4">
          {filterableColumns.map(({ id, options }) => (
            <div key={id} className="flex items-center space-x-2">
              <Select
                value={(table.getColumn(id)?.getFilterValue() as string) ?? ''}
                onValueChange={(value) => {
                  table.getColumn(id)?.setFilterValue(value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={`Filter ${id}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Show all</SelectItem>
                  {options.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? 'cursor-pointer select-none flex items-center space-x-1'
                              : ''
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <span className="ml-1">
                              {{
                                asc: <ChevronUp className="h-4 w-4" />,
                                desc: <ChevronDown className="h-4 w-4" />,
                              }[header.column.getIsSorted() as string] ?? (
                                <ChevronDown className="h-4 w-4 opacity-0 group-hover:opacity-100" />
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </TableHead>
                  ))}
                  <TableHead>Actions</TableHead>
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex justify-end space-x-2">
                      <Button
                        onClick={() => {
                          handleEditRow(row.index, row.getVisibleCells()[0].id);
                        }}
                        variant="outline"
                        size="sm"
                      >
                        {editable[row.index] ? "Cancel" : "Edit"}
                      </Button>
                      {editable[row.index] && (
                        <Button
                          onClick={() => handleSave(row.index)}
                          size="sm"
                        >
                          Save
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Project45() {
  const columns: ColumnDef<any, any>[] = [
    { 
      accessorKey: "name",
      header: "Name",
      enableSorting: true,
    },
    { 
      accessorKey: "role",
      header: "Role",
      enableSorting: true,
    },
    { 
      accessorKey: "department",
      header: "Department",
      enableSorting: true,
    },
    { 
      accessorKey: "status",
      header: "Status",
      enableSorting: true,
    },
    { 
      accessorKey: "experience",
      header: "Experience (Years)",
      enableSorting: true,
    }
  ];

  const data = [
    {
      name: "John Doe",
      role: "Senior Developer",
      department: "Engineering",
      status: "Active",
      experience: "8"
    },
    {
      name: "Jane Smith",
      role: "Product Manager",
      department: "Product",
      status: "On Leave",
      experience: "5"
    },
    {
      name: "Mike Johnson",
      role: "Designer",
      department: "Design",
      status: "Active",
      experience: "3"
    },
    {
      name: "Sarah Williams",
      role: "Team Lead",
      department: "Engineering",
      status: "Active",
      experience: "10"
    }
  ];

  const filterableColumns = [
    {
      id: "status",
      options: [
        { label: "Active", value: "Active" },
        { label: "On Leave", value: "On Leave" }
      ]
    },
    {
      id: "department",
      options: [
        { label: "Engineering", value: "Engineering" },
        { label: "Product", value: "Product" },
        { label: "Design", value: "Design" }
      ]
    }
  ];

  const handleSave = (updatedData: any[]) => {
    console.log("Saved Data:", updatedData);
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        onSave={handleSave}
        filterableColumns={filterableColumns}
        searchableColumns={["name", "role"]}
      />
    </div>
  );
}