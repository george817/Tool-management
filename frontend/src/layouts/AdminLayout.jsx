import { Gauge } from 'lucide-react'
import RoleLayout from './RoleLayout'

const navItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: Gauge },
]

export default function AdminLayout() {
  return <RoleLayout navItems={navItems} badge="Admin" surface="bg-surface-900" />
}
