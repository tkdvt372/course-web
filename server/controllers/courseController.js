import { catchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { Course } from "../models/Course.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";

export const getAllCourses = catchAsyncError(async (req, res, next) => {
    const courses = await Course.find().select("-lectures");
    res.status(200).json({
        success: true,
        courses,
    });
});

export const createCourse = catchAsyncError(async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;
    if (!title || !description || !category || !createdBy)
        return next(new ErrorHandler("Vui lòng nhập đầy đủ thông tin", 400));
    const file = req.file;
    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
    await Course.create({
        title,
        description,
        category,
        createdBy,
        poster: {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        },
    });

    res.status(201).json({
        success: true,
        message: "Tạo khoá học thành công, bạn có thể thêm các bài giảng!",
    });
});

export const getCourseLecture = catchAsyncError(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) return next(new ErrorHandler("Không tìm thấy khoá học", 404));
    course.views += 1;
    await course.save();
    res.status(200).json({
        success: true,
        lectures: course.lectures,
    });
});

export const addLecture = catchAsyncError(async (req, res, next) => {
    const { title, description } = req.body;
    const { id } = req.params;
    // const file = req.file
    // console.log(file);
    const course = await Course.findById(id);
    if (!course) return next(new ErrorHandler("Không tìm thấy khoá học", 404));
    course.lectures.push({
        title,
        description,
        video: {
            public_id: "url",
            url: "url",
        },
    });
    course.numOfVideos = course.lectures.length;
    await course.save();
    res.status(200).json({
        success: true,
        message: "Thêm bài giảng thành công",
    });
});
