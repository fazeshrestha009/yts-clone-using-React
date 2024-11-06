import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext';

const fetchMovieDetails = async (id) => {
  const response = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
  return response.data.data.movie;
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetails(id),
  });

  const handleAddToCart = () => {
    if (!movie) return;

    const originalPrice = 2000.00;
    const discount = 0.20;
    const discountedPrice = originalPrice * (1 - discount);

    const cartMovie = {
      id: movie.id,
      title: movie.title,
      poster: movie.medium_cover_image,
      discountedPrice,
    };
    addToCart(cartMovie);
    alert("Movie added to cart!");
    navigate('/checkout');
  };

  if (isLoading) return <div className="loading">Loading movie details...</div>;
  if (error) return <div className="error">Error fetching movie details: {error.message}</div>;

  return (
    <div className="movie-details-container">
      <div className="movie-poster">
        <img src={movie.medium_cover_image} alt={movie.title} />
      </div>
      <div className="movie-info">
        <h1 className="text-3xl">{movie.title}</h1>
        <p>{movie.description_full || "Description not available"}</p>
        <div className="movie-rating">
          <strong>Rating:</strong> <span>{movie.rating} / 10</span>
        </div>
        <div className="movie-genres">
          <strong>Genres:</strong> <span>{movie.genres.join(', ')}</span>
        </div>
        <div className="movie-pricing">
          <p><strong>Price:</strong> ₨{2000.00.toFixed(2)}</p>
          <p><strong>Discounted Price:</strong> ₨{(2000.00 * (1 - 0.20)).toFixed(2)}</p>
        </div>
        <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
        <button onClick={() => navigate('/')} className="back-btn">Back to Movies</button>
      </div>
    </div>
  );
};

export default MovieDetails;
