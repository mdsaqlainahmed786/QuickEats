// users.ts
import express from 'express';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import { UserSignUpValidator, UserLoginValidator } from '../../Validators/UserValidator';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import { set } from 'zod';

const UserRouter = express.Router();
const prisma = new PrismaClient();
dotenv.config();
const SALT_ROUNDS = 10;

async function sendOtp(email: string, otp: string) {


}

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
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,  // Your Gmail address
            pass: process.env.EMAIL_PASS   // Your App password
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

    const sendMail = async (transporter: any, mailOptions: any) => {
        try {
            transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
    sendMail(transporter, mailOptions)
    const newUser = await prisma.user.create({
        data: {
            userName,
            email,
            password: hashedPassword,
            otp,
            otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
        }
    })
    const temToken = jwt.sign({ email, isVerified: newUser.isVerified }, process.env.JWT_SECRET as string, { expiresIn: '5m' });
    res.cookie("AUTH_TOKEN", temToken);
    res.status(200).json({ message: "The verification otp has been sent to mail!" , otp});
});
//@ts-ignore
UserRouter.post('/verify-otp', async (req, res) => {
    const { otp } = req.body;
    if (!otp) {
        return res.status(400).json({ error: 'OTP is required' });
    }

    const tempToken = req.cookies.AUTH_TOKEN;
    if (!tempToken) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(tempToken, process.env.JWT_SECRET as string) as jwt.JwtPayload & { email: string };
        const user = await prisma.user.findFirst({
            where: {
                email: decoded.email,
                isVerified: false,
                otpExpiresAt: {
                    gte: new Date()
                }
            }
        });

        if (!user || !user.otpExpiresAt || new Date() > user.otpExpiresAt || user.otp !== otp) {
            return res.status(400).json({
                error: "No user found or Invalid otp",
                user,
                otp,
                otpExpiresAt: user?.otpExpiresAt,
                isVerified: user?.isVerified
            });
        }

        const verifiedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                otp: null,
                otpExpiresAt: null
            }
        });
          const userDetails = await prisma.user.findUnique({
            where: {
                email: decoded.email,
                isVerified: true,
                otp: null,
                otpExpiresAt: null
            },
        });
        //console.log("User verified successfully", userDetails);
        const token = jwt.sign(
            { userId: verifiedUser.id, email: verifiedUser.email, isVerified: true },
            process.env.JWT_SECRET as string
        );

        res.cookie("AUTH_TOKEN", token);
       // console.log("User verified successfully", userDetails?.userName);
        return res.status(200).json({ message: "Email verified successfully", userName: userDetails?.userName });

    } catch (error) {
        return res.status(500).json({ error: "Session expired for otp verification" });
    }
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
    if (!user.isVerified || user?.otp) {
        res.status(400).json({ error: "Email not verified" });
        return;
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET as string);
    res.cookie("AUTH_TOKEN", token);

    res.status(200).json({
        message: 'User logged in successfully',
        data: user
    });
});
UserRouter.get("/logout", async (req, res) => {
    res.clearCookie("AUTH_TOKEN");
    res.status(200).json({ message: "Logged out successfully" });
});

UserRouter.get("/me", async (req, res) => {
    const token = req.cookies.AUTH_TOKEN;
    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload & { userId: string };
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId }
        })
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        //  console.log("USER>>>>>>>>", user);
        res.status(200).json({ userName: user.userName, email: user.email });
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
});

UserRouter.get('/unauthorized', (req, res) => {
    try {
        const authToken = req.cookies.AUTH_TOKEN;
        if (!authToken) {
            res.status(401).json({ error: 'Unauthorized to enter otp' });
            return
        }
        const token = jwt.verify(authToken, process.env.JWT_SECRET as string) as jwt.JwtPayload & { email: string, isVerified: boolean };
        if (token.isVerified) {
            res.status(400).json({ message: 'Already verified' });
            return
        }
        res.status(200).json({ message: 'Enter otp' });

    } catch (error) {
        console.error('Error in unauthorized:', error);
        res.status(401).json({ error: 'Session expired' });
        const token = req.cookies.AUTH_TOKEN;
        async function seeUser() {
            try {
                const checkUser = await prisma.user.findFirst({
                    where: {
                        email: token.email,
                        isVerified: false
                    }
                });
                await prisma.user.delete({
                    where: { id: checkUser!.id }
                });
            } catch (error) {
                console.error('Session Expired, Jwt is dead');
            }
        };
        
        seeUser();
    }
})

export default UserRouter;
