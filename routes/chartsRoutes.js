// routes/dashboardRoutes.ts
import { Router } from "express";

import {
  getTotalUsers,
  getTotalAdmins,
  getTotalCitizens,
  getTotalOfficers,
  getRequestsByMonth,
  getPaymentsByMonth,
  getRequestsByStatus,
  getPaymentsByService,
  getRequestsByOfficer,
  getRequestsByService,
  getTotalDepartmentHead,
  getApprovalRejectionRates,
} from "../controllers/chartsController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

// Requests
router.get("/requests/status", authenticateToken, getRequestsByStatus);
router.get("/requests/service", authenticateToken, getRequestsByService);
router.get("/requests/month", authenticateToken, getRequestsByMonth);
router.get("/requests/officer", authenticateToken, getRequestsByOfficer);
router.get(
  "/requests/approval-rejection",
  authenticateToken,
  getApprovalRejectionRates
);

// Payments
router.get("/payments/month", authenticateToken, getPaymentsByMonth);
router.get("/payments/service", authenticateToken, getPaymentsByService);

// Users
router.get("/citizens/total", authenticateToken, getTotalCitizens);
router.get("/officers/total", authenticateToken, getTotalOfficers);
router.get("/dept-head/total", authenticateToken, getTotalDepartmentHead);
router.get("/admin/total", authenticateToken, getTotalAdmins);
router.get("/all/total", authenticateToken, getTotalUsers);

export default router;
