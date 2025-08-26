import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from 'passport';
import cookieParser from 'cookie-parser'; 
import connectDB from './config/db.js';
import passportConfig from './config/passport.js'; 
import authRoutes from "./routes/auth.js";
import userRoutes from './routes/user.js';
import transactionRoutes from './routes/transactions.js';
import adminRoutes from './routes/admin.js';

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174', 
    // This is my online client app URL 
    'https://fintrack-mern-app-shiv-patel-s-projects.vercel.app',
    'https://fintrack-mern-8tlyjye4c-shiv-patel-s-projects.vercel.app/',
    'https://fintrack-mern-app-git-main-shiv-patel-s-projects.vercel.app/',
  ],
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
passportConfig(passport);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

});
