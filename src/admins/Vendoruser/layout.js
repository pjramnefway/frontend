import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const Layout = ({ children }) => (
  <div>
    <Navbar />
    <Sidebar />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;