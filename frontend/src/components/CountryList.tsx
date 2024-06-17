// src/components/CountryList.tsx
import React from 'react';

interface CountryListProps {
  countries: string[];
  onSelect: (country: string) => void;
}

const CountryList: React.FC<CountryListProps> = ({ countries, onSelect }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country} onClick={() => onSelect(country)}>
          {country}
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
