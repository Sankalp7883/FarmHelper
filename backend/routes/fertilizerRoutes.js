const express = require('express');
const router = express.Router();
const { getFertilizerByName, getAllFertilizers } = require('../controllers/fertilizerController');

// GET all fertilizers
router.get('/', getAllFertilizers);

// GET fertilizer by name
router.get('/:name', getFertilizerByName);

module.exports = router;
