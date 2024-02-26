import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.route.js';
import adminRouter from './routes/admin.route.js'
import userRouter from './routes/user.route.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected successfully ");
}).catch((err) => {
    console.log("Mongo err", err);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    res.json({ msg: "Hello World!" });
});

app.use('/api/auth', authRouter);
 app.use('/api/admin', adminRouter);
 app.use('/api/user', userRouter);
 app.use('/api/list', listingRouter);



app.use(function (err, req, res, next) {
    const statusCode  = res.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});

