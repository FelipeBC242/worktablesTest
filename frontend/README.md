Worktables Frontend
This frontend application allows users to search for country information and display weather data for selected countries. The goal of the UI is to enable users to filter country data through a search bar, display the results in a list, and view detailed information along with weather data in a modal upon selecting a country.

Features
    Search Bar: Allows users to input text to filter countries.
    Results List: Displays filtered country results. Each result is clickable.
    Modal: Displays detailed country information and weather data when a country is selected.

Components
CountryList.tsx
The CountryList.tsx component is the main component that handles data fetching, filtering, and displaying country and weather information.

State Variables
    searchTerm: Stores the user's search input.
    countries: Stores the list of all countries fetched from the backend.
    filteredCountries: Stores the list of countries filtered based on the search term.
    selectedCountry: Stores the currently selected country for which details are displayed.
    weatherData: Stores the weather data for the selected country.
    open: Boolean to control the visibility of the modal.
    errorMessage: Stores error messages for display.

Data Fetching
The useEffect hook fetches country data from the backend when the component mounts. Another useEffect hook filters the countries based on the searchTerm.

Event Handlers
    handleSearchChange: Updates the searchTerm state with the user's input.
    handleCountryClick: Fetches weather data for the selected country and opens the modal.
    handleClose: Closes the modal and resets the relevant state variables.
    Row Component
    Renders each country in the filtered list and handles the click event to fetch and display country details and weather data.

monday.ts
The monday.ts module handles the API calls to fetch country data from the backend.

fetchBoardData
Fetches data from the specified board on Monday.com using the provided API token and board ID.

Usage
Search: Type in the search bar to filter countries.
View Details: Click on a country from the list to view its details and weather data in a modal.
Close Modal: Click the close button to close the modal.

Installation
    Clone the repository.
    Enter the frontend section
    Install dependencies:
        1. npm install

    Start the development server:
        2. npm start

Dependencies Used
    react
    @mui/material
    react-window
    axios
