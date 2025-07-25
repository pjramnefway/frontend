import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import SuperUserOnboarding from './pages/SuperUserOnboarding';

const NefwayrideadminRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="reports" element={<Reports />} />
    <Route path="superuser" element={<SuperUserOnboarding />} />
  </Routes>
);

export default NefwayrideadminRoutes;