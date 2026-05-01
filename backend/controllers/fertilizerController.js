const Fertilizer = require('../models/Fertilizer');

const getFertilizerByName = async (req, res) => {
  try {
    const { name } = req.params;
    const fertilizer = await Fertilizer.findOne({ name: new RegExp('^' + name + '$', 'i') });

    if (!fertilizer) {
      return res.status(404).json({ error: 'Fertilizer not found' });
    }

    res.json(fertilizer);
  } catch (err) {
    console.error('Error fetching fertilizer details:', err.message);
    res.status(500).json({ error: 'Server error fetching fertilizer details' });
  }
};

const getAllFertilizers = async (req, res) => {
  try {
    const fertilizers = await Fertilizer.find({});
    res.json(fertilizers);
  } catch (err) {
    console.error('Error fetching fertilizers:', err.message);
    res.status(500).json({ error: 'Server error fetching fertilizers' });
  }
};

module.exports = { getFertilizerByName, getAllFertilizers };
