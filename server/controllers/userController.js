import { catchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { Course } from "../models/Course.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import { Stats } from "../models/Stats.js";

//Register
export const Register = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const file = req.file;

    if (!name || !email || !password || !file)
        return next(new ErrorHandler("Vui lòng nhập đầy đủ thông tin!", 400));
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("Tài khoản của bạn đã tồn tại", 409));
    }
    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
    user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        },
    });

    sendToken(res, user, "Đăng ký thành công", 201);
});

//Login
export const Login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return next(new ErrorHandler("Vui lòng nhập đầy đủ thông tin!", 400));
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Tài khoản không tồn tại", 409));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
        return next(
            new ErrorHandler("Email hoặc mật khẩu không chính xác", 401)
        );
    sendToken(res, user, `Chào mừng bạn trở lại, ${user.name}`, 200);
});

//Logout
export const Logout = catchAsyncError(async (req, res, next) => {
    res.status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Đăng xuất thành công!",
        });
});

//Get profile
export const getMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({
        success: true,
        user,
    });
});

//Change password

export const changePassword = catchAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
        return next(new ErrorHandler("Vui lòng nhập đầy đủ thông tin", 400));
    const user = await User.findById(req.user._id).select("+password");
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch)
        return next(new ErrorHandler("Mật khẩu cũ không chính xác", 400));
    user.password = newPassword;
    await user.save();
    res.status(200).json({
        success: true,
        message: "Đổi mật khẩu thành công",
    });
});

//update profile
export const updateProfile = catchAsyncError(async (req, res, next) => {
    const { name, email } = req.body;
    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (email) user.email = email;
    await user.save();
    res.status(200).json({
        success: true,
        message: "Cập nhật hồ sơ thành công",
    });
});

//update profile picture
export const updateProfilePicture = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const file = req.file;
    const fileUri = getDataUri(file);
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
    user.avatar = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
    };
    await user.save();
    res.status(200).json({
        success: true,
        message: "Cập nhật ảnh đại diện thành công",
    });
});

//forget password
export const forgetPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler("Không tìm thấy tài khoản", 400));
    const resetToken = user.getResetToken();

    await user.save();
    const url = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `Nhấn vào link để đặt lại mật khẩu: ${url}  .Nếu bạn không có yêu cầu gì hãy bỏ qua`;
    //send token via email
    await sendEmail(user.email, "Đặt lại mật khẩu", message);

    res.status(200).json({
        success: true,
        message: `Reset Token đã được gửi đến ${user.email}`,
    });
});

//reset password
export const resetPassword = catchAsyncError(async (req, res, next) => {
    const { token } = req.params;
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
            $gt: Date.now(),
        },
    });
    //token is invalid or has been expired
    if (!user)
        return next(new ErrorHandler("Token không đúng hoặc hết hạn", 401));
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save();
    res.status(200).json({
        success: true,
        message: "Đặt lại mật khẩu thành công",
    });
});

//Add to playlist
export const addToPlaylist = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.body.id);
    if (!course) return next(new ErrorHandler("Id khoá học không hợp lệ", 404));
    const itemExist = user.playlist.find((item) => {
        if (item.course.toString() === course._id.toString()) return true;
    });
    if (itemExist)
        return next(
            new ErrorHandler(
                "Khoá học đã tồn tại trong danh sách ưa thích",
                409
            )
        );
    user.playlist.push({
        course: course._id,
        poster: course.poster.url,
    });
    await user.save();
    res.status(200).json({
        success: true,
        message: "Thêm vào danh sách ưa thích thành công!",
    });
});

export const removeFromPlaylist = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.query.id);
    if (!course) return next(new ErrorHandler("Id khoá học không hợp lệ", 404));

    const newPlaylist = user.playlist.filter((item) => {
        if (item.course.toString() !== course._id.toString()) return item;
    });
    user.playlist = newPlaylist;
    await user.save();
    res.status(200).json({
        success: true,
        message: "Bỏ yêu thích thành công!",
    });
});
export const deleteMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    await user.remove();
    res.status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Xoá hồ sơ thành công",
        });
});

//* ===================ADMIN CONTROLLER============================
export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        success: true,
        users,
    });
});

export const updateUserRole = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return next(ErrorHandler("Không tìm thấy tài khoản", 404));
    if (user.role === "user") user.role = "admin";
    else user.role = "user";
    await user.save();

    res.status(200).json({
        success: true,
        message: "Thay đổi thành công",
    });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return next(ErrorHandler("Không tìm thấy tài khoản", 404));
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    await user.remove();
    res.status(200).json({
        success: true,
        message: "Xoá tài khoản thành công",
    });
});


User.watch().on("change", async () => {
    const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  
    const subscription = await User.find({ "subscription.status": "active" });
    stats[0].users = await User.countDocuments();
    stats[0].subscription = subscription.length;
    stats[0].createdAt = new Date(Date.now());
  
    await stats[0].save();
  });
  