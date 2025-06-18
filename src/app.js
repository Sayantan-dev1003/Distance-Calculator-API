const express = require('express');
const distanceRoutes = require('./routes/distance.routes.js');
const { errorHandler } = require('./utils/errorHandler.js');

// Import Swagger related modules
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerDocs'); // Path to your new swagger configuration file

const app = express();

// Middleware to parse JSON bodies of incoming requests
app.use(express.json());

// Serve Swagger UI documentation
// Access at http://localhost:PORT/api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
// All routes under /api/v1 will be handled by distanceRoutes
app.use('/api/v1', distanceRoutes);

// Catch-all for undefined routes (order matters: this should be after all defined routes)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        error: `Cannot ${req.method} ${req.originalUrl}. Route not found.`,
    });
});

// Global error handling middleware (this should be the last middleware)
app.use(errorHandler);

module.exports = app;