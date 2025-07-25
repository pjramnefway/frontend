import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { Card, Button, Table, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { FaBuilding, FaCar, FaRupeeSign, FaStar, FaEye, FaArrowUp, FaArrowDown, FaInfoCircle, FaDownload, FaSearch } from 'react-icons/fa';

// Mock Data for different periods
const corporatesData = {
    'This Month': [
        { id: 1, name: 'Corp A', rides: 320, revenue: '₹80,000', rating: 4.7 },
        { id: 2, name: 'Corp B', rides: 210, revenue: '₹55,000', rating: 4.5 },
        { id: 3, name: 'Corp C', rides: 180, revenue: '₹40,000', rating: 4.6 },
    ],
    'This Week': [
        { id: 1, name: 'Corp A', rides: 70, revenue: '₹18,000', rating: 4.7 },
        { id: 2, name: 'Corp B', rides: 45, revenue: '₹12,000', rating: 4.5 },
        { id: 3, name: 'Corp C', rides: 38, revenue: '₹8,000', rating: 4.6 },
    ],
};

const corporateStatsData = {
    'This Month': {
        1: {
            kpis: [
                { label: 'Total Rides', value: 320 },
                { label: 'Total Revenue', value: '₹80,000' },
                { label: 'Active Vendors', value: 3 },
                { label: 'Avg. Rating', value: 4.7 },
            ],
            ridesOverTime: [
                { date: 'Week 1', rides: 80 },
                { date: 'Week 2', rides: 90 },
                { date: 'Week 3', rides: 70 },
                { date: 'Week 4', rides: 80 },
            ],
            rideStatus: [
                { name: 'Completed', value: 290 },
                { name: 'Cancelled', value: 20 },
                { name: 'Delayed', value: 10 },
            ],
            companyInfo: {
                name: 'Corp A',
                email: 'admin@corpa.com',
                contact: '+91 9876543210',
                address: '123, Business Park, Mumbai',
            },
            vendors: [
                { name: 'Vendor X', vehicles: 20, compliance: '98%' },
                { name: 'Vendor Y', vehicles: 12, compliance: '95%' },
                { name: 'Vendor Z', vehicles: 8, compliance: '97%' },
            ],
            recentRides: [
                { date: '2024-06-24', employee: 'Amit S.', status: 'Completed', fare: '₹350' },
                { date: '2024-06-23', employee: 'Priya R.', status: 'Completed', fare: '₹420' },
                { date: '2024-06-23', employee: 'John D.', status: 'Cancelled', fare: '-' },
                { date: '2024-06-22', employee: 'Sara K.', status: 'Completed', fare: '₹390' },
                { date: '2024-06-22', employee: 'Vikas P.', status: 'Delayed', fare: '₹410' },
            ],
        },
        2: {
            kpis: [
                { label: 'Total Rides', value: 210 },
                { label: 'Total Revenue', value: '₹55,000' },
                { label: 'Active Vendors', value: 2 },
                { label: 'Avg. Rating', value: 4.5 },
            ],
            ridesOverTime: [
                { date: 'Week 1', rides: 50 },
                { date: 'Week 2', rides: 60 },
                { date: 'Week 3', rides: 50 },
                { date: 'Week 4', rides: 50 },
            ],
            rideStatus: [
                { name: 'Completed', value: 180 },
                { name: 'Cancelled', value: 20 },
                { name: 'Delayed', value: 10 },
            ],
            companyInfo: {
                name: 'Corp B',
                email: 'admin@corpb.com',
                contact: '+91 9123456780',
                address: '456, Tech Valley, Bengaluru',
            },
            vendors: [
                { name: 'Vendor A', vehicles: 10, compliance: '96%' },
                { name: 'Vendor B', vehicles: 7, compliance: '94%' },
            ],
            recentRides: [
                { date: '2024-06-24', employee: 'Rohit M.', status: 'Completed', fare: '₹300' },
                { date: '2024-06-23', employee: 'Neha S.', status: 'Completed', fare: '₹380' },
                { date: '2024-06-23', employee: 'Samir T.', status: 'Completed', fare: '₹410' },
                { date: '2024-06-22', employee: 'Anjali P.', status: 'Cancelled', fare: '-' },
                { date: '2024-06-22', employee: 'Kiran L.', status: 'Completed', fare: '₹390' },
            ],
        },
        3: {
            kpis: [
                { label: 'Total Rides', value: 180 },
                { label: 'Total Revenue', value: '₹40,000' },
                { label: 'Active Vendors', value: 1 },
                { label: 'Avg. Rating', value: 4.6 },
            ],
            ridesOverTime: [
                { date: 'Week 1', rides: 40 },
                { date: 'Week 2', rides: 50 },
                { date: 'Week 3', rides: 40 },
                { date: 'Week 4', rides: 50 },
            ],
            rideStatus: [
                { name: 'Completed', value: 160 },
                { name: 'Cancelled', value: 10 },
                { name: 'Delayed', value: 10 },
            ],
            companyInfo: {
                name: 'Corp C',
                email: 'admin@corpc.com',
                contact: '+91 9988776655',
                address: '789, Corporate Hub, Pune',
            },
            vendors: [
                { name: 'Vendor Q', vehicles: 6, compliance: '97%' },
            ],
            recentRides: [
                { date: '2024-06-24', employee: 'Meera N.', status: 'Completed', fare: '₹320' },
                { date: '2024-06-23', employee: 'Ravi S.', status: 'Completed', fare: '₹410' },
                { date: '2024-06-23', employee: 'Sonia D.', status: 'Delayed', fare: '₹390' },
                { date: '2024-06-22', employee: 'Arjun V.', status: 'Completed', fare: '₹350' },
                { date: '2024-06-22', employee: 'Nisha K.', status: 'Cancelled', fare: '-' },
            ],
        },
    },
    'This Week': {
        1: {
            kpis: [
                { label: 'Total Rides', value: 70 },
                { label: 'Total Revenue', value: '₹18,000' },
                { label: 'Active Vendors', value: 3 },
                { label: 'Avg. Rating', value: 4.7 },
            ],
            ridesOverTime: [
                { date: 'Mon', rides: 10 },
                { date: 'Tue', rides: 12 },
                { date: 'Wed', rides: 8 },
                { date: 'Thu', rides: 15 },
                { date: 'Fri', rides: 10 },
                { date: 'Sat', rides: 8 },
                { date: 'Sun', rides: 7 },
            ],
            rideStatus: [
                { name: 'Completed', value: 65 },
                { name: 'Cancelled', value: 3 },
                { name: 'Delayed', value: 2 },
            ],
            companyInfo: {
                name: 'Corp A',
                email: 'admin@corpa.com',
                contact: '+91 9876543210',
                address: '123, Business Park, Mumbai',
            },
            vendors: [
                { name: 'Vendor X', vehicles: 20, compliance: '98%' },
                { name: 'Vendor Y', vehicles: 12, compliance: '95%' },
                { name: 'Vendor Z', vehicles: 8, compliance: '97%' },
            ],
            recentRides: [
                { date: '2024-06-24', employee: 'Amit S.', status: 'Completed', fare: '₹350' },
                { date: '2024-06-23', employee: 'Priya R.', status: 'Completed', fare: '₹420' },
                { date: '2024-06-23', employee: 'John D.', status: 'Cancelled', fare: '-' },
                { date: '2024-06-22', employee: 'Sara K.', status: 'Completed', fare: '₹390' },
                { date: '2024-06-22', employee: 'Vikas P.', status: 'Delayed', fare: '₹410' },
            ],
        },
        2: {
            kpis: [
                { label: 'Total Rides', value: 45 },
                { label: 'Total Revenue', value: '₹12,000' },
                { label: 'Active Vendors', value: 2 },
                { label: 'Avg. Rating', value: 4.5 },
            ],
            ridesOverTime: [
                { date: 'Mon', rides: 5 },
                { date: 'Tue', rides: 8 },
                { date: 'Wed', rides: 7 },
                { date: 'Thu', rides: 10 },
                { date: 'Fri', rides: 6 },
                { date: 'Sat', rides: 5 },
                { date: 'Sun', rides: 4 },
            ],
            rideStatus: [
                { name: 'Completed', value: 40 },
                { name: 'Cancelled', value: 3 },
                { name: 'Delayed', value: 2 },
            ],
            companyInfo: {
                name: 'Corp B',
                email: 'admin@corpb.com',
                contact: '+91 9123456780',
                address: '456, Tech Valley, Bengaluru',
            },
            vendors: [
                { name: 'Vendor A', vehicles: 10, compliance: '96%' },
                { name: 'Vendor B', vehicles: 7, compliance: '94%' },
            ],
            recentRides: [
                { date: '2024-06-24', employee: 'Rohit M.', status: 'Completed', fare: '₹300' },
                { date: '2024-06-23', employee: 'Neha S.', status: 'Completed', fare: '₹380' },
                { date: '2024-06-23', employee: 'Samir T.', status: 'Completed', fare: '₹410' },
                { date: '2024-06-22', employee: 'Anjali P.', status: 'Cancelled', fare: '-' },
                { date: '2024-06-22', employee: 'Kiran L.', status: 'Completed', fare: '₹390' },
            ],
        },
        3: {
            kpis: [
                { label: 'Total Rides', value: 38 },
                { label: 'Total Revenue', value: '₹8,000' },
                { label: 'Active Vendors', value: 1 },
                { label: 'Avg. Rating', value: 4.6 },
            ],
            ridesOverTime: [
                { date: 'Mon', rides: 4 },
                { date: 'Tue', rides: 6 },
                { date: 'Wed', rides: 5 },
                { date: 'Thu', rides: 7 },
                { date: 'Fri', rides: 6 },
                { date: 'Sat', rides: 5 },
                { date: 'Sun', rides: 5 },
            ],
            rideStatus: [
                { name: 'Completed', value: 35 },
                { name: 'Cancelled', value: 2 },
                { name: 'Delayed', value: 1 },
            ],
            companyInfo: {
                name: 'Corp C',
                email: 'admin@corpc.com',
                contact: '+91 9988776655',
                address: '789, Corporate Hub, Pune',
            },
            vendors: [
                { name: 'Vendor Q', vehicles: 6, compliance: '97%' },
            ],
            recentRides: [
                { date: '2024-06-24', employee: 'Meera N.', status: 'Completed', fare: '₹320' },
                { date: '2024-06-23', employee: 'Ravi S.', status: 'Completed', fare: '₹410' },
                { date: '2024-06-23', employee: 'Sonia D.', status: 'Delayed', fare: '₹390' },
                { date: '2024-06-22', employee: 'Arjun V.', status: 'Completed', fare: '₹350' },
                { date: '2024-06-22', employee: 'Nisha K.', status: 'Cancelled', fare: '-' },
            ],
        },
    },
};

function getInitials(name) {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
}

function Reports() {
    const [selectedCorporate, setSelectedCorporate] = useState(null);
    const [timeline, setTimeline] = useState('This Month');
    const [search, setSearch] = useState('');

    // Main Table View
    if (!selectedCorporate) {
        const corporates = corporatesData[timeline];
        // Calculate overall stats
        const totalCorporates = corporates.length;
        const totalRides = corporates.reduce((sum, c) => sum + c.rides, 0);
        const totalRevenue = corporates.reduce((sum, c) => sum + Number(c.revenue.replace(/[^\d]/g, '')), 0);
        const avgRating = corporates.length > 0 ? (corporates.reduce((sum, c) => sum + c.rating, 0) / corporates.length).toFixed(1) : '-';
        function formatCurrency(num) {
            return '₹' + num.toLocaleString('en-IN');
        }
        // Pie chart data for rides by corporate
        // const ridesPieData = corporates.map(c => ({ name: c.name, value: c.rides }));
        // Bar chart data for revenue by corporate
        const revenueBarData = corporates.map(c => ({ name: c.name, revenue: Number(c.revenue.replace(/[^\d]/g, '')) }));
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6699'];
        // Mock growth indicators
        const growth = {
            corporates: { percent: 5, up: true },
            rides: { percent: 12, up: true },
            revenue: { percent: 8, up: true },
            rating: { percent: -1, up: false },
        };
        // Search/filter state
        const filteredCorporates = corporates.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
        // Top performer
        const topCorporate = filteredCorporates.reduce((top, c) => c.rides > (top?.rides || 0) ? c : top, null);
        // Download CSV
        function downloadCSV() {
            const header = ['Name', 'Rides', 'Revenue', 'Avg. Rating'];
            const rows = filteredCorporates.map(c => [c.name, c.rides, c.revenue, c.rating]);
            const csv = [header, ...rows].map(r => r.join(',')).join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'corporate_summary.csv';
            a.click();
            URL.revokeObjectURL(url);
        }
        return (
            <div className="admin-layout">
                <Navbar />
                <div className="admin-main">
                    <Sidebar />
                    <div className="admin-content">
                        <div style={{ padding: '32px', background: '#f7f9fb', minHeight: '100vh', fontFamily: 'Inter, Arial, sans-serif' }}>
                            {/* Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
                                <h2 style={{ margin: 0, fontWeight: 700, fontSize: 28 }}>Corporate Users</h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <input
                                        type="text"
                                        placeholder="Search corporate..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 15, marginRight: 8 }}
                                    />
                                    <FaSearch color="#888" />
                                    <select value={timeline} onChange={e => setTimeline(e.target.value)} style={{ padding: 6, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 15, marginLeft: 12 }}>
                                        <option>This Month</option>
                                        <option>This Week</option>
                                    </select>
                                </div>
                            </div>
                            {/* Table Section */}
                            <Card style={{ minWidth: 320, padding: 16, borderRadius: 14, boxShadow: '0 2px 8px #e3e8ee', marginBottom: 8 }}>
                                <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    Corporates
                                    <OverlayTrigger placement="right" overlay={<Tooltip>List of all corporates for the selected period.</Tooltip>}>
                                        <span style={{ color: '#888', cursor: 'pointer' }}><FaInfoCircle /></span>
                                    </OverlayTrigger>
                                </div>
                                {filteredCorporates.length === 0 ? (
                                    <div style={{ color: '#888', padding: 24, textAlign: 'center' }}>No corporates found for this period.</div>
                                ) : (
                                    <Table striped bordered hover size="sm" style={{ background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Rides</th>
                                                <th>Revenue</th>
                                                <th>Avg. Rating</th>
                                                <th>View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredCorporates.map((corp) => (
                                                <tr key={corp.id} style={{ background: topCorporate && corp.id === topCorporate.id ? '#e6f7ff' : undefined, transition: 'background 0.2s' }}>
                                                    <td style={{ fontWeight: topCorporate && corp.id === topCorporate.id ? 600 : 400 }}>{corp.name}</td>
                                                    <td>{corp.rides}</td>
                                                    <td>{corp.revenue}</td>
                                                    <td>{corp.rating}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Button variant="link" style={{ padding: 0 }} onClick={() => setSelectedCorporate(corp)} tabIndex={0} aria-label={`View details for ${corp.name}`}>
                                                            <FaEye size={20} color="#0088FE" title="View Details" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Card>
                            {/* Overall Stats Section */}
                            <div style={{ fontWeight: 700, fontSize: 20, margin: '32px 0 16px 0', letterSpacing: '-0.5px' }}>Overall Stats</div>
                            {/* KPIs */}
                            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
                                <Card style={{ minWidth: 180, flex: 1, padding: 16, background: '#f0f4f8', borderRadius: 14, boxShadow: '0 1px 4px #e3e8ee', display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
                                    <FaBuilding size={28} color="#0088FE" />
                                    <div>
                                        <div style={{ fontSize: 14, color: '#888', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            Total Corporates
                                            <OverlayTrigger placement="top" overlay={<Tooltip>Total number of corporates in the selected period.</Tooltip>}>
                                                <span style={{ color: '#888', cursor: 'pointer' }}><FaInfoCircle size={13} /></span>
                                            </OverlayTrigger>
                                        </div>
                                        <div style={{ fontSize: 22, fontWeight: 600 }}>{totalCorporates}</div>
                                        <div style={{ fontSize: 13, color: growth.corporates.up ? '#16a34a' : '#dc2626', display: 'flex', alignItems: 'center', gap: 3 }}>
                                            {growth.corporates.up ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(growth.corporates.percent)}% from last period
                                        </div>
                                    </div>
                                </Card>
                                <Card style={{ minWidth: 180, flex: 1, padding: 16, background: '#f0f4f8', borderRadius: 14, boxShadow: '0 1px 4px #e3e8ee', display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
                                    <FaCar size={28} color="#00C49F" />
                                    <div>
                                        <div style={{ fontSize: 14, color: '#888', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            Total Rides
                                            <OverlayTrigger placement="top" overlay={<Tooltip>Total rides completed in the selected period.</Tooltip>}>
                                                <span style={{ color: '#888', cursor: 'pointer' }}><FaInfoCircle size={13} /></span>
                                            </OverlayTrigger>
                                        </div>
                                        <div style={{ fontSize: 22, fontWeight: 600 }}>{totalRides}</div>
                                        <div style={{ fontSize: 13, color: growth.rides.up ? '#16a34a' : '#dc2626', display: 'flex', alignItems: 'center', gap: 3 }}>
                                            {growth.rides.up ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(growth.rides.percent)}% from last period
                                        </div>
                                    </div>
                                </Card>
                                <Card style={{ minWidth: 180, flex: 1, padding: 16, background: '#f0f4f8', borderRadius: 14, boxShadow: '0 1px 4px #e3e8ee', display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
                                    <FaRupeeSign size={28} color="#FFBB28" />
                                    <div>
                                        <div style={{ fontSize: 14, color: '#888', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            Total Revenue
                                            <OverlayTrigger placement="top" overlay={<Tooltip>Total revenue from all completed rides.</Tooltip>}>
                                                <span style={{ color: '#888', cursor: 'pointer' }}><FaInfoCircle size={13} /></span>
                                            </OverlayTrigger>
                                        </div>
                                        <div style={{ fontSize: 22, fontWeight: 600 }}>{formatCurrency(totalRevenue)}</div>
                                        <div style={{ fontSize: 13, color: growth.revenue.up ? '#16a34a' : '#dc2626', display: 'flex', alignItems: 'center', gap: 3 }}>
                                            {growth.revenue.up ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(growth.revenue.percent)}% from last period
                                        </div>
                                    </div>
                                </Card>
                                <Card style={{ minWidth: 180, flex: 1, padding: 16, background: '#f0f4f8', borderRadius: 14, boxShadow: '0 1px 4px #e3e8ee', display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
                                    <FaStar size={28} color="#FF8042" />
                                    <div>
                                        <div style={{ fontSize: 14, color: '#888', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            Average Rating
                                            <OverlayTrigger placement="top" overlay={<Tooltip>Average rating of all corporates.</Tooltip>}>
                                                <span style={{ color: '#888', cursor: 'pointer' }}><FaInfoCircle size={13} /></span>
                                            </OverlayTrigger>
                                        </div>
                                        <div style={{ fontSize: 22, fontWeight: 600 }}>{avgRating}</div>
                                        <div style={{ fontSize: 13, color: growth.rating.up ? '#16a34a' : '#dc2626', display: 'flex', alignItems: 'center', gap: 3 }}>
                                            {growth.rating.up ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(growth.rating.percent)}% from last period
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            {/* Bar Chart and Table Section */}
                            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
                                <Card style={{ flex: 1, minWidth: 320, padding: 16, borderRadius: 14, boxShadow: '0 1px 4px #e3e8ee', marginBottom: 16 }}>
                                    <div style={{ fontWeight: 500, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                                        Revenue by Corporate
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Bar chart of revenue by each corporate.</Tooltip>}>
                                            <span style={{ color: '#888', cursor: 'pointer' }}><FaInfoCircle size={13} /></span>
                                        </OverlayTrigger>
                                    </div>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <BarChart data={revenueBarData}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip formatter={value => formatCurrency(value)} />
                                            <Bar dataKey="revenue" fill="#0088FE">
                                                {revenueBarData.map((entry, index) => (
                                                    <Cell key={`cell-bar-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Bar>
                                            <Legend />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Card>
                                <Card style={{ flex: 1, minWidth: 320, padding: 16, borderRadius: 14, boxShadow: '0 1px 4px #e3e8ee', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: 16 }}>
                                    <div style={{ fontWeight: 500, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                                        Corporate Summary
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Summary of rides, revenue, and rating for each corporate.</Tooltip>}>
                                            <span style={{ color: '#888', cursor: 'pointer' }}><FaInfoCircle size={13} /></span>
                                        </OverlayTrigger>
                                        <Button variant="outline-primary" size="sm" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }} onClick={downloadCSV} tabIndex={0} aria-label="Download CSV">
                                            <FaDownload /> Download CSV
                                        </Button>
                                    </div>
                                    <Table striped bordered hover size="sm" style={{ background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Rides</th>
                                                <th>Revenue</th>
                                                <th>Avg. Rating</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredCorporates.map((corp) => (
                                                <tr key={corp.id} style={{ background: topCorporate && corp.id === topCorporate.id ? '#e6f7ff' : undefined, transition: 'background 0.2s' }}>
                                                    <td style={{ fontWeight: topCorporate && corp.id === topCorporate.id ? 600 : 400 }}>{corp.name}</td>
                                                    <td>{corp.rides}</td>
                                                    <td>{corp.revenue}</td>
                                                    <td>{corp.rating}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Corporate Detail View
    const stats = corporateStatsData[timeline][selectedCorporate.id];
    const { companyInfo, vendors, recentRides, rideStatus } = stats;
    return (
        <div style={{ padding: '32px', background: '#f7f9fb', minHeight: '100vh' }}>
            {/* Header with avatar and back */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
                <Button variant="secondary" onClick={() => setSelectedCorporate(null)} style={{ marginRight: 20 }}>
                    ← Back
                </Button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: '#e3e8ee',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 22,
                        color: '#2d3a4a',
                    }}>{getInitials(companyInfo.name)}</div>
                    <div>
                        <h3 style={{ margin: 0 }}>{companyInfo.name}</h3>
                        <div style={{ color: '#888', fontSize: 15 }}>{companyInfo.email}</div>
                    </div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <select value={timeline} onChange={e => setTimeline(e.target.value)} style={{ padding: 6 }}>
                        <option>This Month</option>
                        <option>This Week</option>
                    </select>
                </div>
            </div>

            {/* Two-column layout */}
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
                {/* Left: KPIs and Company Info */}
                <div style={{ flex: 1, minWidth: 320 }}>
                    {/* KPI Cards */}
                    <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
                        {stats.kpis.map((kpi) => (
                            <Card key={kpi.label} style={{ minWidth: 140, flex: 1, padding: 14, boxShadow: '0 2px 8px #e3e8ee' }}>
                                <div style={{ fontSize: 13, color: '#888' }}>{kpi.label}</div>
                                <div style={{ fontSize: 22, fontWeight: 600 }}>{kpi.value}</div>
                            </Card>
                        ))}
                    </div>
                    {/* Company Info Card */}
                    <Card style={{ marginBottom: 24, padding: 16 }}>
                        <div style={{ fontWeight: 500, marginBottom: 8 }}>Company Info</div>
                        <div><b>Contact:</b> {companyInfo.contact}</div>
                        <div><b>Address:</b> {companyInfo.address}</div>
                    </Card>
                    {/* Vendor Table */}
                    <Card style={{ marginBottom: 24, padding: 16 }}>
                        <div style={{ fontWeight: 500, marginBottom: 8 }}>Vendors</div>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Active Vehicles</th>
                                    <th>Compliance %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendors.map((v, idx) => (
                                    <tr key={v.name}>
                                        <td>{v.name}</td>
                                        <td>{v.vehicles}</td>
                                        <td>{v.compliance}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                </div>
                {/* Right: Charts and Recent Rides */}
                <div style={{ flex: 2, minWidth: 340 }}>
                    {/* Rides Over Time Chart */}
                    <Card style={{ marginBottom: 24, padding: 16 }}>
                        <div style={{ fontWeight: 500, marginBottom: 8 }}>Rides Over Time</div>
                        <ResponsiveContainer width="100%" height={180}>
                            <LineChart data={stats.ridesOverTime}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="rides" stroke="#0088FE" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                    {/* Ride Status Breakdown */}
                    <Card style={{ marginBottom: 24, padding: 16 }}>
                        <div style={{ fontWeight: 500, marginBottom: 8 }}>Ride Status Breakdown</div>
                        <ResponsiveContainer width="100%" height={180}>
                            <BarChart data={rideStatus}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#00C49F" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                    {/* Recent Rides Table */}
                    <Card style={{ padding: 16 }}>
                        <div style={{ fontWeight: 500, marginBottom: 8 }}>Recent Rides</div>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Employee</th>
                                    <th>Status</th>
                                    <th>Fare</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentRides.map((ride, idx) => (
                                    <tr key={idx}>
                                        <td>{ride.date}</td>
                                        <td>{ride.employee}</td>
                                        <td>{ride.status}</td>
                                        <td>{ride.fare}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Reports;
