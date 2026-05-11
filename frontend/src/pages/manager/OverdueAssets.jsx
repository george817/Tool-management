import { useMemo } from 'react'
import { useTransactions } from '../../hooks/useTransactions'
import AssetCode from '../../components/common/AssetCode'
import DataTable from '../../components/common/DataTable'
import { daysPast, formatDate } from '../../utils/format'

export default function OverdueAssets() {
  const { transactions, loading } = useTransactions('overdue')
  const columns = useMemo(() => [
    { key: 'asset_name', label: 'Asset Name', sortable: true, render: (asset) => <span className="font-medium text-ink-primary">{asset.asset_name}</span> },
    { key: 'asset_code', label: 'Code', sortable: true, render: (asset) => <AssetCode>{asset.asset_code}</AssetCode> },
    { key: 'issued_to', label: 'Issued To', sortable: true },
    { key: 'issued_department', label: 'Department', sortable: true },
    { key: 'issued_date', label: 'Issued Date', sortable: true, render: (asset) => formatDate(asset.issued_date) },
    { key: 'due_date', label: 'Days Overdue', sortable: true, render: (asset) => <span className="font-medium text-red-400">{daysPast(asset.due_date)} days</span> },
  ], [])

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-ink-secondary">Escalation queue</p>
        <h1 className="text-2xl font-semibold text-ink-primary">Overdue Assets</h1>
      </div>
      <DataTable columns={columns} data={transactions} loading={loading} pageSize={15} />
    </div>
  )
}

