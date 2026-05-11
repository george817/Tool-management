import { AlertTriangle, Boxes, Clock, Gauge, PackageCheck, Wrench } from 'lucide-react'
import RoleLayout from './RoleLayout'

const navItems = [
  { label: 'Overview', to: '/manager/dashboard', icon: Gauge },
  { label: 'Inventory', to: '/manager/inventory', icon: Boxes },
  { label: 'Issued Assets', to: '/manager/issued', icon: PackageCheck },
  { label: 'Overdue', to: '/manager/overdue', icon: AlertTriangle, badge: 37 },
  { label: 'Activity Log', to: '/manager/activity', icon: Clock },
  { label: 'Maintenance', to: '/manager/maintenance', icon: Wrench },
]

export default function ManagerLayout() {
  return <RoleLayout role="manager" navItems={navItems} badge="Manager" surface="bg-surface-900" />
}

