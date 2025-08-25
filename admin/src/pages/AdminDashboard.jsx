import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    year: new Date().getFullYear(),
    month: "all", // Default to the whole year
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const params = { year: filters.year };
      if (filters.month !== "all") {
        params.month = filters.month;
      }
      const response = await api.get("/admin/stats", { params });
      setStats(response.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      alert("Could not fetch platform stats.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const yearOptions = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  if (loading) {
    return <div className="loading-message">Loading statistics...</div>;
  }

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <h1>Platform Dashboard</h1>
        <div className="date-filters-admin">
          <select
            name="month"
            value={filters.month}
            onChange={handleFilterChange}
          >
            <option value="all">Whole Year</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("en-IN", { month: "long" })}
              </option>
            ))}
          </select>
          <select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <Link to="/users" className="nav-link">
          Manage Users
        </Link>
      </div>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
          <div className="stat-card income">
            <h3>Total Income</h3>
            <p>₹{stats.totalIncome.toFixed(2)}</p>
          </div>
          <div className="stat-card expense">
            <h3>Total Expense</h3>
            <p>₹{stats.totalExpense.toFixed(2)}</p>
          </div>
          <div
            className={`stat-card ${
              stats.netProfit >= 0 ? "income" : "expense"
            }`}
          >
            <h3>Net Profit</h3>
            <p>₹{stats.netProfit.toFixed(2)}</p>
          </div>
          <div className="stat-card">
            <h3>Income Transactions</h3>
            <p>{stats.incomeTransactions}</p>
          </div>
          <div className="stat-card">
            <h3>Expense Transactions</h3>
            <p>{stats.expenseTransactions}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
