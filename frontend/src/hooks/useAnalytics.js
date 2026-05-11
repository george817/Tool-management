import { useEffect, useState } from 'react'
import { analyticsService } from '../services/analytics.service'

export function useAnalytics(kind = 'director') {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    const request = kind === 'stats' ? analyticsService.getDashboardStats() : analyticsService.getDirectorAnalytics()
    request.then((response) => {
      if (active && response.success) setData(response.data)
    }).finally(() => {
      if (active) setLoading(false)
    })
    return () => {
      active = false
    }
  }, [kind])

  return { data, loading }
}
