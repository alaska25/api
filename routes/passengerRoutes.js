const express = require("express");
const router = express.Router();
const passengerControllers = require("../controllers/passengerControllers")
const auth = require("../auth");

// Router for checking if the email exists
router.post("/checkEmail", (req, res) =>{
	passengerControllers.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
});

// Router for the passenger registration
router.post("/register", (req, res) =>{
	passengerControllers.registerPassenger(req.body).then(resultFromController => res.send(resultFromController));
});

//Route for the passenger login(with token creation)
router.post("/login", (req, res)=>{
	passengerControllers.loginPassenger(req.body).then(resultFromController => res.send(resultFromController));
})

// Route for the retrieving the current passenger's details
router.get("/details", auth.verify, (req, res) =>{
	const passengerData = auth.decode(req.headers.authorization);
	console.log(passengerData);

	// Provides the passenger's ID for the getProfile controller method
	passengerControllers.getPassengerProfile({passengerId: passengerData.id}).then(resultFromController => res.send(resultFromController));
})

module.exports = router;