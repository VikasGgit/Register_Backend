import express  from "express";
import { getAllMessages, sendMessage } from "../controllers/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router= express.Router();

router.post('/send', sendMessage);
router.get('/allMessage', isAdminAuthenticated ,getAllMessages);

export {router}