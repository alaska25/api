const Driver = require("../models/Driver");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// Check if the email already exists
/*
	Steps:
	1. Use mongoose "find" method to find the duplicate emails.
	2. Use the ".then" method to send back a response to the front end application based on the result of find method.

*/

module.exports.checkEmailExists = (reqBody) => {
	return Driver.find({email: reqBody.email}).then(result => {
		if(result.length > 0){
			return true;
		}
		else{
			return false;
		}
	});
}

// Driver Registration
/*
	Steps:
	1. Create a new Driver object using the mongoose model and the information from the request body.
	2. Make sure that the password is encrypted.
	3. Save the new User to the database.

*/
module.exports.registerDriver= (reqBody) => {
	return Driver.findOne({email: reqBody.email}).then(result => {
		if(result != null && result.email == reqBody.email){
			return false;
		}
		else{
			if(reqBody.email != "" && reqBody.password != ""){
				let newDriver = new Driver({
					firstName: reqBody.firstName,
					lastName: reqBody.lastName,
					email: reqBody.email,
					mobileNumber: reqBody.mobileNumber,
					password: bcrypt.hashSync(reqBody.password, 10)
				});
				return newDriver.save().then((driver, error) =>{
						if(error){
							return false;
						}
						else{
							console.log(newDriver);
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


// Driver login
/*
	Steps:
	1. Check the database if the driver's email is registered.
	2. Compare the password provided in the login form with the password in the database.
	3. Generate and return a JSON web token if the driver is successfully login and return false if not.
*/
module.exports.loginDriver = (reqBody) => {
	return Driver.findOne({email: reqBody.email}).then(result =>{
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

// Retrieve driver details
/*
	Steps:
	1. Find the document in the database using the driver's ID.
	2. Reassign the password of the result document to an empty string("").
	3. Return the result back to the frontend.
*/
module.exports.getDriverProfile = (data) =>{
	console.log(data)
	return Driver.findById(data.driverId).then(result =>{
		result.password ="";

		return result;
	})
}



