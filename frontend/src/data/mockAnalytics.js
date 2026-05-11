import { format, subDays, subMonths } from 'date-fns'

export const CHART_THEME = {
  grid: { stroke: '#2a2a3d', strokeDasharray: '3 3', opacity: 0.75 },
  axis: { stroke: '#50506a', tick: { fill: '#8080a0', fontSize: 12 } },
  tooltip: {
    contentStyle: {
      background: '#16161f',
      border: '1px solid #2a2a3d',
      borderRadius: 8,
      color: '#ededf5',
      boxShadow: '0 12px 28px rgba(0,0,0,0.35)',
    },
    labelStyle: { color: '#ededf5' },
  },
}

export const utilizationTrend = Array.from({ length: 30 }, (_, index) => ({
  date: format(subDays(new Date(), 29 - index), 'MMM dd'),
  available: 286 + ((index * 11) % 39),
  issued: 456 + ((index * 17) % 64),
  overdue: 24 + ((index * 5) % 18),
}))

export const departmentUsage = [
  { department: 'Site A', total: 142, issued: 89, utilization: 62.7, overdue: 3 },
  { department: 'Site B', total: 118, issued: 94, utilization: 79.7, overdue: 7 },
  { department: 'Workshop', total: 87, issued: 71, utilization: 81.6, overdue: 8 },
  { department: 'Transport', total: 34, issued: 28, utilization: 82.4, overdue: 2 },
  { department: 'Warehouse', total: 56, issued: 31, utilization: 55.4, overdue: 1 },
  { department: 'Electrical', total: 43, issued: 22, utilization: 51.2, overdue: 4 },
]

export const assetDistribution = [
  { name: 'Tools', value: 287, color: '#34d399' },
  { name: 'Equipment', value: 156, color: '#60a5fa' },
  { name: 'Power', value: 203, color: '#fbbf24' },
  { name: 'Vehicles', value: 201, color: '#f97316' },
]

export const dashboardStats = {
  total_assets: 847,
  available: 312,
  issued: 498,
  overdue: 37,
  under_repair: 12,
  utilization_rate: 58.8,
  fleet_value: 'Rs 2.4 Cr',
  active_sites: 4,
  ytd_transactions: 1847,
}

export const topUtilizedAssets = [
  { name: 'Cummins C15D5 Generator', count: 42 },
  { name: 'Makita Rotary Hammer', count: 39 },
  { name: 'Toyota Forklift', count: 36 },
  { name: 'Bosch Angle Grinder', count: 33 },
  { name: 'Tata 407 Truck', count: 31 },
  { name: 'Lincoln Welder 225A', count: 29 },
  { name: 'DeWalt Cordless Drill', count: 27 },
  { name: 'Atlas Copco Compressor', count: 25 },
  { name: 'Mahindra Bolero Pickup', count: 22 },
  { name: 'Trimble Total Station', count: 20 },
]

export const monthlyOverdueTrend = Array.from({ length: 12 }, (_, index) => ({
  month: format(subMonths(new Date(), 11 - index), 'MMM'),
  overdue: 18 + ((index * 9) % 31),
  resolved: 12 + ((index * 7) % 24),
}))

export const departmentWeekOverWeek = departmentUsage.map((row, index) => ({
  department: row.department,
  current: row.issued,
  previous: Math.max(10, row.issued - 8 + index * 2),
}))

export const categoryRadar = [
  { category: 'Power Tools', utilization: 84 },
  { category: 'Vehicles', utilization: 68 },
  { category: 'Generators', utilization: 74 },
  { category: 'Survey', utilization: 57 },
  { category: 'Lifting', utilization: 81 },
  { category: 'Safety', utilization: 49 },
]

export const ageGroups = [
  { age: '0-1 yr', assets: 98 },
  { age: '1-3 yr', assets: 286 },
  { age: '3-5 yr', assets: 231 },
  { age: '5 yr+', assets: 232 },
]

export const maintenanceCostTrend = Array.from({ length: 6 }, (_, index) => ({
  month: format(subMonths(new Date(), 5 - index), 'MMM'),
  preventive: 1.8 + index * 0.22,
  corrective: 1.1 + ((index * 0.37) % 1.4),
}))

