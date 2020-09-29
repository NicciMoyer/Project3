const express = require("express");
const session = require('express-session');
const routes = require("./routes");
const schoolController = require("./controllers/schoolController");
const app = express();
const PORT = process.env.PORT || 3001;
const passport = require('./config/passport');

// Setting up port and requiring models for syncing
const db = require('./models');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view

app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(schoolController);


// Start the API server
db.sequelize.sync({ force: false }).then(() => {
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
});