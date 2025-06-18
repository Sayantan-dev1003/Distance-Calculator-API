const app = require('./app.js');
const config = require('./config/config.js');

const PORT = config.port;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${config.env} mode.`);
    console.log(`Access the API at: http://localhost:${PORT}/api/v1/distance`);
});