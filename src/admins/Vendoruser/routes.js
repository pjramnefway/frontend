import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DriverVehicleOnboarding from './pages/DriverVehicleOnboarding';
import AssignRide from './pages/AssignRide';
import RideHistory from './pages/RideHistory';
import Tracking from './pages/Tracking';
import UnderDevelopment from './pages/UnderDevelopment';

const VendoruserRoutes  = () => (
  <Routes>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="driver-vehicle-onboarding" element={<DriverVehicleOnboarding />} />
    <Route path="assign-ride" element={<AssignRide />} />
    <Route path="ridehistory" element={<RideHistory />} />
    <Route path="tracking" element={<Tracking />} />
    <Route path="under-development" element={<UnderDevelopment />} />
  </Routes>
);

export default VendoruserRoutes ;