'use client'

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import columns, { EntityMap } from './columns'
import { Skeleton } from '../ui/skeleton'
import { useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'

interface BulkAction<E> {
  label: string
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  action: (selectedRows: E) => void
}

interface ReusableTableProps<E extends keyof typeof columns> {
  entity: E
  data?: EntityMap[E]
  onRowClick?: (row: EntityMap[E][number]) => void
  loading?: boolean
  bulkActions?: BulkAction<EntityMap[E]>[]
}

export function ReusableTable<E extends keyof typeof columns>({
  entity,
  data,
  onRowClick,
  loading,
  bulkActions
}: ReusableTableProps<E>) {
  const cols = columns[entity]
  const [rowSelection, setRowSelection] = useState({})
  const table = useReactTable({
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
    columns: [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false
      },
      // @ts-expect-error - This is a hack to get around the fact that the type of columns is not inferred correctly
      ...cols
    ],
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection
    }
  })

  const selectedRows = table.getFilteredSelectedRowModel().rows

  return (
    <div className="">
      {selectedRows.length > 0 && bulkActions && (
        <div className="bg-muted p-2 mb-2 flex items-center gap-2 justify-between">
          <span>{selectedRows.length} row(s) selected</span>
          {bulkActions?.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              // @ts-expect-error - This is a hack to get around the fact that the type of selectedRows is not inferred
              onClick={() => action.action(selectedRows.map((row) => row.original))}>
              {action.label}
            </Button>
          ))}
        </div>
      )}
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
          {loading ? (
            <TableBody>
              <TableRow>
                {cols.map((col) => (
                  <TableCell key={col.id}>
                    <Skeleton className="h-[20px] rounded-full" />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {cols.map((col) => (
                  <TableCell key={col.id}>
                    <Skeleton className="h-[20px] rounded-full" />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {cols.map((col) => (
                  <TableCell key={col.id}>
                    <Skeleton className="h-[20px] rounded-full" />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {cols.map((col) => (
                  <TableCell key={col.id}>
                    <Skeleton className="h-[20px] rounded-full" />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow className="cursor-pointer" key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className="py-3"
                        key={cell.id}
                        onClick={() => {
                          if (cell.column.id !== 'select' && onRowClick) {
                            onRowClick(row.original)
                          }
                        }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={table.getAllColumns().length} className="h-[20px] text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  )
}
