import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import { authenticateUser,authorizeRoles } from './middlewares/authenticatorMidd.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
const app=express();

connectDb();
app.use(express.json());

app.use()
app.listen(process.env.PORT,()=>{
    console.log(`The server is running on localhost:${process.env.PORT}`);
})
