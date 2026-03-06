// This component will display the user's favorite songs. 
// It will use the useMusic hook to get the list of favorite songs and the function 
// to handle playing a song. It will also display the currently playing song and its details.
import { useState } from "react"
import { useAuth } from "../contexts/AuthContexts"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { AiOutlineUser } from "react-icons/ai" // Ant Design

export const Profile = () => {

  const { user, login, logout } = useAuth()
  const [role, setRole] = useState("") // State to track selected role
  const [activeRole, setActiveRole] = useState("") // Role to use after login for authorization
  const [username, setUsername] = useState("") // State to track username input
  const [password, setPassword] = useState("") // State to track password input
  const [showPassword, setShowPassword] = useState(false) // State to toggle password visibility
  const [error, setError] = useState("") // State to track login errors

  // Function to handle login form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Only show role error if user and password have values
    if (!role && username && password) {
      setError("Please choose a role before logging in")
      return
    }

    const success = login(username, password, role)

    if (!success) {
      setError("Login failed")
      return
    }

    // Set active role to what was selected in the form
    setActiveRole(role)
  }

  // Function to handle role button selection
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole)
    setError("") // clear error once user selects a role
  }

  // If user is logged in, show their profile
  if (user) {
    return (
      <div className="profile">
        <h2>Profile</h2>

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar">
            <AiOutlineUser size={40} />
          </div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Role:</strong> {activeRole || user.role}</p>

          {/* Role-based Content using the selected role */}
          {activeRole === "admin" ? (
            <div className="admin-panel">
              <h3>Admin Panel</h3>
              <p>Here you can manage users and access admin features.</p>
              {/* Add admin-specific buttons or links here */}
            </div>
          ) : (
            <div className="user-panel">
              <h3>User Dashboard</h3>
              <p>Here you can see your playlists and favorite songs.</p>
              {/* Add user-specific content here */}
            </div>
          )}

          <button className="logout-btn" onClick={() => {
            logout()
            setActiveRole("") // Reset active role on logout
          }}>
            Logout
          </button>
        </div>
      </div>
    )
  }

  // Login form
  return (
    <div className="profile">

      <h2>Login</h2>

      <form className="login-form" onSubmit={handleSubmit}>

        {/* Choose user or admin */}
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

        {/* Input login info */}
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password input with toggle */}
        <div className="password-wrapper">
          <input
            className="login-input password-input"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={20}/> : <FiEye size={20}/>}
          </button>
        </div>

        {/* Login button */}
        <button
          className="login-btn"
          type="submit"
          disabled={!username || !password} // disable if user/pass empty
        >
          Login
        </button>

        {/* Show error under the login button */}
        {error && <p className="login-error">{error}</p>}

      </form>

    </div>
  )
}