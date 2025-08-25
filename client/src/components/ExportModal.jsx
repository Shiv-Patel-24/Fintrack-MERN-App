import React, { useState } from "react";
import api from "../services/api.js";
import "./ExportModal.css";

function ExportModal({ onCancel, currentFilters }) {
  const [exportType, setExportType] = useState("current");
  const [year, setYear] = useState(new Date().getFullYear());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDownload = async () => {
    try {
      let params = {};
      if (exportType === "current") {
        params = { year: currentFilters.year, month: currentFilters.month };
      } else if (exportType === "year") {
        params = { year };
      } else if (exportType === "range") {
        if (!startDate || !endDate) {
          alert("Please select a start and end date.");
          return;
        }
        params = { startDate, endDate };
      }

      const response = await api.get("/transactions/export", { params });

      // Trigger file download
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "transactions.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      onCancel(); // Close the modal
    } catch (err) {
      console.error("Export failed:", err);
      alert("Export failed. No data for this period or server error.");
    }
  };

  const yearOptions = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Export Transactions</h2>
        <div className="export-option">
          <input
            type="radio"
            id="current"
            name="exportType"
            value="current"
            checked={exportType === "current"}
            onChange={(e) => setExportType(e.target.value)}
          />
          <label htmlFor="current">
            Export Current View (
            {new Date(0, currentFilters.month - 1).toLocaleString("default", {
              month: "long",
            })}{" "}
            {currentFilters.year})
          </label>
        </div>
        <div className="export-option">
          <input
            type="radio"
            id="year"
            name="exportType"
            value="year"
            checked={exportType === "year"}
            onChange={(e) => setExportType(e.target.value)}
          />
          <label htmlFor="year">Export Whole Year</label>
          {exportType === "year" && (
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="export-option">
          <input
            type="radio"
            id="range"
            name="exportType"
            value="range"
            checked={exportType === "range"}
            onChange={(e) => setExportType(e.target.value)}
          />
          <label htmlFor="range">Export Custom Date Range</label>
          {exportType === "range" && (
            <div className="date-range-picker">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span>to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="modal-actions">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" onClick={handleDownload}>
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExportModal;
