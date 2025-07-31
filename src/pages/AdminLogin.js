import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './AdminLogin.css';
import rightImage from '../components/Adminimg-bg.png';
import axios from 'axios';



const AdminLogin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const dashBoardPath = 
  {
      nefway_admin:'/Nefwayrideadmin/dashboard',
      super_corporate_admin : '/Corporatesuperuser/dashboard',
      corporate_admin:'/Corporateuser/dashboard',
      vendor_admin:'/Vendoruser/dashboard',
      corporate_employee:'',
      vendor_employee:''
  }

/*   const adminUsers = [
    { username: 'user@admin.com', password: 'admin123', dashboardPath: '/Corporateuser/dashboard' },
    { username: 'vendor@admin.com', password: 'vendor123', dashboardPath: '/Vendoruser/dashboard' },
    { username: 'user@superadmin.com', password: 'superadmin123', dashboardPath: '/Corporatesuperuser/dashboard' },
    // { username: 'vendor@superadmin.com', password: 'supervendor123', dashboardPath: '/Vendorsuperuser/dashboard' },
    { username: 'admin@nefwayride.com', password: 'nefwayride123', dashboardPath: '/Nefwayrideadmin/dashboard' },
    // { username: 'admin@nefway.com', password: 'nefway123', dashboardPath: '/Nefwayadmin/dashboard' },
  ]; */

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      'http://127.0.0.1:9800/api/users/login',
      { email, password },
      { withCredentials: true } // Optional — if your server sets cookies
    );

    const { user } = response.data;

    if (user && user.role) {
      // ✅ Save token and user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      //localStorage.setItem('token', token); // Store JWT for auth

      const route = dashBoardPath[user.role];

      if (route) {
        navigate(route);
      } else {
        alert('No Dashboard mapped for this role');
      }
    } else {
      alert('Login failed. Please try again.');
    }

  } catch (err) {
    console.error('Login Error', err);
    alert(err?.response?.data?.msg || 'Invalid credentials or server error');
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
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Link to='/forgot-password'>Forgot Password?</Link>
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