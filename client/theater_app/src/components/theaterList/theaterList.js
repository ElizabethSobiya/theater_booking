import React, { useState, useEffect } from "react";
import './style.css';
import '../movieList/style.css';

const TheaterList = () => {
  const [showCreateTheater, setShowCreateTheater] = useState(false);
  const [theaters, setTheaters] = useState([]);
  const [newTheater, setNewTheater] = useState({
    name: "",
    location: "",
    movieTime: "",
  });

  const handleCreateTheaterClick = () => {
    setShowCreateTheater(true);
  };

  const handleCancelCreateTheater = () => {
    setShowCreateTheater(false);
    setNewTheater({ name: "", location: "", movieTime: "" });
  };
  useEffect(() => {
    fetch("http://localhost:8000/api/theaters")
      .then((response) => response.json())
      .then((data) => setTheaters(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleCreateTheaterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/theaters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTheater),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create theater');
      }
  
      // If successful, update the local theaters state with the newly created theater
      const theaterData = await response.json();
      setTheaters([...theaters, theaterData]);
  
      setShowCreateTheater(false);
      setNewTheater({ name: '', location: '', movieTime: '' });
    } catch (error) {
      console.error('Error creating theater:', error.message);
      // Handle error scenarios, e.g., show an error message to the user
    }
  };
  

  const handleInputChange = (e) => {
    setNewTheater({ ...newTheater, [e.target.name]: e.target.value });
  };

  return (
    <div className="movie-container" style={{marginLeft:'30px'}}>
      <button className="create-theater-button" onClick={handleCreateTheaterClick}>Create Theater</button>

      {showCreateTheater && (
        <div className="modal-overlay">
          <div className="modal">
          <span className="close" onClick={handleCancelCreateTheater}>
              &times;
            </span>
            <h2>Create New Theater</h2>
            <form onSubmit={handleCreateTheaterSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={newTheater.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={newTheater.location}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Seat Count:
                <input
                  type="number"
                  name="movieTime"
                  value={newTheater.movieTime}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      )}

      <div className="movies-grid">
        {theaters.map((theater, index) => (
          <div key={index} className="movie-card">
            <h3>{theater.name}</h3>
            <p>Location: {theater.location}</p>
            {/* <p>Movie Time: {theater.movieTime}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheaterList;
