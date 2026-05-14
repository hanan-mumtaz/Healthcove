const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require("passport");
const connectDB = require('./config/db'); // ✅ Import your new DB config

// Load Environment Variables
dotenv.config();

// Connect to Database
connectDB(); // ✅ This handles the connection and error logging

const app = express();

// 1. Middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// 2. Load Passport Configuration
require("./config/passport");

// 3. Define Routes
// (Importing them directly inside app.use keeps the top of the file clean)
app.use('/api/auth', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/uploads', express.static('uploads'));

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
// 4. Global Error Handler (Optional but helpful for FYP)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});

// 5. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});