const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  releaseDate: Date,
  theater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater' // Reference to the Theater model
  }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
