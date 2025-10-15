// Imports
import express from "express";
import mongoose from "mongoose";

// App setup
const app = express();
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/mydatabase")
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
  });

// User schema and model
const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

// -----------------------------
// Get all users
// -----------------------------
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error getting users" });
  }
});

// -----------------------------
// Create a new user
// -----------------------------
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

// -----------------------------
// Update a user
// -----------------------------
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true, // returnera den uppdaterade användaren
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
});

// -----------------------------
// Delete a user
// -----------------------------
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

// -----------------------------
// Start the server
// -----------------------------
app.listen(3000, () => {
  console.log("🚀 Server is running on port 3000!");
});
