import express from "express";
import passport from "passport";
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  getTransactionSummary,
  getTransactionStats,
  exportTransactions,
} from "../controllers/transactionController.js";

const router = express.Router();

const auth = passport.authenticate("jwt", { session: false });

router.get("/stats", auth, getTransactionStats);

router.route("/").post(auth, createTransaction).get(auth, getTransactions);

router.get("/export", auth, exportTransactions);
router.get("/stats", auth, getTransactionStats);

router
  .route("/:id")
  .delete(auth, deleteTransaction)
  .put(auth, updateTransaction);

router.get("/summary", auth, getTransactionSummary);

export default router;
