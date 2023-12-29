const express = require('express');
const router = express.Router();
const Theater = require('../models/theater');

router.post('/theaters', async (req, res) => {
  const { name, location, capacity } = req.body;
  try {
    const newTheater = new Theater({ name, location, capacity });
    await newTheater.save();
    res.status(201).json(newTheater);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/theaters', async (req, res) => {
  try {
    const theaters = await Theater.find();
    res.json(theaters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
