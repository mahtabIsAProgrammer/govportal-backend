import db from "../config/db.js";

export const getAllRequests = async ({
  pageNumber = 1,
  pageSize = 10,
  keyword,
  status,
  currentUserRole,
  currentUserDepartmentId,
}) => {
  let query = `
    SELECT r.* 
    FROM requests r
    JOIN services s ON r.service_id = s.id
  `;
  let countQuery = `
    SELECT COUNT(*) AS total
    FROM requests r
    JOIN services s ON r.service_id = s.id
  `;

  let values = [];
  let conditions = [];

  if (keyword) {
    values.push(`%${keyword}%`);
    conditions.push(`r.service_id ILIKE $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`r.status = $${values.length}`);
  }

  if (currentUserRole === "officer" && currentUserDepartmentId) {
    values.push(currentUserDepartmentId);
    conditions.push(`s.department_id = $${values.length}`);
  }

  if (conditions.length > 0) {
    const whereClause = " WHERE " + conditions.join(" AND ");
    query += whereClause;
    countQuery += whereClause;
  }

  const countResult = await db.query(countQuery, values);
  const totalCount = parseInt(countResult.rows[0].total, 10);

  const offset = (pageNumber - 1) * pageSize;
  values.push(pageSize, offset);

  query += ` ORDER BY r.id DESC LIMIT $${values.length - 1} OFFSET $${
    values.length
  }`;

  const result = await db.query(query, values);
  return {
    data: result.rows,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  };
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

export const editRequestStatus = async (status, reviewed_by, id) => {
  const result = await db.query(
    "UPDATE requests SET status = $1, reviewed_by = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
    [status, reviewed_by, id]
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

export const myRequests = async ({
  userId,
  pageNumber = 1,
  pageSize = 10,
  status,
}) => {
  let query = `
    SELECT r.* 
    FROM requests r
    JOIN services s ON r.service_id = s.id
    WHERE r.citizen_id = $1
  `;
  let countQuery = `
    SELECT COUNT(*) AS total
    FROM requests r
    JOIN services s ON r.service_id = s.id
    WHERE r.citizen_id = $1
  `;

  let values = [userId];
  let conditions = [];

  if (status) {
    values.push(status);
    conditions.push(`r.status = $${values.length}`);
  }

  if (conditions.length > 0) {
    const whereClause = " AND " + conditions.join(" AND ");
    query += whereClause;
    countQuery += whereClause;
  }

  const countResult = await db.query(countQuery, values);
  const totalCount = parseInt(countResult.rows[0].total, 10);

  const offset = (pageNumber - 1) * pageSize;
  values.push(pageSize, offset);

  query += ` ORDER BY r.id DESC LIMIT $${values.length - 1} OFFSET $${
    values.length
  }`;

  const result = await db.query(query, values);

  return {
    data: result.rows,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  };
};
