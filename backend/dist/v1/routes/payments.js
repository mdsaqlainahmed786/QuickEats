"use strict";
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
paymentRouter.post('/pay', (req, res) => {
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
});
exports.default = paymentRouter;
