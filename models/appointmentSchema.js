import mongoose from "mongoose";;




const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Firstname should have at least 3 characters"]
    },
    phoneNumber: {
        type: String,
        required: true,
        minLength: [10, "Phone number should have at least 10 characters"],
        maxLength: [10, "Phone number should have at most 10 characters"]
    },
    dob:{
        type: Date,
        required: [true, "dob is required"]
    },
    gender:{
        type: String,
        required: true,
        enum: ["Male", "Female", "Others"]
    },
    department:{
        type: String,
        required: true,
    },
    address: {
        type : String,
        required: true,
    },
    state: {
        type: String,
        required: true,
        enum: ["pending", "succeeded", "not visited"],
        default: "pending"
    },
    pinCode: {
        type: String,
        required: true,
    },
    enterTime:{
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    departed_time:{
        type:String,
        default: "Not Departed",
    }
}, {timestamps: true});

export const Appointments = mongoose.model('Appointments', appointmentSchema)

