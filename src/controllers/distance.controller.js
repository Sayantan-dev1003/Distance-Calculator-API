const haversineService = require('../services/haversine.service.js');
const { isValidLatitude, isValidLongitude } = require('../utils/validation.js');
const { ApiError } = require('../utils/errorHandler.js');

/**
 * Handles the distance calculation request.
 * Expects latitude and longitude for two points, and an optional unit.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the stack.
 */
const getDistance = (req, res, next) => {
    try {
        console.log('Received query parameters:', req.query);
        
        const { lat1, lon1, lat2, lon2, unit } = req.query;

        // Convert query parameters to numbers
        const numLat1 = parseFloat(lat1);
        const numLon1 = parseFloat(lon1);
        const numLat2 = parseFloat(lat2);
        const numLon2 = parseFloat(lon2);

        console.log(lat1, lon1, lat2, lon2);

        // Input validation
        if (
            !isValidLatitude(numLat1) ||
            !isValidLongitude(numLon1) ||
            !isValidLatitude(numLat2) ||
            !isValidLongitude(numLon2)
        ) {
            throw new ApiError(400, 'Invalid latitude or longitude values. Please provide numbers between -90 and 90 for latitude, and -180 and 180 for longitude.');
        }

        // Validate unit if provided
        const validUnits = ['km', 'miles'];
        if (unit && !validUnits.includes(unit.toLowerCase())) {
            throw new ApiError(400, 'Invalid unit. Accepted values are "km" or "miles".');
        }

        // Perform distance calculation
        const distance = haversineService.calculateDistance(
            numLat1,
            numLon1,
            numLat2,
            numLon2,
            unit ? unit.toLowerCase() : 'km' // Default to 'km' if unit is not provided
        );

        res.status(200).json({
            success: true,
            data: {
                distance: distance,
                unit: unit ? unit.toLowerCase() : 'km',
            },
            message: 'Distance calculated successfully.',
        });
    } catch (error) {
        // Pass the error to the error handling middleware
        next(error);
    }
};

module.exports = {
    getDistance,
};