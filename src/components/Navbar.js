import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically

  // Function to handle search input change
  const handleSearchInput = async (event) => {
    const query = event.target.value.toLowerCase();
    setSearchInput(query);

    if (query.length > 0) {
      try {
        const response = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${query}`);
        const movies = response.data.data.movies || [];
        setSearchResults(movies); // Update search results
      } catch (error) {
        console.error('Error searching for movies:', error);
        setSearchResults([]); // Clear results in case of error
      }
    } else {
      setSearchResults([]); // Clear the dropdown if the input is empty
    }
  };

  // Function to render search results in the dropdown
  const renderDropdown = () => {
    if (searchResults.length === 0) return null;
    
    return (
      <div className={`dropdown ${searchResults.length > 0 ? 'show' : ''}`}>
        {searchResults.map((movie) => (
          <div 
            key={movie.id} 
            className="dropdown-item" 
            onClick={() => handleMovieClick(movie.id)}
          >
            <img src={movie.medium_cover_image} alt={movie.title} />
            <span>{movie.title}</span>
          </div>
        ))}
      </div>
    );
  };

  // Function to handle movie click and navigate to details page
  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`); // Use navigate to redirect to the movie details page
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="https://yts.mx/assets/images/website/logo-YTS.svg" alt="Logo" />
      </div>
      <div className="search-bar">
        <input
          type="text"
          id="searchInput"
          value={searchInput}
          onChange={handleSearchInput}
          placeholder="Search movies..."
          aria-label="Search movies"
        />
        {renderDropdown()} {/* Render the dropdown with results */}
      </div>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a style={{ color: 'rgb(98, 230, 98)' }} href="#">4K</a></li>
        <li><a href="#">Trending</a></li>
        <li><a href="#">Browse Movies</a></li>
      </ul>
      <div className="nav-auth">
        <a href="#" className="login">Login</a>
        <a href="#" className="register">Register</a>
      </div>
    </nav>
  );
};

export default Navbar;
