import { catchAsyncError } from "../middlewares/CatchAsyncError.js";
import paypal from "paypal-rest-sdk";
import ErrorHandler from "../utils/ErrorHandler.js";
import { User } from "../models/User.js";
export const buySubscription = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
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
            return_url: "http://localhost:5000/api/v1/success",
            cancel_url: "http://localhost:5000/api/v1/fail",
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: "Gói thành viên DVT",
                            sku: "001",
                            price: "260",
                            currency: "USD",
                            quantity: 1,
                        },
                    ],
                },
                amount: {
                    currency: "USD",
                    total: "260",
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
                    res.send(payment.links[i].href.toString());
                }
            }
        }
    });
});

export const buySubscriptionSuccess = catchAsyncError(
    async (req, res, next) => {
        const user = await User.findById(req.user._id);
        const payerID = req.query.PayerID;
        var execute_payment_json = {
            payer_id: payerID,
            transactions: [
                {
                    amount: {
                        currency: "USD",
                        total: "260",
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
                    await user.save()
                    res.status(200).json({
                        success: true,
                        message: "Đăng ký thành công thành viên DVT",
                    });
                    // res.redirect(`${process.env.FRONTEND_URL}/courses`);
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
