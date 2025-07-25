import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { FaMapMarkerAlt, FaCar, FaCheckCircle, FaSpinner, FaCalendarAlt, FaPlus, FaHistory, FaSearch, FaChevronDown, FaTimesCircle, FaUserTie, FaBuilding, FaClock, FaHashtag } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const dummyTrips = [
    { id: 'T001', employee: 'John Doe', vendor: 'Acme Corp', status: 'Ongoing', pickup: '123 Main St', dropoff: '456 Oak Ave', date: '2024-07-01', time: '10:00 AM', driverName: 'Driver A', vehicleNumber: 'KA01A1001' },
    { id: 'T002', employee: 'Jane Smith', vendor: 'Globex Inc', status: 'Ongoing', pickup: '789 Pine St', dropoff: '101 Maple Dr', date: '2024-07-01', time: '10:15 AM', driverName: 'Driver B', vehicleNumber: 'KA04F2353' },
    { id: 'T003', employee: 'Alice Brown', vendor: 'Umbrella LLC', status: 'Completed', pickup: '210 Elm St', dropoff: '321 Birch Rd', date: '2024-07-01', time: '09:30 AM', driverName: 'Driver C', vehicleNumber: 'KA20P3333'},
    { id: 'T004', employee: 'Bob White', vendor: 'Acme Corp', status: 'Completed', pickup: '432 Cedar Blvd', dropoff: '543 Spruce Ln', date: '2024-07-01', time: '11:00 AM', driverName: 'Driver D', vehicleNumber: 'KA23OD1212'},
    { id: 'T005', employee: 'Charlie Green', vendor: 'Soylent Corp', status: 'Ongoing', pickup: '654 Willow Way', dropoff: '765 Aspen Ct', date: '2024-07-01', time: '10:30 AM', driverName: 'Driver E', vehicleNumber: 'KA32AC7272'},
    { id: 'T006', employee: 'David Black', vendor: 'Wayne Ent.', status: 'Cancelled', pickup: '876 Gotham St', dropoff: '100 Batcave', date: '2024-07-02', time: '12:00 PM', driverName: 'Driver F', vehicleNumber: 'KA01DARK' },
];

const tripDataByDay = [
    { day: 'Mon', trips: 4 },
    { day: 'Tue', trips: 7 },
    { day: 'Wed', trips: 5 },
    { day: 'Thu', trips: 8 },
    { day: 'Fri', trips: 6 },
    { day: 'Sat', trips: 9 },
    { day: 'Sun', trips: 5 },
];

const statusColors = {
    Ongoing: '#ff9800',
    Completed: '#43a047',
    Cancelled: '#f44336',
    Scheduled: '#1976d2',
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #ddd',
                padding: '10px 15px',
                borderRadius: '8px',
                boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                color: '#333'
            }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{`${label}`}</p>
                <p style={{ margin: '5px 0 0', color: '#1976d2' }}>{`Trips: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

// Dummy data for drivers
const dummyDrivers = [
    { id: 'D001', name: 'Driver A', status: 'Active', contact: '9876543210', vehicle: 'KA01A1001' },
    { id: 'D002', name: 'Driver B', status: 'Inactive', contact: '9876543211', vehicle: 'KA04F2353' },
    { id: 'D003', name: 'Driver C', status: 'Active', contact: '9876543212', vehicle: 'KA20P3333' },
    { id: 'D004', name: 'Driver D', status: 'Inactive', contact: '9876543213', vehicle: 'KA23OD1212' },
    { id: 'D005', name: 'Driver E', status: 'Active', contact: '9876543214', vehicle: 'KA32AC7272' },
];

// Dummy data for vehicles
const dummyVehicles = [
    { id: 'V001', number: 'KA01A1001', type: 'Sedan', assignedDriver: 'Driver A', status: 'Active' },
    { id: 'V002', number: 'KA04F2353', type: 'SUV', assignedDriver: 'Driver B', status: 'Inactive' },
    { id: 'V003', number: 'KA20P3333', type: 'Hatchback', assignedDriver: 'Driver C', status: 'Active' },
    { id: 'V004', number: 'KA23OD1212', type: 'Sedan', assignedDriver: 'Driver D', status: 'Inactive' },
    { id: 'V005', number: 'KA32AC7272', type: 'SUV', assignedDriver: 'Driver E', status: 'Active' },
];

const CorporateAdminDashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('Ongoing');
    const navigate = useNavigate();

    const totalTripsToday = dummyTrips.length;
    const ongoingTrips = dummyTrips.filter(t => t.status === 'Ongoing').length;
    const completedTrips = dummyTrips.filter(t => t.status === 'Completed').length;
    const cancelledTrips = dummyTrips.filter(t => t.status === 'Cancelled').length;

    const filteredTrips = dummyTrips.filter(trip => {
        const matchesStatus = statusFilter === 'All' || trip.status === statusFilter;
        
        const matchesSearch = searchQuery === '' || Object.values(trip).some(val => 
            String(val).toLowerCase().includes(searchQuery.toLowerCase())
        );

        return matchesStatus && matchesSearch;
    });

    // Stat calculations for vendor admin
    const totalDrivers = dummyDrivers.length;
    const activeDrivers = dummyDrivers.filter(d => d.status === 'Active').length;
    const inactiveDrivers = dummyDrivers.filter(d => d.status === 'Inactive').length;
    const assignedRides = dummyTrips.filter(t => t.status === 'Ongoing' || t.status === 'Scheduled').length;
    const pendingRides = dummyTrips.filter(t => t.status === 'Pending').length;

    const statCards = [
        {
            icon: <FaUserTie size={28} />, label: 'Total Drivers', value: totalDrivers, color: '#1976d2', bg: 'linear-gradient(135deg, #e3f0ff 0%, #f5faff 100%)'
        },
        {
            icon: <FaUserTie size={28} />, label: 'Active / Inactive Drivers', value: `${activeDrivers} / ${inactiveDrivers}`, color: '#43a047', bg: 'linear-gradient(135deg, #e8f5e9 0%, #f5fff8 100%)'
        },
        {
            icon: <FaCar size={28} />, label: 'Assigned Rides', value: assignedRides, color: '#1976d2', bg: 'linear-gradient(135deg, #e3f0ff 0%, #f5faff 100%)'
        },
        {
            icon: <FaSpinner size={28} />, label: 'Pending Rides', value: pendingRides, color: '#ff9800', bg: 'linear-gradient(135deg, #fff3e0 0%, #fffaf5 100%)'
        },
    ];

    const filterInputStyle = {
        padding: '0.6rem 1rem 0.6rem 2.5rem',
        borderRadius: '8px',
        border: '1px solid #ddd',
        background: '#f9f9f9',
        width: '220px',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        outline: 'none'
    };
    
    const filterSelectStyle = {
        ...filterInputStyle,
        padding: '0.6rem 2.5rem 0.6rem 1rem',
        appearance: 'none',
        cursor: 'pointer'
    };

    const rowStyle = {
        borderBottom: '1px solid #eee',
        transition: 'background-color 0.2s ease-in-out'
    };

    const hoverStyle = {
        backgroundColor: '#f5faff'
    };

    const cellStyle = {
        padding: '1rem',
        color: '#555',
    };

    const noWrapCellStyle = {
        ...cellStyle,
        whiteSpace: 'nowrap'
    };

    const truncatingCellStyle = {
        ...noWrapCellStyle,
        maxWidth: '150px',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    };

    const headerCellStyle = {
        padding: '1rem',
        textAlign: 'left',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        color: '#555',
        fontSize: '0.8rem',
        whiteSpace: 'nowrap'
    };

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
                            <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Welcome, Vendor Admin</h1>
                            <div style={{ color: '#888', fontSize: '1rem', marginTop: 4 }}>Manage drivers, vehicles, and rides efficiently</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <button style={{ 
                                background: 'linear-gradient(90deg, #1976d2 60%, #43a047 100%)',
                                color: '#fff',
                                border: 'none',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '8px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '1rem',
                                boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)'
                            }}
                            onClick={() => navigate('/Vendoruser/driver-vehicle-onboarding')}
                            >
                                <FaUserTie /> <FaCar /> Onboard Driver & Vehicle
                            </button>
                            <button style={{ 
                                background: '#ff9800',
                                color: '#fff',
                                border: 'none',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '8px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                            onClick={() => navigate('/Vendoruser/assign-ride')}
                            >
                                <FaPlus /> Assign Ride
                            </button>
                            <button style={{ 
                                background: '#1976d2',
                                color: '#fff',
                                border: 'none',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '8px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                            onClick={() => navigate('/Vendoruser/ridehistory')}
                            >
                                <FaHistory /> Ride History
                            </button>
                        </div>
                    </div>

                    {/* Stat Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '2rem',
                        marginBottom: '2.5rem'
                    }}>
                        {statCards.map((card, idx) => (
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

                    {/* Main Content: Graph and Map side-by-side, then rides list below */}
                    <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                        {/* Graph */}
                        <div style={{ flex: 2, background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '1.5rem' }}>
                            <h3 style={{ marginBottom: 16 }}>Total Rides Overview</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart 
                                    data={tripDataByDay}
                                    margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                                >
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#1976d2" stopOpacity={0.2}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                                    <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(25, 118, 210, 0.1)' }} />
                                    <Legend />
                                    <Bar dataKey="trips" fill="url(#colorUv)" radius={[10, 10, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Map */}
                        <div style={{ flex: 1, background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
                            <FaMapMarkerAlt size={50} color="#1976d2" />
                            <h4 style={{ marginTop: '1rem', color: '#555' }}>Live Driver Map</h4>
                            <p style={{ color: '#888', textAlign: 'center', fontSize: '0.9rem' }}>
                                This is a placeholder for the live map view of active drivers.
                            </p>
                            <button style={{ 
                                marginTop: '1rem',
                                background: '#1976d2',
                                color: '#fff',
                                border: 'none',
                                padding: '0.6rem 1.2rem',
                                borderRadius: '6px',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}>
                                View Full Map
                            </button>
                        </div>
                    </div>
                    {/* Rides List below, full width */}
                    <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Header and Filters Row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0 }}>
                            <h3 style={{ margin: 0 }}>Rides List</h3>
                            {/* Filter Section */}
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ position: 'relative' }}>
                                    <FaSearch color="#888" style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)' }} />
                                    <input
                                        type="text"
                                        placeholder="Search rides..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        style={{
                                            padding: '0.6rem 1rem 0.6rem 2.5rem',
                                            borderRadius: '8px',
                                            border: '1px solid #ddd',
                                            background: '#f9f9f9',
                                            width: '220px',
                                            transition: 'border-color 0.2s, box-shadow 0.2s',
                                            outline: 'none'
                                        }}
                                        onFocus={e => { e.target.style.borderColor = '#1976d2'; e.target.style.boxShadow = '0 0 0 3px rgba(25, 118, 210, 0.1)'; }}
                                        onBlur={e => { e.target.style.borderColor = '#ddd'; e.target.style.boxShadow = 'none'; }}
                                    />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <select
                                        value={statusFilter}
                                        onChange={e => setStatusFilter(e.target.value)}
                                        style={{
                                            padding: '0.6rem 2.5rem 0.6rem 1rem',
                                            borderRadius: '8px',
                                            border: '1px solid #ddd',
                                            background: '#f9f9f9',
                                            width: '180px',
                                            appearance: 'none',
                                            cursor: 'pointer',
                                            outline: 'none',
                                            transition: 'border-color 0.2s, box-shadow 0.2s'
                                        }}
                                        onFocus={e => { e.target.style.borderColor = '#1976d2'; e.target.style.boxShadow = '0 0 0 3px rgba(25, 118, 210, 0.1)'; }}
                                        onBlur={e => { e.target.style.borderColor = '#ddd'; e.target.style.boxShadow = 'none'; }}
                                    >
                                        <option value="All">All Statuses</option>
                                        <option value="Ongoing">Ongoing</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                    <FaChevronDown color="#888" style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                </div>
                            </div>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={headerCellStyle}>Trip ID</th>
                                    <th style={headerCellStyle}>Employee</th>
                                    <th style={headerCellStyle}>Status</th>
                                    <th style={headerCellStyle}>Pickup</th>
                                    <th style={headerCellStyle}>Dropoff</th>
                                    <th style={headerCellStyle}>Driver</th>
                                    <th style={headerCellStyle}>Vehicle No.</th>
                                    <th style={headerCellStyle}>Date</th>
                                    <th style={headerCellStyle}>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTrips.length === 0 ? (
                                    <tr><td colSpan={9} style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>No rides found</td></tr>
                                ) : (
                                    filteredTrips.map(trip => (
                                        <tr key={trip.id} style={rowStyle}>
                                            <td style={cellStyle}>{trip.id}</td>
                                            <td style={cellStyle}>{trip.employee}</td>
                                            <td style={{ ...cellStyle, color: statusColors[trip.status] || '#555', fontWeight: 600 }}>{trip.status}</td>
                                            <td style={cellStyle}>{trip.pickup}</td>
                                            <td style={cellStyle}>{trip.dropoff}</td>
                                            <td style={cellStyle}>{trip.driverName}</td>
                                            <td style={cellStyle}>{trip.vehicleNumber}</td>
                                            <td style={cellStyle}>{trip.date}</td>
                                            <td style={cellStyle}>{trip.time}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        {filteredTrips.length > 0 && (
                            <button style={{
                                alignSelf: 'center',
                                marginTop: '1rem',
                                background: 'transparent',
                                border: '1.5px solid #1976d2',
                                padding: '0.6rem 1.6rem',
                                borderRadius: '8px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                color: '#1976d2',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={e => {e.currentTarget.style.backgroundColor = '#1976d2'; e.currentTarget.style.color = '#fff'}}
                            onMouseOut={e => {e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1976d2'}}
                            onClick={() => navigate('/Vendoruser/ridehistory')}
                            >
                                View More
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default CorporateAdminDashboard;