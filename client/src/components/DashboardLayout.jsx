import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import Spinner from "./Spinner.jsx"; 
import MobileNavbar from "./MobileNavbar.jsx";
import api from "../services/api.js";
import "./DashboardLayout.css";

function DashboardLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data.user);
      } catch (err) {
        console.log(err)
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      alert("You have been logged out.");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="app-layout">
      <Sidebar
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <MobileNavbar onMenuClick={toggleSidebar} />
      <div className="main-content">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="content-outlet">
          <Outlet context={{ user }} />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout;