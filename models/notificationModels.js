import db from "../config/db.js";

export const getAllNotifications = async ({
  pageNumber = 1,
  pageSize = 10,
  keyword,
  is_read,
  user_id,
}) => {
  let query = `
    SELECT * 
    FROM notifications
  `;
  let countQuery = `
    SELECT COUNT(*) AS total
    FROM notifications
  `;

  let values = [];
  let conditions = [];

  if (keyword) {
    values.push(`%${keyword}%`);
    conditions.push(`title ILIKE $${values.length}`);
  }

  if (typeof is_read !== "undefined") {
    values.push(is_read);
    conditions.push(`is_read = $${values.length}`);
  }

  if (user_id) {
    values.push(user_id);
    conditions.push(`user_id = $${values.length}`);
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

export const notificationById = async (id) => {
  const result = await db.query("SELECT * FROM notifications WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

export const createNotification = async ({
  user_id,
  message,
  is_read,
  title,
}) => {
  const result = await db.query(
    "INSERT INTO notifications (user_id, message, is_read, title) VALUES ($1, $2, $3, $4) RETURNING *",
    [user_id, message, is_read, title]
  );
  return result.rows[0];
};

export const editNotification = async (
  id,
  { user_id, message, is_read, title }
) => {
  const result = await db.query(
    "UPDATE notifications SET user_id = $1, message = $2, is_read = $3, title = $4 WHERE id = $5 RETURNING *",
    [user_id, message, is_read, title, id]
  );
  return result.rows[0];
};

export const markNotificationsAsRead = async (ids) => {
  const query = `
    UPDATE notifications
    SET is_read = TRUE
    WHERE id = ANY($1::int[])
    RETURNING *;
  `;
  const values = [ids];

  const result = await db.query(query, values);
  return result.rows;
};

export const removeNotification = async (id) => {
  const result = await db.query(
    "DELETE FROM notifications WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
