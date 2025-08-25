import React, { useState, useEffect } from "react";
import "./EditTransactionModal.css";

function EditTransactionModal({ transaction, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...transaction });

  useEffect(() => {
    setFormData({ ...transaction });
  }, [transaction]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!transaction) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Edit Transaction</h2>
        <form onSubmit={handleSubmit}>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="modal-actions">
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTransactionModal;
