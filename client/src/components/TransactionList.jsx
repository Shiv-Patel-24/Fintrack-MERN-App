import React from "react";

function TransactionList({ transactions, onDelete, onEdit }) {
  if (transactions.length === 0) {
    return <p>No transactions yet. Add one to get started!</p>;
  }

  return (
    <ul className="transaction-list">
      {transactions.map((t) => (
        <li key={t._id} className={`transaction-item ${t.type}`}>
          <div className="transaction-details">
            <span className="transaction-category">{t.category}</span>
            <span className="transaction-description">{t.description}</span>
          </div>
          <div className="transaction-info">
            <span className="transaction-amount">₹{t.amount.toFixed(2)}</span>
            <span className="transaction-date">
              {new Date(t.date).toLocaleDateString()}
            </span>
          </div>
          <div className="transaction-actions">
            <button onClick={() => onEdit(t)} className="edit-btn">
              Edit
            </button>
            <button onClick={() => onDelete(t._id)} className="delete-btn">
              &times;
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;
