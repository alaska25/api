const Passenger = require("../models/Passenger");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// Check if the email already exists
/*
	Steps:
	1. Use mongoose "find" method to find the duplicate emails.
	2. Use the ".then" method to send back a response to the front end application based on the result of find method.

*/

module.exports.checkEmailExists = (reqBody) => {
	return Passenger.find({email: reqBody.email}).then(result => {
		if(result.length > 0){
			return true;
		}
		else{
			return false;
		}
	});
}

// Passenger Registration
/*
	Steps:
	1. Create a new Passenger object using the mongoose model and the information from the request body.
	2. Make sure that the password is encrypted.
	3. Save the new User to the database.

*/
module.exports.registerPassenger= (reqBody) => {
	return Passenger.findOne({email: reqBody.email}).then(result => {
		if(result != null && result.email == reqBody.email){
			return false;
		}
		else{
			if(reqBody.email != "" && reqBody.password != ""){
				let newPassenger = new Passenger({
					firstName: reqBody.firstName,
					lastName: reqBody.lastName,
					email: reqBody.email,
					mobileNumber: reqBody.mobileNumber,
					password: bcrypt.hashSync(reqBody.password, 10)
				});
				return newPassenger.save().then((passenger, error) =>{
						if(error){
							return false;
						}
						else{
							console.log(newPassenger);
							return true;
						}
					})
			}
			else{
				return false; 
			}
		}
	})
}


// Passenger login
/*
	Steps:
	1. Check the database if the passenger's email is registered.
	2. Compare the password provided in the login form with the password in the database.
	3. Generate and return a JSON web token if the passenger is successfully login and return false if not.
*/
module.exports.loginPassenger = (reqBody) => {
	return Passenger.findOne({email: reqBody.email}).then(result =>{
		if(result == null){
			return false;
		}
		else{
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);
			if(isPasswordCorrect){
				return {access: auth.createAccessToken(result)}
			}
			else{
				return false;
			}
		}
	})
}

// Retrieve passenger details
/*
	Steps:
	1. Find the document in the database using the passenger's ID.
	2. Reassign the password of the result document to an empty string("").
	3. Return the result back to the frontend.
*/
module.exports.getPassengerProfile = (data) =>{
	console.log(data)
	return Passenger.findById(data.passengerId).then(result =>{
		result.password ="";

		return result;
	})
}



