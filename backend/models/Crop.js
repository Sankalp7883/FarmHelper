const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema(
  {
    cropName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    soilType: [
      {
        type: String,
        required: true,
        // e.g., 'Loamy', 'Clay', 'Sandy', 'Black soil', 'Alluvial', 'Red soil', 'Laterite'
      },
    ],
    season: [
      {
        type: String,
        required: true,
        // e.g., 'Kharif', 'Rabi', 'Zaid', 'Summer', 'Winter', 'All'
      },
    ],
    temperatureRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    fertilizers: [
      {
        type: String,
        // e.g., 'Urea', 'DAP', 'NPK'
      },
    ],
    waterRequirement: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    growingPeriod: {
      type: String,
      // e.g., '90-120 days'
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Crop', cropSchema);
