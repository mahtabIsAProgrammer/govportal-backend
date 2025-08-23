import e from "express";
import {
  addPayment,
  deletePayment,
  getPaymentById,
  getPayments,
  updatePayment,
} from "../controllers/paymentController.js";

const router = e.Router();

router.get("/", getPayments);
router.post("/", addPayment);
router.get("/:id", getPaymentById);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

export default router;
