import express from "express";
import {
    Login,
    Logout,
    Register,
    addToPlaylist,
    changePassword,
    forgetPassword,
    getMyProfile,
    removeFromPlaylist,
    resetPassword,
    updateProfile,
    updateProfilePicture,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

//Register a new user
router.post("/register", Register);

//Login
router.post("/login", Login);

//Logout
router.get("/logout",Logout);

//Get my profile
router.get("/me",isAuthenticated, getMyProfile);

//Change password
router.put("/change-password",isAuthenticated, changePassword);

//Update profile
router.put("/update-profile",isAuthenticated, updateProfile);

//Update profile picture
router.put("/update-profile-picture", isAuthenticated, updateProfilePicture);

//Forget password
router.post("/forget-password",forgetPassword);

//Reset password
router.put("/reset-password/:token",resetPassword);

//Add playlist
router.post("/add-to-playlist",isAuthenticated, addToPlaylist);
//Remove from playlist
router.post("/remove-from-playlist",isAuthenticated, removeFromPlaylist);

export default router;
