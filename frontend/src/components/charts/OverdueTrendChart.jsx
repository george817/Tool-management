import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CHART_THEME } from '../../data/mockAnalytics'

export default function OverdueTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 12, right: 18, left: -14, bottom: 0 }}>
        <defs>
          <linearGradient id="overdueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f87171" stopOpacity={0.28} />
            <stop offset="95%" stopColor="#f87171" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid {...CHART_THEME.grid} />
        <XAxis dataKey="month" stroke={CHART_THEME.axis.stroke} tick={CHART_THEME.axis.tick} tickLine={false} axisLine={false} />
        <YAxis stroke={CHART_THEME.axis.stroke} tick={CHART_THEME.axis.tick} tickLine={false} axisLine={false} />
        <Tooltip {...CHART_THEME.tooltip} />
        <Area type="monotone" dataKey="overdue" stroke="#f87171" fill="url(#overdueFill)" strokeWidth={2} name="Overdue" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
