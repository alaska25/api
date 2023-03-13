const express = require("express");
const router = express.Router();
const vehicleControllers = require("../controllers/vehicleControllers")

// Router for checking if the vehicle exists
router.post("/checkVehicle", (req, res) =>{
	vehicleControllers.checkVehicleExists(req.body).then(resultFromController => res.send(resultFromController));
});

// Router for the vehicle registration
router.post("/register", (req, res) =>{
	vehicleControllers.registerVehicle(req.body).then(resultFromController => res.send(resultFromController));
});

module.exports = router;