'use client'

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import columns, { EntityMap } from './columns'

interface ReusableTableProps<E extends keyof typeof columns> {
  entity: E
  data: EntityMap[E]
  onRowClick?: (row: EntityMap[E][number]) => void
}

export function ReusableTable<E extends keyof typeof columns>({ entity, data, onRowClick }: ReusableTableProps<E>) {
  const cols = columns[entity]

  const table = useReactTable({
    data,
    // @ts-expect-error - This is a hack to get around the fact that the type of columns is not inferred correctly
    columns: cols,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="border-t">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="cursor-pointer"
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={() => {
                  if (onRowClick) {
                    onRowClick(row.original)
                  }
                }}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="py-3" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={cols.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
