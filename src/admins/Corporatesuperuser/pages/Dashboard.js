import React, { useState } from "react";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { FaUsers, FaUserTie, FaUserPlus, FaUserCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const dummyEmployees = [
    { id: 1, name: "John Doe", email: "john@company.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@company.com", status: "Pending" },
    { id: 3, name: "Alice Brown", email: "alice@company.com", status: "Active" },
    { id: 4, name: "Bob White", email: "bob@company.com", status: "Inactive" },
];
const dummyVendors = [
    { id: 1, name: "Acme Corp", contact: "acme@vendor.com", status: "Active" },
    { id: 2, name: "Globex Inc", contact: "globex@vendor.com", status: "Inactive" },
    { id: 3, name: "Umbrella LLC", contact: "umbrella@vendor.com", status: "Active" },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const userGrowthData = [
    { month: 'Jan', Employees: 10, Vendors: 5 },
    { month: 'Feb', Employees: 15, Vendors: 7 },
    { month: 'Mar', Employees: 20, Vendors: 10 },
    { month: 'Apr', Employees: 25, Vendors: 12 },
    { month: 'May', Employees: 30, Vendors: 15 },
];

const statusPieData = [
    { name: 'Active', value: dummyEmployees.filter(e => e.status === 'Active').length + dummyVendors.filter(v => v.status === 'Active').length },
    { name: 'Pending', value: dummyEmployees.filter(e => e.status === 'Pending').length },
    { name: 'Inactive', value: dummyEmployees.filter(e => e.status === 'Inactive').length + dummyVendors.filter(v => v.status === 'Inactive').length },
];

const Dashboard = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [userType, setUserType] = useState(null);
    const [tab, setTab] = useState('employees');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    // Filtered data
    const filteredEmployees = dummyEmployees.filter(emp =>
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase())
    );
    const filteredVendors = dummyVendors.filter(vendor =>
        vendor.name.toLowerCase().includes(search.toLowerCase()) ||
        vendor.contact.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="admin-layout" style={{ background: '#f4f6f8', minHeight: '100vh' }}>
            <Navbar />
            <div className="admin-main">
                <Sidebar />
                <div className="admin-content" style={{ padding: '2rem' }}>
                    {/* Header */}
                    <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 style={{ margin: 0 }}>Corporate Super Admin Dashboard</h1>
                            <p style={{ color: '#888' }}>Monitor, onboard, and manage employees and vendors</p>
                        </div>
                        <div>
                            <button 
                                style={{ marginRight: '1rem', background: '#1976d2', color: '#fff', border: 'none', padding: '0.7rem 1.2rem', borderRadius: '6px', fontWeight: 600 }}
                                onClick={() => navigate('/Corporatesuperuser/employee')}
                            >Onboard New Employee</button>
                            <button 
                                style={{ background: '#43a047', color: '#fff', border: 'none', padding: '0.7rem 1.2rem', borderRadius: '6px', fontWeight: 600 }}
                                onClick={() => navigate('/Corporatesuperuser/vendor')}
                            >Onboard New Vendor</button>
                        </div>
                    </div>

                    {/* Stat Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '2rem',
                        marginBottom: '2.5rem'
                    }}>
                        {[
                            {
                                icon: <FaUsers size={28} />,
                                label: 'Employees',
                                value: dummyEmployees.length,
                                color: '#1976d2',
                                bg: 'linear-gradient(135deg, #e3f0ff 0%, #f5faff 100%)'
                            },
                            {
                                icon: <FaUserTie size={28} />,
                                label: 'Vendors',
                                value: dummyVendors.length,
                                color: '#43a047',
                                bg: 'linear-gradient(135deg, #e8f5e9 0%, #f5fff8 100%)'
                            },
                            {
                                icon: <FaUserPlus size={28} />,
                                label: 'Pending Onboardings',
                                value: dummyEmployees.filter(e => e.status === 'Pending').length,
                                color: '#ff9800',
                                bg: 'linear-gradient(135deg, #fff3e0 0%, #fffaf5 100%)'
                            },
                            {
                                icon: <FaUserCheck size={28} />,
                                label: 'Active Users',
                                value: dummyEmployees.filter(e => e.status === 'Active').length + dummyVendors.filter(v => v.status === 'Active').length,
                                color: '#0088FE',
                                bg: 'linear-gradient(135deg, #e3f7ff 0%, #f5fcff 100%)'
                            }
                        ].map((card, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: card.bg,
                                    borderRadius: '16px',
                                    padding: '2rem 1.5rem',
                                    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.2rem',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    cursor: 'pointer',
                                    border: `1.5px solid ${card.color}22`
                                }}
                                onMouseOver={e => {
                                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                                    e.currentTarget.style.boxShadow = `0 8px 32px ${card.color}33`;
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.transform = '';
                                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)';
                                }}
                            >
                                <div style={{
                                    background: card.color,
                                    color: '#fff',
                                    borderRadius: '50%',
                                    width: 48,
                                    height: 48,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 24,
                                    boxShadow: `0 2px 8px ${card.color}33`
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

                    {/* Analytics/Reports */}
                    <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem' }}>
                        <div style={{ flex: 2, background: '#fff', borderRadius: '10px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                            <h3 style={{ marginBottom: 16 }}>User Growth (Last 5 Months)</h3>
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={userGrowthData}>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Employees" fill="#1976d2" radius={[6, 6, 0, 0]} />
                                    <Bar dataKey="Vendors" fill="#43a047" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ flex: 1, background: '#fff', borderRadius: '10px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                            <h3 style={{ marginBottom: 16 }}>User Status Distribution</h3>
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie data={statusPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                                        {statusPieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Tabbed User Management */}
                    <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '1.5rem' }}>
                        <div style={{ display: 'flex', borderBottom: '1px solid #eee', marginBottom: 16 }}>
                            <button onClick={() => setTab('employees')} style={{
                                border: 'none',
                                background: tab === 'employees' ? '#1976d2' : 'transparent',
                                color: tab === 'employees' ? '#fff' : '#1976d2',
                                padding: '0.7rem 1.5rem',
                                borderRadius: '8px 8px 0 0',
                                fontWeight: 600,
                                marginRight: 8,
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}>Employees</button>
                            <button onClick={() => setTab('vendors')} style={{
                                border: 'none',
                                background: tab === 'vendors' ? '#43a047' : 'transparent',
                                color: tab === 'vendors' ? '#fff' : '#43a047',
                                padding: '0.7rem 1.5rem',
                                borderRadius: '8px 8px 0 0',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}>Vendors</button>
                            <input
                                type="text"
                                placeholder={`Search ${tab === 'employees' ? 'employees' : 'vendors'}...`}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{ marginLeft: 'auto', padding: '0.5rem 1rem', borderRadius: 6, border: '1px solid #ddd', minWidth: 200 }}
                            />
                        </div>
                        {tab === 'employees' ? (
                            <table className="user-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#f4f6f8' }}>
                                        <th style={{ padding: '0.7rem', textAlign: 'left' }}>Name</th>
                                        <th style={{ padding: '0.7rem', textAlign: 'left' }}>Email</th>
                                        <th style={{ padding: '0.7rem', textAlign: 'left' }}>Status</th>
                                        <th style={{ padding: '0.7rem', textAlign: 'left' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEmployees.length === 0 ? (
                                        <tr><td colSpan={4} style={{ textAlign: 'center', padding: '1.5rem', color: '#888' }}>No employees found.</td></tr>
                                    ) : filteredEmployees.map(emp => (
                                        <tr key={emp.id} style={{ borderBottom: '1px solid #eee', transition: 'background 0.2s' }}>
                                            <td style={{ padding: '0.7rem' }}>{emp.name}</td>
                                            <td style={{ padding: '0.7rem' }}>{emp.email}</td>
                                            <td style={{ padding: '0.7rem' }}>{emp.status}</td>
                                            <td style={{ padding: '0.7rem' }}>
                                                <button onClick={() => { setSelectedUser(emp); setUserType('employee'); }} style={{ marginRight: 8, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '0.4rem 0.8rem', cursor: 'pointer' }}>View</button>
                                                <button style={{ marginRight: 8, background: '#ff9800', color: '#fff', border: 'none', borderRadius: 4, padding: '0.4rem 0.8rem', cursor: 'pointer' }}>Edit</button>
                                                <button style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 4, padding: '0.4rem 0.8rem', cursor: 'pointer' }}>Deactivate</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <table className="user-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#f4f6f8' }}>
                                        <th style={{ padding: '0.7rem', textAlign: 'left' }}>Name</th>
                                        <th style={{ padding: '0.7rem', textAlign: 'left' }}>Contact</th>
                                        <th style={{ padding: '0.7rem', textAlign: 'left' }}>Status</th>
                                        <th style={{ padding: '0.7rem', textAlign: 'left' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredVendors.length === 0 ? (
                                        <tr><td colSpan={4} style={{ textAlign: 'center', padding: '1.5rem', color: '#888' }}>No vendors found.</td></tr>
                                    ) : filteredVendors.map(vendor => (
                                        <tr key={vendor.id} style={{ borderBottom: '1px solid #eee', transition: 'background 0.2s' }}>
                                            <td style={{ padding: '0.7rem' }}>{vendor.name}</td>
                                            <td style={{ padding: '0.7rem' }}>{vendor.contact}</td>
                                            <td style={{ padding: '0.7rem' }}>{vendor.status}</td>
                                            <td style={{ padding: '0.7rem' }}>
                                                <button onClick={() => { setSelectedUser(vendor); setUserType('vendor'); }} style={{ marginRight: 8, background: '#43a047', color: '#fff', border: 'none', borderRadius: 4, padding: '0.4rem 0.8rem', cursor: 'pointer' }}>View</button>
                                                <button style={{ marginRight: 8, background: '#ff9800', color: '#fff', border: 'none', borderRadius: 4, padding: '0.4rem 0.8rem', cursor: 'pointer' }}>Edit</button>
                                                <button style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 4, padding: '0.4rem 0.8rem', cursor: 'pointer' }}>Deactivate</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Details Modal */}
                    {selectedUser && (
                        <div className="modal" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', minWidth: '350px', boxShadow: '0 4px 24px rgba(0,0,0,0.15)', position: 'relative' }}>
                                <button onClick={() => setSelectedUser(null)} style={{ position: 'absolute', top: 12, right: 12, background: 'transparent', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888' }}>&times;</button>
                                <h2 style={{ marginTop: 0 }}>{userType === 'employee' ? 'Employee' : 'Vendor'} Details</h2>
                                <div style={{ marginBottom: 16 }}>
                                    {userType === 'employee' ? (
                                        <>
                                            <div><strong>Name:</strong> {selectedUser.name}</div>
                                            <div><strong>Email:</strong> {selectedUser.email}</div>
                                            <div><strong>Status:</strong> {selectedUser.status}</div>
                                        </>
                                    ) : (
                                        <>
                                            <div><strong>Name:</strong> {selectedUser.name}</div>
                                            <div><strong>Contact:</strong> {selectedUser.contact}</div>
                                            <div><strong>Status:</strong> {selectedUser.status}</div>
                                        </>
                                    )}
                                </div>
                                <button style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '0.6rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Dashboard;
