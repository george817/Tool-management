import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { authService } from '../services/authService'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('authToken')
        const storedUser = localStorage.getItem('user')

        if (storedToken && storedUser) {
          setToken(storedToken)
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
      } finally {
        setLoading(false)
        setIsInitialized(true)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    try {
      const response = await authService.login(email, password)
      if (response.success) {
        setUser(response.data)
        setToken(response.token)
        return { success: true, user: response.data }
      } else {
        return { success: false, error: response.error }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    authService.logout()
  }

  const isAuthenticated = !!user && !!token

  const hasRole = useCallback((requiredRoles) => {
    if (!user) return false
    if (typeof requiredRoles === 'string') {
      return user.role === requiredRoles
    }
    return requiredRoles.includes(user.role)
  }, [user])

  const canAccess = useCallback((requiredRoles) => {
    return hasRole(requiredRoles)
  }, [hasRole])

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isInitialized,
      isAuthenticated,
      login,
      logout,
      hasRole,
      canAccess,
      setUser,
    }),
    [user, token, loading, isInitialized, isAuthenticated, hasRole, canAccess]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
