import {
  getProfileInfo,
  updateProfileInfo,
  changePassword,
} from "../controllers/profileInfoController.js";
import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getProfileInfo);
router.put("/", authenticateToken, updateProfileInfo);
router.put("/password", authenticateToken, changePassword);

export default router;
