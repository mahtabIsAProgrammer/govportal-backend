import {
  createNotification,
  editNotification,
  getAllNotifications,
  markNotificationsAsRead,
  notificationById,
  removeNotification,
} from "../models/notificationModels.js";

export const getNotifications = async (req, res) => {
  try {
    const { pageNumber, pageSize, keyword, user_id, is_read } = req.query;

    const { data, totalCount, totalPages } = await getAllNotifications({
      pageNumber: parseInt(pageNumber) || 1,
      pageSize: parseInt(pageSize) || 10,
      keyword,
      is_read,
      user_id,
    });

    res.status(200).json({
      success: true,
      count: data.length,
      totalCount,
      totalPages,
      data,
    });
  } catch (err) {
    console.log("Error fetching notifications: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNotificationById = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await notificationById(id);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json(notification);
  } catch (err) {
    console.log("Error fetching notification by id: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addNotification = async (req, res) => {
  const { user_id, message, is_read, title } = req.body;

  try {
    if (!user_id) {
      return res.status(400).json({
        error: "user is required",
      });
    }
    const newNotification = await createNotification({
      user_id,
      message,
      is_read,
      title,
    });
    res.status(201).json(newNotification);
  } catch (err) {
    console.log("Error creating notifications: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateNotification = async (req, res) => {
  const { id } = req.params;
  const { user_id, message, is_read, title } = req.body;
  try {
    const updated = await editNotification(id, {
      user_id,
      message,
      is_read,
      title,
    });

    if (!updated) {
      return res.status(404).json({ error: "notification Not Found" });
    }

    res.json(updated);
  } catch (err) {
    console.log("Error updating notifications: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const notificationsUpdateIsRead = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "ids array is required" });
    }

    const updated = await markNotificationsAsRead(ids);

    res.json({
      success: true,
      count: updated.length,
      data: updated,
    });
  } catch (err) {
    console.error("Error marking notifications as read:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await removeNotification(id);

    if (!deleted) {
      return res.status(404).json({ error: "notification Not Found" });
    }

    res.json({ message: "notification deleted successfully", deleted });
  } catch (err) {
    console.log("Error deleting notifications", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
