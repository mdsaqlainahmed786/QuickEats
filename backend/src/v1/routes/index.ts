import express from 'express';
import cors from 'cors';
import UserRouter from './users';
import cookieParser from "cookie-parser"
import ordersRouter from './orders';
import orderMiddleWare from "../../middleware/orderMiddleWare"
 import paymentRouter from './payments';
import { dishRouter } from './dishes';
const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));

const PORT = 3000;

app.use('/api/v1/users', UserRouter);
app.use('/api/v1/dishes', dishRouter);
app.use('/api/v1/orders', orderMiddleWare, ordersRouter);
 app.use('/api/v1/payments',orderMiddleWare, paymentRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
