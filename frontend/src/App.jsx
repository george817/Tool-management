import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './context/AuthContext'
import { ProtectedRoute } from './auth/ProtectedRoute'
import RoleSwitcher from './components/demo/RoleSwitcher'
import OperatorLayout from './layouts/OperatorLayout'
import ManagerLayout from './layouts/ManagerLayout'
import DirectorLayout from './layouts/DirectorLayout'
import AdminLayout from './layouts/AdminLayout'
import Login from './pages/Login'
import Unauthorized from './pages/Unauthorized'
import OperatorDashboard from './pages/operator/OperatorDashboard'
import IssueAsset from './pages/operator/IssueAsset'
import ReturnAsset from './pages/operator/ReturnAsset'
import SearchAssets from './pages/operator/SearchAssets'
import MyIssuedAssets from './pages/operator/MyIssuedAssets'
import OperatorActivity from './pages/operator/OperatorActivity'
import ManagerDashboard from './pages/manager/ManagerDashboard'
import Inventory from './pages/manager/Inventory'
import IssuedAssets from './pages/manager/IssuedAssets'
import OverdueAssets from './pages/manager/OverdueAssets'
import ActivityLog from './pages/manager/ActivityLog'
import Maintenance from './pages/manager/Maintenance'
import DirectorDashboard from './pages/director/DirectorDashboard'
import Analytics from './pages/director/Analytics'
import DepartmentUsage from './pages/director/DepartmentUsage'
import DirectorMaintenance from './pages/director/DirectorMaintenance'
import DirectorRisk from './pages/director/DirectorRisk'
import Reports from './pages/director/Reports'
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  const { user, isAuthenticated } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Operator Routes */}
        <Route 
          path="/operator/*" 
          element={
            <ProtectedRoute allowedRoles={['operator', 'admin']}>
              <OperatorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<OperatorDashboard />} />
          <Route path="issue" element={<IssueAsset />} />
          <Route path="return" element={<ReturnAsset />} />
          <Route path="search" element={<SearchAssets />} />
          <Route path="my-issued" element={<MyIssuedAssets />} />
          <Route path="activity" element={<OperatorActivity />} />
        </Route>

        {/* Manager Routes */}
        <Route 
          path="/manager/*" 
          element={
            <ProtectedRoute allowedRoles={['manager', 'admin']}>
              <ManagerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="issued" element={<IssuedAssets />} />
          <Route path="overdue" element={<OverdueAssets />} />
          <Route path="activity" element={<ActivityLog />} />
          <Route path="maintenance" element={<Maintenance />} />
        </Route>

        {/* Director Routes */}
        <Route 
          path="/director/*" 
          element={
            <ProtectedRoute allowedRoles={['director', 'admin']}>
              <DirectorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DirectorDashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="departments" element={<DepartmentUsage />} />
          <Route path="maintenance" element={<DirectorMaintenance />} />
          <Route path="risk" element={<DirectorRisk />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Root Routes */}
        <Route 
          path="/" 
          element={
            isAuthenticated && user 
              ? <Navigate to={`/${user.role}/dashboard`} replace /> 
              : <Navigate to="/login" replace />
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Demo Role Switcher - only show for authenticated users */}
      {isAuthenticated && user && <RoleSwitcher />}
      
      {/* Toast Notifications */}
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#1e1e2e',
            color: '#e0e0e0',
            border: '1px solid #3a3a4a',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#0f0f1e' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#0f0f1e' } },
        }}
      />
    </BrowserRouter>
  )
}

export default App
