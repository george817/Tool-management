import { useEffect, useMemo, useState } from 'react'
import { analyticsService } from '../../services/analytics.service'
import { getMaintenanceStatus } from '../../data/mockMaintenance'
import AssetCode from '../../components/common/AssetCode'
import DataTable from '../../components/common/DataTable'
import StatusBadge from '../../components/common/StatusBadge'
import { currency, formatDate } from '../../utils/format'

export default function Maintenance() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    analyticsService.getMaintenance().then((response) => {
      if (active && response.success) setRecords(response.data)
    }).finally(() => {
      if (active) setLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  const columns = useMemo(() => [
    { key: 'asset_name', label: 'Asset', sortable: true, render: (item) => <span className="font-medium text-ink-primary">{item.asset_name}</span> },
    { key: 'asset_code', label: 'Code', sortable: true, render: (item) => <AssetCode>{item.asset_code}</AssetCode> },
    { key: 'service_type', label: 'Type', sortable: true },
    { key: 'vendor', label: 'Vendor', sortable: true },
    { key: 'last_service', label: 'Last Service', sortable: true, render: (item) => formatDate(item.last_service) },
    { key: 'next_due', label: 'Next Due', sortable: true, render: (item) => formatDate(item.next_due) },
    { key: 'status', label: 'Status', render: (item) => <StatusBadge status={getMaintenanceStatus(item.next_due)} /> },
    { key: 'cost', label: 'Cost', sortable: true, render: (item) => currency(item.cost) },
  ], [])

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-ink-secondary">Service calendar</p>
        <h1 className="text-2xl font-semibold text-ink-primary">Maintenance</h1>
      </div>
      <DataTable columns={columns} data={records} loading={loading} pageSize={15} />
    </div>
  )
}
