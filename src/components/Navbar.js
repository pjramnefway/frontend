import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
      <div className="container-fluid px-4">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/index">
          <img src="/assets/adminlogo.png" alt="Logo" className="logo" />
        </NavLink>

        {/* Hamburger / Toggler */}
        <button
          className="navbar-toggler text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link me-3 text-light fw-bold" to="/" end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link me-3 text-light fw-bold" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link me-3 text-light fw-bold" to="/services">Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link me-3 text-light fw-bold" to="/whyus">Why Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link me-3 text-light fw-bold" to="/drivewithnefwayride">Drive with Nefwayride</NavLink>
            </li>
          </ul>

          {/* Admin Button (Desktop) */}
          <div className="d-none d-lg-block ms-3">
            <NavLink to="/admin-login" className="btn-admin">
              <i className="fas fa-user-shield"></i> Admin Login
            </NavLink>
          </div>

          {/* Admin Button (Mobile) */}
          <div className="d-lg-none mt-3 w-100">
            <NavLink to="/admin-login" className="btn-admin w-100">
              <i className="fas fa-user-shield"></i> Admin Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
