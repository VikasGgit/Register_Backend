import { catchAsyncError } from "../middlewares/catchasyncErrors.js";
import { errorHandler } from "../middlewares/errormiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

export const addNewAdmin = catchAsyncError(
    async (req, res, next)=>{
        const { firstName, lastName, email, password, dob, phoneNumber, gender}= req.body;
        if(
            !firstName||!lastName||!email||!password||!dob||!phoneNumber||!gender
        ){
            return next(new errorHandler(
                "Please fill full form for registration", 400
            ));
        }
        let isRegistered= await User.findOne({email});
        if(isRegistered){
            return next(new errorHandler(`This user is already registered with this role : ${isRegistered.role}`))
        }
        const admin= await User.create({role: 'Admin',  firstName, lastName, email, password, dob,  phoneNumber, gender})
        generateToken(admin, "admin created successfully" ,200, res)
    })

    export const getAllmaintainers=catchAsyncError(
        async(req, res, next) =>{
            const Maintainers= await User.find({role :"Maintainer"})
            res.status(200).json({
                success: true,
                Maintainers,
            })
        }
    )

export const logoutAdmin= catchAsyncError((req, res, next) =>{
        res.status(200).cookie("adminToken", null, {expires: new Date(Date.now()),
        httpOnly: true})
        .json({success :true, 
            message : "Admin has been logged out successfully"
    });
})
