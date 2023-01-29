import { catchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";
export const Register = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    // const file = req.file;
    if (!name || !email || !password)
        return next(new ErrorHandler("Vui lòng nhập đầy đủ thông tin!", 400));
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("Tài khoản của bạn đã tồn tại", 409));
    }

    //upload file
    user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "temp_id",
            url: "temp_url",
        },
    });

    sendToken(res, user, "Đăng ký thành công", 201);
});

export const Login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return next(new ErrorHandler("Vui lòng nhập đầy đủ thông tin!", 400));
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Tài khoản không tồn tại", 409));
    }

   const isMatch = await user.comparePassword(password)
   if(!isMatch) return next(new ErrorHandler("Email hoặc mật khẩu không chính xác",401))
    sendToken(res, user, `Chào mừng bạn trở lại, ${user.name}`, 200);
});



export const Logout = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("token",null,{
        expires: new Date(Date.now())
    }).json({
        success: true,
        message:"Đăng xuất thành công!"
    })
});