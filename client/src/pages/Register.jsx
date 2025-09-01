import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api.js";
import "./AuthPages.css";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", formData);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error(
        "Registration failed:",
        err.response?.data?.message || err.message
      );
      alert(
        `Registration failed: ${
          err.response?.data?.message || "Please try again."
        }`
      );
    }
  };

  // Add the Google login handler
  const handleGoogleLogin = () => {
    // window.location.href = "http://localhost:5000/api/auth/google";
    // window.location.href = 'https://fintrack-server-jgws.onrender.com/api/auth/google';
    window.location.href = `${API_URL}/api/auth/google`;
  };

  return (
    <div className="auth-page-container">
      <div className="auth-art-section">
        <img
          src="/finance-illustration.svg"
          alt="Financial data illustration"
        />
        <h2>Track Your Income Effortlessly</h2>
        <p>Get a clear and precise view of your finances all in one place.</p>
      </div>
      <div className="auth-form-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Create Your Account</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Create Account</button>
          <div className="separator">OR</div>

          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleLogin}
          >
            Sign up with Google
          </button>
          <p className="form-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
