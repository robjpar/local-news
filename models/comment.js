const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Comment model
const CommentSchema = new Schema({
  nickname: {
    type: String,
    trim: true,
    required: true
  },
  text: {
    type: String,
    trim: true,
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
