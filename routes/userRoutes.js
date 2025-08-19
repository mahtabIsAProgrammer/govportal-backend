import e from "express";
import {
  addUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController.js";

const router = e.Router();

router.get("/", getUsers);
router.post("/", addUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

export default router;
