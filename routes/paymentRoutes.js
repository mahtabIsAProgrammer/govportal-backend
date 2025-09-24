import e from "express";
import {
  addPayment,
  getPayments,
  getPaymentById,
} from "../controllers/paymentController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = e.Router();

router.get("/", authenticateToken, getPayments);
router.post("/", authenticateToken, addPayment);
router.get("/:id", authenticateToken, getPaymentById);
// router.put("/:id", updatePayment);
// router.delete("/:id", deletePayment);

export default router;
