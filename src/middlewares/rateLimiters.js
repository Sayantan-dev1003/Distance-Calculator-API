const rateLimit = require('express-rate-limit');
const config = require('../config/config.js');

/**
 * Rate limiting middleware configuration.
 * Limits the number of requests from a single IP address within a specified time window.
 */
const apiLimiter = rateLimit({
    windowMs: config.rateLimit.windowMs, // Time window in milliseconds (e.g., 60000 for 1 minute)
    max: config.rateLimit.maxRequests, // Max requests allowed per IP per windowMs
    // Custom handler function to be executed when the rate limit is exceeded.
    // This allows us to return a consistent JSON error response.
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: config.rateLimit.message, // The custom message defined in config
        });
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers (e.g., Retry-After)
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers (older standard)
});

module.exports = apiLimiter;