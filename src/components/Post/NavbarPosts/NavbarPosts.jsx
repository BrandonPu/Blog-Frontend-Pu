import { NavLink } from "react-router-dom";
import "./NavbarPosts.css";

export const NavbarPosts = () => {
  return (
    <nav className="navbar-posts">
      <div className="navbar-posts-logo">📘 Blog</div>
      <div className="navbar-posts-links">
        <NavLink to="/" className="navbar-posts-link">
          Cerrar Sesión
        </NavLink>
      </div>
    </nav>
  );
};