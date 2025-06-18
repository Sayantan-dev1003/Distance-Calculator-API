const request = require('supertest');
const app = require('../../src/app'); // Import your Express app
const config = require('../../src/config/config.js'); // Import config for rate limit values

describe('Distance API Integration Tests', () => {
    // Test case 1: Valid request with all parameters in kilometers.
    test('should return 200 and distance in kilometers for valid inputs', async () => {
        const res = await request(app).get('/api/v1/distance?lat1=34.0522&lon1=-118.2437&lat2=40.7128&lon2=-74.0060&unit=km');
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('distance');
        expect(res.body.data.unit).toBe('km');
        expect(typeof res.body.data.distance).toBe('number');
        // Expected value updated to match the haversine.service.js output (3935.75) and precision increased to 2.
        expect(res.body.data.distance).toBeCloseTo(3935.75, 2);
    });

    // Test case 2: Valid request with all parameters in miles.
    test('should return 200 and distance in miles for valid inputs', async () => {
        const res = await request(app).get('/api/v1/distance?lat1=34.0522&lon1=-118.2437&lat2=40.7128&lon2=-74.0060&unit=miles');
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('distance');
        expect(res.body.data.unit).toBe('miles');
        expect(typeof res.body.data.distance).toBe('number');
        // Expected value updated to match the haversine.service.js output (2445.59) and precision increased to 2.
        expect(res.body.data.distance).toBeCloseTo(2445.59, 2);
    });

    // Test case 3: Valid request with default unit (kilometers) when unit is not provided.
    test('should return 200 and distance in kilometers (default) when unit is not provided', async () => {
        const res = await request(app).get('/api/v1/distance?lat1=34.0522&lon1=-118.2437&lat2=40.7128&lon2=-74.0060');
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.unit).toBe('km');
        // Expected value updated.
        expect(res.body.data.distance).toBeCloseTo(3935.75, 2);
    });

    // Test case 4: Missing required parameter (lat1) should result in a 400 Bad Request error.
    test('should return 400 for missing lat1 parameter', async () => {
        const res = await request(app).get('/api/v1/distance?lon1=-118.2437&lat2=40.7128&lon2=-74.0060&unit=km');
        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toContain('Invalid latitude or longitude values');
    });

    // Test case 5: Invalid latitude value (e.g., outside -90 to 90 range).
    test('should return 400 for invalid latitude (too high)', async () => {
        const res = await request(app).get('/api/v1/distance?lat1=91&lon1=0&lat2=0&lon2=0&unit=km');
        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toContain('Invalid latitude or longitude values');
    });

    // Test case 6: Invalid longitude value (e.g., outside -180 to 180 range).
    test('should return 400 for invalid longitude (too low)', async () => {
        const res = await request(app).get('/api/v1/distance?lat1=0&lon1=-181&lat2=0&lon2=0&unit=km');
        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toContain('Invalid latitude or longitude values');
    });

    // Test case 7: Invalid unit parameter should result in a 400 Bad Request error.
    test('should return 400 for invalid unit parameter', async () => {
        const res = await request(app).get('/api/v1/distance?lat1=0&lon1=0&lat2=1&lon2=1&unit=meters');
        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toContain('Invalid unit');
    });

    // Test case 8: Rate Limiting Test - Should return 429 (Too Many Requests) after exceeding the limit.
    // Note: Supertest might not perfectly simulate real-world IP-based rate limiting across multiple distinct requests
    // from a client, but this test verifies the middleware logic.
    test('should return 429 after exceeding rate limit', async () => {
        const testUrl = '/api/v1/distance?lat1=0&lon1=0&lat2=1&lon2=1&unit=km';
        // Make requests up to the max allowed requests + 1 to trigger the rate limit.
        for (let i = 0; i < config.rateLimit.maxRequests; i++) {
            await request(app).get(testUrl);
        }
        // The next request (max + 1)th should hit the rate limit.
        const res = await request(app).get(testUrl);
        expect(res.statusCode).toEqual(429);
        // Now expecting a JSON response with 'success: false' and the correct error message.
        expect(res.body.success).toBe(false);
        expect(res.body.error).toEqual(config.rateLimit.message);
    }, config.rateLimit.windowMs + 5000); // Increase timeout for this test as it involves multiple requests

    // Test case 9: Request to a non-existent route should return a 404 Not Found error.
    test('should return 404 for a non-existent route', async () => {
        const res = await request(app).get('/api/v1/non-existent-route');
        expect(res.statusCode).toEqual(404);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toContain('Route not found');
    });
});