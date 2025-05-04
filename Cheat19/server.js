const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = 3000;

const url =
  "mongodb+srv://kanadkulkarni2013:Kanad2004@cluster0.qnfzl.mongodb.net/student";

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const studentSchema = mongoose.Schema({
  Name: String,
  Roll_No: Number,
  WAD_Marks: Number,
  CC_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  AI_Marks: Number,
});

const Student = mongoose.model("Student", studentSchema);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/students/insert", async (req, res) => {
  try {
    const students = [
      {
        Name: "Alice Smith",
        Roll_No: 101,
        WAD_Marks: 25,
        CC_Marks: 20,
        DSBDA_Marks: 22,
        CNS_Marks: 18,
        AI_Marks: 24,
      },
      {
        Name: "Bob Johnson",
        Roll_No: 102,
        WAD_Marks: 15,
        CC_Marks: 30,
        DSBDA_Marks: 28,
        CNS_Marks: 26,
        AI_Marks: 22,
      },
      {
        Name: "Clara Davis",
        Roll_No: 103,
        WAD_Marks: 30,
        CC_Marks: 25,
        DSBDA_Marks: 20,
        CNS_Marks: 22,
        AI_Marks: 28,
      },
      {
        Name: "David Brown",
        Roll_No: 104,
        WAD_Marks: 10,
        CC_Marks: 15,
        DSBDA_Marks: 18,
        CNS_Marks: 35,
        AI_Marks: 20,
      },
      {
        Name: "Emma Wilson",
        Roll_No: 105,
        WAD_Marks: 28,
        CC_Marks: 22,
        DSBDA_Marks: 25,
        CNS_Marks: 20,
        AI_Marks: 26,
      },
    ];
    const result = await Student.insertMany(students);
    res.json({ insertedCount: result.length });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const count = await Student.countDocuments();
    const students = await Student.find({});
    res.json({ count, students });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/students/dsbdagreater20", async (req, res) => {
  try {
    const students = await Student.find({ DSBDA_Marks: { $gt: 20 } }, "Name");
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// f) Update marks of specified student by 10
app.put("/api/students/update/:rollno", async (req, res) => {
  try {
    const rollno = parseInt(req.params.rollno);
    const result = await Student.updateOne(
      { Roll_No: rollno },
      {
        $inc: {
          WAD_Marks: 10,
          CC_Marks: 10,
          DSBDA_Marks: 10,
          CNS_Marks: 10,
          AI_Marks: 10,
        },
      }
    );
    console.log(result);
    res.json({ modifiedCount: result.modifiedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/students/allgreater25", async (req, res) => {
  try {
    const students = await Student.find(
      {
        WAD_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_Marks: { $gt: 25 },
      },
      "Name"
    );
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/students/wadandccless40", async (req, res) => {
  try {
    const students = await Student.find(
      { WAD_Marks: { $lt: 40 }, CC_Marks: { $lt: 40 } },
      "Name"
    );
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// i) Remove specified student document
app.delete("/api/students/delete/:rollno", async (req, res) => {
  try {
    const rollno = parseInt(req.params.rollno);
    const result = await Student.deleteOne({ Roll_No: rollno });
    res.json({ deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
