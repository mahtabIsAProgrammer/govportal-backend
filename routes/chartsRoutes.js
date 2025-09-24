// routes/dashboardRoutes.ts
import { Router } from "express";

import {
  getApprovalRejectionRates,
  getPaymentsByMonth,
  getPaymentsByService,
  getRequestsByMonth,
  getRequestsByOfficer,
  getRequestsByService,
  getRequestsByStatus,
  getTotalAdmins,
  getTotalCitizens,
  getTotalDepartmentHead,
  getTotalOfficers,
  getTotalUsers,
} from "../controllers/chartsController.js";

const router = Router();

// Requests
router.get("/requests/status", getRequestsByStatus);
router.get("/requests/service", getRequestsByService);
router.get("/requests/month", getRequestsByMonth);
router.get("/requests/officer", getRequestsByOfficer);
router.get("/requests/approval-rejection", getApprovalRejectionRates);

// Payments
router.get("/payments/month", getPaymentsByMonth);
router.get("/payments/service", getPaymentsByService);

// Users
router.get("/citizens/total", getTotalCitizens);
router.get("/officers/total", getTotalOfficers);
router.get("/dept-head/total", getTotalDepartmentHead);
router.get("/admin/total", getTotalAdmins);
router.get("/all/total", getTotalUsers);

export default router;
