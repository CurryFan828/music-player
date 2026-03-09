import { createContext, useContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

// Create the Auth context
const AuthContext = createContext()

// Backend URL
const BACKEND_URL = "http://localhost:5000"

// AuthProvider wraps the app and provides auth functions/data
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null) // Current logged-in user
  const [error, setError] = useState("") // Login/Register errors

  // -----------------------------
  // Load JWT from localStorage on app load
  // -----------------------------
  useEffect(() => {
    const token = localStorage.getItem("musicPlayerToken")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUser({ username: decoded.username, role: decoded.role })
      } catch (err) {
        console.error("Invalid token", err)
        localStorage.removeItem("musicPlayerToken")
      }
    }
  }, [])

  // -----------------------------
  // REGISTER FUNCTION
  // -----------------------------
  const register = async (username, password, role) => {
    setError("") // reset previous error

    // Validate input
    if (!username || !password || !role) {
      setError("Please fill all fields and select a role")
      return { success: false, message: "Missing fields" }
    }

    try {
      const response = await fetch(`${BACKEND_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Registration failed")
        return { success: false, message: data.message || "Registration failed" }
      }

      return { success: true }
    } catch (err) {
      console.error(err)
      setError("Network error during registration")
      return { success: false, message: "Network error" }
    }
  }

  // -----------------------------
  // LOGIN FUNCTION
  // -----------------------------
  const login = async (username, password) => {
    setError("") // reset previous error

    // Validate input
    if (!username || !password) {
      setError("Please enter both username and password")
      return { success: false, message: "Missing credentials" }
    }

    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Login failed")
        return { success: false, message: data.message || "Login failed" }
      }

      // Save JWT in localStorage
      localStorage.setItem("musicPlayerToken", data.token)

      // Decode JWT to get user info
      const decoded = jwtDecode(data.token)
      setUser({ username: decoded.username, role: decoded.role })

      return { success: true }
    } catch (err) {
      console.error(err)
      setError("Network error during login")
      return { success: false, message: "Network error" }
    }
  }

  // -----------------------------
  // LOGOUT FUNCTION
  // -----------------------------
  const logout = () => {
    localStorage.removeItem("musicPlayerToken")
    setUser(null)
  }

  // Provide data/functions to all child components
  return (
    <AuthContext.Provider value={{ user, login, logout, register, error }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to access AuthContext easily
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used inside AuthProvider")
  return context
}