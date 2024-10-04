import { flexRender } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import columns from './columns'

export interface BulkAction<E> {
  label: string
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  action: (selectedRows: E) => void
}

interface TableHeaderProps<E extends keyof typeof columns> {
  bulkActions?: BulkAction<EntityMap[E]>[]
}

export function ReusableTableHeader({ ...props }: TableHeaderProps) {
  return (
    <TableHeader>
      {selectedRows.length > 0 && bulkActions && (
        <TableRow>
          <TableCell colSpan={table.getAllColumns().length}>
            <div className="flex items-center gap-2 justify-between">
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
          </TableCell>
        </TableRow>
      )}
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
  )
}
