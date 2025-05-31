import axios from "axios"
import { getAccessToken, setAccessToken, clearTokens } from "../../utils/token"

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for refresh token logic
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const res = await axios.post(
          "http://localhost:5000/api/v1/auth/refresh",
          {},
          { withCredentials: true }
        )

        const { accessToken } = res.data
        setAccessToken(accessToken)

        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return API(originalRequest)
      } catch (refreshError) {
        clearTokens()
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default API
