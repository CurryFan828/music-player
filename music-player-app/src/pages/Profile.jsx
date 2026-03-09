import { useState } from "react"
import { useAuth } from "../contexts/AuthContexts"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { AiOutlineUser } from "react-icons/ai"

export const Profile = () => {
  const { user, login, logout, register, error: authError } = useAuth()

  // -----------------------------
  // Form state
  // -----------------------------
  const [isRegister, setIsRegister] = useState(false)    // Toggle between Login/Register
  const [role, setRole] = useState("")                   // Selected role for registration
  const [username, setUsername] = useState("")           // Username input
  const [password, setPassword] = useState("")           // Password input
  const [showPassword, setShowPassword] = useState(false) // Toggle password visibility
  const [error, setError] = useState("")                 // Local form error messages

  // -----------------------------
  // Handle login submission
  // -----------------------------
  const handleLogin = async (e) => {
    e.preventDefault()

    // Validate inputs before sending request
    if (!username || !password) {
      setError("Please enter both username and password")
      return
    }

    // Call login from AuthContext (talks to backend)
    const result = await login(username, password)

    if (!result.success) {
      setError(result.message)
      return
    }

    // Clear form after successful login
    setUsername("")
    setPassword("")
    setRole("")
    setError("")
  }

  // -----------------------------
  // Handle registration submission
  // -----------------------------
  const handleRegister = async (e) => {
    e.preventDefault()

    // Validate fields before sending
    if (!username || !password || !role) {
      setError("Please fill all fields and select a role")
      return
    }

    const result = await register(username, password, role)

    if (!result.success) {
      setError(result.message)
      return
    }

    alert("Account created! You can now login.")
    setIsRegister(false) // Switch to login after successful registration
    setUsername("")
    setPassword("")
    setRole("")
    setError("")
  }

  // -----------------------------
  // Role selection buttons
  // -----------------------------
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole)
    setError("") // Clear error when selecting role
  }

  // -----------------------------
  // If user is logged in, show profile/dashboard
  // -----------------------------
  if (user) {
    return (
      <div className="profile">
        <h2>Profile</h2>

        <div className="profile-card">
          {/* User avatar */}
          <div className="profile-avatar">
            <AiOutlineUser size={40} />
          </div>

          {/* User info */}
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Role:</strong> {user.role}</p>

          {/* Role-specific content */}
          {user.role === "admin" ? (
            <div className="admin-panel">
              <h3>Admin Panel</h3>
              <p>Manage users and admin features here.</p>
            </div>
          ) : (
            <div className="user-panel">
              <h3>User Dashboard</h3>
              <p>See your playlists and favorite songs here.</p>
            </div>
          )}

          {/* Logout button */}
          <button
            className="logout-btn"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  // -----------------------------
  // Login/Register form
  // -----------------------------
  return (
    <div className="profile">
      <h2>{isRegister ? "Register" : "Login"}</h2>

      <form
        className="login-form"
        onSubmit={isRegister ? handleRegister : handleLogin}
      >
        {/* Role selection */}
        <div className="role-select">
          <button
            type="button"
            className={`role-btn ${role === "user" ? "active" : ""}`}
            onClick={() => handleRoleSelect("user")}
          >
            User
          </button>
          <button
            type="button"
            className={`role-btn ${role === "admin" ? "active" : ""}`}
            onClick={() => handleRoleSelect("admin")}
          >
            Admin
          </button>
        </div>

        {/* Username input */}
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setError("")
          }}
        />

        {/* Password input with toggle */}
        <div className="password-wrapper">
          <input
            className="login-input password-input"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError("")
            }}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        {/* Submit button */}
        <button
          className="login-btn"
          type="submit"
          disabled={!username || !password}
        >
          {isRegister ? "Register" : "Login"}
        </button>

        {/* Show errors */}
        {(error || authError) && (
          <p className="login-error">{error || authError}</p>
        )}
      </form>

      {/* Toggle login/register */}
      <button
        className="register-toggle-btn"
        onClick={() => {
          setIsRegister(!isRegister)
          setError("")
        }}
      >
        {isRegister ? "Already have an account? Login" : "Create an account"}
      </button>
    </div>
  )
}