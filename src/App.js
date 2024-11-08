import React from 'react';
import Navbar from './components/Navbar';
import Movies from './components/Movies';
import Footer from './components/Footer';
import MovieDetails from './components/MovieDetails';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Registration';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './components/AuthContext'; 
import './style.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <AuthProvider> 
          <Router>
            <Navbar />
            <section className="landing">
              <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </section>
            <Footer />
          </Router>
        </AuthProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
