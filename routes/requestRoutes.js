import e from "express";
import {
  addRequest,
  deleteRequest,
  getRequestById,
  getRequests,
  updateRequest,
} from "../controllers/requestController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = e.Router();

router.get("/", authenticateToken, getRequests);
router.post("/", authenticateToken, addRequest);
router.get("/:id", getRequestById);
router.put("/:id", updateRequest);
router.delete("/:id", deleteRequest);

export default router;
