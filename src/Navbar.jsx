import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        DEV@Deakin
      </Link>

      <input
        type="text"
        placeholder="Search..."
        className="navbar-search"
      />

      <Link to="#" className="navbar-post">
        Post
      </Link>

      <Link to="/login" className="navbar-login">
        Login
      </Link>

    </nav>
  );
}

export default Navbar;