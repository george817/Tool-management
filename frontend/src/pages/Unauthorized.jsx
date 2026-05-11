import { useNavigate } from 'react-router-dom'
import { Lock, Home, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function Unauthorized() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleGoHome = () => {
    if (user) {
      const roleRedirects = {
        operator: '/operator/dashboard',
        manager: '/manager/dashboard',
        director: '/director/dashboard',
        admin: '/admin/dashboard',
      }
      navigate(roleRedirects[user.role] || '/operator/dashboard')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-red-500/5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-red-500/5 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="rounded-full bg-red-500/10 p-6 ring-1 ring-red-500/20">
              <Lock className="h-12 w-12 text-red-400" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3 text-center">
            <h1 className="text-4xl font-bold text-white">Access Denied</h1>
            <p className="text-lg text-slate-400">
              You don't have permission to access this resource.
            </p>
            <p className="text-sm text-slate-500">
              Your current role ({user?.role}) does not grant access to this section.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoHome}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 font-medium text-white transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <Home className="h-5 w-5" />
              Go to Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 font-medium text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>

          {/* Info Box */}
          <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-4 text-center">
            <p className="text-sm text-slate-400">
              If you believe this is an error, please contact your administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized
