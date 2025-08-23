import {
  createNotification,
  editNotification,
  getAllNotifications,
  notificationById,
  removeNotification,
} from "../models/notificationModels.js";

export const getNotifications = async (req, res) => {
  try {
    const data = await getAllNotifications();
    res.json(data);
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
  const { user_id, message, is_read } = req.body;

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
    });
    res.status(201).json(newNotification);
  } catch (err) {
    console.log("Error creating notifications: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateNotification = async (req, res) => {
  const { id } = req.params;
  const { user_id, message, is_read } = req.body;
  try {
    const updated = await editNotification(id, {
      user_id,
      message,
      is_read,
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
