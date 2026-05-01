const Crop = require('../models/Crop');
const Fertilizer = require('../models/Fertilizer');

const searchAll = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json({ results: [] });

    const regex = new RegExp(query, 'i');

    const [crops, fertilizers] = await Promise.all([
      Crop.find({
        $or: [
          { cropName: regex },
          { description: regex }
        ]
      }).limit(20),
      Fertilizer.find({
        $or: [
          { name: regex },
          { description: regex }
        ]
      }).limit(20)
    ]);

    const formattedCrops = crops.map(c => ({
      _id: c._id.toString(),
      name: c.cropName,
      type: 'crop',
      description: c.description
    }));

    const formattedFertilizers = fertilizers.map(f => ({
      _id: f._id.toString(),
      name: f.name,
      type: 'fertilizer',
      description: f.description
    }));

    const combined = [...formattedCrops, ...formattedFertilizers].sort((a, b) => a.name.localeCompare(b.name));

    res.json({ results: combined });
  } catch (err) {
    console.error('Search error:', err.message);
    res.status(500).json({ error: 'Search failed' });
  }
};

module.exports = { searchAll };
