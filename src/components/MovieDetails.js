import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Updated import

const MovieDetails = () => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();  // useNavigate hook for navigation

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
                setMovie(response.data.data.movie);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setError('Error fetching movie details. Please try again later.');
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const handleAddToCart = () => {
        if (!movie) return;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingMovie = cart.find(item => item.id === movie.id);

        if (existingMovie) {
            const goToCheckout = window.confirm("This movie is already in the cart. Would you like to go to the checkout page?");
            if (goToCheckout) {
                navigate('/checkout');
            }
        } else {
            cart.push(movie);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert("Movie added to cart!");
            navigate('/checkout');
        }
    };

    if (loading) return <div className="loading">Loading movie details...</div>;

    if (error) return <div className="error">{error}</div>;

    const originalPrice = 2000.00; // Hardcoded original price for the movie
    const discount = 0.20; // Hardcoded discount (20%)
    const discountedPrice = originalPrice * (1 - discount);

    return (
        <div className="movie-details-container">
            <div className="movie-poster">
                <img src={movie.medium_cover_image} alt={movie.title} />
            </div>
            <div className="movie-info">
                <h1>{movie.title}</h1>
                <p>{movie.description_full || "Description not available"}</p>
                <div className="movie-rating">
                    <strong>Rating:</strong> <span>{movie.rating} / 10</span>
                </div>
                <div className="movie-genres">
                    <strong>Genres:</strong> <span>{movie.genres.join(', ')}</span>
                </div>
                <div className="movie-pricing">
                    <p><strong>Price:</strong> ₨{originalPrice.toFixed(2)}</p>
                    <p><strong>Discounted Price:</strong> ₨{discountedPrice.toFixed(2)}</p>
                </div>
                <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
                <button onClick={() => navigate('/')} className="back-btn">Back to Movies</button>
            </div>
        </div>
    );
};

export default MovieDetails;
