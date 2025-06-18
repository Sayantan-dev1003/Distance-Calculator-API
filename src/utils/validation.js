/**
 * Checks if a given value is a valid latitude.
 * Latitude must be a number between -90 and 90.
 * @param {any} lat - The value to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
function isValidLatitude(lat) {
    // Check if it's a number and within the valid range
    return typeof lat === 'number' && lat >= -90 && lat <= 90;
}

/**
 * Checks if a given value is a valid longitude.
 * Longitude must be a number between -180 and 180.
 * @param {any} lon - The value to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
function isValidLongitude(lon) {
    // Check if it's a number and within the valid range
    return typeof lon === 'number' && lon >= -180 && lon <= 180;
}

module.exports = {
    isValidLatitude,
    isValidLongitude,
};