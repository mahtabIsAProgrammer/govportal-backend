import express from "express";

import {
  register,
  getToken,
  identityVerify,
} from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", getToken);
router.get("/verify", authenticateToken, identityVerify);

export default router;
