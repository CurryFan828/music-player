import { Link, useLocation } from "react-router"
import { useAuth } from "../contexts/AuthContexts"

export const Navbar = () => {

    const location = useLocation()
    const { user, logout } = useAuth()

    return (
        <nav className="navbar">

            <div className="navbar-brand">
                <Link className="brand-link" to="/">🎵 Music Player</Link>
            </div>

            <div className="navbar-links">

                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">
                    All Songs
                </Link>

                <Link className={`nav-link ${location.pathname === "/playlists" ? "active" : ""}`} to="/playlists">
                    Playlists
                </Link>

                <Link className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`} to="/profile">
                    Profile
                </Link>

                {user ? (
                    <button onClick={logout} className="logout-btn">
                        Logout
                    </button>
                ) : (
                    <Link to="/profile" className="nav-link">
                        Login
                    </Link>
                )}

            </div>

        </nav>
    )
}   