import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";

import TransactionForm from "../components/TransactionForm.jsx";
import TransactionList from "../components/TransactionList.jsx";
import EditTransactionModal from "../components/EditTransactionModal.jsx";
import SummaryChart from "../components/SummaryChart.jsx";
import Pagination from "../components/Pagination.jsx";
import ExportModal from "../components/ExportModal.jsx";
import Spinner from "../components/Spinner.jsx";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState({
    balance: 0,
    totalIncome: 0,
    totalExpense: 0,
  });
  const [yearlySummary, setYearlySummary] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .get("/user/profile")
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const fetchTransactions = useCallback(async () => {
    if (user) {
      try {
        const params = {
          year: selectedYear,
          month: selectedMonth,
          page: currentPage,
          type: typeFilter === "all" ? "" : typeFilter,
        };
        const response = await api.get("/transactions", { params });
        setTransactions(response.data.transactions);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    }
  }, [user, selectedYear, selectedMonth, currentPage, typeFilter]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    if (user) {
      api
        .get("/transactions/stats", {
          params: { year: selectedYear, month: selectedMonth },
        })
        .then((res) => setMonthlyStats(res.data))
        .catch((err) => console.error("Failed to fetch monthly stats:", err));

      api
        .get("/transactions/summary", { params: { year: selectedYear } })
        .then((res) => setYearlySummary(res.data))
        .catch((err) => console.error("Failed to fetch summary:", err));
    }
  }, [user, selectedYear, selectedMonth, transactions]);

  const handleAddTransaction = useCallback(() => {
    fetchTransactions();
  }, [fetchTransactions]);
  const handleDeleteTransaction = useCallback(
    async (id) => {
      if (window.confirm("Are you sure you want to delete this transaction?")) {
        try {
          await api.delete(`/transactions/${id}`);
          fetchTransactions(); // Refetch
          alert("Transaction deleted!");
        } catch (err) {
          console.error("Failed to delete transaction:", err);
          alert("Failed to delete transaction.");
        }
      }
    },
    [fetchTransactions]
  );
  const handleOpenEditModal = useCallback((transaction) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setEditingTransaction(null);
    setIsEditModalOpen(false);
  }, []);
  const handleSaveChanges = useCallback(
    async (updatedTransaction) => {
      try {
        await api.put(
          `/transactions/${updatedTransaction._id}`,
          updatedTransaction
        );
        fetchTransactions(); // Refetch
        handleCloseEditModal();
        alert("Transaction updated!");
      } catch (err) {
        console.error("Failed to update transaction:", err);
        alert("Failed to update transaction.");
      }
    },
    [fetchTransactions, handleCloseEditModal]
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <Spinner />;
  }

  const yearOptions = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <>
      <div className="dashboard-header-simple">
        <h1>Dashboard</h1>
        <div className="balance-container">
          {typeFilter === "all" && (
            <>
              <h2>This Month's Profit/Loss</h2>
              <span
                className={`balance ${
                  monthlyStats.balance >= 0 ? "positive" : "negative"
                }`}
              >
                ₹{monthlyStats.balance.toFixed(2)}
              </span>
            </>
          )}
          {typeFilter === "income" && (
            <>
              <h2>This Month's Total Income</h2>
              <span className="balance positive">
                ₹{monthlyStats.totalIncome.toFixed(2)}
              </span>
            </>
          )}
          {typeFilter === "expense" && (
            <>
              <h2>This Month's Total Expense</h2>
              <span className="balance negative">
                ₹{monthlyStats.totalExpense.toFixed(2)}
              </span>
            </>
          )}
        </div>
        {yearlySummary && (
          <div className="balance-container">
            <h2>{yearlySummary.year} Profit/Loss</h2>
            <span
              className={`balance ${
                yearlySummary.profit >= 0 ? "positive" : "negative"
              }`}
            >
              ₹{yearlySummary.profit.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <main className="dashboard-main">
        <div className="dashboard-left">
          <div className="dashboard-section">
            <h2>Add New Transaction</h2>
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>
          <div className="dashboard-section">
            <h2>This Month's Summary</h2>
            <div className="chart-container">
              <SummaryChart
                // key={`${selectedYear}-${selectedMonth}-${typeFilter}`}
                totalIncome={monthlyStats.totalIncome}
                totalExpense={monthlyStats.totalExpense}
              />
            </div>
          </div>
        </div>
        <div className="dashboard-right">
          <div className="dashboard-section">
            <div className="transactions-header">
              <h2>Your Transactions</h2>
              <div className="filters-container">
                <button
                  className="export-btn"
                  onClick={() => setIsExportModalOpen(true)}
                >
                  Export
                </button>
                <div className="type-filters">
                  <button
                    onClick={() => {
                      setTypeFilter("all");
                      setCurrentPage(1);
                    }}
                    className={typeFilter === "all" ? "active" : ""}
                  >
                    All
                  </button>
                  <button
                    onClick={() => {
                      setTypeFilter("income");
                      setCurrentPage(1);
                    }}
                    className={typeFilter === "income" ? "active" : ""}
                  >
                    Income
                  </button>
                  <button
                    onClick={() => {
                      setTypeFilter("expense");
                      setCurrentPage(1);
                    }}
                    className={typeFilter === "expense" ? "active" : ""}
                  >
                    Expense
                  </button>
                </div>
                <div className="date-filters">
                  <select
                    value={selectedMonth}
                    onChange={(e) => {
                      setSelectedMonth(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {new Date(0, i).toLocaleString("en-IN", {
                          month: "long",
                        })}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedYear}
                    onChange={(e) => {
                      setSelectedYear(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <TransactionList
              transactions={transactions}
              onDelete={handleDeleteTransaction}
              onEdit={handleOpenEditModal}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>

      {isEditModalOpen && (
        <EditTransactionModal
          transaction={editingTransaction}
          onSave={handleSaveChanges}
          onCancel={handleCloseEditModal}
        />
      )}
      {isExportModalOpen && (
        <ExportModal
          onCancel={() => setIsExportModalOpen(false)}
          currentFilters={{ year: selectedYear, month: selectedMonth }}
        />
      )}
    </>
  );
}

export default Dashboard;
