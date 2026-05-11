import { useMemo, useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown, ChevronUp } from 'lucide-react'
import LoadingSkeleton from './LoadingSkeleton'
import { cx } from '../../utils/format'

export default function DataTable({ columns, data, loading = false, pageSize = 15, empty = 'No records found.' }) {
  const [sort, setSort] = useState({ key: columns.find((column) => column.sortable)?.key || columns[0]?.key, direction: 'asc' })
  const [page, setPage] = useState(1)

  const sorted = useMemo(() => {
    const next = [...(data || [])]
    if (!sort.key) return next
    return next.sort((a, b) => {
      const left = a[sort.key] ?? ''
      const right = b[sort.key] ?? ''
      if (left > right) return sort.direction === 'asc' ? 1 : -1
      if (left < right) return sort.direction === 'asc' ? -1 : 1
      return 0
    })
  }, [data, sort])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageData = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const toggleSort = (column) => {
    if (!column.sortable) return
    setPage(1)
    setSort((current) => ({
      key: column.key,
      direction: current.key === column.key && current.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  if (loading) return <LoadingSkeleton rows={6} />
  if (!data?.length) return <div className="rounded-lg border border-surface-600 bg-surface-800 p-5 text-sm text-ink-secondary">{empty}</div>

  return (
    <div className="overflow-hidden rounded-lg border border-surface-600 bg-surface-800">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-surface-600">
          <thead className="bg-surface-900/70">
            <tr>
              {columns.map((column) => {
                const active = sort.key === column.key
                const SortIcon = !column.sortable ? null : active ? (sort.direction === 'asc' ? ChevronUp : ChevronDown) : ChevronsUpDown
                return (
                  <th key={column.key} className={cx('whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-secondary', column.className)}>
                    <button type="button" onClick={() => toggleSort(column)} className={cx('inline-flex items-center gap-1', column.sortable && 'hover:text-ink-primary')} disabled={!column.sortable}>
                      {column.label}
                      {SortIcon ? <SortIcon size={13} /> : null}
                    </button>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-600/80">
            {pageData.map((row) => (
              <tr key={row.id || row.asset_code} className="hover:bg-surface-700/40">
                {columns.map((column) => (
                  <td key={column.key} className={cx('whitespace-nowrap px-4 py-3 text-sm text-ink-secondary', column.cellClassName)}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-surface-600 px-4 py-3 text-xs text-ink-secondary">
        <span>{sorted.length} records</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} className="grid h-8 w-8 place-items-center rounded-md border border-surface-600 text-ink-secondary hover:bg-surface-700 disabled:opacity-40" disabled={currentPage === 1} title="Previous page">
            <ChevronLeft size={16} />
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} className="grid h-8 w-8 place-items-center rounded-md border border-surface-600 text-ink-secondary hover:bg-surface-700 disabled:opacity-40" disabled={currentPage === totalPages} title="Next page">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
