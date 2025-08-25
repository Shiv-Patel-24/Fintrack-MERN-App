import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      textAlign: "center",
      backgroundColor: "var(--background-primary)",
      color: "var(--text-primary)",
      fontFamily: "sans-serif",
    },
    title: {
      fontSize: "6rem",
      fontWeight: "bold",
      margin: 0,
    },
    subtitle: {
      fontSize: "1.5rem",
      margin: "0 0 1.5rem 0",
    },
    link: {
      fontSize: "1rem",
      color: "var(--primary-color)",
      textDecoration: "none",
      fontWeight: "bold",
      padding: "0.75rem 1.5rem",
      border: `2px solid var(--primary-color)`,
      borderRadius: "8px",
      transition: "all 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <h2 style={styles.subtitle}>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/dashboard" style={styles.link}>
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
