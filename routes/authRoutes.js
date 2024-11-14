// authRoutes.js
const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Allows a new user to register by providing username and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request.
 */
router.post('/signup', signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Allows a user to log in with their credentials.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       400:
 *         description: Invalid credentials.
 */
router.post('/login', login);

module.exports = router;
