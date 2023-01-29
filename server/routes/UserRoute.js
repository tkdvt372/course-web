import express from "express";
import { Login, Logout, Register } from "../controllers/userController.js";
const router = express.Router();


//Register a new user
router.route("/register").post(Register);

//Login
router.route("/login").post(Login);

//Logout
router.route("/logout").get(Logout);


//Get my profile
router.route("/me").get(getMyProfile);


export default router;
