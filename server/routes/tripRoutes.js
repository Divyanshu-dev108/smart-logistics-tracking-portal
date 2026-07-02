const express = require("express");
const tripController = require("../controllers/tripController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", tripController.getAllTrips);
router.post("/", authMiddleware, tripController.createTrip);
router.get("/:id", tripController.getTripById);
router.put("/:id", authMiddleware, tripController.updateTrip);
router.delete("/:id", authMiddleware, tripController.deleteTrip);
router.get("/status/:status", tripController.getTripsByStatus);

module.exports = router;
