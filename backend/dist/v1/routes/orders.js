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
const client_1 = require("@prisma/client");
const ordersRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
ordersRouter.get('/', (req, res) => {
    res.send('GET /orders');
});
ordersRouter.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const auhenticatedRequest = req;
    if (!auhenticatedRequest.user) {
        res.status(401).json({ message: "Please login" });
        return;
    }
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const { cartItems, total } = req.body;
    try {
        const order = yield prisma.order.create({
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
        res.json({ message: "Order added successfully", order, total, cartItems });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = ordersRouter;
