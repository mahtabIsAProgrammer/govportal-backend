import {
  createRequest,
  editRequest,
  getAllRequests,
  requestById,
  removeRequest,
  editRequestStatus,
} from "../models/requestModels.js";

export const getRequests = async (req, res) => {
  try {
    const { pageNumber, pageSize, keyword } = req.query;

    const data = await getAllRequests({
      pageNumber: parseInt(pageNumber) || 1,
      pageSize: parseInt(pageSize) || 10,
      keyword,
    });

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    console.log("Error fetching requests: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRequestById = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await requestById(id);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.json(request);
  } catch (err) {
    console.log("Error fetching request by id: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addRequest = async (req, res) => {
  const { service_id, citizen_id, status, reviewed_by } = req.body;

  try {
    if (!service_id) {
      return res.status(400).json({
        error: "service_id is required",
      });
    }
    const newRequest = await createRequest({
      service_id,
      citizen_id,
      status,
      reviewed_by,
    });
    res.status(201).json(newRequest);
  } catch (err) {
    console.log("Error creating requests: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateRequest = async (req, res) => {
  const { id } = req.params;
  const { service_id, citizen_id, status, reviewed_by } = req.body;
  try {
    const updated = await editRequest(id, {
      service_id,
      citizen_id,
      status,
      reviewed_by,
    });

    if (!updated) {
      return res.status(404).json({ error: "request Not Found" });
    }

    res.json(updated);
  } catch (err) {
    console.log("Error updating requests: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedRequest = await editRequestStatus(id, status);

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    return res.json({
      message: "Request status updated successfully",
      request: updatedRequest,
    });
  } catch (error) {
    console.error("Error updating request status:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await removeRequest(id);

    if (!deleted) {
      return res.status(404).json({ error: "request Not Found" });
    }

    res.json({ message: "request deleted successfully", deleted });
  } catch (err) {
    console.log("Error deleting requests", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
