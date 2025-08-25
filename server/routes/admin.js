import express from "express";
import passport from "passport";
import { isAdmin } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  deleteUser,
  updateUserRole,
  getUserFinancials,
  getPlatformStats,
} from "../controllers/adminController.js";

const router = express.Router();

const auth = passport.authenticate("jwt", { session: false });

router.get("/users", auth, isAdmin, getAllUsers);

router.delete("/users/:id", auth, isAdmin, deleteUser);

router.get("/stats", auth, isAdmin, getPlatformStats);
router.put("/users/:id/role", auth, isAdmin, updateUserRole);

router.get("/users/:id", auth, isAdmin, getUserFinancials);

export default router;
