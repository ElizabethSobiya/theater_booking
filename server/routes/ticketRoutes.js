const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');

router.post('/bookTicket', async (req, res) => {
  const { movieId, theaterId } = req.body;
  
  try {
    const theater = await theater.findById(theaterId);
    const bookedTicketsCount = await Ticket.countDocuments({ theaterId });
    
    if (bookedTicketsCount < theater.capacity) {
      // Generate a unique seat number
      const seatNumber = `Seat-${bookedTicketsCount + 1}`;
      
      const newTicket = new Ticket({
        movieId,
        theaterId,
        seatNumber,
      });
      
      await newTicket.save();
      res.status(200).json({ message: 'Ticket booked successfully', ticket: newTicket });
    } else {
      res.status(400).json({ message: 'Theater is fully booked' });
    }
  } catch (error) {
    console.error('Error booking ticket:', error);
    res.status(500).json({ message: 'Error booking ticket' });
  }
});

module.exports = router;
