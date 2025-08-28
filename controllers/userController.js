import {
  createUser,
  editUser,
  getAllUsers,
  userById,
} from "../models/userModels.js";

export const getUsers = async (req, res) => {
  try {
    const data = await getAllUsers();
    res.json(data);
  } catch (err) {
    console.log("Error fetching users: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.log("Error fetching user by id: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addUser = async (req, res) => {
  const {
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
    username,
    is_active,
  } = req.body;

  try {
    if (!first_name || !last_name || !username || !password) {
      return res.status(400).json({
        error: "first_name, last_name, username, and password are required",
      });
    }
    const newUser = await createUser({
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
      username,
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.log("Error creating users: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
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
    username,
  } = req.body;
  try {
    const updated = await editUser(id, {
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
      username,
    });

    if (!updated) {
      return res.status(404).json({ error: "user Not Found" });
    }

    res.json(updated);
  } catch (err) {
    console.log("Error updating users: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
