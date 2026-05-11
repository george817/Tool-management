import { Eye } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useAssets } from '../../hooks/useAssets'
import AssetCode from '../../components/common/AssetCode'
import DataTable from '../../components/common/DataTable'
import SearchInput from '../../components/common/SearchInput'
import StatusBadge from '../../components/common/StatusBadge'

export default function SearchAssets() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [type, setType] = useState('all')
  const { assets, loading } = useAssets({ q: query, status, type })

  const columns = useMemo(() => [
    { key: 'asset_name', label: 'Asset Name', sortable: true, render: (asset) => <span className="font-medium text-ink-primary">{asset.asset_name}</span> },
    { key: 'asset_code', label: 'Code', sortable: true, render: (asset) => <AssetCode>{asset.asset_code}</AssetCode> },
    { key: 'asset_type', label: 'Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (asset) => <StatusBadge status={asset.status} /> },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'action', label: 'Action', render: () => <button type="button" className="grid h-8 w-8 place-items-center rounded-md text-ink-secondary hover:bg-surface-700 hover:text-ink-primary" title="View asset"><Eye size={16} /></button> },
  ], [])

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-ink-secondary">Inventory lookup</p>
        <h1 className="text-2xl font-semibold text-ink-primary">Search Assets</h1>
      </div>
      <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px]">
        <SearchInput value={query} onChange={setQuery} placeholder="Search by name, code, site, status..." />
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-12 rounded-lg border border-surface-500 bg-surface-700 px-3 text-sm text-ink-primary outline-none focus:border-emerald-600">
          <option value="all">All Statuses</option>
          <option value="available">Available</option>
          <option value="issued">Issued</option>
          <option value="overdue">Overdue</option>
          <option value="under_repair">Under Repair</option>
          <option value="operational">Operational</option>
        </select>
        <select value={type} onChange={(event) => setType(event.target.value)} className="h-12 rounded-lg border border-surface-500 bg-surface-700 px-3 text-sm text-ink-primary outline-none focus:border-emerald-600">
          <option value="all">All Types</option>
          <option value="Tool">Tool</option>
          <option value="Equipment">Equipment</option>
          <option value="Power">Power</option>
          <option value="Vehicle">Vehicle</option>
        </select>
      </div>
      <DataTable columns={columns} data={assets} loading={loading} pageSize={12} />
    </div>
  )
}

