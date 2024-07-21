import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"



const userSchema = new mongoose.Schema({
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
    dob:{
        type: Date,
        required: [true, "dob is required"]
    },
    gender:{
        type: String,
        required: true,
        emun: ["Male", "Female"]
    },
    password:{
        type: String,
        required: true,
        minLength: [8, "Password should have at least 10 characters"],
        select: false,
    }, 
    role:{
        type: String,
        required: true,
        emun:["Admin", "Maintainer"],
    },
    mntnrAvtar:{
        public_id: String,
        url: String,
    },
    mntnrDepartment:{
        type: String,
    },
    
});

userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};
// userSchema.methods.comparePassword = async function(enteredPassword){
//     return await bcrypt.compare(this.password, enteredPassword);
// };

userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({ id: this._id }, "ram ram ram", { expiresIn: "7d" });
};




export const User = mongoose.model('User', userSchema);
