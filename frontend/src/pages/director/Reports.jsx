import { Download, FileSpreadsheet, FileText } from 'lucide-react'
import KpiCard from '../../components/common/KpiCard'

const reports = [
  { title: 'Monthly Asset Utilization', owner: 'Operations', cadence: 'Monthly', icon: FileSpreadsheet },
  { title: 'Overdue Exposure Summary', owner: 'Leadership', cadence: 'Weekly', icon: FileText },
  { title: 'Maintenance Cost Review', owner: 'Finance', cadence: 'Monthly', icon: FileSpreadsheet },
]

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-ink-secondary">Executive exports</p>
        <h1 className="text-2xl font-semibold text-ink-primary">Reports</h1>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <KpiCard label="Scheduled Reports" value="12" />
        <KpiCard label="Ready Exports" value="5" tone="emerald" />
        <KpiCard label="Pending Review" value="2" tone="amber" />
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        {reports.map((report) => {
          const Icon = report.icon
          return (
            <section key={report.title} className="rounded-lg border border-surface-600 bg-surface-800 p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-surface-700 text-emerald-300">
                  <Icon size={18} />
                </span>
                <button type="button" className="grid h-8 w-8 place-items-center rounded-md text-ink-secondary hover:bg-surface-700 hover:text-ink-primary" title="Download report">
                  <Download size={16} />
                </button>
              </div>
              <h2 className="mt-4 font-semibold text-ink-primary">{report.title}</h2>
              <div className="mt-3 grid gap-2 text-sm text-ink-secondary">
                <span>Owner: {report.owner}</span>
                <span>Cadence: {report.cadence}</span>
                <span className="text-emerald-300">Ready for demo export</span>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
