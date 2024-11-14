// carRoutes.js
const express = require('express');
const {
  addCar, getUserCars, getCarById, updateCar, deleteCar,
} = require('../controllers/carController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Add a new car
 *     description: Allows a user to add a new car with details.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cars
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Car added successfully.
 *       401:
 *         description: Unauthorized.
 */
router.post('/', authMiddleware, addCar);

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Get all cars for the logged-in user
 *     description: Retrieve a list of all cars created by the logged-in user.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cars
 *     responses:
 *       200:
 *         description: A list of cars.
 *       401:
 *         description: Unauthorized.
 */
router.get('/', authMiddleware, getUserCars);

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Get a car by ID
 *     description: Retrieve a single car's details by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cars
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car details.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Car not found.
 */
router.get('/:id', authMiddleware, getCarById);

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update a car by ID
 *     description: Update the details of a car by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cars
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Car updated successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Car not found.
 */
router.patch('/:id', authMiddleware, updateCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     description: Delete a car by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cars
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Car not found.
 */
router.delete('/:id', authMiddleware, deleteCar);

module.exports = router;
