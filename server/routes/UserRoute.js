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
router.route("/register").post(Register);

//Login
router.route("/login").post(Login);

//Logout
router.route("/logout").get(Logout);

//Get my profile
router.route("/me").get(isAuthenticated, getMyProfile);

//Change password
router.route("/change-password").put(isAuthenticated, changePassword);

//Update profile
router.route("/update-profile").put(isAuthenticated, updateProfile);

//Update profile picture
router
    .route("/update-profile-picture")
    .put(isAuthenticated, updateProfilePicture);

//Forget password
router.route("/forget-password").post(forgetPassword);

//Reset password
router.route("/reset-password/:token").put(resetPassword);

//Add playlist
router.route("/add-to-playlist").post(isAuthenticated, addToPlaylist);
//Remove from playlist
router.route("/remove-from-playlist").post(isAuthenticated, removeFromPlaylist);

export default router;
