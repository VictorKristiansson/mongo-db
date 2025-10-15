import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mydatabase");

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(updatedUser);
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000!`);
});
