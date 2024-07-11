import { deleteAppointment, getAllAppointments, newAppointment, updateAppointment } from "../controllers/appointmentController.js"
import express from "express"
import { isAdminAuthenticated, isMaintainerAuthenticated } from "../middlewares/auth.js";

export const appointmentRouter= express.Router();

appointmentRouter.post('/appointment', isMaintainerAuthenticated ,newAppointment)
appointmentRouter.get('/allAppointments', getAllAppointments)
appointmentRouter.put('/update/:id', updateAppointment)
appointmentRouter.delete('/delete/:id', isAdminAuthenticated, deleteAppointment)


appointmentRouter.get('/aallappointments', isMaintainerAuthenticated, getAllAppointments)
appointmentRouter.put('/uupdate/:id', isMaintainerAuthenticated, updateAppointment)
