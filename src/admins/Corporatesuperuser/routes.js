import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Tracking from './pages/Tracking';
import UserAdminOnboarding from './pages/UserAdminOnboarding';
import Employee from './pages/Employee';
import VendorOnboarding from './pages/VendorOnboarding';
import ComingSoonPage from './pages/ComingSoonPage';

const CorporatesuperuserRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="tracking" element={<Tracking />} />
    <Route path="UserAdmin" element={<UserAdminOnboarding />} />
    <Route path="employee" element={<Employee />} />
    <Route path="vendor" element={<VendorOnboarding />} />
    <Route path="comingsoon" element={<ComingSoonPage />} />
  </Routes>
);

export default CorporatesuperuserRoutes;