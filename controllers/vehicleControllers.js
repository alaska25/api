const Vehicle = require("../models/Vehicle");

// Check if the vehicle already exists
/*
	Steps:
	1. Use mongoose "find" method to find the duplicate vehicle.
	2. Use the ".then" method to send back a response to the front end application based on the result of find method.

*/

module.exports.checkVehicleExists = (reqBody) => {
	return Vehicle.find({plateNo: reqBody.plateNo}).then(result => {
		if(result.length > 0){
			return true;
		}
		else{
			return false;
		}
	});
}

// Vehicle Registration
/*
	Steps:
	1. Create a new Vehicle object using the mongoose model and the information from the request body.
	3. Save the new Vehicle to the database.

*/
module.exports.registerVehicle= (reqBody) => {
	return Vehicle.findOne({plateNo: reqBody.plateNo}).then(result => {
		if(result != null && result.plateNo == reqBody.plateNo){
			return false;
		}
		else{
			if(reqBody.plateNo != ""){
				let newVehicle = new Vehicle({
					vehicleType: reqBody.vehicleType,
					makeOfVehicle: reqBody.makeOfVehicle,
					chassisNumber: reqBody.chassisNumber,
					model: reqBody.model,
					plateNo: reqBody.plateNo
				});
				return newVehicle.save().then((vehicle, error) =>{
						if(error){
							return false;
						}
						else{
							console.log(newVehicle);
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




