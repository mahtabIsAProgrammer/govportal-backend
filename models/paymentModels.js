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
  let values = [];
  let conditions = [];

  if (keyword) {
    values.push(`%${keyword}%`);
    conditions.push(`amount ILIKE $${values.length}`);
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

export const paymentById = async (id) => {
  const result = await db.query("SELECT * FROM payments WHERE id = $1", [id]);

  return result.rows[0];
};

export const createPayment = async ({
  amount,
  status,
  payment_date,
  transaction_id,
}) => {
  const result = await db.query(
    "INSERT INTO payments (amount, status, payment_date, transaction_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [amount, status, payment_date, transaction_id]
  );
  return result.rows[0];
};

export const editPayment = async (
  id,
  { amount, status, payment_date, transaction_id }
) => {
  const result = await db.query(
    "UPDATE payments SET amount = $1, status = $2, payment_date = $3, transaction_id = $4 WHERE id = $5 RETURNING *",
    [amount, status, payment_date, transaction_id, id]
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
