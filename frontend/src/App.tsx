import React, { useState, useEffect } from 'react';
import { Container, TextField, Modal, Box, Typography } from '@mui/material';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { fetchBoardData } from './utils/monday';

interface Country {
  name: string;
  region: string;
  subregion: string;
  capital: string;
  location: string;
  international_country_code: string;
  country_code: string;
  url: string;
  phone_code: string;
  currency: string;
  currency_name: string;
  latitude: string;
  longitude: string;
  population: number;
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchBoardData();
      console.log('Fetched data:', data);

      if (data && Array.isArray(data)) {
        const transformedData = data.map((item: any) => {
          const columnValues = item.column_values.reduce((acc: any, col: any) => {
            acc[col.id] = col.text;
            return acc;
          }, {});

          return {
            name: item.name,
            region: columnValues['region__1'] || 'N/A',
            subregion: columnValues['subregion__1'] || 'N/A',
            capital: columnValues['capital__1'] || 'N/A',
            location: columnValues['location__1'] || 'N/A',
            international_country_code: columnValues['text__1'] || 'N/A',
            country_code: columnValues['country_code__1'] || 'N/A',
            url: columnValues['url__1'] || 'N/A',
            phone_code: columnValues['phone_code__1'] || 'N/A',
            currency: columnValues['currency__1'] || 'N/A',
            currency_name: columnValues['currency_name__1'] || 'N/A',
            latitude: columnValues['latitude__1'] || 'N/A',
            longitude: columnValues['longitude__1'] || 'N/A',
            population: parseInt(columnValues['population__1'] || '0', 10),
          };
        });
        setCountries(transformedData);
        setFilteredCountries(transformedData);  // Initialize filteredCountries with all countries
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCountryClick = async (country: Country) => {
    console.log("Ola");
    console.log(country.name);
    setSelectedCountry(country);
    setOpen(true);
    try {
      const response = await fetch(`http://localhost:4000/weather/${country.name}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCountry(null);
    setWeatherData(null);
  };

  const Row = ({ index, style }: ListChildComponentProps) => {
    const country = filteredCountries[index];
    return (
      <div style={style} onClick={() => handleCountryClick(country)}>
        <Typography variant="body1">{country.name}</Typography>
      </div>
    );
  };

  return (
    <Container>
      <TextField
        label="Search Countries"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <List
        height={400}
        itemCount={filteredCountries.length}
        itemSize={35}
        width={'100%'}
      >
        {Row}
      </List>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', mt: '10%', width: 400 }}>
          {selectedCountry && (
            <>
              <Typography variant="h6">{selectedCountry.name}</Typography>
              <Typography variant="body1">Region: {selectedCountry.region}</Typography>
              <Typography variant="body1">Subregion: {selectedCountry.subregion}</Typography>
              <Typography variant="body1">Capital: {selectedCountry.capital}</Typography>
              <Typography variant="body1">Location: {selectedCountry.location}</Typography>
              <Typography variant="body1">International Country Code: {selectedCountry.international_country_code}</Typography>
              <Typography variant="body1">Country Code: {selectedCountry.country_code}</Typography>
              <Typography variant="body1">URL: {selectedCountry.url}</Typography>
              <Typography variant="body1">Phone Code: {selectedCountry.phone_code}</Typography>
              <Typography variant="body1">Currency: {selectedCountry.currency}</Typography>
              <Typography variant="body1">Currency Name: {selectedCountry.currency_name}</Typography>
              <Typography variant="body1">Latitude: {selectedCountry.latitude}</Typography>
              <Typography variant="body1">Longitude: {selectedCountry.longitude}</Typography>
              <Typography variant="body1">Population: {selectedCountry.population}</Typography>
              {weatherData && (
                <>
                  <Typography variant="body2">Weather: {weatherData.temp_c}</Typography>
                </>
              )}
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default App;


