const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection (Replace with your URI if using Atlas)
mongoose.connect("mongodb://localhost:27017/loginDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Define a schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passcode: String,
  mobile: String
});

const User = mongoose.model("User", userSchema);

// API endpoint
app.post("/log", async (req, res) => {
  const { username, email, passcode, mobile } = req.body;

  if (!username || !email || !passcode || !mobile) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ username, email, passcode, mobile });

    if (user) {
      return res.json({ success: true, message: "Login successful!" });
    } else {
      return res.json({ success: false, message: "Invalid credentials." });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Optional: Add a user for testing (You can remove this in production)
app.post("/register", async (req, res) => {
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.json({ success: true, message: "User registered!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration failed." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});










function loginUser() {
  const validUser = {
    username: "shrikrushna",
    email: "shrikrushna07@gmail.com",
    passcode: "March@1437"
  };

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const passcode = document.getElementById("passcode").value.trim();

  if (!username || !email || !passcode) {
    alert("Please fill all required fields.");
    return;
  }

  if (
    username === validUser.username &&
    email === validUser.email &&
    passcode === validUser.passcode
  ) {
    alert("Login successful!");
    window.location.href = "page2.html"; // redirect on success
  } else {
    alert("Incorrect username, email, or passcode.");
    window.location.href = "log.html";
  }
}