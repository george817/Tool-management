import { cx, statusLabel } from '../../utils/format'

const variants = {
  available: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  operational: 'border-sky-500/30 bg-sky-500/10 text-sky-300',
  issued: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  overdue: 'border-red-500/35 bg-red-500/10 text-red-300',
  under_repair: 'border-orange-500/35 bg-orange-500/10 text-orange-300',
  good: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  fair: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  poor: 'border-red-500/35 bg-red-500/10 text-red-300',
  damaged: 'border-red-500/35 bg-red-500/10 text-red-300',
  ok: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  due_soon: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
}

export default function StatusBadge({ status, className = '' }) {
  return (
    <span className={cx('inline-flex h-6 items-center rounded-md border px-2 text-[11px] font-semibold uppercase tracking-wide', variants[status] || 'border-surface-500 bg-surface-700 text-ink-secondary', className)}>
      {statusLabel(status)}
    </span>
  )
}

