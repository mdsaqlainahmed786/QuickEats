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
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
const client_1 = require("@prisma/client");
const paymentRouter = express_1.default.Router();
const { PAYPAL_CLIENT_KEY, PAYPAL_SECRET_KEY, PAYPAL_MODE } = process.env;
const prisma = new client_1.PrismaClient();
paypal_rest_sdk_1.default.configure({
    'mode': PAYPAL_MODE,
    'client_id': PAYPAL_CLIENT_KEY,
    'client_secret': PAYPAL_SECRET_KEY
});
paymentRouter.post('/pay', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const auhenticatedRequest = req;
    if (!auhenticatedRequest.user) {
        res.status(401).json({ message: "Please login" });
        return;
    }
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const { total, cartItems } = req.body;
    console.log("THE TOTAL IS", total);
    const create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel"
        },
        transactions: [{
                item_list: {
                    items: cartItems.map((item) => ({
                        name: item.title,
                        sku: item.id,
                        price: item.price,
                        currency: "USD",
                        quantity: 1
                    }))
                },
                amount: {
                    currency: "USD",
                    total: total
                },
                description: "This is the payment description."
            }]
    };
    const orders = yield prisma.order.create({
        data: {
            total,
            user: {
                connect: { id: userId }
            },
            orderItem: {
                create: cartItems.map((item) => ({
                    title: item.title,
                    price: item.price,
                    image: item.image,
                }))
            }
        },
        include: { orderItem: true },
    });
    console.log("Payment completed, Orders placed!", orders);
    paypal_rest_sdk_1.default.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        }
        else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.json({ link: payment.links[i].href });
                }
            }
        }
    });
}));
exports.default = paymentRouter;
