import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config({
    path: "./config/config.env",
});
const app = express();

// Using middleware
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        method: ["GET", "POST", "PUT", "DELETE"],
    })
);

//Importing and using Routes
import course from "./routes/CourseRoute.js";
import user from "./routes/UserRoute.js";
import payment from "./routes/PaymentRoute.js";
import other from "./routes/otherRoute.js";
app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", other);

app.use("/", (req, res) => {
    res.send({ message: "Duong Van Tuan" });
});
app.use(ErrorMiddleware);
export default app;
