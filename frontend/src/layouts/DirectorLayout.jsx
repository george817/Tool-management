import { AlertTriangle, BarChart3, Building2, FileText, Gauge, Wrench } from 'lucide-react'
import RoleLayout from './RoleLayout'

const navItems = [
  { label: 'Overview', to: '/director/dashboard', icon: Gauge },
  { label: 'Asset Analytics', to: '/director/analytics', icon: BarChart3 },
  { label: 'Department Usage', to: '/director/departments', icon: Building2 },
  { label: 'Maintenance & Cost', to: '/director/maintenance', icon: Wrench },
  { label: 'Risk & Overdue', to: '/director/risk', icon: AlertTriangle },
  { label: 'Reports', to: '/director/reports', icon: FileText },
]

export default function DirectorLayout() {
  return <RoleLayout role="director" navItems={navItems} badge="Director" surface="bg-surface-900" />
}
