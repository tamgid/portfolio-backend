import express from "express";
import * as adminController from "../controllers/adminController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

// POST /register route to register as an admin
router.post("/register", adminController.registerUser);

// POST /login route to login as an admin
router.post("/login", adminController.loginUser);

// POST /admin-details for adding admin details
router.post(
  "/admin-details",
  authenticateToken,
  adminController.addAdminDetails
);

export default router;
