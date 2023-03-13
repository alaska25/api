const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
   firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required"]
    },
    mobileNumber:{
        type: Number,
        required: [true, "Mobile Number is required"]
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    createdOn:{
        type: Date,
        default: new Date()
    },

     isPassenger:{
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model("Passenger", passengerSchema)
