import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

export default function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <div className="h-[30vh] md:h-[40vh] relative overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-secondary">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            {/*<TableBody>*/}
            {/*  {table.getRowModel().rows?.length ? (*/}
            {/*    table.getRowModel().rows.map((row) => (*/}
            {/*      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>*/}
            {/*        {row.getVisibleCells().map((cell) => (*/}
            {/*          <TableCell key={cell.id} className="text-center">*/}
            {/*            {flexRender(cell.column.columnDef.cell, cell.getContext())}*/}
            {/*          </TableCell>*/}
            {/*        ))}*/}
            {/*      </TableRow>*/}
            {/*    ))*/}
            {/*  ) : (*/}
            {/*    <TableRow>*/}
            {/*      <TableCell colSpan={columns.length} className="h-24 text-center">*/}
            {/*        <TableSkeleton />*/}
            {/*      </TableCell>*/}
            {/*    </TableRow>*/}
            {/*  )}*/}
            {/*</TableBody>*/}
          </Table>
        </div>
      </div>
    </div>
  );
}
