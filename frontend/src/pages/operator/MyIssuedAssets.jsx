import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTransactions } from '../../hooks/useTransactions'
import AssetCode from '../../components/common/AssetCode'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import StatusBadge from '../../components/common/StatusBadge'
import { formatDate, timeAgo } from '../../utils/format'

export default function MyIssuedAssets() {
  const { user } = useAuth()
  const { transactions, loading } = useTransactions('mine', user?.id)

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-ink-secondary">Personal custody</p>
        <h1 className="text-2xl font-semibold text-ink-primary">My Issued Assets</h1>
      </div>
      {loading ? <LoadingSkeleton rows={5} /> : null}
      {!loading && !transactions.length ? <div className="rounded-lg border border-surface-600 bg-surface-800 p-5 text-sm text-ink-secondary">No assets currently issued to you.</div> : null}
      <div className="grid gap-3 lg:grid-cols-2">
        {transactions.map((asset) => (
          <div key={asset.id} className="rounded-lg border border-surface-600 bg-surface-800 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-ink-primary">{asset.asset_name}</p>
                <AssetCode>{asset.asset_code}</AssetCode>
              </div>
              <StatusBadge status={asset.status} />
            </div>
            <div className="mt-4 grid gap-2 text-sm text-ink-secondary sm:grid-cols-3">
              <span>Issued {timeAgo(asset.issued_date)}</span>
              <span>Due {formatDate(asset.due_date)}</span>
              <span>{asset.location}</span>
            </div>
            <Link to="/operator/return" className="mt-4 inline-flex h-9 items-center rounded-md bg-surface-700 px-3 text-sm font-medium text-ink-primary hover:bg-surface-600">
              Return Asset
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

