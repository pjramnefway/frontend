import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { FaBuilding, FaUserShield, FaUserCheck, FaUserTimes, FaPlus, FaSearch, FaBell, FaFileUpload, FaEye, FaEnvelope, FaBan } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';

// Placeholder data for companies
const dummyCompanies = [
  { id: 'C001', name: 'Acme Corp', superAdmin: 'John Doe', status: 'Active', users: 120, lastActivity: '2024-07-01', email: 'admin@acme.com' },
  { id: 'C002', name: 'Globex Inc', superAdmin: 'Jane Smith', status: 'Pending', users: 0, lastActivity: '-', email: 'admin@globex.com' },
  { id: 'C003', name: 'Umbrella LLC', superAdmin: 'Alice Brown', status: 'Inactive', users: 45, lastActivity: '2024-06-28', email: 'admin@umbrella.com' },
  { id: 'C004', name: 'Soylent Corp', superAdmin: 'Charlie Green', status: 'Active', users: 80, lastActivity: '2024-07-01', email: 'admin@soylent.com' },
];

const onboardingRequests = [
  { id: 'R001', company: 'Wayne Ent.', contact: 'David Black', email: 'david@wayne.com', requested: '2024-07-02' },
  { id: 'R002', company: 'Stark Industries', contact: 'Tony Stark', email: 'tony@stark.com', requested: '2024-07-01' },
];

const activityFeed = [
  { id: 1, text: 'Acme Corp onboarded 2 new users', time: '2 hours ago' },
  { id: 2, text: 'Globex Inc submitted onboarding documents', time: '5 hours ago' },
  { id: 3, text: 'Umbrella LLC was suspended due to compliance', time: '1 day ago' },
  { id: 4, text: 'Soylent Corp super admin changed password', time: '2 days ago' },
];

const statCards = [
  {
    icon: <FaBuilding size={28} />, label: 'Total Companies', value: dummyCompanies.length, color: '#1976d2',
    bg: 'linear-gradient(135deg, #e3f0ff 0%, #f5faff 100%)'
  },
  {
    icon: <FaUserCheck size={28} />, label: 'Active', value: dummyCompanies.filter(c => c.status === 'Active').length, color: '#43a047',
    bg: 'linear-gradient(135deg, #e8f5e9 0%, #f5fff8 100%)'
  },
  {
    icon: <FaUserTimes size={28} />, label: 'Inactive', value: dummyCompanies.filter(c => c.status === 'Inactive').length, color: '#f44336',
    bg: 'linear-gradient(135deg, #ffebee 0%, #fff5f5 100%)'
  },
  {
    icon: <FaUserShield size={28} />, label: 'Pending Onboarding', value: onboardingRequests.length, color: '#ff9800',
    bg: 'linear-gradient(135deg, #fff3e0 0%, #fffaf5 100%)'
  },
];

// Placeholder data for company revenue
const companyRevenueData = [
  { name: 'Acme Corp', revenue: 120000 },
  { name: 'Globex Inc', revenue: 80000 },
  { name: 'Umbrella LLC', revenue: 45000 },
  { name: 'Soylent Corp', revenue: 90000 },
];

const HeadquartersAdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();

  const filteredCompanies = dummyCompanies.filter(company => {
    const matchesStatus = statusFilter === 'All' || company.status === statusFilter;
    const matchesSearch = searchQuery === '' || company.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="admin-layout" style={{ background: '#f4f6f8', minHeight: '100vh' }}>
      <Navbar />
      <div className="admin-main">
        <Sidebar />
        <div className="admin-content" style={{ padding: '2rem' }}>
          {/* Header */}
          <div style={{
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#fff',
            padding: '1rem 2rem',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Welcome, Headquarters Admin</h1>
              <p style={{ color: '#888', margin: 0 }}>Monitor and onboard corporate companies (Super Admins)</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button style={{
                background: '#1976d2', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}
              onClick={() => navigate('/Nefwayrideadmin/superuser')}
              >
                <FaPlus /> Add Company
              </button>
            </div>
          </div>

          {/* Stat Cards */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginBottom: '2.5rem'
          }}>
            {statCards.map((card, idx) => (
              <div
                key={idx}
                style={{
                  background: card.bg,
                  borderRadius: '16px',
                  padding: '2rem 1.5rem',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                  display: 'flex', alignItems: 'center', gap: '1.2rem',
                  border: `1.5px solid ${card.color}22`
                }}
              >
                <div style={{
                  background: card.color, color: '#fff', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24
                }}>
                  {card.icon}
                </div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: card.color }}>{card.value}</div>
                  <div style={{ color: '#555', fontWeight: 500 }}>{card.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            {/* Company Revenue Graph */}
            <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '1.5rem' }}>
              <h3 style={{ marginBottom: 16 }}>Company-wise Revenue</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={companyRevenueData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip formatter={value => `₹${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#1976d2" radius={[10, 10, 0, 0]} name="Revenue (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Activity Feed & Alerts */}
            <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h4 style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}><FaBell /> Activity Feed</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {activityFeed.map(item => (
                    <li key={item.id} style={{ marginBottom: 10, color: '#555', fontSize: '0.97rem' }}>
                      <span style={{ color: '#1976d2', fontWeight: 600 }}>{item.text}</span>
                      <span style={{ color: '#888', marginLeft: 8, fontSize: '0.85rem' }}>({item.time})</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}><FaBell /> Alerts</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ color: '#f44336', fontWeight: 600 }}>Umbrella LLC compliance issue detected</li>
                  <li style={{ color: '#ff9800', fontWeight: 600 }}>Globex Inc onboarding documents pending</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Companies Overview */}
          <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h3 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#222' }}>Companies Overview</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <FaSearch color="#888" style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{ padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: '8px', border: '1px solid #ddd', background: '#f9f9f9', width: '220px', outline: 'none' }}
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  style={{ padding: '0.6rem 2.5rem 0.6rem 1rem', borderRadius: '8px', border: '1px solid #ddd', background: '#f9f9f9', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f4f6f8' }}>
                    <th style={{ padding: '0.7rem', textAlign: 'left' }}>Company Name</th>
                    <th style={{ padding: '0.7rem', textAlign: 'left' }}>Super Admin</th>
                    <th style={{ padding: '0.7rem', textAlign: 'left' }}>Status</th>
                    <th style={{ padding: '0.7rem', textAlign: 'left' }}>Users</th>
                    <th style={{ padding: '0.7rem', textAlign: 'left' }}>Last Activity</th>
                    <th style={{ padding: '0.7rem', textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.length === 0 ? (
                    <tr><td colSpan={6} style={{ textAlign: 'center', color: '#888', padding: '2rem 0' }}>No companies found</td></tr>
                  ) : (
                    filteredCompanies.map(company => (
                      <tr key={company.id}>
                        <td style={{ padding: '0.7rem' }}>{company.name}</td>
                        <td style={{ padding: '0.7rem' }}>{company.superAdmin}</td>
                        <td style={{ padding: '0.7rem' }}>
                          <span style={{
                            padding: '0.4rem 1rem', borderRadius: '20px', color: '#fff',
                            background: company.status === 'Active' ? '#43a047' : company.status === 'Inactive' ? '#f44336' : '#ff9800',
                            fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap'
                          }}>{company.status}</span>
                        </td>
                        <td style={{ padding: '0.7rem' }}>{company.users}</td>
                        <td style={{ padding: '0.7rem' }}>{company.lastActivity}</td>
                        <td style={{ padding: '0.7rem', display: 'flex', gap: 8 }}>
                          <button style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.4rem 0.8rem', cursor: 'pointer' }} title="View"><FaEye /></button>
                          <button style={{ background: '#43a047', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.4rem 0.8rem', cursor: 'pointer' }} title="Message"><FaEnvelope /></button>
                          <button style={{ background: '#f44336', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.4rem 0.8rem', cursor: 'pointer' }} title="Suspend"><FaBan /></button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HeadquartersAdminDashboard;