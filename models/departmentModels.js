import db from "../config/db.js";

export const getAllDepartments = async ({
  pageNumber = 1,
  pageSize = 10,
  keyword,
}) => {
  let query = `SELECT * FROM departments`;
  let countQuery = `
    SELECT COUNT(*) AS total
    FROM departments
  `;

  let values = [];
  let conditions = [];

  if (keyword) {
    values.push(`%${keyword}%`);
    conditions.push(`name ILIKE $${values.length}`);
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
