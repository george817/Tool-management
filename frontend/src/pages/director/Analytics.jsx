import { Bar, BarChart, CartesianGrid, PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import OverdueTrendChart from '../../components/charts/OverdueTrendChart'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import { CHART_THEME } from '../../data/mockAnalytics'
import { useAnalytics } from '../../hooks/useAnalytics'

function ChartPanel({ title, children }) {
  return (
    <section className="rounded-lg border border-surface-600 bg-surface-800 p-5">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-ink-secondary">{title}</h2>
      {children}
    </section>
  )
}

export default function Analytics() {
  const { data, loading } = useAnalytics('director')

  if (loading || !data) {
    return (
      <div className="space-y-5">
        <div>
          <p className="text-sm text-ink-secondary">Trend and pattern view</p>
          <h1 className="text-2xl font-semibold text-ink-primary">Asset Analytics</h1>
        </div>
        <LoadingSkeleton rows={8} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-ink-secondary">Trend and pattern view</p>
        <h1 className="text-2xl font-semibold text-ink-primary">Asset Analytics</h1>
      </div>

      <ChartPanel title="Monthly Overdue Trend">
        <OverdueTrendChart data={data.monthlyOverdueTrend} />
      </ChartPanel>

      <ChartPanel title="Department Week Over Week">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.departmentWeekOverWeek} margin={{ top: 12, right: 18, left: -14, bottom: 0 }}>
            <CartesianGrid {...CHART_THEME.grid} />
            <XAxis dataKey="department" stroke={CHART_THEME.axis.stroke} tick={CHART_THEME.axis.tick} tickLine={false} axisLine={false} />
            <YAxis stroke={CHART_THEME.axis.stroke} tick={CHART_THEME.axis.tick} tickLine={false} axisLine={false} />
            <Tooltip {...CHART_THEME.tooltip} />
            <Bar dataKey="previous" fill="#60a5fa" radius={[4, 4, 0, 0]} name="Previous" />
            <Bar dataKey="current" fill="#34d399" radius={[4, 4, 0, 0]} name="Current" />
          </BarChart>
        </ResponsiveContainer>
      </ChartPanel>

      <ChartPanel title="Asset Category Utilization">
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={data.categoryRadar} outerRadius={115}>
            <PolarGrid stroke="#2a2a3d" />
            <PolarAngleAxis dataKey="category" tick={{ fill: '#8080a0', fontSize: 12 }} />
            <Tooltip {...CHART_THEME.tooltip} />
            <Radar dataKey="utilization" name="Utilization" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.18} />
          </RadarChart>
        </ResponsiveContainer>
      </ChartPanel>

      <ChartPanel title="Assets by Age Group">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data.ageGroups} margin={{ top: 12, right: 18, left: -14, bottom: 0 }}>
            <CartesianGrid {...CHART_THEME.grid} />
            <XAxis dataKey="age" stroke={CHART_THEME.axis.stroke} tick={CHART_THEME.axis.tick} tickLine={false} axisLine={false} />
            <YAxis stroke={CHART_THEME.axis.stroke} tick={CHART_THEME.axis.tick} tickLine={false} axisLine={false} />
            <Tooltip {...CHART_THEME.tooltip} />
            <Bar dataKey="assets" fill="#f97316" radius={[4, 4, 0, 0]} name="Assets" />
          </BarChart>
        </ResponsiveContainer>
      </ChartPanel>
    </div>
  )
}

