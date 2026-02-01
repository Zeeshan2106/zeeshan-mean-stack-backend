const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectMongoDB = require('./config/mongodb');
const errorHandler = require('./middleware/errorHandler');
const routes = require("./routes");
const weatherService = require("./services/weatherService");

const app = express();

app.use(cors());
app.use(express.json());

connectMongoDB();

app.use('/api', routes);
app.get('/api/weather', async (req, res, next) => {
  try {
    const city = req.query.city || 'London';
    const weatherData = await weatherService.getWeather(city);
    res.json(weatherData);
  } catch (error) {
    next(error);
  }
});


app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
