const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: String,
  capacity: Number,
});

const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;
