import { Link, useLocation } from "react-router"

export const Navbar = () => {
    const location = useLocation() // Get the current location from the useLocation hook
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link className="brand-link" to="/">🎵 Music Player</Link>
            </div>

            <div className="navbar-links">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">All Songs</Link>
                <Link className={`nav-link ${location.pathname === "/playlists" ? "active" : ""}`} to="/playlists">Playlists</Link>
                <Link className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`} to="/profile">Profile</Link>
                <Link className={`nav-link ${location.pathname === "/demo" ? "active" : ""}`} to="/demo">Demo</Link>
            </div>
        </nav>
    );
}
