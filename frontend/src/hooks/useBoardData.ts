// src/hooks/useBoardData.ts
import { useState, useEffect } from 'react';
import monday from '../utils/monday';

const useBoardData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    monday.listen('context', async (res) => {
      const boardId = 6843966879;
      const boardData = await monday.api(`
        query {
          boards(ids: ${boardId}) {
            items_page{
                items{
                    name
                    column_values{
                        text
                    }
                }
            }
          }
        }
      `);
      setData(boardData.data.boards[0].items);
    });
  }, []);

  return data;
};

export default useBoardData;