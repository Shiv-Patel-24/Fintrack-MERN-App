import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          FinTrack
        </Link>
        <nav className="header-nav">
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/register" className="nav-link btn-primary">
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
