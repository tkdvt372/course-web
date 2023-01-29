import mongoose from "mongoose";
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Vui lòng nhập tiêu đề"],
        minLength: [4, "Tiêu đề tối thiểu 4 kí tự"],
        maxLength: [80, "Tiêu đề tối đa 80 kí tự"],
    },
    description: {
        type: String,
        required: [true, "Vui lòng nhập mô tả"],
        minLength: [20, "Mô tả tối thiểu 20 kí tự"],
    },

    lectures: [
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            video: {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        },
    ],

    poster: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    views: {
        type: Number,
        default: 0,
    },
    numOfVideos: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: [true, "Vui lòng nhập tên tác giả"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Course = mongoose.model("Course", schema);
