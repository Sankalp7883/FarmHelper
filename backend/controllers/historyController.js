const SearchHistory = require('../models/SearchHistory');

// @desc    Save a search to history
// @route   POST /api/history
// @access  Private
const saveHistory = async (req, res) => {
  try {
    const { location, soilType, season, temperature, resultsCount, cropNames } =
      req.body;

    const history = await SearchHistory.create({
      user: req.user._id,
      location,
      soilType,
      season,
      temperature,
      resultsCount,
      cropNames: cropNames || [],
    });

    res.status(201).json(history);
  } catch (error) {
    console.error('Save history error:', error.message);
    res.status(500).json({ error: 'Error saving search history' });
  }
};

// @desc    Get user's search history
// @route   GET /api/history
// @access  Private
const getHistory = async (req, res) => {
  try {
    const history = await SearchHistory.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ count: history.length, history });
  } catch (error) {
    console.error('Get history error:', error.message);
    res.status(500).json({ error: 'Error fetching search history' });
  }
};

// @desc    Delete a search history entry
// @route   DELETE /api/history/:id
// @access  Private
const deleteHistory = async (req, res) => {
  try {
    const entry = await SearchHistory.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ error: 'History entry not found' });
    }

    // Ensure user owns this entry
    if (entry.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await entry.deleteOne();
    res.json({ message: 'History entry removed' });
  } catch (error) {
    console.error('Delete history error:', error.message);
    res.status(500).json({ error: 'Error deleting history entry' });
  }
};

// @desc    Clear all user's search history
// @route   DELETE /api/history
// @access  Private
const clearHistory = async (req, res) => {
  try {
    await SearchHistory.deleteMany({ user: req.user._id });
    res.json({ message: 'All history cleared' });
  } catch (error) {
    console.error('Clear history error:', error.message);
    res.status(500).json({ error: 'Error clearing history' });
  }
};

module.exports = { saveHistory, getHistory, deleteHistory, clearHistory };
