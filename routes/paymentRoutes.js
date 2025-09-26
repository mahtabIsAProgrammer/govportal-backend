import e from "express";
import {
  addPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  getPaymentByRequestId,
} from "../controllers/paymentController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = e.Router();

router.get("/", authenticateToken, getPayments);
router.post("/", authenticateToken, addPayment);
router.get("/requests/:request_id", authenticateToken, getPaymentByRequestId);
router.get("/:id", authenticateToken, getPaymentById);
router.put("/:id", updatePayment);
// router.delete("/:id", deletePayment);

export default router;
