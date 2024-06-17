import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.get('/weather/:country', async (req, res) => {
    const country = req.params.country;
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Weather API key is not configured' });
    }

    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country}`);
        res.json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error('Error response from weather API:', error.response.data);
                res.status(error.response.status).json({ error: error.response.data.error.message });
            } else if (error.request) {
                console.error('No response received from weather API:', error.request);
                res.status(503).json({ error: 'No response received from weather API' });
            } else {
                console.error('Error setting up request to weather API:', error.message);
                res.status(500).json({ error: 'Error setting up request to weather API' });
            }
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
