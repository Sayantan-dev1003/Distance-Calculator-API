// Load environment variables from .env file
require('dotenv').config();

/**
 * Configuration object for the application.
 * Retrieves values from environment variables or uses default values.
 */
const config = {
    // Server port
    port: process.env.PORT || 3000,

    // Rate Limiting configuration
    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10), // 1 minute
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10), // 100 requests
        message: 'Too many requests from this IP, please try again after a minute.'
    },

    // Application environment (e.g., 'development', 'production', 'test')
    env: process.env.NODE_ENV || 'development',
};

module.exports = config;