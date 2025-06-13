import { create } from "zustand"
import { clearTokens } from "../../utils/token"

interface User {
  id: string
  name: string
  email: string
  image: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem("access_token"),
 user: localStorage.getItem("auth_user") 
    ? JSON.parse(localStorage.getItem("auth_user")!)
    : null,
  login: (user) => {
    set({ isAuthenticated: true, user })
  },
  logout: () => {
    clearTokens()
    localStorage.removeItem("auth_user")
    set({ isAuthenticated: false, user: null })
    window.location.href = "/login"
  },
}))
