import db from "../config/db.js";

export const getAllPayments = async ({
  pageNumber = 1,
  pageSize = 10,
  keyword,
  currentUserRole,
  currentUserDepartmentId,
}) => {
  let query = `
    SELECT p.* 
    FROM payments p
    JOIN requests r ON p.request_id = r.id
    JOIN services s ON r.service_id = s.id
  `;

  let countQuery = `
    SELECT COUNT(*) AS total
    FROM payments p
    JOIN requests r ON p.request_id = r.id
    JOIN services s ON r.service_id = s.id
  `;

  let values = [];
  let conditions = [];

  if (keyword) {
    values.push(`%${keyword}%`);
    conditions.push(`p.amount ILIKE $${values.length}`);
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

  query += ` ORDER BY p.id DESC LIMIT $${values.length - 1} OFFSET $${
    values.length
  }`;

  const result = await db.query(query, values);
  return {
    data: result.rows,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  };
};

export const paymentById = async (id) => {
  const result = await db.query("SELECT * FROM payments WHERE id = $1", [id]);

  return result.rows[0];
};

export const paymentByRequestId = async (request_id) => {
  const result = await db.query(
    "SELECT * FROM payments WHERE request_id = $1",
    [request_id]
  );

  return result.rows[0];
};

export const createPayment = async ({
  amount,
  status,
  payment_date,
  transaction_id,
  request_id,
}) => {
  const result = await db.query(
    "INSERT INTO payments (amount, status, payment_date, transaction_id, request_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [amount, status, payment_date, transaction_id, request_id]
  );
  return result.rows[0];
};

export const editPayment = async (
  id,
  { amount, status, payment_date, transaction_id, request_id }
) => {
  const result = await db.query(
    "UPDATE payments SET amount = $1, status = $2, payment_date = $3, transaction_id = $4, request_id = $5 WHERE id = $6 RETURNING *",
    [amount, status, payment_date, transaction_id, request_id, id]
  );
  return result.rows[0];
};

export const removePayment = async (id) => {
  const result = await db.query(
    "DELETE FROM payments WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
