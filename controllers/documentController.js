import {
  createDocument,
  editDocument,
  getAllDocuments,
  documentById,
  removeDocument,
} from "../models/documentModels.js";

export const getDocuments = async (req, res) => {
  try {
    const data = await getAllDocuments();
    res.json(data);
  } catch (err) {
    console.log("Error fetching documents: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDocumentById = async (req, res) => {
  const { id } = req.params;

  try {
    const document = await documentById(id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(document);
  } catch (err) {
    console.log("Error fetching document by id: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addDocument = async (req, res) => {
  const { request_id, file_path, file_type } = req.body;

  try {
    if (!user_id) {
      return res.status(400).json({
        error: "user is required",
      });
    }
    const newDocument = await createDocument({
      request_id,
      file_path,
      file_type,
    });
    res.status(201).json(newDocument);
  } catch (err) {
    console.log("Error creating documents: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateDocument = async (req, res) => {
  const { id } = req.params;
  const { request_id, file_path, file_type } = req.body;
  try {
    const updated = await editDocument(id, {
      request_id,
      file_path,
      file_type,
    });

    if (!updated) {
      return res.status(404).json({ error: "document Not Found" });
    }

    res.json(updated);
  } catch (err) {
    console.log("Error updating documents: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await removeDocument(id);

    if (!deleted) {
      return res.status(404).json({ error: "document Not Found" });
    }

    res.json({ message: "document deleted successfully", deleted });
  } catch (err) {
    console.log("Error deleting documents", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
