import db from "../config/db.js";

export const getAllDocuments = async ({
  pageNumber = 1,
  pageSize = 10,
  keyword,
}) => {
  let query = "SELECT * FROM documents";

  let values = [];
  let conditions = [];

  if (keyword) {
    values.push(`%${keyword}%`);
    conditions.push(`file_path ILIKE $${values.length}`);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  const offset = (pageNumber - 1) * pageSize;
  values.push(pageSize, offset);

  query += ` ORDER BY id DESC LIMIT $${values.length - 1} OFFSET $${
    values.length
  }`;

  const result = await db.query(query, values);
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
    "UPDATE documents SET request_id = $1, file_path = $2, file_type = $3 WHERE id = $4 RETURNING *",
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
