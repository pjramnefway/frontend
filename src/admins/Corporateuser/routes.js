import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Assignride from './pages/Assignride';
import RideHistory from './pages/RideHistory';
import Tracking from './pages/Tracking';
import ComingSoonPage from './pages/ComingSoonPage';


const CorporateuserRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="assignride" element={<Assignride />} />
    <Route path="ridehistory" element={<RideHistory />} />
    <Route path="tracking" element={<Tracking />} />
    <Route path="comingsoon" element={<ComingSoonPage />} />
  </Routes>
);

export default CorporateuserRoutes;