import db from "../config/db.js";

export const getAllPayments = async ({
  pageNumber = 1,
  pageSize = 10,
  keyword,
}) => {
  let query = `
    SELECT * 
    FROM payments
  `;

  let countQuery = `
    SELECT COUNT(*) AS total
    FROM payments
  `;

  let values = [];
  let countValues = [];
  let conditions = [];

  if (keyword) {
    values.push(`%${keyword}%`);
    countValues.push(`%${keyword}%`);
    conditions.push(`amount ILIKE $${values.length}`);
  }

  if (conditions.length > 0) {
    const whereClause = " WHERE " + conditions.join(" AND ");
    query += whereClause;
    countQuery += whereClause;
  }

  const countResult = await db.query(countQuery, countValues);
  const totalCount = parseInt(countResult.rows[0].total, 10);

  const offset = (pageNumber - 1) * pageSize;
  values.push(pageSize, offset);

  query += ` ORDER BY id DESC LIMIT $${values.length - 1} OFFSET $${
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
