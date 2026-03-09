import { Link, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContexts";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link className="brand-link" to="/">🎵 Music Player</Link>
      </div>

      {/* Hamburger for mobile */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/" onClick={() => setMenuOpen(false)}>
          All Songs
        </Link>

        <Link className={`nav-link ${location.pathname === "/playlists" ? "active" : ""}`} to="/playlists" onClick={() => setMenuOpen(false)}>
          Playlists
        </Link>

        <Link className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`} to="/profile" onClick={() => setMenuOpen(false)}>
          Profile
        </Link>

        {user ? (
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        ) : (
          <Link to="/profile" className="nav-link" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};