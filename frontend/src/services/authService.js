import axios from 'axios'
import { API_BASE_URL } from '../config/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authService = {
  /**
   * Login with email and password
   */
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/api/auth/login', {
        email,
        password,
      })
      
      const { access_token, user } = response.data
      
      // Store token and user data
      localStorage.setItem('authToken', access_token)
      localStorage.setItem('user', JSON.stringify(user))
      
      return {
        success: true,
        data: user,
        token: access_token,
      }
    } catch (error) {
      const message = error.response?.data?.detail || 'Login failed'
      return {
        success: false,
        error: message,
      }
    }
  },

  /**
   * Logout user
   */
  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },

  /**
   * Get current user from localStorage
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken')
  },

  /**
   * Get stored auth token
   */
  getToken: () => {
    return localStorage.getItem('authToken')
  },

  /**
   * Validate token with backend
   */
  validateToken: async () => {
    try {
      const response = await apiClient.post('/api/auth/validate-token')
      return {
        success: true,
        user: response.data,
      }
    } catch {
      return {
        success: false,
        error: 'Token validation failed',
      }
    }
  },

  /**
   * Demo login for MVP testing
   * This allows switching between demo users
   */
  demoLogin: async (role) => {
    const demoUsers = {
      operator: {
        email: 'operator@assetops.com',
        password: 'password123',
      },
      manager: {
        email: 'manager@assetops.com',
        password: 'password123',
      },
      director: {
        email: 'director@assetops.com',
        password: 'password123',
      },
      admin: {
        email: 'admin@assetops.com',
        password: 'password123',
      },
    }

    const credentials = demoUsers[role]
    if (!credentials) {
      return {
        success: false,
        error: 'Invalid demo role',
      }
    }

    return authService.login(credentials.email, credentials.password)
  },
}

export default apiClient
