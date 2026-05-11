import { ShieldCheck, Users } from 'lucide-react'
import KpiCard from '../../components/common/KpiCard'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-ink-secondary">System access</p>
        <h1 className="text-2xl font-semibold text-ink-primary">Admin Dashboard</h1>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Demo Users" value="4" icon={Users} tone="emerald" />
        <KpiCard label="Auth Status" value="Active" icon={ShieldCheck} />
      </div>
      <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-ink-secondary">Local Authentication</h2>
        <div className="grid gap-3 text-sm text-ink-secondary">
          <p>JWT login is connected to the FastAPI backend.</p>
          <p>Admin access is limited to this dashboard in the local MVP.</p>
        </div>
      </section>
    </div>
  )
}
