import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, onLogout }) {
  if (!user) {
    return null;
  }

  return (
    <nav className="main-navbar">
      <div className="navbar-logo">
        <Link to="/dashboard">FinTrack</Link>
      </div>
      <div className="navbar-user">
        <span>Welcome, {user.name}</span>
        <button onClick={onLogout} className="navbar-logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
