import OverdueTrendChart from '../../components/charts/OverdueTrendChart'
import KpiCard from '../../components/common/KpiCard'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import { useAnalytics } from '../../hooks/useAnalytics'

export default function DirectorRisk() {
  const { data, loading } = useAnalytics('director')

  if (loading || !data) {
    return (
      <div className="space-y-5">
        <div>
          <p className="text-sm text-ink-secondary">Exception and exposure view</p>
          <h1 className="text-2xl font-semibold text-ink-primary">Risk & Overdue</h1>
        </div>
        <LoadingSkeleton rows={7} />
      </div>
    )
  }

  const highRisk = data.departmentUsage.filter((row) => (row.overdue / row.issued) * 100 > 8).length

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-ink-secondary">Exception and exposure view</p>
        <h1 className="text-2xl font-semibold text-ink-primary">Risk & Overdue</h1>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <KpiCard label="Overdue Assets" value={data.stats.overdue} tone="red" />
        <KpiCard label="High Risk Departments" value={highRisk} tone="orange" />
        <KpiCard label="Overdue Rate" value="4.4%" tone="red" />
      </div>
      <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-ink-secondary">Overdue Trend</h2>
        <OverdueTrendChart data={data.monthlyOverdueTrend} />
      </section>
      <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-surface-600">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-ink-secondary">
                <th className="px-3 py-3">Department</th>
                <th className="px-3 py-3">Issued</th>
                <th className="px-3 py-3">Overdue</th>
                <th className="px-3 py-3">Exposure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-600/80">
              {data.departmentUsage.map((row) => (
                <tr key={row.department} className="text-sm text-ink-secondary">
                  <td className="px-3 py-3 font-medium text-ink-primary">{row.department}</td>
                  <td className="px-3 py-3">{row.issued}</td>
                  <td className="px-3 py-3">{row.overdue}</td>
                  <td className="px-3 py-3">{((row.overdue / row.issued) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

