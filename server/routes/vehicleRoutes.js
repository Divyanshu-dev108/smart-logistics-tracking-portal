const express = require("express");
const vehicleController = require("../controllers/vehicleController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", vehicleController.getAllVehicles);
router.post("/", authMiddleware, vehicleController.createVehicle);
router.get("/:id", vehicleController.getVehicleById);
router.put("/:id", authMiddleware, vehicleController.updateVehicle);
router.delete("/:id", authMiddleware, vehicleController.deleteVehicle);

module.exports = router;
