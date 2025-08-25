import React, { useState } from "react";
import api from "../services/api.js";

function TransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    type: "income",
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(formData.amount) <= 0) {
      alert("Amount must be greater than zero.");
      return;
    }
    try {
      // Corrected the path here
      const response = await api.post("/transactions", formData);
      onAddTransaction(response.data);
      // Reset form
      setFormData({
        type: "income",
        amount: "",
        category: "",
        description: "",
        date: new Date().toISOString().slice(0, 10),
      });
      alert("Transaction added!");
    } catch (err) {
      console.error("Failed to add transaction:", err);
      alert("Failed to add transaction.");
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category (e.g., Salary, Rent)"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description (Optional)"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
