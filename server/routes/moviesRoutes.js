const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// Create a new movie
router.post('/movies', async (req, res) => {
  const { title, description, releaseDate } = req.body;
  try {
    const newMovie = new Movie({ title, description, releaseDate });
    await newMovie.save();
    res.status(200).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// List all movies
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
