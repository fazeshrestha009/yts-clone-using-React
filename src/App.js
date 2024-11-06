import React from 'react';
import Navbar from './components/Navbar';
import Movies from './components/Movies';
import Footer from './components/Footer';
import MovieDetails from './components/MovieDetails';
import Checkout from './components/Checkout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './components/CartContext';
import './style.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <Navbar />
          <section className="landing">
            <Routes>
              <Route path="/" element={<Movies />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </section>
          <Footer />
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
