const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Article model
const ArticleSchema = new Schema({
  headline: {
    type: String,
    trim: true,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  postedAt: {
    type: Date,
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
