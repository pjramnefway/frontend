import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './AdminLogin.css';
import rightImage from '../components/Adminimg-bg.png';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const adminUsers = [
    { username: 'user@admin.com', password: 'admin123', dashboardPath: '/Corporateuser/dashboard' },
    { username: 'vendor@admin.com', password: 'vendor123', dashboardPath: '/Vendoruser/dashboard' },
    { username: 'user@superadmin.com', password: 'superadmin123', dashboardPath: '/Corporatesuperuser/dashboard' },
    // { username: 'vendor@superadmin.com', password: 'supervendor123', dashboardPath: '/Vendorsuperuser/dashboard' },
    { username: 'admin@nefwayride.com', password: 'nefwayride123', dashboardPath: '/Nefwayrideadmin/dashboard' },
    // { username: 'admin@nefway.com', password: 'nefway123', dashboardPath: '/Nefwayadmin/dashboard' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const adminUser = adminUsers.find(
      (admin) => admin.username === username && admin.password === password
    );
    if (adminUser) {
      navigate(adminUser.dashboardPath);
    } else {
      alert('Invalid credentials!');
    }
  };

  return (

    
    <div className="login-container">
      <div className="login-right">
     <img src={rightImage} alt="Right side decorative" className="right-image" />

      </div>
      <div className="login-left">
        <div className="screen-logo">
          <img src="./assets/adminlogo.png" alt="Logo" />
        </div>
        <div className="login-card">
          <h2 className="login-title">Admin Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            {/* Inputs and icons remain unchanged */}
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="text"
                placeholder="Email Address"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group password-group" style={{ position: 'relative' }}>
              <FaLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingRight: '40px' }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#94a3b8',
                  fontSize: '1.2rem',
                  userSelect: 'none',
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="login-btn">Log In</button>
          </form>
          <p className="login-footer">Nefway Technologies Pvt Ltd.</p>
        </div>
      </div>
      

      <div className="screen-footer">
        <p>©️ 2025 Nefway Technologies Pvt Ltd. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AdminLogin;