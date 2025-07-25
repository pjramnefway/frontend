import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const accent = '#2563EB';
const accentLight = '#E5EDFB';
const softGray = '#F8FAFC';

const RideHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedRide, setSelectedRide] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Clean up on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  // Get today's date in YYYY-MM-DD format
  const todayStr = new Date().toISOString().slice(0, 10);

  // Dummy data for demonstration (mix of today and previous days)
  const rideHistory = [
    // Today rides
    {
      id: 1,
      driverName: 'Amit Singh',
      driverId: 'DRV001',
      escort: 'Ravi Kumar',
      cabNumber: 'KA-01-AB-1234',
      cabModel: 'Swift Dzire',
      passengerName: 'Priya Sharma',
      passengerId: 'EMP201',
      rideDate: todayStr,
      rideTime: '09:30 AM',
      duration: '20 mins',
      distance: '8.5 km',
      fare: 350,
      status: 'completed',
      rating: 4.5,
      pickupLocation: 'Sector 21, Gurgaon',
      dropLocation: 'DLF Cyber City',
      paymentMethod: 'Corporate Account',
    },
    {
      id: 2,
      driverName: 'Sunil Kumar',
      driverId: 'DRV002',
      escort: 'N/A',
      cabNumber: 'KA-16-CD-5678',
      cabModel: 'Honda City',
      passengerName: 'Rohit Verma',
      passengerId: 'EMP202',
      rideDate: todayStr,
      rideTime: '10:15 AM',
      duration: '35 mins',
      distance: '12.3 km',
      fare: 420,
      status: 'completed',
      rating: 4.8,
      pickupLocation: 'Noida City Center',
      dropLocation: 'Connaught Place',
      paymentMethod: 'Corporate Account',
    },
    {
      id: 3,
      driverName: 'Neha Sharma',
      driverId: 'DRV004',
      escort: 'N/A',
      cabNumber: 'KA-11-XY-7890',
      cabModel: 'Hyundai Xcent',
      passengerName: 'Asha Rani',
      passengerId: 'EMP204',
      rideDate: todayStr,
      rideTime: '12:00 PM',
      duration: '25 mins',
      distance: '10.1 km',
      fare: 300,
      status: 'ongoing',
      rating: 4.2,
      pickupLocation: 'MG Road',
      dropLocation: 'Airport',
      paymentMethod: 'Corporate Account',
    },
    // Previous days
    {
      id: 4,
      driverName: 'Ramesh Yadav',
      driverId: 'DRV003',
      escort: 'N/A',
      cabNumber: 'KA-26-EF-9012',
      cabModel: 'Maruti Ertiga',
      passengerName: 'Anjali Mehra',
      passengerId: 'EMP203',
      rideDate: '2024-06-29',
      rideTime: '11:00 AM',
      duration: '15 mins',
      distance: '6.2 km',
      fare: 0,
      status: 'cancelled',
      rating: null,
      pickupLocation: 'Saket',
      dropLocation: 'Gurgaon Udyog Vihar',
      paymentMethod: 'N/A',
    },
    {
      id: 5,
      driverName: 'Vikram Singh',
      driverId: 'DRV005',
      escort: 'Suman Joshi',
      cabNumber: 'KA-02-GH-3456',
      cabModel: 'Toyota Innova',
      passengerName: 'Multiple Employees',
      passengerId: 'EMP201-EMP210',
      rideDate: '2024-06-28',
      rideTime: '02:30 PM',
      duration: '35 mins',
      distance: '18.7 km',
      fare: 680,
      status: 'completed',
      rating: 4.2,
      pickupLocation: 'Airport Terminal 1',
      dropLocation: 'Hotel Grand Plaza',
      paymentMethod: 'Corporate Account',
      passengerList: [
        { name: 'Priya Sharma', id: 'EMP201' },
        { name: 'Rohit Verma', id: 'EMP202' },
        { name: 'Anjali Mehra', id: 'EMP203' },
        { name: 'Arun Gupta', id: 'EMP204' },
        { name: 'Sonal Jain', id: 'EMP205' },
        { name: 'Deepak Rao', id: 'EMP206' },
        { name: 'Meena Kumari', id: 'EMP207' },
        { name: 'Vikas Sharma', id: 'EMP208' },
        { name: 'Asha Rani', id: 'EMP209' },
        { name: 'Ravi Patel', id: 'EMP210' },
      ],
    },
    {
      id: 6,
      driverName: 'Rajesh Kumar',
      driverId: 'DRV006',
      escort: 'N/A',
      cabNumber: 'KA-03-IJ-7890',
      cabModel: 'Swift Dzire',
      passengerName: 'Arun Gupta',
      passengerId: 'EMP205',
      rideDate: '2024-06-27',
      rideTime: '08:45 AM',
      duration: '22 mins',
      distance: '9.1 km',
      fare: 380,
      status: 'completed',
      rating: 4.7,
      pickupLocation: 'Train Station',
      dropLocation: 'Office Building C',
      paymentMethod: 'Corporate Account',
    },
    {
      id: 7,
      driverName: 'Mohan Das',
      driverId: 'DRV007',
      escort: 'N/A',
      cabNumber: 'KA-04-KL-1111',
      cabModel: 'Honda Amaze',
      passengerName: 'Kavya Reddy',
      passengerId: 'EMP211',
      rideDate: '2024-06-26',
      rideTime: '07:30 AM',
      duration: '45 mins',
      distance: '15.2 km',
      fare: 520,
      status: 'completed',
      rating: 4.9,
      pickupLocation: 'Electronic City',
      dropLocation: 'Whitefield',
      paymentMethod: 'Corporate Account',
    },
  ];

  // Filter logic for All/Today
  const filteredRides = rideHistory.filter(ride => {
    const matchesSearch =
      ride.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.cabNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.passengerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ride.status === filterStatus;
    const matchesDate =
      filterType === 'all' ||
      (filterType === 'today' && ride.rideDate === todayStr);
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Styles
  const cardStyle = {
    width: '100%',
    maxWidth: '1200px',
    background: '#fff',
    borderRadius: '18px',
    boxShadow: '0 4px 24px 0 rgba(37, 99, 235, 0.10)',
    padding: '32px 24px 24px 24px',
    margin: '32px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    border: '1.5px solid #e5e7eb',
    boxSizing: 'border-box',
  };
  const headerRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '18px',
  };
  const pageTitleStyle = {
    color: accent,
    fontSize: '2.2rem',
    fontWeight: 700,
    letterSpacing: '0.5px',
    margin: 0,
  };
  const filterButtonsStyle = {
    display: 'flex',
    gap: '12px',
  };
  const filterButtonStyle = (active) => ({
    padding: '10px 22px',
    borderRadius: '8px',
    background: active ? accent : '#fff',
    color: active ? '#fff' : accent,
    border: `1.5px solid ${accent}`,
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s',
    boxShadow: active ? '0 2px 8px #e0e7ff' : 'none',
  });
  const controlsRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '18px',
    alignItems: 'center',
    marginBottom: '18px',
    width: '100%',
  };
  const searchInputStyle = {
    flex: 1,
    padding: '14px 18px',
    border: `1.5px solid ${accentLight}`,
    borderRadius: '10px',
    fontSize: '1.08rem',
    outline: 'none',
    background: '#f8fafc',
    boxShadow: '0 2px 8px #e0e7ff',
    minWidth: '320px',
  };
  const selectStyle = {
    padding: '14px 16px',
    border: `1.5px solid ${accentLight}`,
    borderRadius: '10px',
    fontSize: '1.08rem',
    backgroundColor: '#f8fafc',
    outline: 'none',
    boxShadow: '0 2px 8px #e0e7ff',
    minWidth: '160px',
    maxWidth: '180px',
  };
  const tableWrapperStyle = {
    width: '100%',
    maxWidth: '100%',
    overflowX: 'auto',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    background: '#fff',
    marginTop: '0',
    position: 'relative',
    boxSizing: 'border-box',
  };
  const tableStyle = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    fontSize: '1rem',
    textAlign: 'left',
    borderRadius: '12px',
  };
  const thStyle = {
    background: accent,
    padding: '18px 12px',
    textAlign: 'left',
    borderBottom: `2.5px solid ${accentLight}`,
    borderRight: `1.5px solid ${accentLight}`,
    fontWeight: 700,
    color: '#fff',
    fontSize: '1.12rem',
    letterSpacing: '0.5px',
    whiteSpace: 'nowrap',
  };
  const tdStyle = {
    padding: '16px 12px',
    borderBottom: `1.5px solid #e5e7eb`,
    borderRight: `1.5px solid #e5e7eb`,
    background: '#fff',
    fontSize: '1rem',
    color: '#222',
    fontWeight: 400,
    textAlign: 'left',
  };
  const lastTdStyle = { ...tdStyle, borderRight: 'none', textAlign: 'center' };
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(40,40,60,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  };
  const modalSectionContainer = {
    background: '#f8fafc',
    border: '1.5px solid #e5e7eb',
    borderLeft: `6px solid ${accent}`,
    borderRadius: '10px',
    padding: '18px 20px',
    marginBottom: '18px',
    boxShadow: '0 2px 8px #e0e7ff',
    transition: 'box-shadow 0.2s',
  };
  const modalSectionTitle = {
    fontWeight: 700,
    color: accent,
    fontSize: '1.13rem',
    marginBottom: 12,
    marginTop: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'linear-gradient(90deg, #e5edfb 0%, #f8fafc 100%)',
    padding: '8px 12px',
    borderRadius: '6px',
    boxShadow: '0 1px 2px #e0e7ff',
  };
  const modalRow = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
    fontSize: '1.04rem',
    padding: '2px 0',
  };
  const modalLabel = {
    fontWeight: 600,
    color: accent,
    minWidth: 140,
    letterSpacing: '0.2px',
  };
  const modalValue = {
    color: '#222',
    textAlign: 'right',
    flex: 1,
    marginLeft: 18,
    fontWeight: 500,
  };
  const closeBtnStyle = {
    position: 'absolute',
    top: 10,
    right: 18,
    background: 'transparent',
    border: 'none',
    color: accent,
    fontSize: '2rem',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 0 0 transparent',
    transition: 'box-shadow 0.2s',
  };
  const closeBtnHover = {
    boxShadow: '0 2px 8px #e0e7ff',
    color: '#e74c3c',
  };
  const modalStyle = {
    background: '#fff',
    borderRadius: '18px',
    padding: 0,
    minWidth: '480px',
    maxWidth: '700px',
    width: '95vw',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
    position: 'relative',
    fontFamily: 'Segoe UI, Arial, sans-serif',
    animation: 'fadeInModal 0.3s',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
  };
  const modalHeaderStyle = {
    flex: '0 0 auto',
    background: '#fff',
    borderTopLeftRadius: '18px',
    borderTopRightRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '28px 32px 18px 32px',
    borderBottom: '1.5px solid #e5e7eb',
    minHeight: '60px',
    position: 'sticky',
    top: 0,
    zIndex: 2,
  };
  const modalContentStyle = {
    flex: '1 1 auto',
    padding: '0 32px 32px 32px',
    overflowY: 'auto',
    maxHeight: 'calc(80vh - 78px)',
  };
  const dividerStyle = {
    border: 'none',
    borderTop: '1.5px solid #e5e7eb',
    margin: '18px 0',
  };
  // Add fade-in animation
  const modalAnimation = `@keyframes fadeInModal { from { opacity: 0; transform: scale(0.97);} to { opacity: 1; transform: scale(1);} }`;

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-main">
        <Sidebar />
        <div className="admin-content" style={{ flex: 1, display: 'flex', justifyContent: 'center', width: '100%', boxSizing: 'border-box', overflowX: 'hidden' }}>
          <div style={cardStyle}>
            {/* Header row: title left, filter buttons right */}
            <div style={headerRowStyle}>
              <h1 style={pageTitleStyle}>Ride History</h1>
              <div style={filterButtonsStyle}>
                <button
                  style={filterButtonStyle(filterType === 'all')}
                  onClick={() => setFilterType('all')}
                >
                  All
                </button>
                <button
                  style={filterButtonStyle(filterType === 'today')}
                  onClick={() => setFilterType('today')}
                >
                  Today
                </button>
              </div>
            </div>
            {/* Controls row: search and status filter */}
            <div style={controlsRowStyle}>
              <input
                type="text"
                placeholder="Search by cab, passenger, driver..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={searchInputStyle}
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={selectStyle}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            {/* Table */}
            <div style={tableWrapperStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Driver</th>
                    <th style={{ ...thStyle, minWidth: '180px' }}>Cab</th>
                    <th style={thStyle}>Passenger</th>
                    <th style={thStyle}>Status</th>
                    <th style={{ ...thStyle, borderRight: 'none' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRides.length > 0 ? (
                    filteredRides.map((ride) => (
                      <tr key={ride.id}>
                        <td style={tdStyle}>
                          <div style={{ fontWeight: 'bold', color: accent }}>{ride.driverName}</div>
                          <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>ID: {ride.driverId}</div>
                        </td>
                        <td style={tdStyle}>
                          <div style={{ fontWeight: 'bold' }}>{ride.cabNumber}</div>
                          <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>{ride.cabModel}</div>
                        </td>
                        <td style={tdStyle}>
                          <div style={{ fontWeight: 'bold' }}>{ride.passengerName}</div>
                          <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>ID: {ride.passengerId}</div>
                        </td>
                        <td style={tdStyle}>
                          <span style={{
                            padding: '6px 16px',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            color: '#fff',
                            background: ride.status === 'completed' ? '#22c55e' : ride.status === 'ongoing' ? accent : '#f59e42',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            border: 'none',
                            display: 'inline-block',
                          }}>
                            {ride.status}
                          </span>
                        </td>
                        <td style={lastTdStyle}>
                          <button
                            style={{
                              padding: '8px 14px',
                              borderRadius: '8px',
                              background: accent,
                              color: '#fff',
                              border: 'none',
                              fontWeight: 600,
                              cursor: 'pointer',
                              fontSize: '1.25rem',
                              boxShadow: '0 2px 8px #e0e7ff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            aria-label="View Details"
                            onClick={() => { setSelectedRide(ride); setShowModal(true); }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '48px', color: '#6c757d', fontSize: '1.1rem', background: '#fff', borderRadius: '0 0 16px 16px' }}>
                        No ride history found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* Modal for ride details */}
          {showModal && selectedRide && (
            <>
              <style>{modalAnimation}</style>
              <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
                <div style={modalStyle} onClick={e => e.stopPropagation()}>
                  {/* Sticky header */}
                  <div style={modalHeaderStyle}>
                    <h2 style={{ color: accent, fontWeight: 800, letterSpacing: '0.5px', fontSize: '1.6rem', margin: 0 }}>Ride Details</h2>
                    <button
                      style={closeBtnStyle}
                      onMouseOver={e => { e.target.style.boxShadow = closeBtnHover.boxShadow; e.target.style.color = closeBtnHover.color; }}
                      onMouseOut={e => { e.target.style.boxShadow = closeBtnStyle.boxShadow; e.target.style.color = closeBtnStyle.color; }}
                      onClick={() => setShowModal(false)}
                    >&times;</button>
                  </div>
                  {/* Scrollable content */}
                  <div style={modalContentStyle}>
                    {/* Driver Info */}
                    <div style={modalSectionContainer}>
                      <div style={modalSectionTitle}><span role="img" aria-label="driver">👨‍✈️</span>Driver Information</div>
                      <div style={modalRow}><span style={modalLabel}>Driver Name:</span><span style={modalValue}>{selectedRide.driverName}</span></div>
                      <div style={modalRow}><span style={modalLabel}>Driver ID:</span><span style={modalValue}>{selectedRide.driverId}</span></div>
                      <div style={modalRow}><span style={modalLabel}>Escort:</span><span style={modalValue}>{selectedRide.escort}</span></div>
                    </div>
                    <hr style={dividerStyle} />
                    {/* Ride Info */}
                    <div style={modalSectionContainer}>
                      <div style={modalSectionTitle}><span role="img" aria-label="ride">📝</span>Ride Information</div>
                      <div style={modalRow}><span style={modalLabel}>Date:</span><span style={modalValue}>{selectedRide.rideDate} {selectedRide.rideTime}</span></div>
                      <div style={modalRow}><span style={modalLabel}>Duration:</span><span style={modalValue}>{selectedRide.duration}</span></div>
                      <div style={modalRow}><span style={modalLabel}>Distance:</span><span style={modalValue}>{selectedRide.distance}</span></div>
                      <div style={modalRow}><span style={modalLabel}>Fare:</span><span style={modalValue}>₹{selectedRide.fare}</span></div>
                      <div style={modalRow}><span style={modalLabel}>Status:</span><span style={modalValue}>{selectedRide.status}</span></div>
                      <div style={modalRow}><span style={modalLabel}>Pickup Location:</span><span style={modalValue}>{selectedRide.pickupLocation}</span></div>
                      <div style={modalRow}><span style={modalLabel}>Drop Location:</span><span style={modalValue}>{selectedRide.dropLocation}</span></div>
                    </div>
                    <hr style={dividerStyle} />
                    {/* Passenger Info */}
                    <div style={modalSectionContainer}>
                      <div style={modalSectionTitle}><span role="img" aria-label="passenger">🧑‍💼</span>Passenger Information</div>
                      {selectedRide.passengerList && selectedRide.passengerList.length > 1 ? (
                        <div style={{ padding: '10px 0' }}>
                          <div style={{ fontWeight: 600, color: '#222', marginBottom: 8 }}>All Employees ({selectedRide.passengerList.length}):</div>
                          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f8fafc', borderRadius: 8, overflow: 'hidden', fontSize: '0.98rem' }}>
                            <thead>
                              <tr style={{ background: accentLight }}>
                                <th style={{ textAlign: 'left', padding: '8px 10px', color: accent, fontWeight: 700 }}>Name</th>
                                <th style={{ textAlign: 'left', padding: '8px 10px', color: accent, fontWeight: 700 }}>Employee ID</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedRide.passengerList.map((emp, idx) => (
                                <tr key={emp.id} style={{ background: idx % 2 === 0 ? '#fff' : accentLight }}>
                                  <td style={{ padding: '8px 10px', color: '#222' }}>{emp.name}</td>
                                  <td style={{ padding: '8px 10px', color: '#222' }}>{emp.id}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <>
                          <div style={modalRow}><span style={modalLabel}>Passenger Name:</span><span style={modalValue}>{selectedRide.passengerName}</span></div>
                          <div style={modalRow}><span style={modalLabel}>Passenger ID:</span><span style={modalValue}>{selectedRide.passengerId}</span></div>
                        </>
                      )}
                    </div>
                    <hr style={dividerStyle} />
                    {/* Cab Info */}
                    <div style={modalSectionContainer}>
                      <div style={modalSectionTitle}><span role="img" aria-label="cab">🚗</span>Cab Information</div>
                      <div style={modalRow}><span style={modalLabel}>Cab Number:</span><span style={modalValue}>{selectedRide.cabNumber}</span></div>
                      <div style={modalRow}><span style={modalLabel}>Cab Model:</span><span style={modalValue}>{selectedRide.cabModel}</span></div>
                      <div style={modalRow}><span style={modalLabel}>Rating:</span><span style={modalValue}>{selectedRide.rating ? selectedRide.rating : 'N/A'}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RideHistory;