import e from "express";
import {
  addRequestData,
  deleteRequestData,
  getRequestDataById,
  getRequestData,
  updateRequestData,
} from "../controllers/requestDataController.js";

const router = e.Router();

router.get("/", getRequestData);
router.post("/", addRequestData);
router.get("/:id", getRequestDataById);
router.put("/:id", updateRequestData);
router.delete("/:id", deleteRequestData);

export default router;
