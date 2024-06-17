import React, { useEffect, useState } from 'react';
import mondaySdk from 'monday-sdk-js';

const monday = mondaySdk();

function CountriesList() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = `query {
      boards(ids: 6843966879) {
        items_page{
          items{
            name
            column_values{
              text
              }
            }
          }
        }   
      }`;
  
    const apiUrl = '/api';
  
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_MONDAY_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Full API response:', data); // Log the full response
        if (data && data.data && data.data.boards) {
          const groups = data.data.boards[0].groups;
          const items = groups.reduce((acc, group) => acc.concat(group.items), []);
          setCountries(items);
        } else {
          setError('Unexpected response structure or no items found');
          console.error('Unexpected response structure:', data);
        }
      })
      .catch(error => {
        setError('Failed to fetch data from Monday API');
        console.error('API fetch error:', error);
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
          response: error.response,
          request: error.request,
        });
      });
  }, []);
  
  return (
    <div>
      <h2>World Country List</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        countries.length === 0 ? (
          <p>No countries available.</p>
        ) : (
          countries.map(country => (
            <div key={country.id}>
              <h3>{country.name}</h3>
              <ul>
                {country.column_values.map(({ title, text }) => (
                  <li key={title}>{title}: {text}</li>
                ))}
              </ul>
            </div>
          ))
        )
      )}
    </div>
  );
}

export default CountriesList;

