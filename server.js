require('dotenv').config();
const express = require('express');
const app = require('./app');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const { signup, login } = require('./controllers/authController');
const cors = require('cors');

// Middleware
const allowedOrigins = ['http://localhost:3000']; // Add localhost for local dev

app.use(cors({
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // allow requests with no origin (like mobile apps or curl requests)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Make sure OPTIONS is allowed
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Add necessary headers
  preflightContinue: false, // Don't pass the CORS preflight request to the next middleware
  optionsSuccessStatus: 200, // For legacy browsers that don't support 204
}));

// Handle OPTIONS requests
app.options('*', cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.post('/signup', signup);
app.post('/login', login);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
