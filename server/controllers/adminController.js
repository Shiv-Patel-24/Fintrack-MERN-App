import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await User.find({})
      .select("-password")
      .skip(skip)
      .limit(limit);
    res.json({ users, currentPage: page, totalPages });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne();
    res.json({ message: "User removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (role && (role === "admin" || role === "user")) {
      user.role = role;
      await user.save();
      res.json({ message: "User role updated successfully", user });
    } else {
      return res.status(400).json({ message: "Invalid role specified" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserFinancials = async (req, res) => {
  try {
    const { year, month, page = 1, limit = 10 } = req.query;
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const query = { user: new mongoose.Types.ObjectId(req.params.id) };
    if (year && month) {
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 1);
      query.date = { $gte: startDate, $lt: endDate };
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalTransactions = await Transaction.countDocuments(query);
    const totalPages = Math.ceil(totalTransactions / parseInt(limit));
    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    const stats = await Transaction.aggregate([
      { $match: query },
      { $group: { _id: "$type", total: { $sum: "$amount" } } },
    ]);
    const summary = {
      totalIncome: stats.find((s) => s._id === "income")?.total || 0,
      totalExpense: stats.find((s) => s._id === "expense")?.total || 0,
    };
    summary.balance = summary.totalIncome - summary.totalExpense;
    res.json({
      user,
      transactions,
      summary,
      currentPage: parseInt(page),
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getPlatformStats = async (req, res) => {
  try {
    const { year, month } = req.query;
    let matchQuery = {};
    if (year) {
      const yearInt = parseInt(year);
      const monthInt = month ? parseInt(month) - 1 : 0;
      const startDate = new Date(yearInt, monthInt, 1);
      const endDate = month
        ? new Date(yearInt, monthInt + 1, 1)
        : new Date(yearInt + 1, 0, 1);
      matchQuery.date = { $gte: startDate, $lt: endDate };
    }
    const stats = await Transaction.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: "$type",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);
    const totalUsers = await User.countDocuments();
    const result = {
      totalUsers,
      totalIncome: stats.find((s) => s._id === "income")?.totalAmount || 0,
      totalExpense: stats.find((s) => s._id === "expense")?.totalAmount || 0,
      incomeTransactions: stats.find((s) => s._id === "income")?.count || 0,
      expenseTransactions: stats.find((s) => s._id === "expense")?.count || 0,
    };
    result.netProfit = result.totalIncome - result.totalExpense;
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
