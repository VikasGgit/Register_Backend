import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken"
import { catchAsyncError } from "./catchasyncErrors.js";
import { errorHandler } from "./errormiddleware.js";


export const isAdminAuthenticated = catchAsyncError (
    async(req, res, next) =>{
        
        const token =req.cookies.adminToken;
        if(!token) return next(new errorHandler ("Admin is not authenticated", 400));


        //  Authorization
        const decoded =jwt.verify(token, "ram ram ram")
        req.user= await User.findById(decoded.id);
        if(req.user.role !== "Admin")
            return next(new errorHandler(`${req.user.role} is not Authorizes for this resource` , 403));
            next();
    }

)




export const isMaintainerAuthenticated = catchAsyncError(
    async (req, res, next) => {
        const token = req.cookies.maintainerToken
        console.log("nabda", token ); // Debugging log to see the token

        if (!token) return next(new errorHandler("Maintainer is not authenticated", 400));

        try {
            const decoded = jwt.verify(token, "ram ram ram");
            console.log("decoded", decoded ); // Debugging log to see the decoded
            const tol= await User.findById(decoded.id);
            console.log("tolll", tol ); 
            req.user=tol;
            if (req.user.role !== "Maintainer") {
                return next(new errorHandler("User is not authorized as a Maintainer", 403));
            }

            next();
        } catch (error) {
            console.log("error", error);
            return next(new errorHandler("Invalid token", 400));
        }
    }
);



// export const isMaintainerAuthenticated = catchAsyncError(
//     async(req, res, next) =>{

//         const token =req.cookie.maintainerToken;
      
//         if(!token) return next(new errorHandler("Maintainer is not authenticated", 400));


//         const decoded =jwt.verify(token, "ram ram ram")
//         console.log(decoded);
//         req.user= await User.findById(decoded.id);
//         if(req.user.role !== "Maintainer")
//             return next(new errorHandler(`${req.user.role} is not Authorizes for this resource` , 403));
//             next();
//     }
// )