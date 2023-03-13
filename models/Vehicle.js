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
        type: Number,
        required: [true, "Chassis number is required"]
    },
    model:{
        type: String,
        required: [true, "Model is required"]
    },
    plateNo:{
        type: Number,
        required: [true, "Plate Number is required"]
    },
    registeredSystemOn:{
        type: Date,
        default: new Date()
    }

})

module.exports = mongoose.model("Vehicle", vehicleSchema)
