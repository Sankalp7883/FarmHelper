const mongoose = require('mongoose');

const fertilizerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },
  description: { type: String },
  nutrients: [String],
  usageTips: [String]
}, { timestamps: true });

module.exports = mongoose.model('Fertilizer', fertilizerSchema);
