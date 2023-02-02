import express from "express";
import {
    addLecture,
    createCourse,
    getAllCourses,
    getCourseLecture,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

//Get all courses without lectures
router.get("/courses", getAllCourses);

//create new course - only admin
router.post("/create-course", singleUpload, createCourse);

//add lecture, delete Courses, get course detail
router.get("/course/:id", getCourseLecture);

router.post("/course/:id", singleUpload, addLecture);

//Delete lecture

export default router;
