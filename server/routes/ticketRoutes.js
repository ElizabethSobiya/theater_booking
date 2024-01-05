const express = require('express');
const router = express.Router();
const Theater = require('../models/theater');
const Ticket = require('../models/ticket');

router.post('/bookTicket', async (req, res) => {
  const { movieId, theaterId, numSeats } = req.body;

  try {
    const theater = await Theater.findById(theaterId);
    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }

    const bookedTicketsCount = await Ticket.countDocuments({ theaterId });
    const availableSeats = theater.capacity - bookedTicketsCount;

    if (numSeats <= 0 || numSeats > availableSeats) {
      return res.status(400).json({ message: 'Invalid number of seats' });
    }

    const newTickets = [];
    for (let i = 0; i < numSeats; i++) {
      const seatNumber = `Seat-${bookedTicketsCount + i + 1}`;
      const newTicket = new Ticket({
        movieId,
        theaterId,
        seatNumber,
      });
      newTickets.push(newTicket);
    }

    await Ticket.insertMany(newTickets);
    res.status(200).json({ message: 'Tickets booked successfully', tickets: newTickets });
  } catch (error) {
    console.error('Error booking tickets:', error);
    res.status(500).json({ message: 'Error booking tickets' });
  }
});

module.exports = router;
