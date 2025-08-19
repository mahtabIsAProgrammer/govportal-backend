import e from "express";
import {
  addDepartment,
  deleteDepartment,
  getDepartmentById,
  getDepartments,
  updateDepartment,
} from "../controllers/departmentController.js";

const router = e.Router();

router.get("/", getDepartments);
router.post("/", addDepartment);
router.get("/:id", getDepartmentById);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);

export default router;
