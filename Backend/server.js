const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const User = require("./models/User");
const Post = require("./models/Post");

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Decrypt function
const decryptPassword = (encrypted) => {
 const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);

  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  
  if (!originalText) throw new Error("Decryption failed. Possibly invalid key or ciphertext.");

  return originalText;
};

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { firstname, lastname, email, jobtilte, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ success: false, message: "Email already exists" });

   
    const newUser = new User({ firstname, lastname, email, jobtilte, password });
    await newUser.save();

    res.json({ success: true, message: "Signup successful", userId: newUser._id,});
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error",err });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password);
    
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    //const decryptedPassword = decryptPassword(password);
    console.log(decryptPassword(user.password) ,"  " +password)
    if (decryptPassword(user.password) !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
console.log(user._id);

    res.json({ success: true, message: "Login successful" , userId: user._id});
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error",err   });
  }
});


// Get user by ID
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


app.post("/create", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();

    res.status(200).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.error("Post creation error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/feed", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })         // Newest first
      .limit(10)
      .populate({
        path: "userId",
        select: "firstName lastName jobTitle", // Get only required user fields
      });

    // Format the result
    const formatted = posts.map(post => ({
      title: post.title,
      content: post.content,
      likes:post.likes,
      createdAt: post.createdAt,
      tags: post.tags,
      author: {
        name: `${post.userId.firstName} ${post.userId.lastName}`,
        jobTitle: post.userId.jobTitle,
      }
    }));

    res.json(formatted);
    console.log(formatted);
    
  } catch (err) {
    console.error("Failed to get posts:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
