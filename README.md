# Distance Calculator API

    A RESTful API built with Node.js and Express.js to calculate the geographical distance between two points using the Haversine formula. It supports distance calculation in kilometers and miles, includes robust input validation, comprehensive error handling, and rate limiting to prevent abuse. It also integrates Swagger/OpenAPI for live API documentation.

---

## 📑 Table of Contents

- [Features](#features)  
- [Technical Requirements](#technical-requirements)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Environment Variables](#environment-variables)  
  - [Running the Application](#running-the-application)  
- [API Endpoints](#api-endpoints)  
  - [Calculate Distance](#calculate-distance)  
- [API Documentation (Swagger UI)](#api-documentation-swagger-ui)  
- [Testing](#testing)  
  - [Running Tests](#running-tests)  
  - [Unit Tests](#unit-tests)  
  - [Integration Tests](#integration-tests)  
- [Error Handling](#error-handling)  
- [Rate Limiting](#rate-limiting)  

---

## 🚀 Features

- **RESTful API Endpoint**: Simple `GET` endpoint to calculate distance.
- **Haversine Formula**: Accurate distance calculation.
- **Input Validation**: Ensures correct latitude, longitude, and unit inputs.
- **Comprehensive Error Handling**: Meaningful error messages and appropriate HTTP status codes.
- **Rate Limiting**: Protects the API from excessive requests.
- **Modular Code Structure**: Organized for scalability and maintainability.
- **Unit & Integration Testing**: Jest framework for reliable testing.
- **Environment Variables**: Configurable settings via `.env` file.
- **Interactive API Documentation**: Live API documentation served using Swagger UI.

---

## \u{2699️} Technical Requirements

- Node.js (v14.x or above)  
- Express.js  
- ES6+  
- Jest (for testing)
- `dotenv` (for environment variables)
- `express-rate-limit` (for rate limiting)
- `swagger-jsdoc` (for OpenAPI specification generation)
- `swagger-ui-express`  (for serving Swagger UI)

---

## \u{1f6e0️} Getting Started

Follow these steps to get the project up and running on your local machine.

### ✅ Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your system.

---

### 📦 Installation

1.  Clone the repository

```bash
git clone https://github.com/Sayantan-dev1003/Distance-Calculator-API.git
cd distance-calculator-api
```

2. Install dependencies:

```bash
npm install
```

---

### 📄 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000

# Rate Limiting Configuration
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

- `PORT`: The port on which the API server will run.

- `RATE_LIMIT_WINDOW_MS`: The time window in milliseconds for rate limiting.

- `RATE_LIMIT_MAX_REQUESTS`: The maximum number of requests allowed from a single IP within the `RATE_LIMIT_WINDOW_MS`.

---

### ▶️ Running the Application

To start the API server:

```bash
npm start
```

For development mode (using `NODE_ENV=development`)

```bash
npm run dev
```

Server will typically run at:  
`http://localhost:3000` *(unless specified differently in .env)*

---

## 📬 API Endpoints

Base URL: `http://localhost:PORT/api/v1`

---

### 🔁 Calculate Distance

**Endpoint**: `/api/v1/distance`  
**Method**: `GET`  
**Description**: Calculates distance between two coordinates using the Haversine formula.

#### Query Parameters:

| Param | Required | Description | Range |
|-------|----------|-------------|-------|
| `lat1` | ✅ | Latitude of point A | -90 to 90 |
| `lon1` | ✅ | Longitude of point A | -180 to 180 |
| `lat2` | ✅ | Latitude of point B | -90 to 90 |
| `lon2` | ✅ | Longitude of point B | -180 to 180 |
| `unit` | ❌ | km (default) or miles | — |

#### Example:

```http
GET /api/v1/distance?lat1=34.0522&lon1=-118.2437&lat2=40.7128&lon2=-74.0060&unit=km
```

#### ✅ Success Response (200 OK):

```json
{
  "success": true,
  "data": {
    "distance": 3935.75,
    "unit": "km"
  },
  "message": "Distance calculated successfully."
}
```

#### ❌ Error Response (400 Bad Request - Invalid Input):

```json
{
  "success": false,
  "error": "Invalid latitude or longitude values. Please provide numbers between -90 and 90 for latitude, and -180 and 180 for longitude."
}
```

#### ❌ Error Response (429 Too Many Requests - Rate Limit Exceeded):

```json
{
  "success": false,
  "error": "Too many requests from this IP, please try again after a minute."
}
```

---

## 📚 API Documentation (Swagger UI)

This project integrates Swagger UI to provide interactive API documentation directly from your running server.

- Access URL: Once the server is running, open your web browser and navigate to:

```
http://localhost:3000/api-docs
```

(Replace `3000` with the port in your `.env`)

This page will display all defined endpoints, their parameters, and expected responses, allowing you to easily understand and test the API.

---

## 🧪 Testing

This project uses **Jest** for unit and integration testing.

### ▶️ Running Tests

To run all tests:

```bash
npm test
```

---

### 🔬 Unit Tests

Unit tests for individual functions and services (e.g., Haversine calculation).

To run unit tests specifically:

```bash
npm run test:unit
```

---

### 🔗 Integration Tests

Integration tests for API endpoints to ensure they work correctly with all components.

To run integration tests specifically:

```bash
npm run test:integration
```

---

## ⚠️ Error Handling

The API implements comprehensive error handling. Invalid inputs or server errors will result in a JSON response with a `success: false` flag, an `error` message, and an appropriate HTTP status code.

```json
{
  "success": false,
  "error": "Meaningful message"
}
```

---

## ❌ Rate Limiting

The API uses `express-rate-limit` to prevent abuse. By default, it limits requests to 100 requests per minute per IP address. This can be configured via environment variables (`RATE_LIMIT_WINDOW_MS` and `RATE_LIMIT_MAX_REQUESTS`).

If the rate limit is exceeded, the API will return a `429 Too Many Requests` status code with a corresponding JSON error message.

By default:  
- **Window**: 1 minute (60000ms)  
- **Limit**: 100 requests per IP  

Adjust via `.env`:

```env
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

---