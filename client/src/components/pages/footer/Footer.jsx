import React from 'react';
import './Footer.css'; // Import your CSS file
import { FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Grow With Child. All rights reserved.</p>
        
        {/* Contact Us Section */}
        <div className="contact-us">
          <p>Contact Us:</p>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="social-icon" />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="social-icon" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
