import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { createUser, getUserByEmailOrUsername } from "../models/userModels.js";

export const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await getUserByEmailOrUsername(email);
    if (existing) {
      return res.status(400).json({ error: "Email already exist" });
    }

    const newUser = await createUser({
      first_name,
      last_name,
      email,
      password,
      role: "citizen",
    });

    res.status(201).json({ message: "User registered", user: newUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getToken = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await getUserByEmailOrUsername(identifier);
    if (!user) {
      return res.status(400).json({ error: "User Not Found!" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Password is Wrong" });
    }

    const token = generateToken(user);

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const identityVerify = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("Identity verify failed:", err);
    res.status(500).json({ error: "Server error" });
  }
};
