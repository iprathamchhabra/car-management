require('dotenv').config();
const express = require('express');
const app = require('./app');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const { signup, login } = require('./controllers/authController');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.post('/signup', signup);
app.post('/login', login);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
