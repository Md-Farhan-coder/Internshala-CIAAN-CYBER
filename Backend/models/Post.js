const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",       // Reference to User collection
    required: true
  },
  title: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  content: String,
  audience: {
    type: String,
    enum: ["public", "private", "friends"],
    default: "public"
  },
  postType: {
    type: String,
    enum: ["text", "image", "video", "link"],
    default: "text"
  },
  tags: {
    type: [String],
    default: []
  },
  media: [
    {
      name: String,
      type: String,
      data: String // Can be base64 or URL (if using cloud storage)
    }
  ],
  commentsEnabled: {
    type: Boolean,
    default: true
  },
  reshareEnabled: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Post", postSchema);
