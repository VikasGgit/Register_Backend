import { catchAsyncError } from "../middlewares/catchasyncErrors.js";
import { errorHandler } from "../middlewares/errormiddleware.js";
import { Appointments } from "../models/appointmentSchema.js";


export const newAppointment = catchAsyncError (async (req, res, next) => {
    const {
        name,dob,role,phoneNumber,gender,department,address,enterTime, purpose,pinCode
    } = req.body;

    if(
        !name||!dob||!role||!phoneNumber||!gender||!department||!address||!enterTime||!purpose||!pinCode){
    return next(new errorHandler("please provide full details", 400));
 }

    const appointment = await Appointments.create({
        name,dob,role,phoneNumber,gender,department,address,purpose,pinCode,enterTime
    });

    res.status(200).json({
        status: true,
        message: "Appointment created successfully",
        appointment
    });
});


export const getAllAppointments = catchAsyncError(async (req, res, next) => {
    const appointments= await Appointments.find();
    res.status(200).json({
        success: true,
        appointments
    })
});

export const updateAppointment = catchAsyncError(async (req, res, next) => {
        const {id}= req.params;
        let appointment= await Appointments.findById(id);
        if (!appointment){
            return next(new errorHandler("Appointment not found", 400));
        }
        appointment= await Appointments.findByIdAndUpdate(id, req.body,{
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })
        res.status(200).json({
            success: true,
            message: "Appointment updated",
            appointment
        })

        
});

export const deleteAppointment = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    try {
        const appointment = await Appointments.findById(id);
        if (!appointment) {
            return next(new errorHandler("Appointment not found", 404));
        }

        await appointment.deleteOne();

        res.status(200).json({
            success: true,
            message: `Appointment with ID ${id} deleted successfully`,
        });
    } catch (error) {
        return next(new errorHandler("Error deleting appointment", 500));
    }
});
