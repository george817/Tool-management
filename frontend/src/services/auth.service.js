import { DEMO_USERS } from '../data/mockUsers'
import { delay } from './delay'

export const authService = {
  getDemoUsers: async () => {
    await delay(150, 300)
    return { data: DEMO_USERS, success: true }
  },

  loginAs: async (role) => {
    await delay(250, 450)
    const user = DEMO_USERS[role]
    return user ? { data: user, success: true } : { data: null, success: false, message: 'Unknown demo role' }
  },
}
