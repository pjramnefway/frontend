import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin-login');
  };

  return (
    <header style={styles.navbar}>
      <div style={styles.left}>
        <img
          src="/assets/adminlogo.png"
          alt="NefwayRide Logo"
          style={styles.logo}
        />
        <span style={styles.title}>Vendor Admin Panel</span>
      </div>

      <div style={styles.right} onClick={toggleDropdown}>
        <i className="fas fa-user-circle" style={styles.profileIcon}></i>
        {showDropdown && (
          <div style={styles.dropdown}>
            <p><strong>Name:</strong> Admin User</p>
            <p><strong>Email:</strong> admin@nefway.com</p>
            <p><strong>Phone:</strong> +91 9876543210</p>
            <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '64px',
    backgroundColor: '#f1f3f6',
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    zIndex: 1000,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '40px',
    marginRight: '10px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
  right: {
    position: 'relative',
    cursor: 'pointer',
  },
  profileIcon: {
    fontSize: '26px',
    color: '#444',
  },
  dropdown: {
    position: 'absolute',
    top: '60px',
    right: 0,
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '6px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    width: '220px',
    zIndex: 1001,
    color: '#333',
    fontSize: '14px',
  },
  logoutButton: {
    marginTop: '10px',
    backgroundColor: '#e74c3c',
    border: 'none',
    padding: '8px 12px',
    color: 'white',
    fontSize: '14px',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.2s',
  }
};

export default Navbar;
