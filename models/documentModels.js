import db from "../config/db.js";

export const getAllDocuments = async () => {
  const result = await db.query("SELECT * FROM documents");

  return result.rows;
};

export const documentById = async (id) => {
  const result = await db.query("SELECT * FROM documents WHERE id = $1", [id]);
  return result.rows[0];
};

export const createDocument = async ({ request_id, file_path, file_type }) => {
  const result = await db.query(
    "INSERT INTO documents (request_id, file_path, file_type) VALUES ($1, $2, $3) RETURNING *",
    [request_id, file_path, file_type]
  );
  return result.rows[0];
};

export const editDocument = async (
  id,
  { request_id, file_path, file_type }
) => {
  const result = await db.query(
    "UPDATE documents SET user_id = $1, message = $2, is_read = $3 WHERE id = $4 RETURNING *",
    [request_id, file_path, file_type, id]
  );
  return result.rows[0];
};

export const removeDocument = async (id) => {
  const result = await db.query(
    "DELETE FROM documents WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
