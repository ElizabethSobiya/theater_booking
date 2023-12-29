import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./style.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseDate: "",
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          setFormData({
            title: "",
            description: "",
            releaseDate: "",
          });
          return fetch("http://localhost:8000/api/movies");
        } else {
          throw new Error("Failed to add movie");
        }
      })
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error adding movie:", error));
  };

  const formatReleaseDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-GB");
    return formattedDate;
  };

  // MovieList.js

const handleBookMovie = async (movieId, theaterId) => {
  try {
    const response = await fetch('http://localhost:8000/api/bookTicket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ movieId, theaterId }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Ticket booked:', data.ticket);
      // Handle successful ticket booking
    } else {
      console.error('Failed to book ticket:', data.message);
      // Handle failed ticket booking
    }
  } catch (error) {
    console.error('Error booking ticket:', error);
    // Handle error case
  }
};

// Use handleBookMovie function with appropriate movie and theater IDs on button click

  return (
    <div className="movies-container" style={{ marginLeft: "30px" }}>
      <div className="movies-grid">
        {movies.map((movie, index) => (
          <div className="movie-card" key={index}>
            <h3>{movie.title}</h3>
            <p>Description: {movie.description}</p>
            <p>Release Date: {formatReleaseDate(movie.releaseDate)}</p>
            <button className="create-movie-button" onClick={() => handleBookMovie(movie._id)} >
              Book Movie
            </button>
          </div>
        ))}
      </div>
      <button
        className="create-movie-button"
        onClick={() => setShowModal(true)}
      >
        Create Movie
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-btn" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Create Movie</h2>
            <form onSubmit={handleSubmit} className="create-movie-form">
              {/* Form inputs */}
              <button className="submit" type="submit">
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
