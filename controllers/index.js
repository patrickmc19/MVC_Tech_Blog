// This index file gathers the routes to export to the server

// Server connection
const router = require("express").Router();

// API routes folder
const apiRoutes = require("./api");

// Homepage routes
const homeRoutes = require("./home-router");

// Dashboard routes
const dashRoutes = require("./dashboard-router");

// Defining path for the server to access API routes
router.use("/api", apiRoutes);

// Defining path for the server to access the homepage
router.use("/", homeRoutes);

// Defining path for the server to access the dashboard
router.use("/dashboard", dashRoutes);

// Catch all to error out routes that are not defined
router.use(req, (res) => {
  res.status(404).end();
});

module.exports = router;
