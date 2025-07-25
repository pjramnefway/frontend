import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin-login');
  };

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <header style={styles.navbar}>
      <div style={styles.left}>
        <img
          src="/assets/adminlogo.png"
          alt="NefwayRide Logo"
          style={styles.logo}
        />
        <span style={styles.title}>Super User Admin Panel</span>
      </div>

      <div style={styles.right}>
        <div style={styles.timeContainer}>
          <i className="far fa-clock" style={styles.timeIcon}></i>
          <span style={styles.timeText}>{formattedTime}</span>
        </div>
        <div style={styles.profileContainer} onClick={toggleDropdown}>
          <i className="fas fa-user-circle" style={styles.profileIcon}></i>
          <div style={{ ...styles.dropdown, ...(showDropdown ? styles.dropdownVisible : {}) }}>
            <div style={styles.dropdownHeader}>
              <i className="fas fa-user-circle" style={styles.dropdownProfileIcon}></i>
              <div>
                <p style={styles.dropdownName}>Super User Admin</p>
                <p style={styles.dropdownEmail}>superuser@nefwayride.com</p>
              </div>
            </div>
            <div style={styles.dropdownBody}>
              <div style={styles.dropdownItem}>
                <i className="fas fa-phone" style={styles.dropdownIcon}></i>
                <span>+91 9876543210</span>
              </div>
            </div>
            <div style={styles.dropdownFooter}>
              <button style={styles.logoutButton} onClick={handleLogout}>
                <i className="fas fa-sign-out-alt" style={styles.logoutIcon}></i>
                Logout
              </button>
            </div>
          </div>
        </div>
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
    height: '60px',
    backgroundColor: '#ffffff',
    color: '#333',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 30px',
    zIndex: 1100,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '45px',
    marginRight: '15px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#2c3e50',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
  },
  timeContainer: {
    display: 'flex',
    alignItems: 'center',
    color: '#555',
  },
  timeIcon: {
    fontSize: '20px',
    marginRight: '8px',
    color: '#3498db',
  },
  timeText: {
    fontSize: '16px',
    fontWeight: '500',
  },
  profileContainer: {
    position: 'relative',
    cursor: 'pointer',
  },
  profileIcon: {
    fontSize: '32px',
    color: '#3498db',
  },
  dropdown: {
    position: 'absolute',
    top: '55px',
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    width: '280px',
    zIndex: 1101,
    color: '#333',
    fontSize: '14px',
    overflow: 'hidden',
    opacity: 0,
    visibility: 'hidden',
    transform: 'translateY(-10px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s',
  },
  dropdownVisible: {
    opacity: 1,
    visibility: 'visible',
    transform: 'translateY(0)',
  },
  dropdownHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #e9ecef',
  },
  dropdownProfileIcon: {
    fontSize: '48px',
    color: '#3498db',
    marginRight: '15px',
  },
  dropdownName: {
    margin: 0,
    fontWeight: '600',
    fontSize: '16px',
  },
  dropdownEmail: {
    margin: 0,
    fontSize: '14px',
    color: '#7f8c8d',
  },
  dropdownBody: {
    padding: '20px',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    fontSize: '15px',
  },
  dropdownIcon: {
    width: '20px',
    marginRight: '15px',
    color: '#3498db',
  },
  dropdownFooter: {
    padding: '0 20px 20px',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    border: 'none',
    padding: '12px 20px',
    color: 'white',
    fontSize: '15px',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s',
  },
  logoutIcon: {
    marginRight: '10px',
  },
};

export default Navbar;
