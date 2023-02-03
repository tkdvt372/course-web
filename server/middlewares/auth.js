import jwt from "jsonwebtoken";
import { catchAsyncError } from "./CatchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { User } from "../models/User.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return next(new ErrorHandler("Lỗi xác minh đăng nhập", 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);

    next();
});

export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "admin")
        return next(new ErrorHandler("Chức năng chỉ dành cho quản trị viên", 403));
    next()

};

export const authorizeSubscriber = (req, res, next) => {
    if (req.user.subscription.status !== "active" && req.user.role !== "admin")
        return next(new ErrorHandler("Chỉ thành viên DVT mới có quyền truy cập", 403));
    next()

};
