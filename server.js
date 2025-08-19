import e from "express";

import userRoute from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = e();
const PORT = 3000 || process.env.PORT;

app.use(e.json());

app.get("/", (req, res) => {
  res.send("Welcome to Government Portal");
});

app.use("/auth", authRoutes);
app.use("/users", userRoute);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
