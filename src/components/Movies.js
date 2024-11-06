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
      <div className="movie bg-gray-800 p-4 text-center rounded-lg transition-transform transform hover:scale-105 border-2 border-transparent hover:border-green-500" key={movie.id}>
        <img src={movie.medium_cover_image} alt={movie.title} className="w-full rounded-lg" />
        <div className="movie-details absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center bg-black bg-opacity-70 opacity-0 transition-opacity hover:opacity-100">
          <div className="rating text-white text-xl mb-2 bg-green-700 py-1 px-4 rounded-md border-2 border-green-500">
            <span className="star text-yellow-500">★</span> {movie.rating} / 10
          </div>
          {movie.genres && movie.genres.map((genre) => (
            <p key={genre} className="genre text-white">{genre}</p>
          ))}
          <Link to={`/movie/${movie.id}`}>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors mt-4">
              View Details
            </button>
          </Link>
        </div>
        <p className="movie-title text-white mt-4">{movie.title}</p>
      </div>
    ));
  };

  return (
    <div className="content p-8">
      <h1 className="text-4xl text-white mb-4">Download YTS YIFY Movies: HD Smallest Size</h1>
      <p className="text-gray-400 text-xl mb-4">
        Welcome to the official YTS.MX website. Here you can browse and download YIFY movies in excellent 720p,
        1080p, 2160p 4K, and 3D quality, all at the smallest file size.
      </p>
      <p className="text-gray-400 mb-4">
        <strong>IMPORTANT:</strong> YTS.MX is the only new official domain for YIFY Movies.
      </p>
      <div className="social mb-6">
        <a href="https://twitter.com/YTSMX_UPDATES" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-400">Follow @YTSMX_UPDATES</a>
        <a href="https://twitter.com/YTSYIFY" target="_blank" rel="noopener noreferrer" className="ml-6 text-cyan-500 hover:text-cyan-400">Follow @YTSYIFY</a>
      </div>
      <div className="movies-section mb-8">
        <h2 className="text-3xl text-white mb-4">Popular Downloads</h2>
        <div className="movies-grid grid grid-cols-4 gap-6 justify-center">{renderMovies(popularMovies)}</div>
      </div>
      <div className="movies-section mb-8">
        <h2 className="text-3xl text-white mb-4">Latest YIFY Movies Torrents</h2>
        <div className="movies-grid grid grid-cols-4 gap-6 justify-center">{renderMovies(latestMovies)}</div>
      </div>
      <div className="movies-section">
        <h2 className="text-3xl text-white mb-4">Upcoming YIFY Movies</h2>
        <div className="movies-grid grid grid-cols-4 gap-6 justify-center">{renderMovies(upcomingMovies)}</div>
      </div>
    </div>
  );
};

export default Movies;
