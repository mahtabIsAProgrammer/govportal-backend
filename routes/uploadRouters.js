// routes/fileRoutes.js
import express from "express";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/fileUploader", upload.single("file"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ success: false, error: "No file uploaded" });

  const filePath = `/uploads/${req.query.folder || "uploads"}/${
    req.file.filename
  }`;

  res.json({
    success: true,
    data: {
      file_path: filePath,
      file_type: req.file.mimetype,
    },
  });
});

export default router;
