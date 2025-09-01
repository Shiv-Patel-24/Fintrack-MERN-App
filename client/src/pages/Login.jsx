import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api.js";
import { useIntroAnimation } from "../hooks/useIntroAnimation.js";
import "./AuthPages.css";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { artSectionRef, formSectionRef } = useIntroAnimation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/login", formData);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message
      );
      alert(
        `Login failed: ${err.response?.data?.message || "Please try again."}`
      );
    }
  };

  const handleGoogleLogin = () => {
    // window.location.href = "http://localhost:5000/api/auth/google";
    window.location.href = '${API_URL}/api/auth/google';   
                            // https://fintrack-server-jgws.onrender.com
  };

  return (
    <div className="auth-page-container">
      <div className="auth-art-section" ref={artSectionRef}>
        <img
          src="/finance-illustration.svg"
          alt="Financial data illustration"
        />
        <h2>Track Your Income Effortlessly</h2>
        <p>Get a clear and precise view of your finances all in one place.</p>
      </div>

      <div className="auth-form-section" ref={formSectionRef}>
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Welcome Back!</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <div className="separator">OR</div>
          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </button>
          <button type="submit">Login</button>
          <p className="form-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
