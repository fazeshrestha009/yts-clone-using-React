import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <p>
          YTS © 2011 - 2024 |
          <a href="#">Blog</a> |
          <a href="#">DMCA</a> |
          <a href="#">API</a> |
          <a href="#">RSS</a> |
          <a href="#">Contact</a> |
          <a href="#">Browse Movies</a> |
          <a href="#">Requests</a> |
          <a href="#">Login</a> |
          <a href="#">Language</a>
        </p>
      </div>
      <div className="footer-status">
        <p>
          <a href="#">EZTV</a> |
          <a href="#">YIFY Status</a> |
          <a href="#">YTS Proxies</a> |
          <a href="#">YTS Proxies (TOR)</a>
          <a href="#" className="follow">@ytsyify</a>
        </p>
      </div>
      <div className="footer-agreement">
        <p>
          By using this site you agree to and accept our
          <a href="#">User Agreement</a>, which can be read
          <a href="#">here</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
