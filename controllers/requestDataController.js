import {
  createRequestData,
  editRequestData,
  getAllRequestData,
  requestDataById,
  removeRequestData,
  requestDataByRequestId,
} from "../models/requestDataModels.js";

export const getRequestData = async (req, res) => {
  try {
    const { pageNumber, pageSize } = req.query;

    const data = await getAllRequestData({
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
    console.log("Error fetching requestData: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRequestDataById = async (req, res) => {
  const { id } = req.params;

  try {
    const requestData = await requestDataById(id);
    if (!requestData) {
      return res.status(404).json({ error: "RequestData not found" });
    }
    res.json(requestData);
  } catch (err) {
    console.log("Error fetching requestData by id: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRequestDataByRequestId = async (req, res) => {
  const { id } = req.params;

  try {
    const requestData = await requestDataByRequestId(id);
    if (!requestData) {
      return res.status(404).json({ error: "RequestData not found" });
    }
    res.json(requestData);
  } catch (err) {
    console.log("Error fetching requestData by id: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addRequestData = async (req, res) => {
  const { request_id, form_data } = req.body;

  try {
    if (!request_id) {
      return res.status(400).json({
        error: "request_id is required",
      });
    }
    const newRequestData = await createRequestData({
      request_id,
      form_data,
    });
    res.status(201).json(newRequestData);
  } catch (err) {
    console.log("Error creating requestData: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateRequestData = async (req, res) => {
  const { id } = req.params;
  const { request_id, form_data } = req.body;
  try {
    const updated = await editRequestData(id, {
      request_id,
      form_data,
    });

    if (!updated) {
      return res.status(404).json({ error: "requestData Not Found" });
    }

    res.json(updated);
  } catch (err) {
    console.log("Error updating requestData: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteRequestData = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await removeRequestData(id);

    if (!deleted) {
      return res.status(404).json({ error: "requestData Not Found" });
    }

    res.json({ message: "requestData deleted successfully", deleted });
  } catch (err) {
    console.log("Error deleting requestData", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
