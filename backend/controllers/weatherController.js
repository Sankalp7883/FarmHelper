const axios = require('axios');

// @desc    Get weather for a location
// @route   GET /api/weather?location=CityName
// @access  Public
const getWeather = async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res
        .status(400)
        .json({ error: 'Please provide a location query parameter' });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return res
        .status(500)
        .json({ error: 'OpenWeather API Key is not configured' });
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;
    const response = await axios.get(weatherUrl);

    res.json({
      location: response.data.name,
      temperature: Math.round(response.data.main.temp),
      feelsLike: Math.round(response.data.main.feels_like),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      icon: response.data.weather[0].icon,
    });
  } catch (err) {
    console.error('Error fetching weather:', err.message);
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.status(500).json({ error: 'Error fetching weather data' });
  }
};

module.exports = { getWeather };
