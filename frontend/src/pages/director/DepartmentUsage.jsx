import DepartmentChart from '../../components/charts/DepartmentChart'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import { useAnalytics } from '../../hooks/useAnalytics'

const risk = (row) => {
  const value = (row.overdue / row.issued) * 100
  if (value > 8) return 'HIGH'
  if (value >= 3) return 'MED'
  return 'LOW'
}

export default function DepartmentUsage() {
  const { data, loading } = useAnalytics('director')

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-ink-secondary">Site-level utilization</p>
        <h1 className="text-2xl font-semibold text-ink-primary">Department Usage</h1>
      </div>
      {loading || !data ? <LoadingSkeleton rows={8} /> : (
        <>
          <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-ink-secondary">Issued vs Overdue</h2>
            <DepartmentChart data={data.departmentUsage} />
          </section>
          <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
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
                  {data.departmentUsage.map((row) => (
                    <tr key={row.department} className="text-sm text-ink-secondary">
                      <td className="px-3 py-3 font-medium text-ink-primary">{row.department}</td>
                      <td className="px-3 py-3">{row.total}</td>
                      <td className="px-3 py-3">{row.issued}</td>
                      <td className="px-3 py-3">{row.utilization}%</td>
                      <td className="px-3 py-3">{row.overdue}</td>
                      <td className="px-3 py-3 font-semibold text-ink-primary">{risk(row)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  )
}

