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
const nodemailer_1 = __importDefault(require("nodemailer"));
const client_1 = require("@prisma/client");
const UserValidator_1 = require("../../Validators/UserValidator");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
const SALT_ROUNDS = 10;
function sendOtp(email, otp) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
UserRouter.post('/sign-up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyParser = UserValidator_1.UserSignUpValidator.safeParse(req.body);
    if (!bodyParser.success) {
        res.status(400).json({ error: bodyParser.error });
        return;
    }
    const { userName, email, password, phoneNumber } = bodyParser.data;
    const existingUser = yield prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        res.status(400).json({ error: 'User already exists' });
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail address
            pass: process.env.EMAIL_PASS // Your App password
        }
    });
    const mailOptions = {
        from: {
            name: 'CartCraze',
            address: process.env.EMAIL_USER
        },
        to: email, // List of receivers
        subject: 'Verify your email', // Subject line
        text: `Please verify your email by entering this otp`, // Plain text body
        html: `<p>Please verify your email by entering the otp: <b>${otp}</b></p>`, // HTML body
    };
    const sendMail = (transporter, mailOptions) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            transporter.sendMail(mailOptions);
        }
        catch (error) {
            console.error('Error sending email:', error);
        }
    });
    sendMail(transporter, mailOptions);
    const newUser = yield prisma.user.create({
        data: {
            userName,
            email,
            phoneNumber,
            password: hashedPassword,
            otp,
            otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
        }
    });
    const temToken = jsonwebtoken_1.default.sign({ email, isVerified: newUser.isVerified }, process.env.JWT_SECRET, { expiresIn: '5m' });
    res.cookie("AUTH_TOKEN", temToken);
    res.status(200).json({ message: "The verification otp has been sent to mail!" });
}));
UserRouter.post('/verify-otp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
    if (!otp) {
        res.status(400).json({ error: 'OTP is required' });
        return;
    }
    const tempToken = req.cookies.AUTH_TOKEN;
    if (!tempToken) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(tempToken, process.env.JWT_SECRET);
        const user = yield prisma.user.findFirst({
            where: {
                email: decoded.email,
                isVerified: false,
                otpExpiresAt: {
                    gte: new Date()
                }
            }
        });
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const checkUser = yield prisma.user.findFirst({
                where: {
                    email: decoded.email,
                    isVerified: false
                }
            });
            if (!checkUser)
                return;
            else if (!checkUser.isVerified || !checkUser.otpExpiresAt || new Date() > checkUser.otpExpiresAt || (checkUser === null || checkUser === void 0 ? void 0 : checkUser.otp)) {
                yield prisma.user.delete({
                    where: { id: checkUser.id }
                });
                // res.clearCookie("AUTH_TOKEN");
            }
        }), 5 * 60 * 1000);
        if (!user || !user.otpExpiresAt || new Date() > user.otpExpiresAt || user.otp !== otp) {
            res.status(400).json({ error: "No user found or Invalid otp", user, otp, otpExpiresAt: user === null || user === void 0 ? void 0 : user.otpExpiresAt, isVerified: user === null || user === void 0 ? void 0 : user.isVerified });
            return;
        }
        const verifiedUser = yield prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                otp: null,
                otpExpiresAt: null
            }
        });
        const token = jsonwebtoken_1.default.sign({ userId: verifiedUser.id, email: verifiedUser.email, isVerified: true }, process.env.JWT_SECRET);
        res.cookie("AUTH_TOKEN", token);
        res.status(200).json({ message: "Email verified successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Session expired for otp verification" });
    }
    res.status(500).json({ error: 'Internal server error during verification' });
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
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(400).json({ error: 'Invalid password' });
        return;
    }
    if (!user.isVerified || !user.otpExpiresAt || new Date() > user.otpExpiresAt || (user === null || user === void 0 ? void 0 : user.otp)) {
        res.status(400).json({ error: "Email not verified" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET);
    res.cookie("AUTH_TOKEN", token);
    res.status(200).json({
        message: 'User logged in successfully',
        data: user
    });
}));
UserRouter.get("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("AUTH_TOKEN");
    res.status(200).json({ message: "Logged out successfully" });
}));
UserRouter.get("/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.AUTH_TOKEN;
    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield prisma.user.findUnique({
            where: { id: decoded.userId }
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        //  console.log("USER>>>>>>>>", user);
        res.status(200).json({ userName: user.userName, email: user.email });
    }
    catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
}));
exports.default = UserRouter;
