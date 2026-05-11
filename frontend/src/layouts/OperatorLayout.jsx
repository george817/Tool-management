import { ArrowDownLeft, ArrowUpRight, Clock, Gauge, Search, Wrench } from 'lucide-react'
import RoleLayout from './RoleLayout'

const navItems = [
  { label: 'Dashboard', short: 'Home', to: '/operator/dashboard', icon: Gauge },
  { label: 'Issue Asset', short: 'Issue', to: '/operator/issue', icon: ArrowUpRight },
  { label: 'Return Asset', short: 'Return', to: '/operator/return', icon: ArrowDownLeft },
  { label: 'Search Assets', short: 'Search', to: '/operator/search', icon: Search },
  { label: 'My Issued Assets', to: '/operator/my-issued', icon: Wrench },
  { label: 'Recent Activity', to: '/operator/activity', icon: Clock },
]

export default function OperatorLayout() {
  return <RoleLayout role="operator" navItems={navItems} badge="Operator" surface="bg-surface-800" mobileNav />
}

