import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }), // This middleware protects the route
  (req, res) => {
    res.json({
      message: "You have accessed the protected profile route!",
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      },
    });
  }
);

export default router;
