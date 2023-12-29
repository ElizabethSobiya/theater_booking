const express = require('express');
const router = express.Router();
const Showtime = require('../models/showtimeModel'); 

router.get('/showtimes', async (req, res) => {
  try {
    const showtimes = await Showtime.find();
    res.json(showtimes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/showtimes', async (req, res) => {
  const showtime = new Showtime({
    movieId: req.body.movieId,
    theaterId: req.body.theaterId,
    startTime: req.body.startTime,
  });

  try {
    const newShowtime = await showtime.save();
    res.status(201).json(newShowtime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
