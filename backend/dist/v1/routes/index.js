"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./users"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const orders_1 = __importDefault(require("./orders"));
const orderMiddleWare_1 = __importDefault(require("../../middleware/orderMiddleWare"));
const payments_1 = __importDefault(require("./payments"));
const dishes_1 = require("./dishes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
    credentials: true
}));
const PORT = 3000;
app.use('/api/v1/users', users_1.default);
app.use('/api/v1/dishes', dishes_1.dishRouter);
app.use('/api/v1/orders', orderMiddleWare_1.default, orders_1.default);
app.use('/api/v1/payments', payments_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
