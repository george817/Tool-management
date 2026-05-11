import { useState } from 'react'
import { useActivity } from '../../hooks/useActivity'
import ActivityFeed from '../../components/common/ActivityFeed'
import SearchInput from '../../components/common/SearchInput'

export default function OperatorActivity() {
  const [query, setQuery] = useState('')
  const { activity, loading } = useActivity(40, 0, { q: query })

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-ink-secondary">Recent movements</p>
        <h1 className="text-2xl font-semibold text-ink-primary">Recent Activity</h1>
      </div>
      <SearchInput value={query} onChange={setQuery} placeholder="Search activity..." />
      <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
        <ActivityFeed items={activity} loading={loading} compact />
      </section>
    </div>
  )
}
