import express from "express";
import { register, getToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", getToken);

export default router;
