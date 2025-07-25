import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import WhyUs from './pages/WhyUs';
import DrivewithNefwayride from './pages/DrivewithNefwayride';
import AdminLogin from './pages/AdminLogin';
import CorporateuserApp from './admins/Corporateuser/AdminApp';
import VendoruserApp from './admins/Vendoruser/AdminApp';
import CorporatesuperuserApp from './admins/Corporatesuperuser/AdminApp';
import NefwayrideadminApp from './admins/Nefwayrideadmin/AdminApp';;

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Services" element={<Services />} />
      <Route path="/WhyUs" element={<WhyUs />} />
      <Route path="/DrivewithNefwayride" element={<DrivewithNefwayride />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/Corporatesuperuser/*" element={<CorporatesuperuserApp />} />
      <Route path="/Corporateuser/*" element={<CorporateuserApp />} />
      <Route path="/Vendoruser/*" element={<VendoruserApp />} />
      <Route path="/Nefwayrideadmin/*" element={<NefwayrideadminApp />} />
    </Routes>
  </Router>
);

export default App;