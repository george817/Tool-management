import { AlertTriangle, ArrowDownLeft, ArrowUpRight, Wrench } from 'lucide-react'
import { initials, timeAgo } from '../../utils/format'
import AssetCode from './AssetCode'
import LoadingSkeleton from './LoadingSkeleton'

const icons = {
  issue: { Icon: ArrowUpRight, color: 'text-emerald-300 bg-emerald-500/10' },
  return: { Icon: ArrowDownLeft, color: 'text-sky-300 bg-sky-500/10' },
  maintenance: { Icon: Wrench, color: 'text-orange-300 bg-orange-500/10' },
  overdue: { Icon: AlertTriangle, color: 'text-red-300 bg-red-500/10' },
}

export default function ActivityFeed({ items, loading = false, compact = false, live = false }) {
  if (loading) return <LoadingSkeleton rows={compact ? 4 : 6} />
  if (!items?.length) return <div className="rounded-lg border border-surface-600 bg-surface-800 p-5 text-sm text-ink-secondary">No activity found.</div>

  return (
    <div className="space-y-4">
      {live ? (
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-ink-secondary">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Live
          <span className="normal-case tracking-normal text-ink-muted">Polled every 30 seconds</span>
        </div>
      ) : null}
      {items.map((item) => {
        const config = icons[item.type] || icons.maintenance
        const Icon = config.Icon
        return (
          <div key={item.id} className="flex gap-3 border-b border-surface-600/70 pb-4 last:border-b-0 last:pb-0">
            {compact ? (
              <div className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md ${config.color}`}>
                <Icon size={16} />
              </div>
            ) : (
              <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-600 text-xs font-semibold text-ink-primary">
                {initials(item.user_name)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-ink-primary">
                <span className="font-medium">{item.user_name}</span> {item.action} <span className="text-ink-secondary">{item.asset_name}</span>
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                <AssetCode>{item.asset_code}</AssetCode>
                <span className="text-xs text-ink-muted">{timeAgo(item.created_at)}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

