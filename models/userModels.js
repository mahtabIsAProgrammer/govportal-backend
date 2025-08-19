import bcrypt from "bcrypt";

import db from "../config/db.js";

export const getAllUsers = async () => {
  const result = await db.query("SELECT * FROM users");
  console.log("🚀 ~ getAllUsers ~ result:", result);

  return result.rows;
};

export const userById = async (id) => {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

export const getUserByEmail = async (email) => {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
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
}) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db.query(
    "INSERT INTO users (first_name, last_name, national_id, date_of_birth, email, password, role, department_id, image, phone_number, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
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
  }
) => {
  const result = await db.query(
    "UPDATE users SET first_name = $1, last_name = $2, national_id = $3, date_of_birth = $4, email = $5, role = $6, department_id = $7, image = $8, phone_number = $9, is_active = $10, updated_at = NOW() WHERE id = $11 RETURNING *",
    [
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
      id,
    ]
  );
  return result.rows[0];
};
