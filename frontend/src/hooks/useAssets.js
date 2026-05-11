import { useEffect, useState } from 'react'
import { assetService } from '../services/asset.service'

export function useAssets(filters = {}, reloadKey = 0) {
  const { q = '', status = 'all', type = 'all', location = '' } = filters
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    assetService.getAll({ q, status, type, location })
      .then((response) => {
        if (!active) return
        if (response.success) setAssets(response.data)
        else setError(response.message || 'Unable to load assets')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [q, status, type, location, reloadKey])

  return { assets, loading, error, setAssets }
}
