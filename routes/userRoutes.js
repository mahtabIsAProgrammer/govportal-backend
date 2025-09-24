import e from "express";
import {
  addUser,
  getUsers,
  updateUser,
  getUserById,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = e.Router();

router.get("/", authenticateToken, getUsers);
router.post("/", authenticateToken, addUser);
router.get("/:id", authenticateToken, getUserById);
router.put("/:id", authenticateToken, updateUser);

export default router;
