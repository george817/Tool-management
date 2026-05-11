import { cx } from '../../utils/format'

export default function KpiCard({ label, value, meta, tone = 'default', icon: Icon }) {
  const tones = {
    default: 'border-surface-600',
    emerald: 'border-emerald-500/35',
    amber: 'border-amber-500/35',
    red: 'border-red-500/40',
    blue: 'border-sky-500/35',
    orange: 'border-orange-500/35',
  }

  return (
    <div className={cx('min-w-40 rounded-lg border bg-surface-800 p-4', tones[tone])}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wider text-ink-secondary">{label}</p>
        {Icon ? <Icon size={16} className="text-ink-muted" /> : null}
      </div>
      <div className="mt-3 text-2xl font-semibold text-ink-primary">{value}</div>
      {meta ? <p className="mt-2 text-xs text-ink-secondary">{meta}</p> : null}
    </div>
  )
}

