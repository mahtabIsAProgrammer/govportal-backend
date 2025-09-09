import db from "../config/db.js";

export const getAllNotifications = async ({
  pageNumber = 1,
  pageSize = 10,
  keyword,
}) => {
  let query = `
    SELECT * 
    FROM notifications
  `;
  let values = [];
  let conditions = [];

  if (keyword) {
    values.push(`%${keyword}%`);
    conditions.push(`message ILIKE $${values.length}`);
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

export const notificationById = async (id) => {
  const result = await db.query("SELECT * FROM notifications WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

export const createNotification = async ({ user_id, message, is_read }) => {
  const result = await db.query(
    "INSERT INTO notifications (user_id, message, is_read) VALUES ($1, $2, $3) RETURNING *",
    [user_id, message, is_read]
  );
  return result.rows[0];
};

export const editNotification = async (id, { user_id, message, is_read }) => {
  const result = await db.query(
    "UPDATE notifications SET user_id = $1, message = $2, is_read = $3 WHERE id = $4 RETURNING *",
    [user_id, message, is_read, id]
  );
  return result.rows[0];
};

export const removeNotification = async (id) => {
  const result = await db.query(
    "DELETE FROM notifications WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
