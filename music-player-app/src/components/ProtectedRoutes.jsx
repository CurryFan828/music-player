// src/components/ProtectedRoute.jsx
import { useAuth } from "../contexts/AuthContexts";
import { useNavigate } from "react-router";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If not logged in, show a message with a login button
  if (!user) {
    return (
      <div className="protected-container">
        <div className="protected-card">
          <h2 className="protected-title">Access Denied</h2>
          <p className="protected-text">
            You must be logged in to access this page.
          </p>
          <button
            className="login-btn"
            onClick={() => navigate("/profile")}
          >
            Go to Login / Register
          </button>
        </div>
      </div>
    );
  }

  // If logged in, render the protected page
  return children;
};