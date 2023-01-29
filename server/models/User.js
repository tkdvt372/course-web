import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Vui lòng nhập tên của bạn"],
    },
    email: {
        type: String,
        required: [true, "Vui lòng nhập email của bạn"],
        unique: true,
        validate: validator.isEmail,
    },

    password: {
        type: String,
        required: [true, "Vui lòng nhập mật khẩu của bạn"],
        minLength: [6, "Mật khẩu tối thiểu 6 kí tự"],
        select: false,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },

    subscription: {
        id: String,
        status: String,
    },

    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },

    playlist: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
            poster: String,
        },
    ],

    createdAt: {
        type: Date,
        default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: String,
});

schema.methods.getJWTToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15d",
        }
    );
};
schema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

schema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}
export const User = mongoose.model("User", schema);