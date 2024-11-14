// app.js
const express = require('express');
const connectDB = require('./config/db');
const uploadRoutes = require('./routes/uploadRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();
connectDB();

// Middleware
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Car Management API',
      version: '1.0.0',
      description: 'API for managing cars and user authentication',
      contact: {
        name: 'pratham',
        email: 'prathamchhabra16@gmail.com'
      }
    },
    servers: [
      {
        url: `http://localhost:5000`,
        description: 'Development server'
      }
    ]
  },
  apis: ['./routes/*.js'],
};

// Initialize Swagger docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/upload', uploadRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
