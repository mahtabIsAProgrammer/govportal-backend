import db from "../config/db.js";

export const getAllDocuments = async () => {
  const result = await db.query("SELECT * FROM documents");

  return result.rows;
};

export const documentById = async (id) => {
  const result = await db.query("SELECT * FROM documents WHERE id = $1", [id]);
  return result.rows[0];
};

export const createDocument = async ({
  amount,
  status,
  payment_date,
  transaction_id,
}) => {
  const result = await db.query(
    "INSERT INTO documents (amount, status, payment_date, transaction_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [amount, status, payment_date, transaction_id]
  );
  return result.rows[0];
};

export const editDocument = async (
  id,
  { amount, status, payment_date, transaction_id }
) => {
  const result = await db.query(
    "UPDATE documents SET amount = $1, status = $2, payment_date = $3, transaction_id = $4 WHERE id = $5 RETURNING *",
    [amount, status, payment_date, transaction_id, id]
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
