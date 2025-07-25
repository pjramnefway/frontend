import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { to: '/Corporateuser/dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { to: '/Corporateuser/assignride', label: 'Assign Ride', icon: 'fas fa-calendar-check' },
    { to: '/Corporateuser/ridehistory', label: 'Ride History', icon: 'fas fa-history' },
    { to: '/Corporateuser/tracking', label: 'Tracking', icon: 'fas fa-map-marker-alt' },
    { to: '/Corporateuser/comingsoon', label: 'Report', icon: 'fas fa-chart-line' },
    { to: '/Corporateuser/comingsoon', label: 'Settings', icon: 'fas fa-cog' },
    { to: '/Corporateuser/comingsoon', label: 'Emergency Alerts', icon: 'fas fa-exclamation-triangle' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside style={styles.sidebar}>
      <h4 style={styles.title}>☰ Menu</h4>
      <nav style={styles.nav}>
        {navLinks.map(link => (
          <div
            key={link.to}
            onClick={() => navigate(link.to)}
            style={{
              ...styles.link,
              ...(isActive(link.to) ? styles.activeLink : {})
            }}
          >
            <i className={link.icon} style={{ marginRight: 10 }}></i>
            {link.label}
          </div>
        ))}
      </nav>
      <div style={styles.version}>Version 1.0.0</div>
    </aside>
  );
};

const styles = {
  sidebar: {
    position: 'fixed',
    top: '60px',
    left: 0,
    width: '300px',
    height: 'calc(100vh - 60px)',
    backgroundColor: '#f1f3f6',
    color: '#ffffff',
    padding: '20px 15px',
    boxShadow: '2px 0 6px rgba(0, 0, 0, 0.3)',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#222',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    color: '#444',
    textDecoration: 'none',
    fontSize: '15px',
    padding: '10px 15px',
    margin: '5px 0',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
  },
  activeLink: {
    backgroundColor: '#0d6efd',
    color: '#ffffff',
  },
  version: {
    fontSize: '13px',
    color: '#888',
    textAlign: 'center',
    marginTop: 'auto',
  },
};

export default Sidebar;
