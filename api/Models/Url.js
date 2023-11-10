const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true
  },
  shortCode: {
    type: String,
    required: true,
  },
});

urlSchema.index({ shortCode: 1 }, { unique: true });

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
