import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
    buySubscription,
    buySubscriptionFail,
    buySubscriptionSuccess,
    cancelSubscription,
} from "../controllers/paymentController.js";

const router = express.Router();
//Buy subscription
router.get("/subscription",isAuthenticated, buySubscription);
//Buy subscription success
router.get("/success", isAuthenticated, buySubscriptionSuccess);
//Buy subscription fail
router.get("/fail", isAuthenticated, buySubscriptionFail);

//Cancel Subscription
router.delete("/subscribe/cancel", isAuthenticated, cancelSubscription);

export default router;
