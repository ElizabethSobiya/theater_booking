const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();
const movieRouter = require('./routes/moviesRoutes'); 
const theaterRouter = require('./routes/theaterRoutes')
const Theater = require('./models/theater'); 
const bookingRoute = require('./routes/ticketRoutes')


const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");
});

// Express middleware for parsing JSON requests
app.use(express.json());
app.use('/api', movieRouter);
app.use('/api', theaterRouter); 
app.use('/api', bookingRoute)
// Assume you have a theater model/schema defined using Mongoose

// POST route to handle booking
app.post('/api/theaters/book/:id', async (req, res) => {
  const theaterId = req.params.id;

  try {
    const theater = await Theater.findById(theaterId);

    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }

    if (theater.capacity > 0) {
      theater.capacity -= 1; // Reduce the theater's capacity by 1

      // Save the updated theater data to the database
      await theater.save();

      return res.status(200).json({ message: 'Booking successful', theater });
    } else {
      return res.status(400).json({ message: 'Theater is fully booked' });
    }
  } catch (error) {
    console.error('Error booking theater:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// MongoDB URI setup
const PORT = process.env.PORT || 8000;

// Server listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
