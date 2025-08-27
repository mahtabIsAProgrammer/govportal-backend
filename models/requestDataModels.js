import db from "../config/db.js";

export const getAllRequestData = async () => {
  const result = await db.query("SELECT * FROM request_data");

  return result.rows;
};

export const requestDataById = async (id) => {
  const result = await db.query("SELECT * FROM request_data WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

export const createRequestData = async ({ request_id, form_data }) => {
  const result = await db.query(
    "INSERT INTO request_data (request_id, form_data) VALUES ($1, $2) RETURNING *",
    [request_id, form_data]
  );
  return result.rows[0];
};

export const editRequestData = async (id, { request_id, form_data }) => {
  const result = await db.query(
    "UPDATE request_data SET request_id = $1, form_data = $2 WHERE id = $3 RETURNING *",
    [request_id, form_data, id]
  );
  return result.rows[0];
};

export const removeRequestData = async (id) => {
  const result = await db.query(
    "DELETE FROM request_data WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
