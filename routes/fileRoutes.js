import express from "express";
import { upload } from "../utils/multer.js";
import { uploadFileController } from "../controllers/fileController.js";

const router = express.Router();

// Single file
router.post("/fileUploader", upload.single("image"), uploadFileController);

// Multiple files (optional)
router.post(
  "/fileUploader/multiple",
  upload.array("images", 10),
  uploadFileController
);

export default router;
