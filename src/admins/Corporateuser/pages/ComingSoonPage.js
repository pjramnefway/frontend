import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './ComingSoonPage.css';

const ComingSoonPage = () => {
  return (
    <div className="coming-soon-container">
      {/* Animated Background */}
      <div className="background-animation">
        <div className="floating-shapes">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="shape"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        <motion.div
          className="main-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo/Icon */}
          <motion.div
            className="logo-container"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="logo-icon">
              <svg viewBox="0 0 100 100" className="logo-svg-icon">
                <circle cx="50" cy="50" r="45" className="logo-circle" />
                <path d="M30 50 L45 65 L70 35" className="logo-check" />
              </svg>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="main-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Coming Soon
          </motion.h1>

          {/* Creative Sub Heading */}
          <motion.p
            className="sub-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We're crafting something extraordinary
          </motion.p>

          {/* Development Status */}
          <motion.div
            className="status-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="status-badge">
              <span className="status-dot"></span>
              Under Development
            </div>
          </motion.div>

          {/* Simple Creative Message */}
          <motion.div
            className="creative-message"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="message-line">
              <span className="message-icon">✨</span>
              <span className="message-text">Innovation takes time</span>
            </div>
            <div className="message-line">
              <span className="message-icon">🚀</span>
              <span className="message-text">Excellence is our promise</span>
            </div>
            <div className="message-line">
              <span className="message-icon">💫</span>
              <span className="message-text">Magic is brewing</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            className="description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            Our team is working behind the scenes to bring you an experience 
            that will exceed expectations. Stay tuned for something amazing.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            className="cta-button"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Stay Tuned
          </motion.button>

          {/* Social Links */}
          <motion.div
            className="social-links"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <a href="#" className="social-link">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="social-link">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#" className="social-link">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
