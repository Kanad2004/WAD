const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing

// Import routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const connectDB = async () => {
  try {
    console.log("Current directory:", process.cwd());
    console.log(process.env.MONGO_URI);
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(`\n mongodb connected `);
  } catch (err) {
    console.log("MongoDB Connection Error . . . ");
    console.log(err);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
