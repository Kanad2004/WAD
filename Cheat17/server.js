const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/employees", async (req, res) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "data", "employees.json"),
      "utf-8"
    );
    const employees = JSON.parse(data);
    res.json(employees);
  } catch (err) {
    console.error("Error reading employees.json:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
