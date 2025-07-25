import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <p>© {currentYear} NefwayRide. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    position: 'fixed',
    bottom: 0,
    left: '240px',
    right: 0,
    height: '40px',
    backgroundColor: '#f1f3f6',
    color: '#555',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    zIndex: 998,
    boxShadow: '0 -1px 6px rgba(0, 0, 0, 0.3)',
  },
};

export default Footer;
