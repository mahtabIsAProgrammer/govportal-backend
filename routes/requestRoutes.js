import e from "express";
import {
  addRequest,
  deleteRequest,
  getRequestById,
  getRequests,
  updateRequest,
  updateRequestStatus,
} from "../controllers/requestController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { submitRequestWithPayment } from "../controllers/citizenController.js";

const router = e.Router();

router.get("/", authenticateToken, getRequests);
router.post("/submit", authenticateToken, submitRequestWithPayment);
router.post("/", authenticateToken, addRequest);
router.patch("/:id/status", updateRequestStatus);
router.get("/:id", getRequestById);
router.put("/:id", updateRequest);
router.delete("/:id", deleteRequest);

export default router;
