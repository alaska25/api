const express = require("express");
const router = express.Router();
const driverControllers = require("../controllers/driverControllers")
const auth = require("../auth");

// Router for checking if the email exists
router.post("/checkEmail", (req, res) =>{
	driverControllers.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
});

// Router for the driver registration
router.post("/register", (req, res) =>{
	driverControllers.registerDriver(req.body).then(resultFromController => res.send(resultFromController));
});

//Route for the driver login(with token creation)
router.post("/login", (req, res)=>{
	driverControllers.loginDriver(req.body).then(resultFromController => res.send(resultFromController));
})

// Route for the retrieving the current driver's details
router.get("/details", auth.verify, (req, res) =>{
	const driverData = auth.decode(req.headers.authorization);
	console.log(userData);

	// Provides the driver's ID for the getProfile controller method
	driverControllers.getDriverProfile({driverId: driverData.id}).then(resultFromController => res.send(resultFromController));
})

module.exports = router;