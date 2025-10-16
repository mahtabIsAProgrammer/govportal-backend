import e from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import userRoutes from "./routes/userRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import chartsRoutes from "./routes/chartsRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import requestDataRoutes from "./routes/requestDataRoutes.js";
import profileInfoRoutes from "./routes/profileInfoRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

const app = e();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(e.json());
app.use(
  cors({
    origin: "https://govportal-site.onrender.com",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Government Portal");
});

app.use("/uploads", e.static(path.join(__dirname, "uploads")));

app.use("/api", fileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/charts", chartsRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/request-data", requestDataRoutes);
app.use("/api/profile-info", profileInfoRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/notifications", notificationRoutes);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
