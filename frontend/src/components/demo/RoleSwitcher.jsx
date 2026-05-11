import { useState } from 'react'
import { BarChart3, ClipboardList, RefreshCw, ShieldCheck, Wrench } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { DEMO_USERS } from '../../data/mockUsers'
import { useAuth } from '../../context/AuthContext'
import { cx } from '../../utils/format'

const roleIcons = {
  operator: Wrench,
  manager: ClipboardList,
  director: BarChart3,
  admin: ShieldCheck,
}

export default function RoleSwitcher() {
  const [open, setOpen] = useState(false)
  const { user, demoLogin, loading } = useAuth()
  const navigate = useNavigate()

  const switchRole = async (role) => {
    const response = await demoLogin(role)
    if (response.success) {
      setOpen(false)
      navigate(`/${role}/dashboard`)
    }
  }

  return (
    <div className="fixed bottom-20 right-4 z-40 md:bottom-5">
      {open ? (
        <div className="mb-3 w-72 rounded-lg border border-surface-600 bg-surface-800 p-2 shadow-panel">
          {Object.entries(DEMO_USERS).map(([role, demoUser]) => {
            const Icon = roleIcons[role]
            const active = user?.role === role
            return (
              <button
                key={role}
                type="button"
                onClick={() => switchRole(role)}
                className={cx('flex w-full items-center gap-3 rounded-md px-3 py-3 text-left hover:bg-surface-700', active ? 'text-ink-primary' : 'text-ink-secondary')}
                disabled={loading}
              >
                <span className={cx('grid h-9 w-9 place-items-center rounded-md', active ? 'bg-emerald-600 text-white' : 'bg-surface-700 text-ink-secondary')}>
                  <Icon size={17} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{demoUser.name}</span>
                  <span className="block text-xs capitalize text-ink-muted">{role} - {demoUser.department}</span>
                </span>
              </button>
            )
          })}
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 items-center gap-2 rounded-lg border border-surface-500 bg-surface-800 px-4 text-sm font-semibold text-ink-primary shadow-panel hover:bg-surface-700"
      >
        <RefreshCw size={16} />
        Switch Demo Role
      </button>
    </div>
  )
}
