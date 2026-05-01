const express = require('express');
const router = express.Router();
const {
  getAllCrops,
  recommendCrop,
  getSoilsForLocation,
  getFilters,
} = require('../controllers/cropController');

// Filter options (soil types, seasons from DB)
router.get('/filters', getFilters);

// Soil types by location
router.get('/soils', getSoilsForLocation);

// All crops
router.get('/', getAllCrops);

// Crop recommendations
router.post('/recommend', recommendCrop);

module.exports = router;
