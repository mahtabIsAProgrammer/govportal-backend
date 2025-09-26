import e from "express";
import {
  addRequest,
  getRequests,
  getRequestById,
  updateRequestStatus,
  getMyRequests,
} from "../controllers/requestController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { submitRequestWithPayment } from "../controllers/citizenController.js";

const router = e.Router();

router.get("/", authenticateToken, getRequests);
router.get("/my-requests", authenticateToken, getMyRequests);
router.post("/submit", authenticateToken, submitRequestWithPayment);
router.post("/", authenticateToken, addRequest);
router.patch("/:id/status", authenticateToken, updateRequestStatus);
router.get("/:id", authenticateToken, getRequestById);
// router.put("/:id", authenticateToken, updateRequest);
// router.delete("/:id", authenticateToken, deleteRequest);

export default router;
