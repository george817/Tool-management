import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * ProtectedRoute component for role-based access control
 *
 * Usage:
 * <ProtectedRoute allowedRoles={['operator', 'manager']}>
 *   <YourComponent />
 * </ProtectedRoute>
 */
export function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, user, loading, isInitialized } = useAuth()

  // Show loading while initializing
  if (!isInitialized || loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="space-y-4 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-emerald-500"></div>
          <p className="text-slate-400">Initializing...</p>
        </div>
      </div>
    )
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Check role-based access
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default ProtectedRoute
