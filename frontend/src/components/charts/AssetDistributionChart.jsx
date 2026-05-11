import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { CHART_THEME } from '../../data/mockAnalytics'

export default function AssetDistributionChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={58} outerRadius={92} paddingAngle={3} dataKey="value">
          {data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
        </Pie>
        <Tooltip {...CHART_THEME.tooltip} />
        <Legend wrapperStyle={{ color: '#8080a0', fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}

