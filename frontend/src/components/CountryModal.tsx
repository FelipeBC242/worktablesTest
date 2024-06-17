// src/components/CountryModal.tsx
import React from 'react';
import Modal from 'react-modal';

interface CountryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  countryData: any; // Replace 'any' with appropriate type
}

const CountryModal: React.FC<CountryModalProps> = ({ isOpen, onRequestClose, countryData }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>{countryData.name}</h2>
      <p>Population: {countryData.population}</p>
      <p>Weather: {countryData.weather}</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default CountryModal;
