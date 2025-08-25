import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AdminLogin.css";

function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", formData);

      if (response.data.user && response.data.user.role === "admin") {
        localStorage.setItem("admin_token", response.data.token);
        alert("Admin login successful!");

        navigate("/dashboard");
      } else {
        // This is a regular user, not an admin
        alert("Access denied. You do not have admin privileges.");
      }
    } catch (err) {
      alert("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h2>Admin Panel Login</h2>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
