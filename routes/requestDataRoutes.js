import e from "express";
import {
  addRequestData,
  getRequestData,
  getRequestDataByRequestId,
} from "../controllers/requestDataController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = e.Router();

router.get("/", authenticateToken, getRequestData);
router.post("/", authenticateToken, addRequestData);
router.get("/:id", authenticateToken, getRequestDataByRequestId);
// router.get("/:id", getRequestDataById);
// router.put("/:id", updateRequestData);
// router.delete("/:id", deleteRequestData);

export default router;
