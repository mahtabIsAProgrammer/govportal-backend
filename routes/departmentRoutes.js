import e from "express";
import {
  addDepartment,
  getDepartments,
  deleteDepartment,
  updateDepartment,
  getDepartmentById,
} from "../controllers/departmentController.js";
import { authorizeRoles } from "../middlewares/authMiddleware.js";

const router = e.Router();

router.get("/", getDepartments);
router.post("/", addDepartment);
router.get("/:id", getDepartmentById);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);

export default router;
