Worktables Hiring Test

FRONT-END

This React application allows users to search for countries and view detailed information along with weather data. Key components include:

    Search Bar: Filters countries based on user input.
    Results List: Displays filtered countries, which are clickable to show detailed information.
    Modal: Shows detailed country information and weather data fetched from the backend.


Key Files


    CountryList.tsx: Main component handling data fetching, filtering, and displaying information.

    monday.ts: Utility module for fetching country data from the backend.


Usage

Install dependencies: npm install
Start the app: npm start


Dependencies

    React

    MUI

    react-window

    Axios





BACK-END

A tiny REST API built with Node.js and Express.js that fetches weather data for a given country using the WeatherAPI.


Key Files

    index.ts: Main file defining the API endpoint and handling requests.

    .env: Stores the WeatherAPI key.



Usage

Install dependencies: npm install

Create a .env file with your WeatherAPI key: WEATHER_API_KEY=your_api_key

Start the server: npm start


API Endpoint

    GET /weather/

    : Fetches weather data for the specified country. 
