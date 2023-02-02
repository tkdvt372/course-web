import express from "express";
import {
    addLecture,
    createCourse,
    deleteCourse,
    deleteLecture,
    getAllCourses,
    getCourseLecture,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//Get all courses without lectures
router.get("/courses", getAllCourses);

//create new course - only admin
router.post(
    "/create-course",
    isAuthenticated,
    authorizeAdmin,
    singleUpload,
    createCourse
);

//add lecture, delete Courses, get course detail
router.get("/course/:id", isAuthenticated, getCourseLecture);

router.post(
    "/course/:id",
    isAuthenticated,
    authorizeAdmin,
    singleUpload,
    addLecture
);

router.delete("/course/:id", isAuthenticated, authorizeAdmin, deleteCourse);

//Delete lecture

router.delete("/lecture", isAuthenticated, authorizeAdmin, deleteLecture);

export default router;
