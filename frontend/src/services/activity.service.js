import { mockActivity } from '../data/mockActivity'
import { delay } from './delay'

export const activityService = {
  getRecent: async (limit = 8) => {
    await delay(300, 540)
    return { data: mockActivity.slice(0, limit), success: true }
  },

  getAll: async (filters = {}) => {
    await delay(350, 650)
    let data = [...mockActivity]
    if (filters.type && filters.type !== 'all') data = data.filter((item) => item.type === filters.type)
    if (filters.q) {
      const q = filters.q.toLowerCase()
      data = data.filter((item) => `${item.user_name} ${item.asset_name} ${item.asset_code}`.toLowerCase().includes(q))
    }
    return { data, success: true }
  },
}

