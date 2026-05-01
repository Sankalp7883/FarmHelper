const express = require('express');
const router = express.Router();
const {
  saveHistory,
  getHistory,
  deleteHistory,
  clearHistory,
} = require('../controllers/historyController');
const { protect } = require('../middleware/auth');

// All history routes are protected
router.use(protect);

router.route('/').get(getHistory).post(saveHistory).delete(clearHistory);
router.delete('/:id', deleteHistory);

module.exports = router;
