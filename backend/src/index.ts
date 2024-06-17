import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/weather/:country', async (req, res) => {
    const country = req.params.country;
    const apiKey = process.env.WEATHER_API_KEY;

    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
