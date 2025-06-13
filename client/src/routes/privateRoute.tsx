import { Navigate, Outlet } from "react-router"
import { useAuthStore } from "../store/auth"
const PrivateRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default PrivateRoute
