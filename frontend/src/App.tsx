// src/App.tsx
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import CountryList from './components/CountryList';
import CountryModal from './components/CountryModal';
import useBoardData from './hooks/useBoardData';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const boardData = useBoardData();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCountrySelect = async (country: string) => {
    // Fetch weather data for the selected country from backend
    const weatherData = await fetchWeatherData(country);
    setSelectedCountry({ name: country, ...weatherData });
    setIsModalOpen(true);
  };

  const filteredCountries = boardData.filter((country: any) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar searchTerm={searchTerm} onChange={handleSearchChange} />
      <CountryList countries={filteredCountries} onSelect={handleCountrySelect} />
      {selectedCountry && (
        <CountryModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          countryData={selectedCountry}
        />
      )}
    </div>
  );
};

const fetchWeatherData = async (country: string) => {
  const response = await fetch(`http://localhost:4000/weather?country=${country}`);
  const data = await response.json();
  return data;
};

export default App;

