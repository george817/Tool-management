import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const roleRedirects = {
  operator: '/operator/dashboard',
  manager: '/manager/dashboard',
  director: '/director/dashboard',
  admin: '/admin/dashboard',
}

const demoCredentials = {
  operator: { email: 'operator@assetops.com', password: 'password123' },
  manager: { email: 'manager@assetops.com', password: 'password123' },
  director: { email: 'director@assetops.com', password: 'password123' },
  admin: { email: 'admin@assetops.com', password: 'password123' },
}

export function Login() {
  const navigate = useNavigate()
  const { login, isAuthenticated, user } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedRole, setSelectedRole] = useState(null)

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(roleRedirects[user.role] || '/operator/dashboard', { replace: true })
    }
  }, [isAuthenticated, user, navigate])

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberEmail')
    if (rememberedEmail) {
      setEmail(rememberedEmail)
      setRememberMe(true)
    }
  }, [])

  const finishLogin = (result) => {
    toast.success(`Welcome back, ${result.user.name}!`)
    navigate(roleRedirects[result.user.role] || '/operator/dashboard')
  }

  const handleDemoLogin = async (role) => {
    setLoading(true)
    setError('')
    setSelectedRole(role)

    const credentials = demoCredentials[role]
    if (!credentials) {
      setError('Invalid role selected')
      setLoading(false)
      return
    }

    try {
      const result = await login(credentials.email, credentials.password)
      if (result.success) {
        finishLogin(result)
      } else {
        setError(result.error || 'Login failed')
        toast.error(result.error || 'Login failed')
      }
    } catch {
      setError('An error occurred during login')
      toast.error('An error occurred during login')
    } finally {
      setLoading(false)
      setSelectedRole(null)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const result = await login(email, password)
      if (result.success) {
        if (rememberMe) localStorage.setItem('rememberEmail', email)
        else localStorage.removeItem('rememberEmail')
        finishLogin(result)
      } else {
        setError(result.error || 'Invalid email or password')
        toast.error(result.error || 'Invalid email or password')
      }
    } catch {
      setError('An error occurred during login')
      toast.error('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl"></div>
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <div className="flex justify-center">
              <div className="rounded-lg bg-emerald-500/10 p-3 ring-1 ring-emerald-500/20">
                <div className="h-8 w-8 rounded bg-emerald-500/20"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Asset Operations</h1>
            <p className="text-sm text-slate-400">Enterprise Management Platform</p>
          </div>

          <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur">
            {error ? (
              <div className="flex items-start gap-3 rounded-lg border border-red-900/50 bg-red-950/20 p-4">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="your@email.com"
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:border-emerald-500 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="password123"
                    disabled={loading}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 pr-10 text-white placeholder-slate-500 transition-colors focus:border-emerald-500 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    disabled={loading}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-slate-400">Remember me</span>
                </label>
                <span className="text-sm text-emerald-400">Local MVP</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 font-medium text-white transition-all hover:from-emerald-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-slate-900 px-2 text-slate-400">Demo Accounts</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { role: 'operator', label: 'Operator' },
                { role: 'manager', label: 'Manager' },
                { role: 'director', label: 'Director' },
                { role: 'admin', label: 'Admin' },
              ].map(({ role, label }) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleDemoLogin(role)}
                  disabled={loading}
                  className={
                    'flex items-center justify-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50 ' +
                    (selectedRole === role
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                      : 'border-slate-700 bg-slate-800/30 text-slate-300 hover:border-slate-600 hover:bg-slate-800/50')
                  }
                >
                  {selectedRole === role && loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-slate-500">Demo credentials | All roles: password123</p>
        </div>
      </div>
    </div>
  )
}

export default Login
