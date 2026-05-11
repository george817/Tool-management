import { useEffect, useState } from 'react'
import { activityService } from '../services/activity.service'

export function useActivity(limit = 8, pollMs = 0, filters = {}) {
  const { q = '', type = 'all' } = filters
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const load = async (showLoading = false) => {
      if (showLoading) setLoading(true)
      const response = q || type !== 'all' ? await activityService.getAll({ q, type }) : await activityService.getRecent(limit)
      if (active && response.success) setActivity(limit ? response.data.slice(0, limit) : response.data)
      if (active) setLoading(false)
    }

    load(true)
    const timer = pollMs ? window.setInterval(() => load(false), pollMs) : null
    return () => {
      active = false
      if (timer) window.clearInterval(timer)
    }
  }, [limit, pollMs, q, type])

  return { activity, loading, setActivity }
}
