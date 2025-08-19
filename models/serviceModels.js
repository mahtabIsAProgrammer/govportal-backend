import bcrypt from "bcrypt";

import db from "../config/db.js";

export const getAllServices = async () => {
  const result = await db.query("SELECT * FROM services");

  return result.rows;
};

export const serviceById = async (id) => {
  const result = await db.query("SELECT * FROM services WHERE id = $1", [id]);
  return result.rows[0];
};

export const createService = async ({
  name,
  department_id,
  description,
  fee,
  form_schema,
}) => {
  const result = await db.query(
    "INSERT INTO services (name,  department_id,  description, fee, form_schema) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, department_id, description, fee, form_schema]
  );
  return result.rows[0];
};

export const editService = async (
  id,
  { name, department_id, description, fee, form_schema }
) => {
  const result = await db.query(
    "UPDATE services SET name = $1, department_id = $2, description = $3, fee = $4, form_schema = $5 WHERE id = $6 RETURNING *",
    [name, department_id, description, fee, form_schema, id]
  );
  return result.rows[0];
};

export const removeService = async (id) => {
  const result = await db.query(
    "DELETE FROM services WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
