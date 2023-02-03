import express from "express";
import {
    contact,
    courseRequest,
    getDashboardStats,
} from "../controllers/otherController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
//Contact form
router.post("/contact", contact);

//Request form
router.post("/course-request", courseRequest);

//Get admin dashboard stats
router.get("/admin/stats", isAuthenticated, authorizeAdmin, getDashboardStats);

export default router;
