const Crop = require('../models/Crop');
const axios = require('axios');
const { getSoilsByLocation } = require('../data/locationSoilMap');

// @desc    Get soil types for a location
// @route   GET /api/crops/soils?location=Mumbai
// @access  Public
const getSoilsForLocation = async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({ error: 'Please provide a location' });
    }

    const soils = getSoilsByLocation(location);

    if (soils) {
      return res.json({ location, soils, matched: true });
    }

    // Fallback — return all distinct soil types from DB
    const allSoils = await Crop.distinct('soilType');
    res.json({ location, soils: allSoils.sort(), matched: false });
  } catch (err) {
    console.error('Error getting soils for location:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get all available filter options (soil types, seasons) from DB
// @route   GET /api/crops/filters
// @access  Public
const getFilters = async (req, res) => {
  try {
    const soilTypes = await Crop.distinct('soilType');
    const seasons = await Crop.distinct('season');

    res.json({
      soilTypes: soilTypes.sort(),
      seasons: seasons.filter((s) => s !== 'All').sort(),
    });
  } catch (err) {
    console.error('Error fetching filters:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get all crops
// @route   GET /api/crops
// @access  Public
const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find().sort({ cropName: 1 });
    res.json({ count: crops.length, crops });
  } catch (err) {
    console.error('Error fetching crops:', err.message);
    res.status(500).json({ error: 'Server error fetching crops' });
  }
};

// @desc    Recommend crops based on location, soil, and season
// @route   POST /api/crops/recommend
// @access  Public
const recommendCrop = async (req, res) => {
  try {
    const { location, soilType, season } = req.body;

    if (!location || !soilType || !season) {
      return res.status(400).json({
        error: 'Please provide location, soilType, and season',
      });
    }

    // 1. Fetch current temperature for the location
    let temperature = 25; // Default fallback
    let weatherData = null;

    try {
      const apiKey = process.env.OPENWEATHER_API_KEY;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;
      const weatherResponse = await axios.get(weatherUrl);
      temperature = weatherResponse.data.main.temp;
      weatherData = {
        temperature: Math.round(weatherResponse.data.main.temp),
        description: weatherResponse.data.weather[0].description,
        humidity: weatherResponse.data.main.humidity,
        icon: weatherResponse.data.weather[0].icon,
        city: weatherResponse.data.name,
      };
    } catch (weatherErr) {
      console.error(
        'Weather API fallback — using default temperature:',
        weatherErr.message
      );
    }

    // 2. Query MongoDB for matching crops
    const query = {
      soilType: new RegExp('^' + soilType + '$', 'i'),
      $or: [
        { season: new RegExp('^' + season + '$', 'i') },
        { season: new RegExp('^All$', 'i') },
      ],
      'temperatureRange.min': { $lte: temperature + 5 },
      'temperatureRange.max': { $gte: temperature - 5 },
    };

    const recommendedCrops = await Crop.find(query).sort({ cropName: 1 });

    res.json({
      location: weatherData?.city || location,
      soilType,
      season,
      currentTemperature: Math.round(temperature),
      weather: weatherData,
      totalResults: recommendedCrops.length,
      recommendedCrops,
    });
  } catch (err) {
    console.error('Error in recommendCrop:', err.message);
    res.status(500).json({ error: 'Server error during recommendation' });
  }
};

module.exports = { getAllCrops, recommendCrop, getSoilsForLocation, getFilters };
