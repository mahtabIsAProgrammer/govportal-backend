import { createPayment } from "../models/paymentModels.js";
import { createRequestData } from "../models/requestDataModels.js";
import { createRequest } from "../models/requestModels.js";

export const submitRequestWithPayment = async (req, res) => {
  try {
    const { service_id, form_data } = req.body;
    const citizen_id = req.user?.id;
    if (!citizen_id)
      return res.status(401).json({ error: "Not authenticated" });

    const newRequest = await createRequest({
      citizen_id,
      service_id,
      status: 0,
      reviewed_by: null,
    });

    await createRequestData({
      request_id: newRequest.id,
      form_data,
    });

    const amount = req.body.amount;
    const payment = await createPayment({
      request_id: newRequest.id,
      amount,
      status: "pending",
    });

    return res.json({
      data: { request: newRequest, payment },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
