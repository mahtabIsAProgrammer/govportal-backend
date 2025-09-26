import db from "../config/db.js";

export const getAllServices = async ({
  pageNumber = 1,
  pageSize = 10,
  keyword,
  department_id,
  currentUserRole,
  currentUserDepartmentId,
}) => {
  let query = `
  SELECT *
  FROM services`;

  let countQuery = `
    SELECT COUNT(*) AS total
    FROM services
  `;

  let conditions = [];
  let values = [];

  if (keyword) {
    values.push(`%${keyword}%`);
    conditions.push(`name ILIKE $${values.length}`);
  }

  if (currentUserRole === "officer") {
    const deptId = currentUserDepartmentId;
    if (deptId != null) {
      values.push(deptId);
      conditions.push(`department_id = $${values.length}`);
    }
  }

  if (department_id) {
    values.push(department_id);
    conditions.push(`department_id = $${values.length}`);
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
