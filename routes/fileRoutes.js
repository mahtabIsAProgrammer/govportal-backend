import express from "express";
import { upload } from "../utils/multer.js";
import { uploadFileController } from "../controllers/fileController.js";

const router = express.Router();
router.post("/fileUploader", upload.single("image"), uploadFileController);

router.post(
  "/fileUploader/multiple",
  upload.array("images", 10),
  uploadFileController
);

export default router;
