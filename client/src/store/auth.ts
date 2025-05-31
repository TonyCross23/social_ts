import { create } from "zustand"
import { clearTokens } from "../../utils/token"

interface AuthState {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem("access_token"),
  login: () => set({ isAuthenticated: true }),
  logout: () => {
    clearTokens()
    set({ isAuthenticated: false })
    window.location.href = "/login"
  }
}))
