import express from "express";
import passport from "passport";
import { isAdmin } from "../middleware/authMiddleware.js";
import { getAllUsers } from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  getAllUsers
);

export default router;
