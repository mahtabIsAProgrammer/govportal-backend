import e from "express";
import {
  addDepartment,
  getDepartments,
  deleteDepartment,
  updateDepartment,
  getDepartmentById,
} from "../controllers/departmentController.js";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = e.Router();

router.get("/", authenticateToken, getDepartments);
router.post("/", authenticateToken, authorizeRoles(["admin"]), addDepartment);
router.get("/:id", authenticateToken, getDepartmentById);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  updateDepartment
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  deleteDepartment
);

export default router;
