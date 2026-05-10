import { Link } from "react-router-dom";
import { categories } from "../utils/constants";

const PublicNavbar = () => {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo">
          NewsPortal
        </Link>
        <nav className="nav-links">
          {categories.map((category) => (
            <Link key={category} to={`/category/${category.toLowerCase()}`} className="nav-item">
              {category}
            </Link>
          ))}
          <Link to="/admin/login" className="link-btn">
            Admin Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default PublicNavbar;
