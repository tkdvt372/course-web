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
    const file = req.file;
    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {
        resource_type: "video",
    });
    const course = await Course.findById(id);
    if (!course) return next(new ErrorHandler("Không tìm thấy khoá học", 404));
    course.lectures.push({
        title,
        description,
        video: {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        },
    });
    course.numOfVideos = course.lectures.length;
    await course.save();
    res.status(200).json({
        success: true,
        message: "Thêm bài giảng thành công",
    });
});

export const deleteCourse = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) return next(new ErrorHandler("Không tìm thấy khoá học", 404));
    await cloudinary.v2.uploader.destroy(course.poster.public_id);

    for (let i = 0; i < course.lectures.length; i++) {
        const singleLecture = course.lectures[i];
        await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
            resource_type: "video",
        });
    }
    await course.remove();
    res.status(200).json({
        success: true,
        message: "Xoá khoá học thành công",
    });
});

export const deleteLecture = catchAsyncError(async (req, res, next) => {
    const { courseId, lectureId } = req.query;
    const course = await Course.findById(courseId);
    if (!course) return next(new ErrorHandler("Không tìm thấy khoá học", 404));

    const lecture = course.lectures.find((item) => {
        if (item._id.toString() === lectureId) return item;
    });
    await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
        resource_type: "video",
    });

    course.lectures = course.lectures.filter((item) => {
        if (item._id.toString() !== lectureId) return item;
    });
    course.numOfVideos = course.lectures.length;
    await course.save()

    res.status(200).json({
        success: true,
        message: "Xoá bài giảng thành công",
    });
});
