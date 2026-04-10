import express from "express";
import { SendOTP, verifyOTP, Logouthandaler} from "../controllers/auth.controller";
export const router = express.Router();

// Public routes
router.post('/sendotp', SendOTP);
router.post('/Login', verifyOTP);
router.post('/Logout', Logouthandaler);