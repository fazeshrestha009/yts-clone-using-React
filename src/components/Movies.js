import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const fetchMoviesList = async () => {
  const response = await axios.get('https://yts.mx/api/v2/list_movies.json');
  return response.data.data.movies || [];
};

const Movies = () => {
  const { data: movies = [], isLoading, error } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMoviesList,
  });

  if (isLoading) return <div>Loading movies...</div>;
  if (error) return <div>Error loading movies: {error.message}</div>;
  if (movies.length === 0) return <div>No movies found.</div>;

  const popularMovies = movies.slice(0, 4);
  const latestMovies = movies.slice(4, 12);
  const upcomingMovies = movies.slice(12, 20);

  const renderMovies = (movies) => {
    return movies.map((movie) => (
      <div className="movie" key={movie.id}>
        <img src={movie.medium_cover_image} alt={movie.title} className="movie-image" />
        <div className="movie-details">
          <div className="rating">
            <span className="star">★</span> {movie.rating} / 10
          </div>
          {movie.genres && movie.genres.map((genre) => (
            <p key={genre} className="genre">{genre}</p>
          ))}
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
    <div className="content">
      <h1>Download YTS YIFY Movies: HD Smallest Size</h1>
      <p>
        Welcome to the official YTS.MX website. Here you can browse and download YIFY movies in excellent 720p,
        1080p, 2160p 4K, and 3D quality, all at the smallest file size.
      </p>
      <p>
        <strong>IMPORTANT:</strong> YTS.MX is the only new official domain for YIFY Movies.
      </p>
      <div className="social">
        <a href="https://twitter.com/YTSMX_UPDATES" target="_blank" rel="noopener noreferrer">
          @YTSMX_UPDATES
        </a>
        <a href="https://twitter.com/YTSYIFY" target="_blank" rel="noopener noreferrer">
          Follow @YTSYIFY
        </a>
      </div>
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
