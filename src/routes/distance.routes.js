const express = require('express');
const distanceController = require('../controllers/distance.controller.js');
const apiLimiter = require('../middlewares/rateLimiters.js');

const router = express.Router();

/**
 * @swagger
 * /distance:
 *   get:
 *     summary: Calculate the distance between two geographical points using Haversine formula.
 *     description: Provides the distance in kilometers or miles between two sets of latitude and longitude coordinates.
 *     parameters:
 *       - in: query
 *         name: lat1
 *         schema:
 *           type: number
 *           format: float
 *         required: true
 *         description: Latitude of the first point (e.g., 34.0522). Must be between -90 and 90.
 *       - in: query
 *         name: lon1
 *         schema:
 *           type: number
 *           format: float
 *         required: true
 *         description: Longitude of the first point (e.g., -118.2437). Must be between -180 and 180.
 *       - in: query
 *         name: lat2
 *         schema:
 *           type: number
 *           format: float
 *         required: true
 *         description: Latitude of the second point (e.g., 36.7783). Must be between -90 and 90.
 *       - in: query
 *         name: lon2
 *         schema:
 *           type: number
 *           format: float
 *         required: true
 *         description: Longitude of the second point (e.g., -119.4179). Must be between -180 and 180.
 *       - in: query
 *         name: unit
 *         schema:
 *           type: string
 *           enum: [km, miles]
 *         required: false
 *         description: Unit of distance (kilometers or miles). Defaults to kilometers if not provided or invalid.
 *     responses:
 *       200:
 *         description: Successful response with the calculated distance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     distance:
 *                       type: number
 *                       format: float
 *                       example: 535.89
 *                     unit:
 *                       type: string
 *                       example: km
 *                 message:
 *                   type: string
 *                   example: Distance calculated successfully.
 *       400:
 *         description: Bad request due to invalid input parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Invalid latitude or longitude values.
 *       429:
 *         description: Too many requests from this IP. Rate limit exceeded.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Too many requests from this IP, please try again after a minute.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
router.get('/distance', apiLimiter, distanceController.getDistance);

module.exports = router;