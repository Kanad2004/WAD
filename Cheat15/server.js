const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// API endpoint to get product data
app.get("/api/products", async (req, res) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "data", "products.json"),
      "utf8"
    );
    const products = JzSON.parse(data);
    res.json(products);
  } catch (error) {
    console.error("Error reading products.json:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
