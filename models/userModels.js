import bcrypt from "bcrypt";

import db from "../config/db.js";

export const getAllUsers = async ({ search, role, department_id }) => {
  let query = "SELECT * FROM users";

  let conditions = [];
  let values = [];

  if (search) {
    values.push(`%${search}%`);
    conditions.push(
      `CONCAT(first_name, ' ', last_name) ILIKE $${values.length}`
    );
  }

  if (department_id) {
    values.push(department_id);
    conditions.push(`department_id = $${values.length}`);
  }

  if (role) {
    values.push(role);
    conditions.push(`role = $${values.length}`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(" AND ");
  }

  const result = await db.query(query, values);

  return result.rows;
};

export const userById = async (id) => {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

export const getUserByEmailOrUsername = async (identifier) => {
  const result = await db.query(
    "SELECT * FROM users WHERE email = $1 OR username = $1",
    [identifier]
  );
  return result.rows[0];
};

export const createUser = async ({
  first_name,
  last_name,
  national_id,
  date_of_birth,
  email,
  password,
  role,
  department_id,
  image,
  phone_number,
  is_active,
  username,
}) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db.query(
    "INSERT INTO users (first_name, last_name, national_id, date_of_birth, email, password, role, department_id, image, phone_number, is_active, username) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
    [
      first_name,
      last_name,
      national_id,
      date_of_birth,
      email,
      hashedPassword,
      role,
      department_id,
      image,
      phone_number,
      is_active,
      username,
    ]
  );
  return result.rows[0];
};

export const editUser = async (
  id,
  {
    first_name,
    last_name,
    national_id,
    date_of_birth,
    email,
    role,
    department_id,
    image,
    phone_number,
    is_active,
    username,
  }
) => {
  const result = await db.query(
    "UPDATE users SET first_name = $1, last_name = $2, national_id = $3, date_of_birth = $4, email = $5, role = $6, department_id = $7, image = $8, phone_number = $9, is_active = $10, username = $11, updated_at = NOW() WHERE id = $12 RETURNING *",
    [
      first_name,
      last_name,
      date_of_birth,
      email,
      role,
      department_id,
      image,
      phone_number,
      is_active,
      username,
      id,
    ]
  );
  return result.rows[0];
};
