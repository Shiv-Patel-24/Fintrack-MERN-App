import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { registerUser, loginUser } from "../controllers/authController.js";
import {
  validate,
  registerSchema,
  loginSchema,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);

router.post("/login", validate(loginSchema), loginUser);

router.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout successful" });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const payload = {
      id: req.user.id,
      name: req.user.name,
      role: req.user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
    // Redirect to the frontend dashboard
    res.redirect("http://localhost:5173/dashboard");
  }
);

export default router;
