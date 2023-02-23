import { catchAsyncError } from "../middlewares/CatchAsyncError.js";
import paypal from "paypal-rest-sdk";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
export const buySubscription = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const total = req.query.total;
    const title = req.query.title;
    const sku = req.query.sku;
    if (user.role === "admin")
        return next(
            new ErrorHandler("Quản trị viên không thể đăng ký thành viên", 400)
        );
    var create_payment_json = {
        intent: "order",
        payer: {
            payment_method: "paypal",
        },
        redirect_urls: {
            return_url: `https://course-web-dvt.herokuapp.com/api/v1/success?total=${total}`,
            cancel_url: `https://course-web-dvt.herokuapp.com/api/v1/fail`,
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: title,
                            sku: sku,
                            price: total,
                            currency: "USD",
                            quantity: 1,
                        },
                    ],
                },
                amount: {
                    currency: "USD",
                    total: total,
                },
                description: "This is the payment description.",
            },
        ],
    };
    paypal.payment.create(create_payment_json, async function (error, payment) {
        if (error) {
            throw error;
        } else {
            user.subscription.id = payment.id;
            user.subscription.status = payment.state;
            await user.save();
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                    res.status(201).json({
                        success: true,
                        url: payment.links[i].href.toString(),
                    });
                }
            }
        }
    });
});

export const buySubscriptionSuccess = catchAsyncError(
    async (req, res, next) => {
        const user = await User.findById(req.user._id);
        const payerID = req.query.PayerID;
        const total = req.query.total;
        var execute_payment_json = {
            payer_id: payerID,
            transactions: [
                {
                    amount: {
                        currency: "USD",
                        total: total,
                    },
                },
            ],
        };
        var paymentId = req.query.paymentId;
        await paypal.payment.execute(
            paymentId,
            execute_payment_json,
            async function (error, payment) {
                if (error) {
                    console.log(error.response);
                    throw error;
                } else {
                    user.subscription.status = "active";
                    user.subscription.createdTime = payment.create_time;
                    await user.save();
                    res.redirect(`${process.env.FRONTEND_URL}/courses`);
                }
            }
        );
    }
);
export const buySubscriptionFail = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Đăng ký thất bại. Vui lòng thử lại sau giây lát.",
    });
});

export const cancelSubscription = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    user.subscription.id = undefined;
    user.subscription.status = undefined;
    await user.save();
    res.status(200).json({
        success: true,
        message: "Huỷ thành viên thành công",
    });
});
