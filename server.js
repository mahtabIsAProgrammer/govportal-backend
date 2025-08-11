import e from "express";

const app = e();
const PORT = 3000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("Welcome to Government Portal");
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
