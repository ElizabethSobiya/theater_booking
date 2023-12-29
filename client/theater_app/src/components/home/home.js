import React, { useState, useEffect } from "react";
import MovieList from "../movieList/movieList";
import TheaterList from "../theaterList/theaterList";
import SearchBar from "../search/search";
import "./style.css";
import Navbar from "./Navbar";

const Home = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [allTheaters, setAllTheaters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch movies data
    fetch(`http://localhost:8000/api/movies`)
      .then((response) => response.json())
      .then((data) => {
        setAllMovies(data);
        setMovies(data);
      })
      .catch((error) => console.error("Error fetching movies:", error));

    // Fetch theaters data
    fetch(`http://localhost:8000/api/theaters`)
      .then((response) => response.json())
      .then((data) => {
        setAllTheaters(data);
        setTheaters(data);
      })
      .catch((error) => console.error("Error fetching theaters:", error));
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    // Filter movies based on the search term
    const filteredMovies = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Filter theaters based on the search term
    const filteredTheaters = allTheaters.filter((theater) =>
      theater.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the state variables with filtered results
    setMovies(filteredMovies);
    setTheaters(filteredTheaters);
  };

  return (
    <div>
      <Navbar />
      <SearchBar onClick={handleSearch} />
      <div>
        <MovieList movies={movies} />
      </div>
      <div>
        <TheaterList theaters={theaters} />
      </div>
    </div>
  );
};

export default Home;
