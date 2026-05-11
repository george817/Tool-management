import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CHART_THEME } from '../../data/mockAnalytics'

export default function DepartmentChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 12, right: 18, left: -14, bottom: 0 }}>
        <CartesianGrid {...CHART_THEME.grid} />
        <XAxis dataKey="department" stroke={CHART_THEME.axis.stroke} tick={CHART_THEME.axis.tick} tickLine={false} axisLine={false} />
        <YAxis stroke={CHART_THEME.axis.stroke} tick={CHART_THEME.axis.tick} tickLine={false} axisLine={false} />
        <Tooltip {...CHART_THEME.tooltip} />
        <Bar dataKey="issued" name="Issued" fill="#60a5fa" radius={[4, 4, 0, 0]} />
        <Bar dataKey="overdue" name="Overdue" fill="#f87171" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

