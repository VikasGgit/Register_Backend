import express from 'express';
import  { userRegister, login, getUserDetails, logoutUser, addNewMaintainer } from '../controllers/userController.js';
import { addNewAdmin, getAllmaintainers, logoutAdmin } from '../controllers/adminController.js';
import { isAdminAuthenticated, isMaintainerAuthenticated } from "../middlewares/auth.js" 
const router=express.Router();
router.post('/user/register', userRegister);
router.post('/user/login', login);
router.post('/admin/addNewAdmin',  isAdminAuthenticated, addNewAdmin);
router.get("/admin/maintainer",isAdminAuthenticated,   getAllmaintainers);
router.get("/user/me",isMaintainerAuthenticated,   getUserDetails);
router.get("/admin/me",isAdminAuthenticated,   getUserDetails);
router.get("/admin/logout",isAdminAuthenticated, logoutAdmin);
router.get("/user/logout",isMaintainerAuthenticated, logoutUser );
router.post("/mntnr/addNew",isAdminAuthenticated, addNewMaintainer );

export default router;