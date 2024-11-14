import express, { Request, Response } from 'express';
import paypal from 'paypal-rest-sdk';
import { PrismaClient } from '@prisma/client';

const paymentRouter = express.Router();

const { PAYPAL_CLIENT_KEY, PAYPAL_SECRET_KEY, PAYPAL_MODE } = process.env;

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
paypal.configure({
    'mode': PAYPAL_MODE!,
    'client_id': PAYPAL_CLIENT_KEY!,
    'client_secret': PAYPAL_SECRET_KEY!
});

paymentRouter.post('/pay', async (req: AuthenticatedRequest & { body: { cartItems: any[], total: number } }, res: Response) => {
    const auhenticatedRequest = req as AuthenticatedRequest;
    if (!auhenticatedRequest.user) {
        res.status(401).json({ message: "Please login" });
        return;
    }

    const userId = req.user?.userId;
    const { total, cartItems } = req.body;
    console.log("THE TOTAL IS", total);

    const create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel"
        },
        transactions: [{
            item_list: {
                items: cartItems.map((item: any) => ({
                    name: item.title,
                    sku: item.id,
                    price: item.price,
                    currency: "USD",
                    quantity: 1
                }))
            },
            amount: {
                currency: "USD",
                total: total
            },
            description: "This is the payment description."
        }]
    };

    const orders = await prisma.order.create({
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

    console.log("Payment completed, Orders placed!", orders );

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links!.length; i++) {
                if (payment.links![i].rel === 'approval_url') {
                    res.json({ link: payment.links![i].href });
                }
            }
        }
    });
});

export default paymentRouter;