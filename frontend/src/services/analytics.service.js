import {
  ageGroups,
  assetDistribution,
  categoryRadar,
  dashboardStats,
  departmentUsage,
  departmentWeekOverWeek,
  maintenanceCostTrend,
  monthlyOverdueTrend,
  topUtilizedAssets,
  utilizationTrend,
} from '../data/mockAnalytics'
import { mockMaintenance } from '../data/mockMaintenance'
import { delay } from './delay'

export const analyticsService = {
  getDashboardStats: async () => {
    await delay(320, 620)
    return { data: dashboardStats, success: true }
  },

  getDirectorAnalytics: async () => {
    await delay(420, 720)
    return {
      data: {
        stats: dashboardStats,
        utilizationTrend,
        assetDistribution,
        departmentUsage,
        topUtilizedAssets,
        monthlyOverdueTrend,
        departmentWeekOverWeek,
        categoryRadar,
        ageGroups,
        maintenanceCostTrend,
      },
      success: true,
    }
  },

  getMaintenance: async () => {
    await delay(320, 620)
    return { data: mockMaintenance, success: true }
  },
}

