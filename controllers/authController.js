import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, getUserByEmailOrUsername } from "../models/userModels.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  const { first_name, last_name, identifier, password } = req.body;

  try {
    if (!first_name || !last_name || !username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await getUserByEmailOrUsername(identifier);
    if (existing) {
      return res.status(400).json({ error: "Email / username already exist" });
    }

    const newUser = await createUser({
      first_name,
      last_name,
      email,
      password,
      username,
      role: "citizen",
    });

    res.status(201).json({ message: "User registered", user: newUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
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
