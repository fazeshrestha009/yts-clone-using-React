import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchInput = async (event) => {
    const query = event.target.value.toLowerCase();
    setSearchInput(query);

    if (query.length > 0) {
      try {
        const response = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${query}`);
        const movies = response.data.data.movies || [];
        setSearchResults(movies);
      } catch (error) {
        console.error('Error searching for movies:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };
  const renderDropdown = () => {
    if (searchResults.length === 0) return null;
    return (
      <div ref={dropdownRef} className="dropdown show">
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
  const handleMovieClick = (id) => {
    setSearchResults([]);
    navigate(`/movie/${id}`);
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="https://yts.mx/assets/images/website/logo-YTS.svg" alt="YTS Logo" />
        </Link>
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
        {renderDropdown()}
      </div>
      <ul className="nav-links">
        <li><button onClick={() => navigate('/')}>Home</button></li>
        <li><button style={{ color: 'rgb(98, 230, 98)' }} onClick={() => navigate('/4k')}>4K</button></li>
        <li><button onClick={() => navigate('/trending')}>Trending</button></li>
        <li><button onClick={() => navigate('/browse')}>Browse Movies</button></li>
      </ul>
      <div className="nav-auth">
        {user ? (
          <button
          onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        ) : (
          <>
            <button onClick={() => navigate('/login')} className="login mr-4">Login</button>
            <button onClick={() => navigate('/register')} className="register">Register</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
