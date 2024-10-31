// users.ts
import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { UserSignUpValidator, UserLoginValidator } from '../../Validators/UserValidator';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

const UserRouter = express.Router();
const prisma = new PrismaClient();
dotenv.config();
const SALT_ROUNDS = 10;

UserRouter.post('/sign-up', async (req, res) => {
    const bodyParser = UserSignUpValidator.safeParse(req.body);
    if (!bodyParser.success) {
        res.status(400).json({ error: bodyParser.error });
        return;
    }
    const { userName, email, password } = bodyParser.data;


    const existingUser = await prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        res.status(400).json({ error: 'User already exists' });
        return;
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
        data: {
            userName,
            email,
            password: hashedPassword
        }
    });
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET as string);
    res.cookie("AUTH_TOKEN", token, { httpOnly: true });
    res.status(200).json({
        message: 'User created successfully',
        data: user
    });
});

UserRouter.post('/sign-in', async (req, res) => {
    const bodyParser = UserLoginValidator.safeParse(req.body);
    if (!bodyParser.success) {
        res.status(400).json({ error: bodyParser.error });
        return;
    }
    const { email, password } = bodyParser.data;
    const user = await prisma.user.findUnique({
        where: { email }
    });
    if (!user) {
        res.status(400).json({ error: 'User not found' });
        return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(400).json({ error: 'Invalid password' });
        return;
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET as string);
    res.cookie("AUTH_TOKEN", token, { httpOnly: true });

    res.status(200).json({
        message: 'User logged in successfully',
        data: user
    });
});
UserRouter.get("/logout", async (req, res) => {
    res.clearCookie("AUTH_TOKEN");
    res.status(200).json({ message: "Logged out successfully" });
});

export default UserRouter;
