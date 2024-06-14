import React, { useEffect, useState } from 'react';
import mondaySdk from 'monday-sdk-js';

const monday = mondaySdk();

const App = () => {
  const [boardData, setBoardData] = useState(null);
  const [error, setError] = useState(null);
  const boardId = '6756792083'; // Replace with your actual board ID

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        // Set the authentication token if necessary
        // monday.setToken('your_jwt_token'); // Uncomment and set if you need a JWT token
  
        // GraphQL query to fetch board data
        const query = `
          query {
            boards(ids: ${boardId}) {
              World_Countries {
                Country
                column_values {
                  Region
                  Subregion
                  Capital
                  International_Country_Code
                  Country_Code
                  URL
                  Currency
                  Currency_Name
                  Timezones
                  Latitude
                  Longitude
                  Population
                  Area
                  Population_Density
                  Net_Migration
                  GDP_Per_Capita
                  Birthrate
                  Deathrate
                }
              }
            }
          }
        `;
        // Make API request
        const response = await monday.api(query);
        console.log(query);
  
        if (!response) {
          throw new Error('No response from API');
        }
  
        if (!response.ok) {
          throw new Error(`Error fetching board data: ${response.status}`);
        }
  
        const responseData = await response.json();
        console.log(responseData);
        console.log(response);
        // Set the response data to state
        setBoardData(responseData);
      } catch (error) {
        console.error('Error fetching board data:', error);
      }
    };
  
    fetchBoardData();
  }, [boardId]);

  return (
    <div>
      <h1>Board Data</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : boardData ? (
        <pre>{JSON.stringify(boardData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;