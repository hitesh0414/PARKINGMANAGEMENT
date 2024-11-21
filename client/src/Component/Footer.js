// Footer.js
import React from 'react';
import "../Styles/Footer.css" // Optional: Add CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} My Website. All Rights Reserved.</p>
        <ul className="footer-links">
          <li>
            <a href="#privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="#terms-of-service">Terms of Service</a>
          </li>
          <li>
            <a href="#contact-us">Contact Us</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
