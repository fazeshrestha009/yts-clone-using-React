import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <p>
          YTS © 2011 - 2024 |
          <Link to="/blog">Blog</Link> |
          <Link to="/dmca">DMCA</Link> |
          <Link to="/api">API</Link> |
          <Link to="/rss">RSS</Link> |
          <Link to="/contact">Contact</Link> |
          <Link to="/browse-movies">Browse Movies</Link> |
          <Link to="/requests">Requests</Link> |
          <Link to="/login">Login</Link> |
          <Link to="/language">Language</Link>
        </p>
      </div>
      <div className="footer-status">
        <p>
          <Link to="/eztv">EZTV</Link> |
          <Link to="/status">YIFY Status</Link> |
          <Link to="/proxies">YTS Proxies</Link> |
          <Link to="/proxies-tor">YTS Proxies (TOR)</Link> |
          <a href="https://twitter.com/ytsyify" target="_blank" rel="noopener noreferrer" className="follow">@ytsyify</a>
        </p>
      </div>
      <div className="footer-agreement">
        <p>
          By using this site you agree to and accept our
          <Link to="/user-agreement">User Agreement</Link>, which can be read
          <Link to="/user-agreement#details">here</Link>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
