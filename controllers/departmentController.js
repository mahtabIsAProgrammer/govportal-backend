import {
  editDepartment,
  departmentById,
  createDepartment,
  removeDepartment,
  getAllDepartments,
} from "../models/departmentModels.js";

export const getDepartments = async (req, res) => {
  try {
    const { pageNumber, pageSize, keyword } = req.query;

    const { data, totalCount, totalPages } = await getAllDepartments({
      pageNumber: parseInt(pageNumber) || 1,
      pageSize: parseInt(pageSize) || 10,
      keyword,
    });

    res.status(200).json({
      success: true,
      count: data.length,
      totalCount,
      totalPages,
      data,
    });
  } catch (err) {
    console.log("Error fetching departments: ", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getDepartmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await departmentById(id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.json(department);
  } catch (err) {
    console.log("Error fetching department by id: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addDepartment = async (req, res) => {
  const { name, description } = req.body;

  try {
    if (!name) {
      return res.status(400).json({
        error: "name is required",
      });
    }
    const newDepartment = await createDepartment({
      name,
      description,
    });
    res.status(201).json(newDepartment);
  } catch (err) {
    console.log("Error creating departments: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updated = await editDepartment(id, {
      name,
      description,
    });

    if (!updated) {
      return res.status(404).json({ error: "department Not Found" });
    }

    res.json(updated);
  } catch (err) {
    console.log("Error updating departments: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await removeDepartment(id);

    if (!deleted) {
      return res.status(404).json({ error: "department Not Found" });
    }

    res.json({ message: "department deleted successfully", deleted });
  } catch (err) {
    console.log("Error deleting departments", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
