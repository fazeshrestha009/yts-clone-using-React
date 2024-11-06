import React from 'react';
import Navbar from './components/Navbar';
import Movies from './components/Movies';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import
import MovieDetails from './components/MovieDetails'; // Import MovieDetails component
import './style.css';

function App() {
  return (
    <Router>
      <Navbar />
      <section className="landing">
        <div className="content">
          <h1>Download YTS YIFY movies: HD smallest size</h1>
          <p>
            Welcome to the official YTS.MX website. Here you can browse and download YIFY movies in excellent 720p,
            1080p, 2160p 4K, and 3D quality, all at the smallest file size.
          </p>
          <p>
            <strong>IMPORTANT</strong> - YTS.MX is the only new official domain for YIFY Movies.
          </p>
          <div className="social">
            <a href="#">@YTSMX_UPDATES</a>
            <a href="#">Follow @YTSYIFY</a>
          </div>
        </div>
        {/* Define routes */}
        <Routes>
          {/* Home page with Movies list */}
          <Route path="/" element={<Movies />} />
          
          {/* Movie details page */}
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </section>
      <Footer />
    </Router>
  );
}

export default App;
