const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
});

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;
