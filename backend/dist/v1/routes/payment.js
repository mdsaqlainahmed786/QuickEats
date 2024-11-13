"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const razorpay_1 = __importDefault(require("razorpay"));
const paymentRouter = express_1.default.Router();
paymentRouter.use(body_parser_1.default.json());
paymentRouter.use(body_parser_1.default.urlencoded({ extended: true }));
paymentRouter.use((0, cors_1.default)());
paymentRouter.get('/', (req, res) => {
    res.send("Hello World!");
});
paymentRouter.post('/payment-gateway', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const razorpay = new razorpay_1.default({
        key_id: "rzp_test_GcZZFDPP0jHtC4",
        key_secret: "6JdtQv2u7oUw7EWziYeyoewJ"
    });
    const options = {
        amount: req.body.amount,
        currency: "INR",
        receipt: "receipt#1",
        payment_capture: 1
    };
    try {
        const response = yield razorpay.orders.create(options);
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount
        });
    }
    catch (error) {
        res.status(500).send("Internal server error");
    }
}));
paymentRouter.get("/payment/:paymentId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentId } = req.params;
    const razorpay = new razorpay_1.default({
        key_id: "rzp_test_GcZZFDPP0jHtC4",
        key_secret: "6JdtQv2u7oUw7EWziYeyoewJ"
    });
    try {
        const payment = yield razorpay.payments.fetch(paymentId);
        if (!payment) {
            res.status(500).json("Error at razorpay loading");
            return;
        }
        res.json({
            status: payment.status,
            method: payment.method,
            amount: payment.amount,
            currency: payment.currency
        });
    }
    catch (error) {
        res.status(500).json("failed to fetch");
    }
}));
exports.default = paymentRouter;
