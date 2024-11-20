import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../redux/cartSlice'; 

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { user } = useAuth();
  const cartCount = useSelector(selectCartCount); 

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
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
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
        {user && (
          <li>
            <div className="relative inline-block">
              <button
                onClick={() => navigate('/checkout')}
                className="flex items-center gap-2 hover:text-green-400 transition duration-200"
              >
                <img
                  src="/shopping-cart.png"
                  alt="Cart"
                  className="w-6 h-6"
                />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs rounded-full px-2 py-1 flex items-center justify-center w-5 h-5 text-center"
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </li>
        )}
        <li>
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
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
