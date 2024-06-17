Worktables - Backend
This is a tiny REST API built with Node.js and Express.js to fetch weather data for a given country. The API uses the WeatherAPI to retrieve weather information and send it back to the frontend.

Features
    Single Route: The API has one route /weather/:country which receives a country identifier and returns the weather data for that country.
    CORS Enabled: CORS is enabled to allow cross-origin requests from the frontend.
    Error Handling: Handles errors gracefully and provides meaningful error messages.

Installation
    Prerequisites
        Node.js (v14 or higher)
        npm (v6 or higher)

Steps
    1. Clone the repository:
        git clone https://github.com/
        cd backend
    2. Install dependencies:
        npm install
    3. Create a .env file in the root directory and add your WeatherAPI key:
        WEATHER_API_KEY=weather_api_key
    4. Start the server:
        npm start

API Endpoint
    Get Weather Data
        URL: /weather/:country
        Method: GET
        URL Parameter: country - The name or code of the country you want to fetch weather data.

Error Handling
    500 Internal Server Error: Returned when the WeatherAPI key is not configured or an unexpected error occurs.
    503 Service Unavailable: Returned when no response is received from the WeatherAPI.
    4xx Client Errors: Various client errors are handled and appropriate error messages are returned.


