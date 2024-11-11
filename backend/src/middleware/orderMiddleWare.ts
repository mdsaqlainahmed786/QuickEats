import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        email: string;
        isVerified: boolean;
    };
}
const orderMiddleWare = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.AUTH_TOKEN;
    if (!token) {
        res.status(401).json({
            message: "No token found!"
        })
        return;
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

        req.user = {
            userId: decodedToken.userId,
            email: decodedToken.email,
            isVerified: decodedToken.isVerified
        }
        if (!req.user.isVerified) {
            res.status(401).json({ message: "Please login" })
            return;
        }
        next()
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }

};

export default orderMiddleWare;