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

interface OrderItem {
    title: string;
    price: number;
    image: string;
}

ordersRouter.get('/', (req, res) => {
    res.send('GET /orders');
});



ordersRouter.post('/add', async (req: AuthenticatedRequest & { body: { cartItems: any[], total: number } }, res: Response) => {
    const auhenticatedRequest = req as AuthenticatedRequest;
    if (!auhenticatedRequest.user) {
        res.status(401).json({ message: "Please login" });
        return;
    }

    const userId = req.user?.userId;
    const { cartItems } = req.body
    try {
        const total = cartItems.reduce((acc:any, item:OrderItem) => acc + item.price, 0);
        const order = await prisma.order.create({
            data: {
                total,
                user: {
                    connect: { id: userId }
                },
                orderItem: {
                    create: cartItems.map((item: OrderItem) => ({
                        title: item.title,
                        price: item.price,
                        image: item.image,

                    }))
                }
            },
            include: { orderItem: true },
        })
        res.json({ message: "Order added successfully", order, total, cartItems })
    } catch (error) {
        console.log(error);
    }
})

ordersRouter.get('/all', async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    try {
        const orders = await prisma.order.findMany({
            where: {
                userId
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