import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "Firstname should have at least 3 characters"]
    },
    lastName: {
        type: String,
        minLength: [3, "Lastname should have at least 3 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Provide a valid email address"]
    },
    phoneNumber: {
        type: String,
        required: true,
        minLength: [10, "Phone number should have at least 10 characters"],
        maxLength: [10, "Phone number should have at most 10 characters"]
    },
    message: {
        type: String,
        required: true,
        minLength: [2, "Message should be at least 10 characters"]
    }
}, {timestamps: true});

export const Message = mongoose.model('Message', messageSchema);
