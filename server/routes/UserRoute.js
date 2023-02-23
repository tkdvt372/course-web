import express from "express";
import {
    Login,
    Logout,
    Register,
    addToPlaylist,
    changePassword,
    deleteMyProfile,
    deleteUser,
    forgetPassword,
    getAllUsers,
    getMyProfile,
    removeFromPlaylist,
    resetPassword,
    updateProfile,
    updateProfilePicture,
    updateUserRole,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";
const router = express.Router();

//Register a new user
router.post("/register", singleUpload, Register);

//Login
router.post("/login", Login);

//Logout
router.get("/logout", Logout);

//Get my profile
router.get("/me", isAuthenticated, getMyProfile);

//Delete my profile
router.delete("/me", isAuthenticated, deleteMyProfile);

//Change password
router.put("/change-password", isAuthenticated, changePassword);

//Update profile
router.put("/update-profile", isAuthenticated, updateProfile);

//Update profile picture
router.put(
    "/update-profile-picture",
    isAuthenticated,
    singleUpload,
    updateProfilePicture
);

//Forget password
router.post("/forget-password", forgetPassword);

//Reset password
router.put("/reset-password/:token", resetPassword);

//Add playlist
router.post("/add-to-playlist", isAuthenticated, addToPlaylist);
//Remove from playlist
router.delete("/remove-from-playlist", isAuthenticated, removeFromPlaylist);

//*******Admin route*******//

//Get all users
router.get("/admin/users", isAuthenticated, authorizeAdmin, getAllUsers);

//Update user role
router.put("/admin/user/:id", isAuthenticated, authorizeAdmin, updateUserRole);

//Delete user
router.delete("/admin/user/:id", isAuthenticated, authorizeAdmin, deleteUser);

export default router;
