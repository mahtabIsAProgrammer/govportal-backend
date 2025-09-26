import {
  createService,
  editService,
  getAllServices,
  serviceById,
  removeService,
} from "../models/serviceModels.js";

export const getServices = async (req, res) => {
  try {
    const { pageNumber, pageSize, keyword, department_id } = req.query;

    const currentUserRole = req.user?.role;
    const currentUserDepartmentId = req.user?.department_id;

    const { totalCount, totalPages, data } = await getAllServices({
      pageNumber: parseInt(pageNumber) || 1,
      pageSize: parseInt(pageSize) || 10,
      keyword,
      department_id,
      currentUserRole,
      currentUserDepartmentId,
    });

    res.status(200).json({
      success: true,
      count: data.length,
      totalCount,
      totalPages,
      data,
    });
  } catch (err) {
    console.log("Error fetching services: ", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await serviceById(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(service);
  } catch (err) {
    console.log("Error fetching service by id: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addService = async (req, res) => {
  const { name, description, department_id, fee, form_schema } = req.body;

  try {
    if (!name) {
      return res.status(400).json({
        error: "name is required",
      });
    }
    const newService = await createService({
      name,
      description,
      department_id,
      fee,
      form_schema,
    });
    res.status(201).json(newService);
  } catch (err) {
    console.log("Error creating services: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, department_id, fee, form_schema } = req.body;
  try {
    const updated = await editService(id, {
      name,
      description,
      department_id,
      fee,
      form_schema,
    });

    if (!updated) {
      return res.status(404).json({ error: "service Not Found" });
    }

    res.json(updated);
  } catch (err) {
    console.log("Error updating services: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await removeService(id);

    if (!deleted) {
      return res.status(404).json({ error: "service Not Found" });
    }

    res.json({ message: "service deleted successfully", deleted });
  } catch (err) {
    console.log("Error deleting services", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
