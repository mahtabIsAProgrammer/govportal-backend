import db from "../config/db.js";

export const getAllRequests = async () => {
  const result = await db.query("SELECT * FROM requests");

  return result.rows;
};

export const requestById = async (id) => {
  const result = await db.query("SELECT * FROM requests WHERE id = $1", [id]);
  return result.rows[0];
};

export const createRequest = async ({
  service_id,
  citizen_id,
  status,
  reviewed_by,
}) => {
  const result = await db.query(
    "INSERT INTO requests (service_id, citizen_id, status, reviewed_by) VALUES ($1, $2, $3, $4) RETURNING *",
    [service_id, citizen_id, status, reviewed_by]
  );
  return result.rows[0];
};

export const editRequest = async (
  id,
  { service_id, citizen_id, status, reviewed_by }
) => {
  const result = await db.query(
    "UPDATE requests SET service_id = $1, citizen_id = $2, status = $3, reviewed_by = $4 WHERE id = $5 RETURNING *",
    [service_id, citizen_id, status, reviewed_by, id]
  );
  return result.rows[0];
};

export const editRequestStatus = async (id, status) => {
  const result = await db.query(
    "UPDATE requests SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
    [status, id]
  );
  return result.rows[0] || null;
};

export const removeRequest = async (id) => {
  const result = await db.query(
    "DELETE FROM requests WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
