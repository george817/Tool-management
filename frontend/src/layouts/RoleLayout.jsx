import { NavLink, Outlet } from 'react-router-dom'
import { Gauge, LogOut, Settings } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { cx, initials } from '../utils/format'

function Sidebar({ navItems, badge, surface = 'bg-surface-800' }) {
  const { user, logout } = useAuth()

  return (
    <aside className={`hidden h-screen w-56 shrink-0 border-r border-surface-600 ${surface} md:flex md:flex-col`}>
      <div className="border-b border-surface-600 px-4 py-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-emerald-600 text-white">
              <Settings size={17} />
            </span>
            <span className="font-semibold text-ink-primary">AssetOps</span>
          </div>
          <span className="rounded-md border border-surface-500 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-secondary">{badge}</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cx(
              'flex h-10 items-center justify-between rounded-md px-3 text-sm font-medium transition-colors',
              isActive ? 'border-l-2 border-emerald-500 bg-surface-700 text-ink-primary' : 'text-ink-secondary hover:bg-surface-700 hover:text-ink-primary',
            )}
          >
            <span className="flex items-center gap-2">
              <item.icon size={16} />
              {item.label}
            </span>
            {item.badge ? <span className="rounded bg-red-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-red-300">{item.badge}</span> : null}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-surface-600 p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-surface-600 text-xs font-semibold text-ink-primary">{initials(user?.name)}</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink-primary">{user?.name}</p>
            <p className="truncate text-xs text-ink-secondary">{user?.department}</p>
          </div>
          <button type="button" onClick={logout} className="ml-auto grid h-8 w-8 place-items-center rounded-md text-ink-secondary hover:bg-surface-700 hover:text-ink-primary" title="Sign out">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}

function MobileBottomNav({ navItems }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 grid h-11 grid-cols-4 border-t border-surface-600 bg-surface-800 md:hidden">
      {navItems.slice(0, 4).map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => cx('flex flex-col items-center justify-center gap-0 text-[10px] font-medium', isActive ? 'text-emerald-300' : 'text-ink-secondary')}
        >
          <item.icon size={16} />
          <span>{item.short || item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default function RoleLayout({ navItems, badge, surface, mobileNav = false }) {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-surface-900 text-ink-primary">
      <div className="flex">
        <Sidebar navItems={navItems} badge={badge} surface={surface} />
        <main className="min-h-screen min-w-0 flex-1 px-4 py-5 pb-20 md:px-6 md:py-6 md:pb-8">
          <div className="mb-5 flex items-center justify-between border-b border-surface-600 pb-4 md:hidden">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-emerald-600 text-white">
                <Gauge size={17} />
              </span>
              <div>
                <p className="font-semibold">AssetOps</p>
                <p className="text-xs text-ink-secondary">{user?.name} - {badge}</p>
              </div>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
      {mobileNav ? <MobileBottomNav navItems={navItems} /> : null}
    </div>
  )
}
