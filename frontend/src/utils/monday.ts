import axios from 'axios';

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
        items_page{
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
          return response.data.data.boards[0].items_page.items;
        } else {
          console.error('Unexpected response structure:', response.data);
          return [];
        }
      } catch (error) {
        console.error('Error fetching board data:', error);
        return [];
      }
};