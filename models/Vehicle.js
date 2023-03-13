const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    vehicleType:{
        type: String,
        required: [true, "Vehicle type is required"]
    },
    makeOfVehicle: {
        type: String,
        required: [true, "Make of vehicle is required"]
    },
    chassisNumber: {
        type: String,
        required: [true, "Chassis number is required"]
    },
    plateNo:{
        type: String,
        required: [true, "Plate Number is required"]
    },
    registeredSystemOn:{
        type: Date,
        default: new Date()
    }

})

module.exports = mongoose.model("Vehicle", vehicleSchema)
