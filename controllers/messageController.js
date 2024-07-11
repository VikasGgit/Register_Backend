
import {Message} from "../models/messageSchema.js"
import { catchAsyncError } from "../middlewares/catchasyncErrors.js";
import {errorHandler} from "../middlewares/errormiddleware.js";


export const sendMessage =catchAsyncError(async (req, res, next) => {
    const{firstName, lastName, email, phoneNumber, message}= req.body;
    if(!firstName || !lastName|| !email|| !phoneNumber|| !Message){
       return next(new errorHandler("Fill full form" , 400))}
     await Message.create({firstName, lastName, email, phoneNumber, message});
    res.status(200).json({
        success: true,
        message: "Message created successfully"
    })
    })

export const getAllMessages = catchAsyncError ( async (req, res, next) => {
    const messages = await Message.find()
    res.status(200).json({
        success: true,
        message: messages
    })
})

// export const sendMessage = async (req, res, next) => {
//     try {
//         const { firstName, lastName, email, phoneNumber, message } = req.body;
//         if (!firstName || !lastName || !email || !phoneNumber || !message) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Fill all the details"
//             });
//         }

//         // Create a new message document
//         const newMessage = await Message.create({ firstName, lastName, email, phoneNumber, message });

//         res.status(200).json({
//             success: true,
//             message: "Message created successfully",
//             data: newMessage
//         });
//     } catch (error) {
//         // Handle errors
//         next(error);
//     }
// };
