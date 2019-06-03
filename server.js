const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

// Connect to MongoDB
require('./config/connection');

// Server configuration
const app = express();
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log(`Server ${__filename} listening on port ${port}`);
});
