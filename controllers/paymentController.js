import {
  createPayment,
  editPayment,
  getAllPayments,
  paymentById,
  removePayment,
} from "../models/paymentModels.js";

export const getPayments = async (req, res) => {
  try {
    const data = await getAllPayments();
    res.json(data);
  } catch (err) {
    console.log("Error fetching payments: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await paymentById(id);
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.json(payment);
  } catch (err) {
    console.log("Error fetching payment by id: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addPayment = async (req, res) => {
  const { amount, status, payment_date, transaction_id } = req.body;

  try {
    if (!user_id) {
      return res.status(400).json({
        error: "user is required",
      });
    }
    const newPayment = await createPayment({
      amount,
      status,
      payment_date,
      transaction_id,
    });
    res.status(201).json(newPayment);
  } catch (err) {
    console.log("Error creating payments: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { amount, status, payment_date, transaction_id } = req.body;
  try {
    const updated = await editPayment(id, {
      amount,
      status,
      payment_date,
      transaction_id,
    });

    if (!updated) {
      return res.status(404).json({ error: "payment Not Found" });
    }

    res.json(updated);
  } catch (err) {
    console.log("Error updating payments: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await removePayment(id);

    if (!deleted) {
      return res.status(404).json({ error: "payment Not Found" });
    }

    res.json({ message: "payment deleted successfully", deleted });
  } catch (err) {
    console.log("Error deleting payments", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
