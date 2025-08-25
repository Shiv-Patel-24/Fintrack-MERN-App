import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <Header />
      <main className="hero-section">
        <div className="hero-content">
          <h1>Effortless Income and Expense Tracking</h1>
          <p>
            Get a clear view of your finances. Simple, secure, and always
            available.
          </p>
          <Link to="/register" className="hero-cta-button">
            Get Started for Free
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="/finance-illustration.svg"
            alt="Financial Tracking Illustration"
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
