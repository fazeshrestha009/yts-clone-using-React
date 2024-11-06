  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { Link } from 'react-router-dom';

  const Movies = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [latestMovies, setLatestMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    useEffect(() => {
      const fetchMoviesList = async () => {
        try {
          const response = await axios.get('https://yts.mx/api/v2/list_movies.json');
          const movies = response.data.data.movies;
          setPopularMovies(movies.slice(0, 4));
          setLatestMovies(movies.slice(4, 12));
          setUpcomingMovies(movies.slice(12, 20));
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };
      fetchMoviesList();
    }, []);

    const renderMovies = (movies) => {
      return movies.map((movie) => (
        <div className="movie" key={movie.id}>
          <img src={movie.medium_cover_image} alt={movie.title} />
          <div className="movie-details">
            <div className="rating">
              <span className="star">★</span> {movie.rating} / 10
            </div>
            {movie.genres && movie.genres.map((genre) => <p key={genre}>{genre}</p>)}
            <Link to={`/movie/${movie.id}`}>
                    <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors mt-4">
                        View Details
                    </button>
                </Link>

          </div>
          <p className="movie-title">{movie.title}</p>
        </div>
      ));
    };

    return (
      <div>
        <div className="movies-section">
          <h2>Popular Downloads</h2>
          <div className="movies-grid">{renderMovies(popularMovies)}</div>
        </div>
        <div className="movies-section">
          <h2>Latest YIFY Movies Torrents</h2>
          <div className="movies-grid">{renderMovies(latestMovies)}</div>
        </div>
        <div className="movies-section">
          <h2>Upcoming YIFY Movies</h2>
          <div className="movies-grid">{renderMovies(upcomingMovies)}</div>
        </div>
      </div>
    );
  };

  export default Movies;
