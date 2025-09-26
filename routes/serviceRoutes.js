import e from "express";
import {
  addService,
  deleteService,
  getServiceById,
  getServices,
  updateService,
} from "../controllers/serviceController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = e.Router();

router.get("/", authenticateToken, getServices);
router.post("/", authenticateToken, addService);
router.get("/:id", authenticateToken, getServiceById);
router.put("/:id", authenticateToken, updateService);
router.delete("/:id", authenticateToken, deleteService);

export default router;
