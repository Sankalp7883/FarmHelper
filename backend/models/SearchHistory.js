const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    soilType: {
      type: String,
      required: true,
    },
    season: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
    },
    resultsCount: {
      type: Number,
      default: 0,
    },
    cropNames: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

// Index for efficient user-based queries, sorted by most recent
searchHistorySchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('SearchHistory', searchHistorySchema);
