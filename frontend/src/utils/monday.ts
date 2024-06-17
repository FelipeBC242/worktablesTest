import axios, { AxiosError } from 'axios';

const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM3MjY5NjYxMSwiYWFpIjoxMSwidWlkIjo2MjI1MDAyOSwiaWFkIjoiMjAyNC0wNi0xNlQyMzo1NjoyMy4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjM5ODQ2MTMsInJnbiI6InVzZTEifQ.w-338_q4VSjAlUz26ytKnTSbKyjcOSqo2_T5MK03U-4';
const BOARD_ID = '6843966879';

const mondayClient = axios.create({
  baseURL: 'https://api.monday.com/v2',
  headers: {
    Authorization: API_TOKEN,
    'Content-Type': 'application/json',
  },
});

export const fetchBoardData = async () => {
  const query = `
    query {
        boards(ids: ${BOARD_ID}) {
        items_page(limit: 250){
            items{
            name
            column_values{
                id
                text
                }
            }
            }
        }   
        }
    `;
    
  try {
    const response = await mondayClient.post('', { query });
    console.log('Full API response:', response.data.data.boards[0].items_page.items);
    if (response.data && response.data.data && response.data.data.boards && response.data.data.boards[0]) {
      const data = response.data.data.boards[0].items_page.items;
      return data;
    } else {
      console.error('Unexpected response structure:', response.data);
      return [];
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        if (error.response.status === 401) {
          console.error('Unauthorized access - check your API token');
        } else if (error.response.status === 404) {
          console.error('Resource not found - check the BOARD_ID');
        } else {
          console.error('API error:', error.response.status, error.response.statusText);
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    return [];
  }
};
