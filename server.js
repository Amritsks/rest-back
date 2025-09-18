// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// Schema
const suggestionSchema = new mongoose.Schema({
  name: String,
  email: String,
  suggestion: String,
  date: { type: Date, default: Date.now },
});

// Model
const Suggestion = mongoose.model("Suggestion", suggestionSchema);

// API route
app.post("/api/suggestions", async (req, res) => {
  try {
    const newSuggestion = new Suggestion(req.body);
    await newSuggestion.save();
    res.json({ message: "Thank you for your suggestion! 💌" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting suggestion" });
  }
});

// Start server on port 5000
app.listen(5000, () => console.log("Server running on http://localhost:5000"))
