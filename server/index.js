import app from "./app.js";
import { connectDb } from "./config/database.js";
import cloudinary from "cloudinary";
import paypal from "paypal-rest-sdk";
import nodeCron from "node-cron";
import { Stats } from "./models/Stats.js";

connectDb();
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

paypal.configure({
    mode: "sandbox",
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_SECRET,
});

nodeCron.schedule("0 0 0 1 * *", async () => {
    try {
        await Stats.create({});
    } catch (error) {
        console.log(error);
    }
});

app.listen(process.env.PORT, () => {
    console.log("Server listening on port " + process.env.PORT);
});
