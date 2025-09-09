import db from "../config/db.js";

export const getAllRequestData = async ({ pageNumber = 1, pageSize = 10 }) => {
  let query = `
    SELECT * 
    FROM request_Data
  `;
  let values = [];
  let conditions = [];

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
