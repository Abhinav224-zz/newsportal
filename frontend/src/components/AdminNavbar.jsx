import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
    logout();
    window.location.replace("/");
  };

  return (
    <header className="navbar admin-navbar">
      <div className="container nav-inner">
        <Link to="/admin" className="logo">
          Admin Desk
        </Link>
        <nav className="nav-links">
          <NavLink to="/admin" className="nav-item">Posts</NavLink>
          <NavLink to="/admin/profile" className="nav-item">My Profile</NavLink>
          <NavLink to="/admin/change-password" className="nav-item">Change Password</NavLink>
          <button className="ghost-btn" onClick={handleSignOut}>Sign Out</button>
        </nav>
      </div>
    </header>
  );
};

export default AdminNavbar;
