import db from "../config/db.js";

export const getAllNotifications = async () => {
  const result = await db.query("SELECT * FROM notifications");

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
