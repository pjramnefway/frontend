import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Responsive styles for RideHistory (mirroring Assignride.js)
const responsiveStyles = `
@media (max-width: 1200px) {
  .ridehistory-container { max-width: 98vw !important; padding: 18px !important; }
}
@media (max-width: 900px) {
  .ridehistory-container { max-width: 100vw !important; padding: 8px !important; }
  .ridehistory-table th, .ridehistory-table td { font-size: 13px !important; padding: 7px 4px !important; }
  .ridehistory-filterbar { flex-direction: column !important; gap: 6px !important; }
}
@media (max-width: 700px) {
  .ridehistory-container { margin: 0 !important; border-radius: 0 !important; }
  .ridehistory-table th, .ridehistory-table td { font-size: 12px !important; }
}
`;

const TripManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('today');
  const [hoveredRow, setHoveredRow] = useState(null);

  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;

  // Mock data for employee trips
  const [trips] = useState([
    // --- Today's trips (dummy data) ---
    {
      id: 201,
      employeeName: 'Priya Sharma',
      employeeId: 'EMP201',
      tripDate: todayStr,
      pickupLocation: 'Sector 21, Gurgaon',
      dropLocation: 'DLF Cyber City',
      status: 'ongoing',
      driverName: 'Amit Singh',
      vehicleNumber: 'DL-01-AB-1234',
      fare: 350,
      duration: '20 mins',
      vendor: 'Blue Cabs'
    },
    {
      id: 202,
      employeeName: 'Rohit Verma',
      employeeId: 'EMP202',
      tripDate: todayStr,
      pickupLocation: 'Noida City Center',
      dropLocation: 'Connaught Place',
      status: 'completed',
      driverName: 'Sunil Kumar',
      vehicleNumber: 'UP-16-CD-5678',
      fare: 420,
      duration: '35 mins',
      vendor: 'Metro Rides'
    },
    {
      id: 203,
      employeeName: 'Anjali Mehra',
      employeeId: 'EMP203',
      tripDate: todayStr,
      pickupLocation: 'Saket',
      dropLocation: 'Gurgaon Udyog Vihar',
      status: 'cancelled',
      driverName: 'Rakesh Yadav',
      vehicleNumber: 'HR-26-EF-9012',
      fare: 0,
      duration: '-',
      vendor: 'City Travels'
    },
    // --- Previous trips (existing dummy data) ---
    {
      id: 1,
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      tripDate: '2024-01-15',
      pickupLocation: 'Office Building A',
      dropLocation: 'Client Meeting Center',
      status: 'completed',
      driverName: 'Mike Johnson',
      vehicleNumber: 'KA-01-AB-1234',
      fare: 450,
      duration: '25 mins',
      vendor: 'City Travels'
    },
    {
      id: 2,
      employeeName: 'Sarah Wilson',
      employeeId: 'EMP002',
      tripDate: '2024-01-15',
      pickupLocation: 'Home Address',
      dropLocation: 'Office Building B',
      status: 'ongoing',
      driverName: 'David Brown',
      vehicleNumber: 'KA-02-CD-5678',
      fare: 320,
      duration: '18 mins',
      vendor: 'Metro Cabs'
    },
    {
      id: 3,
      employeeName: 'Michael Chen',
      employeeId: 'EMP003',
      tripDate: '2024-01-14',
      pickupLocation: 'Airport Terminal 1',
      dropLocation: 'Hotel Grand Plaza',
      status: 'completed',
      driverName: 'Lisa Anderson',
      vehicleNumber: 'KA-03-EF-9012',
      fare: 680,
      duration: '35 mins',
      vendor: 'Urban Rides'
    },
    {
      id: 4,
      employeeName: 'Emily Davis',
      employeeId: 'EMP004',
      tripDate: '2024-01-14',
      pickupLocation: 'Shopping Mall',
      dropLocation: 'Residential Complex',
      status: 'cancelled',
      driverName: 'Robert Wilson',
      vehicleNumber: 'KA-04-GH-3456',
      fare: 280,
      duration: '15 mins',
      vendor: 'City Travels'
    },
    {
      id: 5,
      employeeName: 'Alex Thompson',
      employeeId: 'EMP005',
      tripDate: '2024-01-13',
      pickupLocation: 'Train Station',
      dropLocation: 'Office Building C',
      status: 'completed',
      driverName: 'Jennifer Lee',
      vehicleNumber: 'KA-05-IJ-7890',
      fare: 380,
      duration: '22 mins',
      vendor: 'Metro Cabs'
    }
  ]);

  // Filter trips based on search term and status
  const filteredTrips = trips.filter(trip => {
    const matchesSearch =
      trip.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || trip.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Filter trips for tabs
  const todaysTrips = filteredTrips.filter(trip => trip.tripDate === todayStr);
  const otherTrips = filteredTrips.filter(trip => trip.tripDate !== todayStr);

  // Styles (mirroring Assignride.js)
  const styles = {
    container: {
      maxWidth: 1400,
      width: '100%',
      margin: '40px auto',
      padding: 36,
      background: 'linear-gradient(120deg, #f9fafb 60%, #e3eafc 100%)',
      borderRadius: 18,
      boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      overflow: 'visible',
      minWidth: 320,
      boxSizing: 'border-box',
      position: 'relative',
      transition: 'box-shadow 0.2s',
    },
    h1: {
      fontWeight: 700,
      color: '#2563eb',
      fontSize: 38,
      marginBottom: 0,
      letterSpacing: '0.5px',
      textAlign: 'left',
      minWidth: '250px',
    },
    tableWrapper: {
      width: '100%',
      overflowX: 'auto',
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 2px 12px #e3eafc',
      marginBottom: 24,
      position: 'relative',
      minHeight: 200,
      transition: 'box-shadow 0.2s',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      background: '#fff',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 2px 12px #e3eafc',
      marginBottom: 24,
      tableLayout: 'fixed',
      wordBreak: 'break-word',
      maxWidth: '100%',
      transition: 'box-shadow 0.2s',
      fontSize: '1rem',
      textAlign: 'left',
      minWidth: '900px',
    },
    th: {
      background: '#2563eb',
      color: '#fff',
      fontWeight: 700,
      padding: '14px 10px',
      fontSize: 16,
      borderBottom: '2px solid #e5e7eb',
      maxWidth: 200,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      position: 'sticky',
      top: 0,
      zIndex: 2,
      borderRight: '1px solid #e5e7eb',
      letterSpacing: 0.2,
    },
    td: {
      padding: '12px 8px',
      fontSize: 15,
      borderBottom: '1px solid #e5e7eb',
      color: '#22336b',
      background: '#f9fafb',
      maxWidth: 240,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'pre-line',
      verticalAlign: 'middle',
      borderRight: '1px solid #e5e7eb',
      transition: 'background 0.18s',
    },
    sectionHeader: {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#2563eb',
      margin: '0 0 20px 0',
      letterSpacing: '0.2px',
      textAlign: 'left',
      paddingLeft: '0',
    },
    noData: {
      textAlign: 'center',
      padding: '48px',
      color: '#6c757d',
      fontSize: '1.1rem',
      background: '#fff',
      borderRadius: '0 0 16px 16px',
    },
  };
  // Compact filter/search bar
  const filterBarMinimal = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
    marginBottom: 10,
    background: '#f7f8fa',
    borderRadius: 7,
    boxShadow: '0 1px 2px #e5e7eb',
    padding: '7px 10px',
    fontSize: 14,
    fontWeight: 400,
    border: '1px solid #e5e7eb',
  };
  const filterInputMinimal = {
    padding: '4px 8px',
    borderRadius: 5,
    border: '1px solid #d1d5db',
    fontSize: 14,
    background: '#fff',
    minWidth: 90,
    fontWeight: 400,
  };

  // Professional filter bar style (to be placed above the table)
  const filterBarStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '16px',
    background: '#f7f8fa',
    borderRadius: '8px',
    boxShadow: '0 1px 4px #e5e7eb',
    padding: '14px 20px',
    fontSize: '1rem',
    border: '1px solid #e5e7eb',
    marginBottom: '18px',
    width: '100%',
  };

  // Enhanced card header and filter bar styles
  const cardHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
    gap: '32px',
    flexWrap: 'wrap',
    width: '100%',
  };
  const cardHeaderTitleStyle = {
    color: '#2563EB',
    fontSize: '2.1rem',
    fontWeight: 700,
    letterSpacing: '0.5px',
    textAlign: 'left',
    margin: 0,
    minWidth: '250px',
    flex: '1 1 300px',
  };
  const cardHeaderRightStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '16px',
    flex: '1 1 400px',
    minWidth: '320px',
    maxWidth: '600px',
  };
  const cardHeaderTabsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    flexShrink: 0,
    marginBottom: '4px',
  };
  const searchContainerStyle = {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'center',
    background: '#f7f8fa',
    borderRadius: '8px',
    boxShadow: '0 1px 4px #e5e7eb',
    padding: '10px 16px',
    fontSize: '1rem',
    border: '1px solid #e5e7eb',
    marginBottom: 0,
    minWidth: '320px',
    maxWidth: '600px',
  };
  const searchInputStyle = {
    padding: '12px 18px',
    border: `1.5px solid #E5EDFB`,
    borderRadius: '8px',
    fontSize: '1rem',
    minWidth: '220px',
    flex: '1 1 220px',
    outline: 'none',
    background: '#f8fafc',
    transition: 'border 0.2s',
    boxShadow: '0 2px 8px #e0e7ff',
  };
  const selectStyle = {
    padding: '12px 16px',
    border: `1.5px solid #E5EDFB`,
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: '#f8fafc',
    outline: 'none',
    boxShadow: '0 2px 8px #e0e7ff',
    transition: 'border 0.2s',
    minWidth: '140px',
    maxWidth: '160px',
    flex: '0 0 160px',
  };
  // Enhanced status badge style
  const statusBadgeStyle = (status) => {
    let bg = '#bdbdbd', color = '#fff';
    if (status === 'completed') { bg = '#22c55e'; color = '#fff'; }
    else if (status === 'ongoing') { bg = '#2563EB'; color = '#fff'; }
    else if (status === 'cancelled') { bg = '#f59e42'; color = '#fff'; }
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 90,
      maxWidth: 120,
      padding: '7px 18px',
      borderRadius: '999px',
      fontSize: '0.92rem',
      fontWeight: 400,
      color,
      background: bg,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      border: 'none',
      boxShadow: '0 1px 6px #e0e7ff',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'center',
      margin: '0 auto',
    };
  };

  return (
    <div className="admin-layout">
      <style>{responsiveStyles}</style>
      <Navbar />
      <div className="admin-main" style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(120deg, #f9fafb 60%, #e3eafc 100%)' }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: 300, paddingBottom: 40 }}>
          <div className="ridehistory-container" style={styles.container}>
            <div style={cardHeaderStyle}>
              <h1 style={cardHeaderTitleStyle}>Ride History</h1>
              <div style={cardHeaderRightStyle}>
                <div style={cardHeaderTabsStyle}>
                  <button
                    style={{
                      padding: '12px 36px',
                      borderRadius: '12px 12px 0 0',
                      border: 'none',
                      background: activeTab === 'today' ? '#2563EB' : '#E5EDFB',
                      color: activeTab === 'today' ? '#fff' : '#2563EB',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      cursor: activeTab === 'today' ? 'default' : 'pointer',
                      boxShadow: activeTab === 'today' ? '0 2px 12px 0 rgba(37, 99, 235, 0.07)' : 'none',
                      outline: 'none',
                      borderBottom: activeTab === 'today' ? '2px solid #2563EB' : '2px solid #e5e7eb',
                      transition: 'background 0.2s, color 0.2s',
                      marginRight: '2px',
                    }}
                    onClick={() => setActiveTab('today')}
                    disabled={activeTab === 'today'}
                  >
                    Today's Trips
                  </button>
                  <button
                    style={{
                      padding: '12px 36px',
                      borderRadius: '12px 12px 0 0',
                      border: 'none',
                      background: activeTab === 'all' ? '#2563EB' : '#E5EDFB',
                      color: activeTab === 'all' ? '#fff' : '#2563EB',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      cursor: activeTab === 'all' ? 'default' : 'pointer',
                      boxShadow: activeTab === 'all' ? '0 2px 12px 0 rgba(37, 99, 235, 0.07)' : 'none',
                      outline: 'none',
                      borderBottom: activeTab === 'all' ? '2px solid #2563EB' : '2px solid #e5e7eb',
                      transition: 'background 0.2s, color 0.2s',
                      marginRight: '2px',
                    }}
                    onClick={() => setActiveTab('all')}
                    disabled={activeTab === 'all'}
                  >
                    All Other Trips
                  </button>
                </div>
              </div>
            </div>
            <div style={filterBarStyle}>
              <input
                type="text"
                placeholder="Search by employee name, ID, driver, or vehicle number..."
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
            {/* Table Section */}
            {activeTab === 'today' ? (
              <>
                <div style={styles.sectionHeader}>Today's Trips</div>
                <div style={styles.tableWrapper}>
                  <table className="ridehistory-table" style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Employee</th>
                        <th style={styles.th}>Trip Date</th>
                        <th style={styles.th}>Pickup Location</th>
                        <th style={styles.th}>Drop Location</th>
                        <th style={styles.th}>Driver</th>
                        <th style={styles.th}>Vehicle</th>
                        <th style={styles.th}>Vendor</th>
                        <th style={styles.th}>Fare (₹)</th>
                        <th style={styles.th}>Duration</th>
                        <th style={styles.th}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todaysTrips.length > 0 ? (
                        todaysTrips.map((trip, idx) => (
                          <tr
                            key={trip.id}
                            style={
                              hoveredRow === trip.id
                                ? { background: '#F1F5F9', cursor: 'pointer', transition: 'background 0.2s' }
                                : { background: idx % 2 === 0 ? '#E5EDFB' : '#fff', cursor: 'pointer', transition: 'background 0.2s' }
                            }
                            onMouseEnter={() => setHoveredRow(trip.id)}
                            onMouseLeave={() => setHoveredRow(null)}
                          >
                            <td style={styles.td}>
                              <div>
                                <div style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>{trip.employeeName}</div>
                                <div style={{ fontSize: '0.92rem', color: '#6c757d' }}>ID: {trip.employeeId}</div>
                              </div>
                            </td>
                            <td style={styles.td}>{trip.tripDate}</td>
                            <td style={styles.td}>{trip.pickupLocation}</td>
                            <td style={styles.td}>{trip.dropLocation}</td>
                            <td style={styles.td}>{trip.driverName}</td>
                            <td style={styles.td}>{trip.vehicleNumber}</td>
                            <td style={styles.td}>{trip.vendor}</td>
                            <td style={styles.td}>₹{trip.fare}</td>
                            <td style={styles.td}>{trip.duration}</td>
                            <td style={styles.td}>
                              <span style={statusBadgeStyle(trip.status)}>
                                {trip.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="10" style={styles.noData}>
                            No trips found for today.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <div style={styles.sectionHeader}>All Other Trips</div>
                <div style={styles.tableWrapper}>
                  <table className="ridehistory-table" style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Employee</th>
                        <th style={styles.th}>Trip Date</th>
                        <th style={styles.th}>Pickup Location</th>
                        <th style={styles.th}>Drop Location</th>
                        <th style={styles.th}>Driver</th>
                        <th style={styles.th}>Vehicle</th>
                        <th style={styles.th}>Vendor</th>
                        <th style={styles.th}>Fare (₹)</th>
                        <th style={styles.th}>Duration</th>
                        <th style={styles.th}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {otherTrips.length > 0 ? (
                        otherTrips.map((trip, idx) => (
                          <tr
                            key={trip.id}
                            style={
                              hoveredRow === trip.id
                                ? { background: '#F1F5F9', cursor: 'pointer', transition: 'background 0.2s' }
                                : { background: idx % 2 === 0 ? '#E5EDFB' : '#fff', cursor: 'pointer', transition: 'background 0.2s' }
                            }
                            onMouseEnter={() => setHoveredRow(trip.id)}
                            onMouseLeave={() => setHoveredRow(null)}
                          >
                            <td style={styles.td}>
                              <div>
                                <div style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>{trip.employeeName}</div>
                                <div style={{ fontSize: '0.92rem', color: '#6c757d' }}>ID: {trip.employeeId}</div>
                              </div>
                            </td>
                            <td style={styles.td}>{trip.tripDate}</td>
                            <td style={styles.td}>{trip.pickupLocation}</td>
                            <td style={styles.td}>{trip.dropLocation}</td>
                            <td style={styles.td}>{trip.driverName}</td>
                            <td style={styles.td}>{trip.vehicleNumber}</td>
                            <td style={styles.td}>{trip.vendor}</td>
                            <td style={styles.td}>₹{trip.fare}</td>
                            <td style={styles.td}>{trip.duration}</td>
                            <td style={styles.td}>
                              <span style={statusBadgeStyle(trip.status)}>
                                {trip.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="10" style={styles.noData}>
                            No trips found for previous dates.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TripManagement;