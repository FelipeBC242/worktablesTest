import axios from 'axios';

// This function assumes that you obtain the token from somewhere in your application.
// This might be from an initial configuration, a login response, or as a global variable, etc.
function createApiInstance(authToken) {
    return axios.create({
        baseURL: 'https://api.monday.com/v2',
        headers: {
            'Authorization': authToken
        }
    });
}

export const getBoardItems = async (boardId, authToken) => {
  const mondayApi = createApiInstance(authToken); // Create an Axios instance with the token

  try {
    const query = `
      query {
        boards (ids: ${boardId}) {
          items {
            id
            name
            column_values {
              id
              text
            }
          }
        }
      }
    `;

    const response = await mondayApi.post('', { query });
    return response.data;
  } catch (error) {
    console.error('Error fetching board items from Monday API', error);
    return null;
  }
};
