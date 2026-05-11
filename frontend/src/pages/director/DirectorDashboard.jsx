import { AlertTriangle, BarChart3, Building2, FileText, IndianRupee, Wrench } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import AssetDistributionChart from '../../components/charts/AssetDistributionChart'
import UtilizationChart from '../../components/charts/UtilizationChart'
import KpiCard from '../../components/common/KpiCard'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import StatusBadge from '../../components/common/StatusBadge'
import { CHART_THEME } from '../../data/mockAnalytics'
import { useAnalytics } from '../../hooks/useAnalytics'

const riskLevel = (row) => {
  const ratio = (row.overdue / row.issued) * 100
  if (ratio > 8) return 'HIGH'
  if (ratio >= 3) return 'MED'
  return 'LOW'
}

const riskTone = {
  HIGH: 'border-red-500/35 bg-red-500/10 text-red-300',
  MED: 'border-amber-500/35 bg-amber-500/10 text-amber-300',
  LOW: 'border-emerald-500/35 bg-emerald-500/10 text-emerald-300',
}

export default function DirectorDashboard() {
  const { data, loading } = useAnalytics('director')

  if (loading || !data) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-ink-secondary">Strategic asset intelligence</p>
          <h1 className="text-2xl font-semibold text-ink-primary">Executive Overview</h1>
        </div>
        <LoadingSkeleton rows={8} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-ink-secondary">Strategic asset intelligence</p>
        <h1 className="text-2xl font-semibold text-ink-primary">Executive Overview</h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        <KpiCard label="Fleet Value" value={data.stats.fleet_value} icon={IndianRupee} tone="emerald" />
        <KpiCard label="Utilization Rate" value={`${data.stats.utilization_rate}%`} icon={BarChart3} />
        <KpiCard label="Overdue Rate" value="4.4%" tone="red" icon={AlertTriangle} />
        <KpiCard label="Assets in Repair" value={data.stats.under_repair} tone="orange" icon={Wrench} />
        <KpiCard label="Active Sites" value={data.stats.active_sites} icon={Building2} />
        <KpiCard label="YTD Transactions" value={data.stats.ytd_transactions.toLocaleString('en-IN')} icon={FileText} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-ink-secondary">Asset Utilization Trend</h2>
          <UtilizationChart data={data.utilizationTrend} />
        </section>
        <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-ink-secondary">Asset Distribution</h2>
          <AssetDistributionChart data={data.assetDistribution} />
        </section>
      </div>

      <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-ink-secondary">Department Usage With Risk</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-surface-600">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-ink-secondary">
                <th className="px-3 py-3">Department</th>
                <th className="px-3 py-3">Assets</th>
                <th className="px-3 py-3">Issued</th>
                <th className="px-3 py-3">Utilization</th>
                <th className="px-3 py-3">Overdue</th>
                <th className="px-3 py-3">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-600/80">
              {data.departmentUsage.map((row) => {
                const risk = riskLevel(row)
                return (
                  <tr key={row.department} className="text-sm text-ink-secondary">
                    <td className="px-3 py-3 font-medium text-ink-primary">{row.department}</td>
                    <td className="px-3 py-3">{row.total}</td>
                    <td className="px-3 py-3">{row.issued}</td>
                    <td className="px-3 py-3">{row.utilization}%</td>
                    <td className="px-3 py-3">{row.overdue}</td>
                    <td className="px-3 py-3"><span className={`inline-flex h-6 items-center rounded-md border px-2 text-[11px] font-semibold ${riskTone[risk]}`}>{risk}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wider text-ink-secondary">Top Utilized Assets</h2>
          <StatusBadge status="issued" />
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data.topUtilizedAssets} layout="vertical" margin={{ top: 8, right: 24, left: 92, bottom: 8 }}>
            <CartesianGrid {...CHART_THEME.grid} />
            <XAxis type="number" stroke={CHART_THEME.axis.stroke} tick={CHART_THEME.axis.tick} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey="name" width={150} stroke={CHART_THEME.axis.stroke} tick={CHART_THEME.axis.tick} tickLine={false} axisLine={false} />
            <Tooltip {...CHART_THEME.tooltip} />
            <Bar dataKey="count" fill="#34d399" radius={[0, 4, 4, 0]} name="Issues" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  )
}

