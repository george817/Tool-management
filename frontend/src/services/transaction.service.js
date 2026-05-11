import { mockAssets } from '../data/mockAssets'
import { mockTransactions } from '../data/mockTransactions'
import { delay } from './delay'

export const transactionService = {
  getAll: async (filters = {}) => {
    await delay(300, 600)
    let data = [...mockTransactions]
    if (filters.type && filters.type !== 'all') data = data.filter((item) => item.type === filters.type)
    if (filters.q) {
      const q = filters.q.toLowerCase()
      data = data.filter((item) => `${item.asset_name} ${item.asset_code} ${item.user_name}`.toLowerCase().includes(q))
    }
    return { data, success: true }
  },

  getIssued: async () => {
    await delay(300, 560)
    return { data: mockAssets.filter((asset) => asset.status === 'issued' || asset.status === 'overdue'), success: true }
  },

  getOverdue: async () => {
    await delay(300, 560)
    return { data: mockAssets.filter((asset) => asset.status === 'overdue'), success: true }
  },

  getMyIssued: async (userId) => {
    await delay(300, 560)
    return { data: mockAssets.filter((asset) => asset.issued_to_id === Number(userId)), success: true }
  },
}

