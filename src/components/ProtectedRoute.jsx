import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Loading from './Loading'

export default function ProtectedRoute({ children }) {
  const { isInitializing, isAuthenticated } = useAuth()

  if (isInitializing) {
    return <Loading label="Checking your session..." fullScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
