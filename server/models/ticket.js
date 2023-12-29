// ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
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
  seatNumber: {
    type: String,
    required: true,
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
