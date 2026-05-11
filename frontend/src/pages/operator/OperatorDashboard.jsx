import { ArrowDownLeft, ArrowUpRight, Boxes, Clock, PackageCheck, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useActivity } from '../../hooks/useActivity'
import { useAssets } from '../../hooks/useAssets'
import { useTransactions } from '../../hooks/useTransactions'
import ActivityFeed from '../../components/common/ActivityFeed'
import AssetCode from '../../components/common/AssetCode'
import KpiCard from '../../components/common/KpiCard'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import { timeAgo } from '../../utils/format'

export default function OperatorDashboard() {
  const { user } = useAuth()
  const { assets, loading } = useAssets()
  const { transactions: myIssued, loading: issuedLoading } = useTransactions('mine', user?.id)
  const { activity, loading: activityLoading } = useActivity(8)

  const stats = {
    total: assets.length,
    available: assets.filter((asset) => asset.status === 'available').length,
    issued: assets.filter((asset) => asset.status === 'issued').length,
    overdue: assets.filter((asset) => asset.status === 'overdue').length,
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-ink-secondary">Tool room operations</p>
        <h1 className="text-2xl font-semibold text-ink-primary">Operator Dashboard</h1>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        <KpiCard label="Total" value={loading ? '-' : stats.total} icon={Boxes} />
        <KpiCard label="Available" value={loading ? '-' : stats.available} tone="emerald" icon={PackageCheck} />
        <KpiCard label="Issued" value={loading ? '-' : stats.issued} tone="amber" icon={Clock} />
        <KpiCard label="Overdue" value={loading ? '-' : stats.overdue} tone="red" icon={TriangleAlert} />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Link to="/operator/issue" className="flex h-16 items-center justify-center gap-3 rounded-lg bg-emerald-700 font-semibold text-white transition-colors hover:bg-emerald-600">
          <ArrowUpRight size={22} />
          Issue Asset
        </Link>
        <Link to="/operator/return" className="flex h-16 items-center justify-center gap-3 rounded-lg border border-surface-500 bg-surface-700 font-semibold text-ink-primary transition-colors hover:bg-surface-600">
          <ArrowDownLeft size={22} />
          Return Asset
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium uppercase tracking-wider text-ink-secondary">My Active Issues</h2>
            <Link to="/operator/my-issued" className="text-xs font-medium text-emerald-300 hover:text-emerald-200">View all</Link>
          </div>
          {issuedLoading ? <LoadingSkeleton rows={4} /> : null}
          {!issuedLoading && !myIssued.length ? <p className="text-sm text-ink-secondary">No active assets issued to you.</p> : null}
          <div className="space-y-3">
            {myIssued.slice(0, 5).map((asset) => (
              <div key={asset.id} className="flex flex-col gap-3 rounded-lg border border-surface-600 bg-surface-900 p-4 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink-primary">{asset.asset_name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <AssetCode>{asset.asset_code}</AssetCode>
                    <span className="text-xs text-ink-muted">Issued {timeAgo(asset.issued_date)}</span>
                  </div>
                </div>
                <Link to="/operator/return" className="inline-flex h-9 items-center justify-center rounded-md border border-surface-500 px-3 text-sm font-medium text-ink-primary hover:bg-surface-700">
                  Return
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-ink-secondary">Recent Activity</h2>
          <ActivityFeed items={activity} loading={activityLoading} />
        </section>
      </div>
    </div>
  )
}

