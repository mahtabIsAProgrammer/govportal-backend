import e from "express";
import {
  addNotification,
  deleteNotification,
  getNotificationById,
  getNotifications,
  notificationsUpdateIsRead,
  updateNotification,
} from "../controllers/notificationController.js";

const router = e.Router();

router.get("/", getNotifications);
router.post("/", addNotification);
router.patch("/is-read", notificationsUpdateIsRead);
router.get("/:id", getNotificationById);
router.put("/:id", updateNotification);
router.delete("/:id", deleteNotification);

export default router;
