import React from 'react';
import Navbar from './components/Navbar'; // Default import
import Movies from './components/Movies'; // Default import
import Footer from './components/Footer'; // Default import
import MovieDetails from './components/MovieDetails'; // Default import
import Checkout from './components/Checkout'; // Default import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './components/CartContext'; // Named import (matches CartContext.js)
import './style.css';

// Create a new instance of QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider> {/* Wrap in CartProvider to enable global cart context */}
        <Router>
          <Navbar />
          <section className="landing">
            <Routes>
              <Route path="/" element={<Movies />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/checkout" element={<Checkout />} /> {/* Add checkout route */}
            </Routes>
          </section>
          <Footer />
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
