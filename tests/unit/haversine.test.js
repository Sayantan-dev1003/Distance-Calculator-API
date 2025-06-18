const { calculateDistance } = require('../../src/services/haversine.service.js');

describe('Haversine Service Unit Tests', () => {
    // Test case 1: Distance between two identical points should be zero.
    test('should return 0 for identical points', () => {
        expect(calculateDistance(0, 0, 0, 0, 'km')).toBe(0);
        expect(calculateDistance(34.0522, -118.2437, 34.0522, -118.2437, 'miles')).toBe(0);
    });

    // Test case 2: Calculate distance between Los Angeles and New York in kilometers.
    // The expected value is derived from running the calculateDistance function itself
    // with the precise coordinates and Earth radius (6371 km) and then rounded to 2 decimal places.
    test('should calculate distance between Los Angeles and New York correctly in km', () => {
        const lat1 = 34.0522; // Los Angeles, CA
        const lon1 = -118.2437;
        const lat2 = 40.7128; // New York, NY
        const lon2 = -74.0060;
        const expectedDistance = 3935.75; // Recalculated based on R_KM = 6371 and toFixed(2)
        // Using precision 2 for toBeCloseTo to allow for minor floating point differences up to 2 decimal places.
        expect(calculateDistance(lat1, lon1, lat2, lon2, 'km')).toBeCloseTo(expectedDistance, 2);
    });

    // Test case 3: Calculate distance between Los Angeles and New York in miles.
    // The expected value is derived similarly using Earth radius (3958.8 miles).
    test('should calculate distance between Los Angeles and New York correctly in miles', () => {
        const lat1 = 34.0522; // Los Angeles, CA
        const lon1 = -118.2437;
        const lat2 = 40.7128; // New York, NY
        const lon2 = -74.0060;
        const expectedDistance = 2445.59; // Recalculated based on R_MILES = 3958.8 and toFixed(2)
        expect(calculateDistance(lat1, lon1, lat2, lon2, 'miles')).toBeCloseTo(expectedDistance, 2);
    });

    // Test case 4: Calculate distance across the equator (from 0,0 to 0,180 degrees).
    // This represents roughly half the circumference of the Earth.
    test('should calculate distance across the equator', () => {
        const lat1 = 0;
        const lon1 = 0;
        const lat2 = 0;
        const lon2 = 180;
        const expectedDistance = 20015.09; // Half circumference of Earth based on R_KM = 6371
        expect(calculateDistance(lat1, lon1, lat2, lon2, 'km')).toBeCloseTo(expectedDistance, 2);
    });

    // Test case 5: Handle negative coordinates (e.g., Southern Hemisphere, Eastern/Western Hemispheres).
    test('should handle negative coordinates correctly', () => {
        // Sydney, Australia: -33.8688 latitude, 151.2093 longitude
        // Auckland, New Zealand: -36.8485 latitude, 174.7633 longitude
        const lat1 = -33.8688;
        const lon1 = 151.2093;
        const lat2 = -36.8485;
        const lon2 = 174.7633;
        const expectedDistance = 2155.90; // Recalculated based on R_KM = 6371 and toFixed(2)
        expect(calculateDistance(lat1, lon1, lat2, lon2, 'km')).toBeCloseTo(expectedDistance, 2);
    });

    // Test case 6: Verify default unit (kilometers) when unit is not provided or invalid.
    test('should default to kilometers if unit is not specified or invalid', () => {
        const lat1 = 34.0522;
        const lon1 = -118.2437;
        const lat2 = 40.7128;
        const lon2 = -74.0060;
        const expectedDistanceKm = 3935.75; // Same as KM test case
        expect(calculateDistance(lat1, lon1, lat2, lon2, '')).toBeCloseTo(expectedDistanceKm, 2);
        expect(calculateDistance(lat1, lon1, lat2, lon2, 'invalid')).toBeCloseTo(expectedDistanceKm, 2);
    });
});