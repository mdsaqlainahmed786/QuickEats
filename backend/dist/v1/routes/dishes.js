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
exports.dishRouter = void 0;
const express_1 = __importDefault(require("express"));
const DishValidator_1 = require("../../Validators/DishValidator");
const client_1 = require("@prisma/client");
exports.dishRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
exports.dishRouter.get('/all-dishes', (req, res) => {
    res.send('Dishes');
});
exports.dishRouter.post('/add-dish', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyParser = DishValidator_1.DishValidator.safeParse(req.body);
    if (!bodyParser.success) {
        res.status(400).json({ error: bodyParser.error });
        return;
    }
    const { title, price, description, category, image } = bodyParser.data;
    try {
        const dish = yield prisma.dish.create({
            data: {
                title,
                price,
                description,
                category,
                image
            }
        });
        console.log("Dish created>>>", dish);
    }
    catch (error) {
        res.status(400).json({ error });
        return;
    }
    res.status(200).json({ message: 'Dish added successfully' });
}));
exports.dishRouter.get('/get-all-dishes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dishes = yield prisma.dish.findMany();
    res.status(200).json(dishes);
}));
