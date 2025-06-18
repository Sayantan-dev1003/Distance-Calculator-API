/**
 * Custom error handler middleware for Express.
 * This middleware catches errors thrown in routes or other middleware
 * and sends a standardized JSON error response to the client.
 *
 * @param {Error} err - The error object.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the stack.
 */
const errorHandler = (err, req, res, next) => {
    // Set a default status code and message
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Log the error for debugging purposes (in a real app, use a logger like Winston)
    console.error(`Error: ${statusCode} - ${message}`, err.stack);

    // Send the error response
    res.status(statusCode).json({
        success: false,
        error: message,
        // In development, you might send the stack trace for debugging
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

/**
 * Custom Error class for API-specific errors.
 * Allows setting a specific HTTP status code for the error.
 */
class ApiError extends Error {
    /**
     * Creates an instance of ApiError.
     * @param {number} statusCode - The HTTP status code for the error.
     * @param {string} message - The error message.
     */
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        // Ensure the prototype chain is correctly set up
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

module.exports = {
    errorHandler,
    ApiError,
};