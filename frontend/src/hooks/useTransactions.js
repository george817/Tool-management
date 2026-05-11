import { useEffect, useState } from 'react'
import { transactionService } from '../services/transaction.service'

export function useTransactions(mode = 'all', userId, reloadKey = 0) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    const request = mode === 'issued'
      ? transactionService.getIssued()
      : mode === 'overdue'
        ? transactionService.getOverdue()
        : mode === 'mine'
          ? transactionService.getMyIssued(userId)
          : transactionService.getAll()

    request.then((response) => {
      if (active && response.success) setTransactions(response.data)
    }).finally(() => {
      if (active) setLoading(false)
    })

    return () => {
      active = false
    }
  }, [mode, userId, reloadKey])

  return { transactions, loading, setTransactions }
}

