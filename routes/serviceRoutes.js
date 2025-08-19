import e from "express";
import {
  addService,
  deleteService,
  getServiceById,
  getServices,
  updateService,
} from "../controllers/serviceController.js";

const router = e.Router();

router.get("/", getServices);
router.post("/", addService);
router.get("/:id", getServiceById);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
