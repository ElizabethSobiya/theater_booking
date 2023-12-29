import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const SearchBar = ({ onClick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClick(searchTerm); // Pass the search term to the onClick function
  };

  return (
    <div className="wrap">
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          className="searchTerm"
          value={searchTerm}
          onChange={handleChange}
          placeholder="What are you looking for?"
        />
        <button type="submit" className="searchButton">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
