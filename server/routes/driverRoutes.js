const express = require("express");
const driverController = require("../controllers/driverController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", driverController.getAllDrivers);
router.post("/", authMiddleware, driverController.createDriver);
router.get("/:id", driverController.getDriverById);
router.put("/:id", authMiddleware, driverController.updateDriver);
router.delete("/:id", authMiddleware, driverController.deleteDriver);

module.exports = router;
