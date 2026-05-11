import { useMemo } from 'react'
import { useTransactions } from '../../hooks/useTransactions'
import AssetCode from '../../components/common/AssetCode'
import DataTable from '../../components/common/DataTable'
import StatusBadge from '../../components/common/StatusBadge'
import { formatDate } from '../../utils/format'

export default function IssuedAssets() {
  const { transactions, loading } = useTransactions('issued')
  const columns = useMemo(() => [
    { key: 'asset_name', label: 'Asset Name', sortable: true, render: (asset) => <span className="font-medium text-ink-primary">{asset.asset_name}</span> },
    { key: 'asset_code', label: 'Code', sortable: true, render: (asset) => <AssetCode>{asset.asset_code}</AssetCode> },
    { key: 'asset_type', label: 'Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (asset) => <StatusBadge status={asset.status} /> },
    { key: 'issued_to', label: 'Issued To', sortable: true },
    { key: 'issued_date', label: 'Issued Date', sortable: true, render: (asset) => formatDate(asset.issued_date) },
    { key: 'due_date', label: 'Due Date', sortable: true, render: (asset) => formatDate(asset.due_date) },
  ], [])

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-ink-secondary">Current custody map</p>
        <h1 className="text-2xl font-semibold text-ink-primary">Issued Assets</h1>
      </div>
      <DataTable columns={columns} data={transactions} loading={loading} pageSize={15} />
    </div>
  )
}

