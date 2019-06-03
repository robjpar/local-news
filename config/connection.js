const mongoose = require("mongoose");

// Link to mLab MongoDB (Heroku) or local MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/news_viewer_db';

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});
