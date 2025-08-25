import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import "./ThemeToggler.css";

function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggler-container">
      <span>☀️</span>
      <label className="switch">
        <input
          type="checkbox"
          onChange={toggleTheme}
          checked={theme === "dark"}
        />
        <span className="slider round"></span>
      </label>
      <span>🌙</span>
    </div>
  );
}

export default ThemeToggler;
