// src/components/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onChange }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={onChange}
      placeholder="Search for a country..."
    />
  );
};

export default SearchBar;
