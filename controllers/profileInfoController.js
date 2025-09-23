import bcrypt from "bcrypt";
import { userById, editUser, updatePassword } from "../models/userModels.js";

export const getProfileInfo = async (req, res) => {
  try {
    const user = await userById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    delete user.password;

    res.json(user);
  } catch (err) {
    console.error("Error getting profile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProfileInfo = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      image,
      date_of_birth,
      national_id,
      email,
      role,
      username,
    } = req.body;

    const updated = await editUser(req.user.id, {
      first_name,
      last_name,
      phone_number,
      image,
      role,
      date_of_birth,
      national_id,
      email,
      username,
    });

    if (!updated) return res.status(404).json({ error: "User not found" });

    delete updated.password;
    res.json(updated);
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Both old and new passwords are required" });
    }
    const user = await userById(req.user.id);
    if (!user) return res.status(404).json({ error: "user Not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Old passwird is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await updatePassword(req.user.id, hashed);

    res.json({ success: true, message: "PAssword updated successfully" });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
