import { useEffect, useMemo, useState } from 'react'
import { Boxes, Eye, MoreHorizontal, Pencil, Phone, TriangleAlert, Wrench } from 'lucide-react'
import { useActivity } from '../../hooks/useActivity'
import { useAnalytics } from '../../hooks/useAnalytics'
import { useAssets } from '../../hooks/useAssets'
import { analyticsService } from '../../services/analytics.service'
import { getUserById } from '../../data/mockUsers'
import ActivityFeed from '../../components/common/ActivityFeed'
import AssetCode from '../../components/common/AssetCode'
import ConfirmModal from '../../components/common/ConfirmModal'
import DataTable from '../../components/common/DataTable'
import KpiCard from '../../components/common/KpiCard'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import SearchInput from '../../components/common/SearchInput'
import StatusBadge from '../../components/common/StatusBadge'
import { daysPast, formatDate } from '../../utils/format'
import { getMaintenanceStatus } from '../../data/mockMaintenance'

export default function ManagerDashboard() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [contactAsset, setContactAsset] = useState(null)
  const [maintenance, setMaintenance] = useState([])
  const { data: stats, loading: statsLoading } = useAnalytics('stats')
  const { assets, loading: assetsLoading } = useAssets({ q: query, status })
  const { activity, loading: activityLoading } = useActivity(9, 30000)

  useEffect(() => {
    let active = true
    analyticsService.getMaintenance().then((response) => {
      if (active && response.success) setMaintenance(response.data.slice(0, 5))
    })
    return () => {
      active = false
    }
  }, [])

  const overdue = assets.filter((asset) => asset.status === 'overdue')
  const contact = contactAsset ? getUserById(contactAsset.issued_to_id) : null

  const columns = useMemo(() => [
    { key: 'asset_name', label: 'Asset Name', sortable: true, render: (asset) => <span className="font-medium text-ink-primary">{asset.asset_name}</span> },
    { key: 'asset_code', label: 'Code', sortable: true, render: (asset) => <AssetCode>{asset.asset_code}</AssetCode> },
    { key: 'asset_type', label: 'Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (asset) => <StatusBadge status={asset.status} /> },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'issued_to', label: 'Issued To', sortable: true, render: (asset) => asset.issued_to || '-' },
    {
      key: 'action',
      label: 'Action',
      render: () => (
        <div className="flex items-center gap-1">
          <button type="button" className="grid h-8 w-8 place-items-center rounded-md text-ink-secondary hover:bg-surface-700 hover:text-ink-primary" title="View asset"><Eye size={16} /></button>
          <button type="button" className="grid h-8 w-8 place-items-center rounded-md text-ink-secondary hover:bg-surface-700 hover:text-ink-primary" title="Edit asset"><Pencil size={16} /></button>
          <button type="button" className="grid h-8 w-8 place-items-center rounded-md text-ink-secondary hover:bg-surface-700 hover:text-ink-primary" title="More actions"><MoreHorizontal size={16} /></button>
        </div>
      ),
    },
  ], [])

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-ink-secondary">Operational command view</p>
        <h1 className="text-2xl font-semibold text-ink-primary">Manager Overview</h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        <KpiCard label="Total" value={statsLoading ? '-' : stats.total_assets} icon={Boxes} />
        <KpiCard label="Available" value={statsLoading ? '-' : stats.available} tone="emerald" />
        <KpiCard label="Issued" value={statsLoading ? '-' : stats.issued} tone="amber" />
        <KpiCard label="Overdue" value={statsLoading ? '-' : stats.overdue} tone="red" icon={TriangleAlert} />
        <KpiCard label="Under Repair" value={statsLoading ? '-' : stats.under_repair} tone="orange" icon={Wrench} />
        <KpiCard label="Utilization" value={statsLoading ? '-' : `${stats.utilization_rate}%`} tone={stats?.utilization_rate > 50 ? 'emerald' : 'amber'} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]">
        <section className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <SearchInput value={query} onChange={setQuery} placeholder="Search inventory..." className="flex-1" />
            <div className="flex flex-wrap gap-2">
              {['all', 'available', 'issued', 'overdue', 'under_repair'].map((item) => (
                <button key={item} type="button" onClick={() => setStatus(item)} className={`h-10 rounded-md border px-3 text-sm font-medium ${status === item ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-surface-600 bg-surface-800 text-ink-secondary hover:text-ink-primary'}`}>
                  {item === 'all' ? 'All' : item.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
          <DataTable columns={columns} data={assets} loading={assetsLoading} pageSize={15} />
        </section>

        <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-ink-secondary">Live Activity</h2>
          <ActivityFeed items={activity} loading={activityLoading} compact live />
        </section>
      </div>

      <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wider text-ink-secondary">Overdue Assets ({stats?.overdue || overdue.length})</h2>
        </div>
        {assetsLoading ? <LoadingSkeleton rows={4} /> : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-surface-600">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-ink-secondary">
                  <th className="px-3 py-3">Asset Name</th>
                  <th className="px-3 py-3">Code</th>
                  <th className="px-3 py-3">Issued To</th>
                  <th className="px-3 py-3">Issued Date</th>
                  <th className="px-3 py-3">Days Overdue</th>
                  <th className="px-3 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-600/80">
                {overdue.slice(0, 8).map((asset) => (
                  <tr key={asset.id} className="text-sm text-ink-secondary">
                    <td className="px-3 py-3 font-medium text-ink-primary">{asset.asset_name}</td>
                    <td className="px-3 py-3"><AssetCode>{asset.asset_code}</AssetCode></td>
                    <td className="px-3 py-3">{asset.issued_to}</td>
                    <td className="px-3 py-3">{formatDate(asset.issued_date)}</td>
                    <td className="px-3 py-3 font-medium text-red-400">{daysPast(asset.due_date)} days</td>
                    <td className="px-3 py-3">
                      <button type="button" onClick={() => setContactAsset(asset)} className="inline-flex h-8 items-center gap-2 rounded-md border border-surface-500 px-3 text-xs font-medium text-ink-primary hover:bg-surface-700">
                        <Phone size={14} />
                        Contact
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-ink-secondary">Maintenance Summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-surface-600">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-ink-secondary">
                <th className="px-3 py-3">Asset</th>
                <th className="px-3 py-3">Last Service</th>
                <th className="px-3 py-3">Next Due</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-600/80">
              {maintenance.map((item) => (
                <tr key={item.id} className="text-sm text-ink-secondary">
                  <td className="px-3 py-3"><span className="font-medium text-ink-primary">{item.asset_name}</span><br /><AssetCode>{item.asset_code}</AssetCode></td>
                  <td className="px-3 py-3">{formatDate(item.last_service)}</td>
                  <td className="px-3 py-3">{formatDate(item.next_due)}</td>
                  <td className="px-3 py-3"><StatusBadge status={getMaintenanceStatus(item.next_due)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <ConfirmModal open={Boolean(contactAsset)} title="Contact Assignee" onClose={() => setContactAsset(null)}>
        <div className="space-y-3 text-sm">
          <p className="font-medium text-ink-primary">{contactAsset?.issued_to}</p>
          <p className="text-ink-secondary">{contact?.department || contactAsset?.issued_department}</p>
          <p className="font-mono text-ink-secondary">{contact?.phone || '+91 98765 10000'}</p>
          <p className="text-ink-secondary">{contact?.email || 'field.team@assetops.local'}</p>
        </div>
      </ConfirmModal>
    </div>
  )
}

