import express from "express";
import {
    createCourse,
    getAllCourses,
} from "../controllers/courseController.js";

const router = express.Router();

//Get all courses without lectures
router.route("/courses").get(getAllCourses);

//create new course - only admin 
router.route("/create-course").post(createCourse);

//add lecture, delete Courses, get course detail


//Delete lecture

export default router;
