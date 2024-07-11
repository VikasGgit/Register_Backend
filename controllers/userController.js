import { catchAsyncError } from "../middlewares/catchasyncErrors.js";
import { errorHandler } from "../middlewares/errormiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken} from "../utils/jwtToken.js"
import cloudinary from "cloudinary";
export const userRegister= catchAsyncError(
    async (req, res, next) => {
        const { firstName, lastName, email, password, dob, role, phoneNumber, gender}= req.body;

        if(
            !firstName||!lastName||!email||!password||!dob||!role||!phoneNumber||!gender
        ){
            return next(new errorHandler(
                ` ${res.body}
                 Please fill full form for registration`, 400
            ));
        }

        let user= await User.findOne({email})
        if(user){
            return next(new errorHandler("User already exists", 400));
        }
        user = await User.create({ firstName, lastName, email, password, dob, role, phoneNumber, gender });
        generateToken(user, "User Created Successfully", 200, res);

    },
);




export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, confirmPassword, role}=req.body;
    if(!email || !password|| !confirmPassword || !role){
        return next(new errorHandler("Please fill all details for login", 400))
    }
    if(password !=confirmPassword){
        return next(new errorHandler("Password and confirm password do not match", 400))
    }
    let user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new errorHandler("Invalid password or email ", 400))
    }
    const isPasswordConfirmed =await user.comparePassword(password);
    if(!isPasswordConfirmed){
        return next(new errorHandler("Invalid password or email ", 400))
    }
    if(role!== user.role){
        return next(new errorHandler("User with this role does not exist", 400))}
        generateToken(user, "User Logged in Successfully", 200, res);
        
})

export const getUserDetails= catchAsyncError((req, res, next) =>{
    const user= req.user;
    res.status(200).json({
        success: true,
        user
    })
})


export const logoutUser= catchAsyncError((req, res, next) =>{
    res.status(200).cookie("maintainerToken", null, {expires: new Date(Date.now()),
    httpOnly: true})
    .json({success :true, 
        message : "Maintainer has been logged out successfully"
});
});

export const addNewMaintainer= catchAsyncError( async(req, res, next) =>{
  if(!req.files || Object.keys(req.files).length===0){
    return next(new errorHandler("Maintainer Avtar is required" , 400))
  }
  const {mntnrAvtar}= req.files;
  const allowedFormats=["image/png", "image/jpeg", "image/webp"]
  if(!allowedFormats.includes(mntnrAvtar.mimetype)){
    return next(new errorHandler("This format is not supported" , 400))
  }
  const { firstName, 
    lastName,
     email,
     password, 
     dob,
    phoneNumber,
        gender,
        mntnrDepartment}= req.body;
        // console.log(req.body);

        if(!firstName||!lastName||!email||!password||!dob||!phoneNumber||!gender||!mntnrDepartment){
            return next(new errorHandler("Please enter full details") , 400)
        }
        const isRegistered= await User.findOne({ email});
        if(isRegistered){
            return next(new errorHandler(`User with email is already registered with role ${isRegistered.role}`, 400))
        }
        const cloudinaryResponse= await cloudinary.uploader.upload(
            mntnrAvtar.tempFilePath
        )
        if(!cloudinaryResponse || cloudinaryResponse.error){
            console.error( "Cloudinary error : ", cloudinaryResponse.error|| "Something went wrong")
        }

        const mntnr= await User.create({firstName, 
            lastName,
             email,
             password, 
             dob,
               phoneNumber,
                gender,
                mntnrDepartment,
                mntnrAvtar: {
                    public_id: cloudinaryResponse.public_id,
                    url: cloudinaryResponse.secure_url,
                },
                role : "Maintainer"
            })

            res.status(200).json({
                success: true,
                message: "Maintainer created successfully",
                mntnr, 
            })
});


// export const addNewMaintainer = catchAsyncError(async (req, res, next) => {
//     if ( !req.files.mntnrAvtar) {
//         return next(new errorHandler("Maintainer Avatar is required", 400));
//     }

//     const { mntnrAvtar } = req.files;
//     const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
//     if (!allowedFormats.includes(mntnrAvtar.mimetype)) {
//         return next(new errorHandler("This format is not supported", 400));
//     }

//     const {
//         firstName,
//         lastName,
//         email,
//         password,
//         dob,
//         role,
//         phoneNumber,
//         gender,
//         mntnrDepartment
//     } = req.body;

//     if (!firstName || !lastName || !email || !password || !dob || !role || !phoneNumber || !gender || !mntnrDepartment) {
//         return next(new errorHandler("Please enter full details", 400));
//     }

//     const isRegistered = await User.findOne({ email });
//     if (isRegistered) {
//         return next(new errorHandler(`User with email ${email} is already registered with role ${isRegistered.role}`, 400));
//     }

//     try {
//         const cloudinaryResponse = await cloudinary.uploader.upload(mntnrAvtar.tempFilePath);
//         if (!cloudinaryResponse || cloudinaryResponse.error) {
//             console.error("Cloudinary error:", cloudinaryResponse ? cloudinaryResponse.error : "Something went wrong");
//             return next(new errorHandler("Error uploading avatar", 500));
//         }

//         const mntnr = await User.create({
//             firstName,
//             lastName,
//             email,
//             password,
//             dob,
//             role,
//             phoneNumber,
//             gender,
//             mntnrDepartment,
//             mntnrAvtar: {
//                 public_id: cloudinaryResponse.public_id,
//                 url: cloudinaryResponse.secure_url,
//             }
//         });

//         res.status(200).json({
//             success: true,
//             message: "Maintainer created successfully",
//             mntnr
//         });
//     } catch (error) {
//         console.error("Error creating maintainer:", error);
//         return next(new errorHandler("Error creating maintainer", 500));
//     }
// });
