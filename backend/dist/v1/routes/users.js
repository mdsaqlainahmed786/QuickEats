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
// users.ts
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const UserValidator_1 = require("../../Validators/UserValidator");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
const SALT_ROUNDS = 10;
UserRouter.post('/sign-up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyParser = UserValidator_1.UserSignUpValidator.safeParse(req.body);
    if (!bodyParser.success) {
        res.status(400).json({ error: bodyParser.error });
        return;
    }
    const { userName, email, password } = bodyParser.data;
    const existingUser = yield prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        res.status(400).json({ error: 'User already exists' });
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
    const user = yield prisma.user.create({
        data: {
            userName,
            email,
            password: hashedPassword
        }
    });
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET);
    res.cookie("AUTH_TOKEN", token, { httpOnly: true });
    res.status(200).json({
        message: 'User created successfully',
        data: user
    });
}));
UserRouter.post('/sign-in', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyParser = UserValidator_1.UserLoginValidator.safeParse(req.body);
    if (!bodyParser.success) {
        res.status(400).json({ error: bodyParser.error });
        return;
    }
    const { email, password } = bodyParser.data;
    const user = yield prisma.user.findUnique({
        where: { email }
    });
    if (!user) {
        res.status(400).json({ error: 'User not found' });
        return;
    }
    3;
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(400).json({ error: 'Invalid password' });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET);
    res.cookie("AUTH_TOKEN", token, { httpOnly: true });
    res.status(200).json({
        message: 'User logged in successfully',
        data: user
    });
}));
UserRouter.get("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("AUTH_TOKEN");
    res.status(200).json({ message: "Logged out successfully" });
}));
exports.default = UserRouter;
