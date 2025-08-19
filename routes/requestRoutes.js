import e from "express";
import {
  addRequest,
  deleteRequest,
  getRequestById,
  getRequests,
  updateRequest,
} from "../controllers/requestController.js";

const router = e.Router();

router.get("/", getRequests);
router.post("/", addRequest);
router.get("/:id", getRequestById);
router.put("/:id", updateRequest);
router.delete("/:id", deleteRequest);

export default router;
