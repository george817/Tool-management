import { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { analyticsService } from '../../services/analytics.service'
import { CHART_THEME, maintenanceCostTrend } from '../../data/mockAnalytics'
import { getMaintenanceStatus } from '../../data/mockMaintenance'
import AssetCode from '../../components/common/AssetCode'
import DataTable from '../../components/common/DataTable'
import StatusBadge from '../../components/common/StatusBadge'
import { currency, formatDate } from '../../utils/format'

export default function DirectorMaintenance() {
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
    { key: 'next_due', label: 'Next Due', sortable: true, render: (item) => formatDate(item.next_due) },
    { key: 'status', label: 'Status', render: (item) => <StatusBadge status={getMaintenanceStatus(item.next_due)} /> },
    { key: 'cost', label: 'Cost', sortable: true, render: (item) => currency(item.cost) },
  ], [])

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-ink-secondary">Service spend and reliability</p>
        <h1 className="text-2xl font-semibold text-ink-primary">Maintenance & Cost</h1>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-ink-secondary">Maintenance Cost Trend</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={maintenanceCostTrend} margin={{ top: 12, right: 18, left: -14, bottom: 0 }}>
              <CartesianGrid {...CHART_THEME.grid} />
              <XAxis dataKey="month" stroke={CHART_THEME.axis.stroke} tick={CHART_THEME.axis.tick} tickLine={false} axisLine={false} />
              <YAxis stroke={CHART_THEME.axis.stroke} tick={CHART_THEME.axis.tick} tickLine={false} axisLine={false} />
              <Tooltip {...CHART_THEME.tooltip} />
              <Line dataKey="preventive" name="Preventive" stroke="#34d399" strokeWidth={2} dot={false} />
              <Line dataKey="corrective" name="Corrective" stroke="#f97316" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </section>
        <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-ink-secondary">Status Mix</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={[
              { status: 'OK', count: records.filter((item) => getMaintenanceStatus(item.next_due) === 'ok').length },
              { status: 'Due Soon', count: records.filter((item) => getMaintenanceStatus(item.next_due) === 'due_soon').length },
              { status: 'Overdue', count: records.filter((item) => getMaintenanceStatus(item.next_due) === 'overdue').length },
            ]} margin={{ top: 12, right: 18, left: -14, bottom: 0 }}>
              <CartesianGrid {...CHART_THEME.grid} />
              <XAxis dataKey="status" stroke={CHART_THEME.axis.stroke} tick={CHART_THEME.axis.tick} tickLine={false} axisLine={false} />
              <YAxis stroke={CHART_THEME.axis.stroke} tick={CHART_THEME.axis.tick} tickLine={false} axisLine={false} />
              <Tooltip {...CHART_THEME.tooltip} />
              <Bar dataKey="count" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>
      <DataTable columns={columns} data={records} loading={loading} pageSize={10} />
    </div>
  )
}

