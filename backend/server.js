import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// data MongoDB
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/Shop-Quang-Chau', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use('/api/users', userRouter); // Khi xem data: http://localhost:5000/api/users/seed

app.use('/api/products', productRouter); // Khi xem data: http://localhost:5000/api/products/seed

app.use('/api/orders', orderRouter);

app.use('/api/uploads', uploadRouter);

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Thông tin sản phẩm
// app.get('/api/products/:id', (req, res) => {
//     const product = data.products.find((x) => x._id === parseInt(req.params.id));
//     if (product) {
//         res.send(product);
//     } else {
//         res.status(404).send({ message: 'Không tìm thấy sản phẩm' });
//     }
// });

// app.get('/api/products', (req, res) => {
//     res.send(data.products);
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});
