import { useState } from 'react'
import { useActivity } from '../../hooks/useActivity'
import ActivityFeed from '../../components/common/ActivityFeed'
import SearchInput from '../../components/common/SearchInput'

export default function ActivityLog() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')
  const { activity, loading } = useActivity(80, 30000, { q: query, type })

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-ink-secondary">Auditable movement trail</p>
        <h1 className="text-2xl font-semibold text-ink-primary">Activity Log</h1>
      </div>
      <div className="grid gap-3 md:grid-cols-[1fr_180px]">
        <SearchInput value={query} onChange={setQuery} placeholder="Search activity..." />
        <select value={type} onChange={(event) => setType(event.target.value)} className="h-12 rounded-lg border border-surface-500 bg-surface-700 px-3 text-sm text-ink-primary outline-none focus:border-emerald-600">
          <option value="all">All Actions</option>
          <option value="issue">Issue</option>
          <option value="return">Return</option>
          <option value="maintenance">Maintenance</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>
      <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
        <ActivityFeed items={activity} loading={loading} compact live />
      </section>
    </div>
  )
}

