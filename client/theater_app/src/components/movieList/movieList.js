import React, { useEffect, useState } from "react";
import "./style.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [theaters, setTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState("");
  const [numSeats, setNumSeats] = useState(0);
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

    fetch("http://localhost:8000/api/theaters")
      .then((response) => response.json())
      .then((data) => setTheaters(data))
      .catch((error) => console.error("Error fetching theaters:", error));
  }, []);

  // const handleInputChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

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

  const handleBookMovie = (movieId) => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleBookTicket = async () => {
    if (!selectedTheater || numSeats <= 0) {
      console.error(
        "Please select a theater and enter a valid number of seats"
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/bookTicket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: selectedTheater,
          theaterId: selectedTheater,
          numSeats,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Ticket booked:", data.ticket);
        // Handle successful ticket booking
      } else {
        console.error("Failed to book ticket:", data.message);
        // Handle failed ticket booking
      }
    } catch (error) {
      console.error("Error booking ticket:", error);
      // Handle error case
    }
  };

  return (
    <div className="movies-container" style={{ marginLeft: "30px" }}>
      <div className="movies-grid">
        {movies.map((movie, index) => (
          <div className="movie-card" key={index}>
            <h3>{movie.title}</h3>
            <p>Description: {movie.description}</p>
            <p>Release Date: {formatReleaseDate(movie.releaseDate)}</p>
            <button
              className="create-movie-button"
              onClick={() => handleBookMovie(movie._id)}
            >
              Book Movie
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-btn" onClick={handleModalClose}>
              &times;
            </span>
            <h2>Book Tickets</h2>
            <form onSubmit={handleSubmit} className="book-ticket-form">
              <label>
                Select Theater:
                <select onChange={(e) => setSelectedTheater(e.target.value)}>
                  <option value="">Select Theater</option>
                  {theaters.map((theater) => (
                    <option key={theater._id} value={theater._id}>
                      {theater.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Number of Seats:
                <input
                  type="number"
                  value={numSeats}
                  onChange={(e) => setNumSeats(parseInt(e.target.value))}
                />
              </label>
              <button
                className="submit"
                type="button"
                onClick={handleBookTicket}
              >
                Book Tickets
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
