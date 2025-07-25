import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaUserTie, FaUser, FaCar, FaMapMarkerAlt } from 'react-icons/fa';
import L from 'leaflet';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

// Fix default icon issue with leaflet in React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow });
L.Marker.prototype.options.icon = DefaultIcon;

const mockEmployees = [
  {
    id: 1,
    name: 'Amit Kumar',
    status: 'On Trip',
    vehicle: 'Sedan #1',
    position: [28.6139, 77.2090], // Delhi - Connaught Place
    route: [
      [28.6139, 77.2090], // Connaught Place
      [28.6304, 77.2177], // India Gate
      [28.6562, 77.2410], // Red Fort
    ],
  },
  {
    id: 2,
    name: 'Priya Sharma',
    status: 'Idle',
    vehicle: 'SUV #2',
    position: [28.5273, 77.2166], // Delhi - Hauz Khas
    route: [],
  },
];

const mockDrivers = [
  {
    id: 1,
    name: 'Rajesh Singh',
    status: 'On Trip',
    vehicle: 'Van #1',
    position: [28.7041, 77.1025], // Delhi - Rohini
    route: [
      [28.7041, 77.1025], // Rohini
      [28.6790, 77.0697], // Pitampura
      [28.6600, 77.1500], // Karol Bagh
    ],
  },
  {
    id: 2,
    name: 'Suresh Verma',
    status: 'Idle',
    vehicle: 'Van #2',
    position: [28.5828, 77.3188], // Noida
    route: [],
  },
];

const statusColors = {
  'On Trip': '#43a047',
  'Idle': '#888',
};

const Tracking = () => {
  const [userType, setUserType] = useState('employee');
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');

  const users = userType === 'employee' ? mockEmployees : mockDrivers;
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  const selectedUser = users.find(u => u.id === selectedId) || filteredUsers[0];

  return (
    <div className="admin-layout" style={{ background: '#f4f6f8', minHeight: '100vh' }}>
      <Navbar />
      <div className="admin-main">
        <Sidebar />
        <div className="admin-content" style={{ padding: 0, paddingTop: '2rem', marginLeft: 300 }}>
          {/* --- Main Tracking Content Start --- */}
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '2rem 1rem' }}>
            {/* Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
              <button
                onClick={() => setUserType('employee')}
                style={{
                  background: userType === 'employee' ? '#1976d2' : '#fff',
                  color: userType === 'employee' ? '#fff' : '#1976d2',
                  border: '1px solid #1976d2',
                  borderRadius: '8px 0 0 8px',
                  padding: '0.7rem 2rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 16,
                  outline: 'none',
                  transition: 'background 0.2s',
                }}
              >
                <FaUserTie style={{ marginRight: 8 }} /> Employee
              </button>
              <button
                onClick={() => setUserType('driver')}
                style={{
                  background: userType === 'driver' ? '#43a047' : '#fff',
                  color: userType === 'driver' ? '#fff' : '#43a047',
                  border: '1px solid #43a047',
                  borderRadius: '0 8px 8px 0',
                  padding: '0.7rem 2rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 16,
                  outline: 'none',
                  transition: 'background 0.2s',
                }}
              >
                <FaUser style={{ marginRight: 8 }} /> Driver
              </button>
              <input
                type="text"
                placeholder={`Search ${userType}...`}
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ marginLeft: 'auto', padding: '0.6rem 1rem', borderRadius: 6, border: '1px solid #ddd', minWidth: 220 }}
              />
            </div>

            {/* Main Layout */}
            <div style={{ display: 'flex', gap: 32, minHeight: 600 }}>
              {/* List */}
              <div style={{ flex: 1, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 24, overflowY: 'auto', maxHeight: 700 }}>
                <h2 style={{ marginTop: 0, marginBottom: 24 }}>{userType === 'employee' ? 'Employees' : 'Drivers'} List</h2>
                {filteredUsers.length === 0 ? (
                  <div style={{ color: '#888', textAlign: 'center', marginTop: 48 }}>No {userType}s found.</div>
                ) : filteredUsers.map(user => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedId(user.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: selectedUser && user.id === selectedUser.id ? '#e3f2fd' : '#f9f9f9',
                      borderRadius: 8,
                      padding: '1rem',
                      marginBottom: 16,
                      boxShadow: user.id === selectedId ? '0 2px 8px rgba(25,118,210,0.08)' : 'none',
                      cursor: 'pointer',
                      border: user.id === selectedId ? '2px solid #1976d2' : '1px solid #eee',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ marginRight: 16 }}>
                      <FaCar size={28} color={userType === 'employee' ? '#1976d2' : '#43a047'} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 18 }}>{user.name}</div>
                      <div style={{ color: '#888', fontSize: 14 }}>{user.vehicle}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{
                        background: statusColors[user.status],
                        color: '#fff',
                        borderRadius: 6,
                        padding: '0.3rem 0.8rem',
                        fontWeight: 600,
                        fontSize: 13,
                        marginRight: 12,
                      }}>{user.status}</span>
                      <FaMapMarkerAlt color="#1976d2" size={20} />
                    </div>
                  </div>
                ))}
                {/* Status Legend */}
                <div style={{ marginTop: 32, display: 'flex', gap: 24, alignItems: 'center', color: '#888', fontSize: 14 }}>
                  <span><span style={{ display: 'inline-block', width: 14, height: 14, background: '#43a047', borderRadius: 3, marginRight: 6 }}></span> On Trip</span>
                  <span><span style={{ display: 'inline-block', width: 14, height: 14, background: '#888', borderRadius: 3, marginRight: 6 }}></span> Idle</span>
                </div>
              </div>

              {/* Map */}
              <div style={{ flex: 2, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 0, minHeight: 600, position: 'relative' }}>
                <MapContainer
                  center={selectedUser ? selectedUser.position : [28.6139, 77.2090]}
                  zoom={12}
                  style={{ height: 600, width: '100%', borderRadius: 12 }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {filteredUsers.map(user => (
                    <Marker key={user.id} position={user.position}>
                      <Popup>
                        <div style={{ fontWeight: 700 }}>{user.name}</div>
                        <div style={{ color: '#888', fontSize: 13 }}>{user.vehicle}</div>
                        <div>Status: <span style={{ color: statusColors[user.status] }}>{user.status}</span></div>
                      </Popup>
                    </Marker>
                  ))}
                  {/* Show route for selected user */}
                  {selectedUser && selectedUser.route && selectedUser.route.length > 1 && (
                    <Polyline positions={selectedUser.route} color="#1976d2" weight={5} />
                  )}
                </MapContainer>
                {/* Loading/Empty State (optional) */}
                {filteredUsers.length === 0 && (
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 20, background: 'rgba(255,255,255,0.7)', borderRadius: 12 }}>
                    No locations to display.
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* --- Main Tracking Content End --- */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tracking;
