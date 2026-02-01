const axios = require('axios');

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

exports.getWeather = async (city = 'London') => {
  try {
    if (!API_KEY) {
      throw new Error('Weather API key not configured');
    }

    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    return {
      success: true,
      data: {
        city: response.data.name,
        country: response.data.sys.country,
        temperature: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed
      }
    };
  } catch (error) {
    if (error.response) {
      throw new Error(`Weather API error: ${error.response.data.message}`);
    }
    throw new Error('Failed to fetch weather data');
  }
};
