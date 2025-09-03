import e from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import requestDataRoutes from "./routes/requestDataRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

const app = e();
const PORT = 3000 || process.env.PORT;

app.use(e.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Government Portal");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/services", serviceRoutes);
app.use("/requests", requestRoutes);
app.use("/reques_data", requestDataRoutes);
app.use("/documents", documentRoutes);
app.use("/payments", paymentRoutes);
app.use("/departments", departmentRoutes);
app.use("/notifications", notificationRoutes);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
