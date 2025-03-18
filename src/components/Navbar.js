import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container">
        <Link className="navbar-brand text-white" to="/">
          Tinig ng Bayan: 2025 Elections Blog
        </Link>
        <div className="d-flex align-items-center">
          {!user ? (
            <>
              <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
              <Link className="btn btn-warning" to="/register">Register</Link>
            </>
          ) : (
            <>
              <Link className="btn btn-light me-2" to="/profile">
                {user.username ? `${user.username}'s Profile` : "Profile"}
              </Link>
              {user.isAdmin && <Link className="btn btn-danger me-2" to="/admin">Admin</Link>}
              <button onClick={handleLogout} className="btn btn-dark">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
