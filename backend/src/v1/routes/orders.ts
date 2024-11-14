import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const ordersRouter = express.Router();
const prisma = new PrismaClient();
interface AuthenticatedRequest extends Request {
    user?: {
        userId: string,
        email: string
    }
}
ordersRouter.get('/', (req, res) => {
    res.send('GET /orders');
});



ordersRouter.get('/all', async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    try {
        const orders = await prisma.order.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                orderItem: true
            }
        });
        res.json({
            orders:orders
        });
    } catch (error) {
        console.log(error);
    }
})

export default ordersRouter;