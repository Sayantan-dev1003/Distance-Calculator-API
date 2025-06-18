const swaggerJsdoc = require('swagger-jsdoc');
const config = require('./config/config'); // Import your config to get the port for the server URL

// Swagger definition options
const options = {
    // Basic OpenAPI info
    definition: {
        openapi: '3.0.0', // Specify OpenAPI version
        info: {
            title: 'Distance Calculator API', // Title of your API
            version: '1.0.0', // Version of your API
            description: 'A RESTful API to calculate the distance between two geographical points using the Haversine formula.',
            contact: {
                name: 'Sayantan Halder', // Your name or team name
                email: 'sayantanhalder78@gmail.com', // Your contact email
            },
        },
        servers: [
            {
                // Dynamic server URL based on the application's port
                url: `http://localhost:${config.port}/api/v1`,
                description: 'Development server',
            },
        ],
        // You can add global components, security schemes, etc., here if needed
        components: {
            schemas: {
                // Example of a reusable schema if you had complex request/response bodies
                // DistanceResponse: {
                //     type: 'object',
                //     properties: {
                //         success: { type: 'boolean' },
                //         data: {
                //             type: 'object',
                //             properties: {
                //                 distance: { type: 'number', format: 'float' },
                //                 unit: { type: 'string' }
                //             }
                //         },
                //         message: { type: 'string' }
                //     }
                // }
            }
        }
    },
    // Paths to files containing OpenAPI documentation in JSDoc format
    // This tells swagger-jsdoc where to find the @swagger comments.
    apis: ['./src/routes/*.js'], // Look for comments in all .js files within src/routes
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Export the generated specification
module.exports = swaggerSpec;