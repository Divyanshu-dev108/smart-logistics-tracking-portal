const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/stats", authMiddleware, dashboardController.getDashboardStats);

module.exports = router;