import db from "../config/db.js";

export const getAllDepartments = async ({
  pageNumber = 1,
  pageSize = 10,
  keyword,
}) => {
  let query = `SELECT * FROM departments`;
  let values = [];
  let conditions = [];

  if (keyword) {
    query += `WHERE name ILIKE $1`;
    values.push(`%${keyword}%`);
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

export const departmentById = async (id) => {
  const result = await db.query("SELECT * FROM departments WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

export const createDepartment = async ({ name, description }) => {
  const result = await db.query(
    "INSERT INTO departments (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );

  return result.rows[0];
};

export const editDepartment = async (id, { name, description }) => {
  const result = await db.query(
    "UPDATE departments SET name = $1, description = $2 WHERE id = $3 RETURNING *",
    [name, description, id]
  );
  return result.rows[0];
};

export const removeDepartment = async (id) => {
  const result = await db.query(
    "DELETE FROM departments WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
