import e from "express";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";

const app = e();
const PORT = 3000 || process.env.PORT;

app.use(e.json());

app.get("/", (req, res) => {
  res.send("Welcome to Government Portal");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/services", serviceRoutes);
app.use("/departments", departmentRoutes);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
