import db from "../config/db.js";
import path from "path";

export const uploadFileController = async (req, res) => {
  try {
    const file = req.file || req.files; // single or multiple
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // Handle multiple files
    const filesArray = Array.isArray(file) ? file : [file];
    const uploadedFiles = [];

    for (const f of filesArray) {
      const folder = f.destination.split(path.sep).pop();
      const filePath = path.join(folder, f.filename);

      // Save metadata to DB
      const result = await db.query(
        `INSERT INTO uploads (user_id, path, original_name, mime_type, size, folder_name)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
          req.user?.id || null,
          filePath,
          f.originalname,
          f.mimetype,
          f.size,
          folder,
        ]
      );

      uploadedFiles.push({
        id: result.rows[0].id,
        url: `/${filePath}`,
        mime_type: f.mimetype,
      });
    }

    res.status(200).json({ data: uploadedFiles });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
