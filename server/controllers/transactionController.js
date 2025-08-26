import Transaction from "../models/Transaction.js";
import { Parser } from "json2csv";

export const createTransaction = async (req, res) => {
  const { type, amount, category, description, date } = req.body;

  try {
    const newTransaction = new Transaction({
      type,
      amount,
      category,
      description,
      date,
      user: req.user.id,
    });

    const transaction = await newTransaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { year, month, type, page = 1, limit = 10 } = req.query; // Get year and month from query params as well as limit of page.
    const query = { user: req.user.id };

    if (year && month) {
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 1);
      query.date = { $gte: startDate, $lt: endDate };
    }

    if (type && (type === "income" || type === "expense")) {
      query.type = type;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get total count for the filtered query to calculate total pages.
    const totalTransactions = await Transaction.countDocuments(query);
    const totalPages = Math.ceil(totalTransactions / parseInt(limit));

    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    res.json({ transactions, currentPage: parseInt(page), totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await transaction.deleteOne();

    res.json({ message: "Transaction removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const { type, amount, category, description, date } = req.body;
    transaction.type = type || transaction.type;
    transaction.amount = amount || transaction.amount;
    transaction.category = category || transaction.category;
    transaction.description = description || transaction.description;
    transaction.date = date || transaction.date;

    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getTransactionSummary = async (req, res) => {
  try {
    const { year } = req.query;
    if (!year) {
      return res.status(400).json({ message: "Year is required" });
    }

    const startDate = new Date(parseInt(year), 0, 1);
    const endDate = new Date(parseInt(year) + 1, 0, 1);

    const summary = await Transaction.aggregate([
      {
        $match: { user: req.user._id, date: { $gte: startDate, $lt: endDate } },
      },
      { $group: { _id: "$type", total: { $sum: "$amount" } } },
    ]);

    const result = {
      year: parseInt(year),
      totalIncome: summary.find((s) => s._id === "income")?.total || 0,
      totalExpense: summary.find((s) => s._id === "expense")?.total || 0,
    };
    result.profit = result.totalIncome - result.totalExpense;

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getTransactionStats = async (req, res) => {
  try {
    const { year, month } = req.query;
    if (!year || !month) {
      return res.status(400).json({ message: "Year and month are required" });
    }

    const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    const endDate = new Date(parseInt(year), parseInt(month), 1);

    const stats = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          date: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const result = {
      totalIncome: stats.find((s) => s._id === "income")?.total || 0,
      totalExpense: stats.find((s) => s._id === "expense")?.total || 0,
    };
    result.balance = result.totalIncome - result.totalExpense;

    res.json(result);
  } catch (error) {
    console.error("Error fetching transaction stats:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const exportTransactions = async (req, res) => {
  try {
    const { year, month, startDate, endDate } = req.query;
    const query = { user: req.user.id };

    if (year && month) {
      query.date = {
        $gte: new Date(parseInt(year), parseInt(month) - 1, 1),
        $lt: new Date(parseInt(year), parseInt(month), 1),
      };
    } else if (year) {
      query.date = {
        $gte: new Date(parseInt(year), 0, 1),
        $lt: new Date(parseInt(year) + 1, 0, 1),
      };
    } else if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lt: new Date(endDate),
      };
    }

    const transactions = await Transaction.find(query).sort({ date: "asc" });

    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for the selected period." });
    }

    const fields = ["date", "type", "category", "amount", "description"];
    const opts = { fields };

    const parser = new Parser(opts);
    const csv = parser.parse(transactions);

    res.header("Content-Type", "text/csv");
    res.attachment("transactions.csv");
    res.send(csv);
  } catch (error) {
    console.error("Error exporting transactions:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

