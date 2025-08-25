// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import passport from 'passport';
// import connectDB from './config/db.js';
// import passportConfig from './config/passport.js'; 
// import authRoutes from "./routes/auth.js";
// import userRoutes from './routes/user.js';
// import transactionRoutes from './routes/transactions.js';
// import adminRoutes from './routes/admin.js';
// import cookieParser from 'cookie-parser';

// // Load environment variables 
// dotenv.config();
// connectDB();


// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());

// // Initialize passport and apply the config
// app.use(passport.initialize());
// passportConfig(passport);

// // A simple test route to make sure server is working 
// app.get('/', (req, res) =>{
//     res.send("Hello from the MERN Backend ")
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);  // user route 
// app.use('/api/transactions', transactionRoutes);  // transaction route
// app.use('/api/admin', adminRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from 'passport';
import cookieParser from 'cookie-parser'; // Make sure this is imported
import connectDB from './config/db.js';
import passportConfig from './config/passport.js'; 
import authRoutes from "./routes/auth.js";
import userRoutes from './routes/user.js';
import transactionRoutes from './routes/transactions.js';
import adminRoutes from './routes/admin.js';

dotenv.config();
connectDB();

const app = express();

// --- START OF CORS CONFIGURATION ---
const corsOptions = {
  origin: [
    'http://localhost:5173', // Your user-facing app
    'http://localhost:5174', // Your admin panel
  ],
  credentials: true, // This is crucial for cookies
};

app.use(cors(corsOptions));
// --- END OF CORS CONFIGURATION ---

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
passportConfig(passport);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});