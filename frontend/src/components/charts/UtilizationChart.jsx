import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CHART_THEME } from '../../data/mockAnalytics'

export default function UtilizationChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 12, right: 18, left: -16, bottom: 0 }}>
        <CartesianGrid {...CHART_THEME.grid} />
        <XAxis dataKey="date" stroke={CHART_THEME.axis.stroke} tick={CHART_THEME.axis.tick} tickLine={false} axisLine={false} />
        <YAxis stroke={CHART_THEME.axis.stroke} tick={CHART_THEME.axis.tick} tickLine={false} axisLine={false} />
        <Tooltip {...CHART_THEME.tooltip} />
        <Legend wrapperStyle={{ color: '#8080a0', fontSize: 12 }} />
        <Line type="monotone" dataKey="issued" stroke="#fbbf24" strokeWidth={2} dot={false} name="Issued" />
        <Line type="monotone" dataKey="available" stroke="#34d399" strokeWidth={2} dot={false} name="Available" />
        <Line type="monotone" dataKey="overdue" stroke="#f87171" strokeWidth={2} dot={false} name="Overdue" />
      </LineChart>
    </ResponsiveContainer>
  )
}

