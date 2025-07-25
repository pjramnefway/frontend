import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
// Mock data for demonstration
const mockRequests = [
  {
    id: 'REQ1',
    employeeName: 'MotherBoard',
    employeeId: 'EMP123',
    gender: 'Male',
    department: 'HR',
    shift: 'Morning',
    pickupLocation: '123 Main St',
    dropLocation: '456 Elm St',
    requestedDateTime: '2024-07-01T09:00',
    escort: 'With Escort',
    status: 'Pending',
  },
  {
    id: 'REQ2',
    employeeName: 'Jane Smith',
    employeeId: 'EMP456',
    gender: 'Female',
    department: 'Finance',
    shift: 'Evening',
    pickupLocation: '789 Oak Ave',
    dropLocation: '321 Pine Rd',
    requestedDateTime: '2024-07-01T18:30',
    escort: 'Without Escort',
    status: 'Pending',
  },
  {
    id: 'REQ3',
    employeeName: 'Alexandria',
    employeeId: 'EMP789',
    gender: 'Other',
    department: 'IT',
    shift: 'Night',
    pickupLocation: '555 Long Street Name That Might Overflow',
    dropLocation: '999 Destination Avenue',
    requestedDateTime: '2024-07-01T23:30',
    escort: 'With Escort',
    status: 'Pending',
  },
];

const mockVehicles = [
  { id: 'V1', name: 'Toyota Innova', numberPlate: 'KA01AB1234' },
  { id: 'V2', name: 'Honda City', numberPlate: 'KA02CD5678' },
];

const mockVendors = [
  { id: 'VEN1', name: 'Vendor A' },
  { id: 'VEN2', name: 'Vendor B' },
];

const mockDrivers = [
  { id: 'D1', name: 'Alice Smith' },
  { id: 'D2', name: 'Bob Johnson' },
];

const departmentOptions = ['All', 'HR', 'Finance', 'IT', 'Admin'];
const shiftOptions = ['All', 'Morning', 'Evening', 'Night'];

const formatDateTime24 = (isoString) => {
  if (!isoString) return '';
  const d = new Date(isoString);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
};

// Helper to generate 24hr time slots in half-hour intervals
const generateTimeSlots = () => {
  const slots = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      slots.push(`${String(h).padStart(2, '0')}:${m === 0 ? '00' : '30'}`);
    }
  }
  return slots;
};
const timeSlots = generateTimeSlots();

// Helper to round ISO time to nearest half hour slot
const roundToNearestHalfHour = (isoString) => {
  const d = new Date(isoString);
  let h = d.getHours();
  let m = d.getMinutes();
  if (m < 15) m = 0;
  else if (m < 45) m = 30;
  else { h = (h + 1) % 24; m = 0; }
  return `${String(h).padStart(2, '0')}:${m === 0 ? '00' : '30'}`;
};

const shiftTimeOptions = ['All', ...timeSlots];

// Minimal Toast component
function Toast({ message, onClose }) {
  React.useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [message, onClose]);
  if (!message) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 24,
      right: 24,
      zIndex: 2000,
      background: 'rgba(34,51,107,0.97)',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: 8,
      fontSize: 15,
      fontWeight: 500,
      boxShadow: '0 2px 12px rgba(34,51,107,0.12)',
      opacity: 1,
      transition: 'opacity 0.3s',
      pointerEvents: 'none',
    }}>
      {message}
    </div>
  );
}

// Minimal User Icon SVG
const UserIcon = ({ size = 18, color = '#2563eb', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ verticalAlign: 'middle', marginRight: 6, ...style }}>
    <circle cx="10" cy="7" r="4" stroke={color} strokeWidth="1.5" fill="none" />
    <path d="M3.5 16c0-2.5 3-4 6.5-4s6.5 1.5 6.5 4" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

// Minimal Security Guard Icon SVG
const GuardIcon = ({ size = 18, color = '#2563eb', style = {}, disabled = false }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ verticalAlign: 'middle', marginRight: 5, opacity: disabled ? 0.3 : 1, ...style }}>
    <circle cx="10" cy="7" r="4" stroke={color} strokeWidth="1.5" fill="none" />
    <rect x="7" y="11" width="6" height="4" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
    <path d="M10 15v2" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// Minimal Eye Icon SVG for action
const EyeIcon = ({ size = 20, color = '#2563eb', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle', ...style }}>
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" fill="none" />
  </svg>
);

// Minimal Checkmark Icon SVG
const CheckIcon = ({ size = 18, color = '#22c55e', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ verticalAlign: 'middle', ...style }}>
    <path d="M5 10.5L9 14.5L15 7.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Universal Shield Icon for Escort
const EscortIcon = ({ withEscort }) => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill={withEscort ? '#2563eb' : 'none'} style={{ verticalAlign: 'middle', marginRight: 6 }}>
    <path d="M10 2L17 5V10C17 14.4183 13.4183 18 10 18C6.58172 18 3 14.4183 3 10V5L10 2Z" stroke={withEscort ? '#2563eb' : '#bbb'} strokeWidth="1.5" fill={withEscort ? '#2563eb' : 'none'} />
  </svg>
);

// Add a responsive style block for the container and table
const responsiveStyles = `
@media (max-width: 1200px) {
  .assignride-container { max-width: 98vw !important; padding: 18px !important; }
}
@media (max-width: 900px) {
  .assignride-container { max-width: 100vw !important; padding: 8px !important; }
  .assignride-table th, .assignride-table td { font-size: 13px !important; padding: 7px 4px !important; }
  .assignride-filterbar { flex-direction: column !important; gap: 6px !important; }
}
@media (max-width: 700px) {
  .assignride-container { margin: 0 !important; border-radius: 0 !important; }
  .assignride-table th, .assignride-table td { font-size: 12px !important; }
}
`;

const Assignride = () => {
  const originalRequestsRef = useRef([...mockRequests]);
  const [requests, setRequests] = useState([...mockRequests]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [pickupDateTime, setPickupDateTime] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [filterDept, setFilterDept] = useState('All');
  const [filterShift, setFilterShift] = useState('All');
  const [filterPickup, setFilterPickup] = useState('');
  const [filterDrop, setFilterDrop] = useState('');
  const [filterShiftTime, setFilterShiftTime] = useState('All');
  const [appliedFilters, setAppliedFilters] = useState({});
  const [toast, setToast] = useState('');

  // Refresh handler (simulates fetching new requests)
  const handleRefresh = () => {
    setRequests([...originalRequestsRef.current]);
  };

  // Open modal and set request
  const handleAssignClick = (req) => {
    setSelectedRequest(req);
    setSelectedVehicle('');
    setSelectedVendor('');
    setSelectedDriver('');
    setPickupDateTime(req.requestedDateTime);
    setPickupTime(roundToNearestHalfHour(req.requestedDateTime));
    setRejectReason('');
    setShowRejectReason(false);
    setModalOpen(true);
  };

  // Approve & Assign
  const handleApproveAssign = () => {
    const datePart = pickupDateTime.split('T')[0];
    const newPickupDateTime = `${datePart}T${pickupTime}`;
    const updatedRequests = requests.map(r =>
      r.id === selectedRequest.id
        ? { ...r, status: 'Approved' }
        : r
    );
    setRequests(updatedRequests);
    originalRequestsRef.current = originalRequestsRef.current.map(r =>
      r.id === selectedRequest.id
        ? { ...r, status: 'Approved' }
        : r
    );
    setModalOpen(false);
    setToast('Ride approved! Sent to vendor for assignment.');
    // Log assignment
    console.log('Assignment Saved:', {
      employeeId: selectedRequest.employeeId,
      employeeName: selectedRequest.employeeName,
      pickupLocation: selectedRequest.pickupLocation,
      dropLocation: selectedRequest.dropLocation,
      pickupDateTime: newPickupDateTime,
      escort: selectedRequest.escort,
      status: 'Approved',
    });
  };

  // Reject
  const handleReject = () => {
    setShowRejectReason(true);
  };
  const handleConfirmReject = () => {
    const updatedRequests = requests.map(r =>
      r.id === selectedRequest.id
        ? { ...r, status: 'Rejected' }
        : r
    );
    setRequests(updatedRequests);
    originalRequestsRef.current = originalRequestsRef.current.map(r =>
      r.id === selectedRequest.id
        ? { ...r, status: 'Rejected' }
        : r
    );
    setModalOpen(false);
    setShowRejectReason(false);
    setToast('Request rejected.');
  };
  const handleCancel = () => {
    setModalOpen(false);
  };

  // Filter logic
  const filteredRequests = requests.filter(req => {
    const deptMatch = filterDept === 'All' || req.department === filterDept;
    const shiftMatch = filterShift === 'All' || req.shift === filterShift;
    const pickupMatch = !filterPickup || req.pickupLocation.toLowerCase().includes(filterPickup.toLowerCase());
    const dropMatch = !filterDrop || req.dropLocation.toLowerCase().includes(filterDrop.toLowerCase());
    const timeMatch = filterShiftTime === 'All' || (req.requestedDateTime && formatDateTime24(req.requestedDateTime).split(' ')[1] === filterShiftTime);
    return deptMatch && shiftMatch && pickupMatch && dropMatch && timeMatch;
  });

  const handleApplyFilters = () => {
    setAppliedFilters({
      department: filterDept,
      shift: filterShift,
      pickup: filterPickup,
      drop: filterDrop,
      shiftTime: filterShiftTime,
    });
  };
  const handleClearFilters = () => {
    setFilterDept('All');
    setFilterShift('All');
    setFilterPickup('');
    setFilterDrop('');
    setFilterShiftTime('All');
    setAppliedFilters({});
  };

  // Styles
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
    h2: {
      fontWeight: 700,
      color: '#22336b',
      fontSize: 28,
      marginBottom: 18,
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
    status: {
      fontWeight: 600,
      borderRadius: 6,
      padding: '4px 10px',
      fontSize: 14,
      background: '#f3f4f6',
      color: '#888',
    },
    assignBtn: {
      background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      padding: '7px 18px',
      fontWeight: 600,
      fontSize: 15,
      cursor: 'pointer',
      transition: 'background 0.2s',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(34,51,107,0.18)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'auto',
    },
    modal: {
      background: '#fff',
      borderRadius: 14,
      boxShadow: '0 8px 32px rgba(34,51,107,0.18)',
      padding: 32,
      minWidth: 400,
      maxWidth: 700,
      width: '100%',
      position: 'relative',
      animation: 'fadeIn 0.2s',
      overflow: 'auto',
      boxSizing: 'border-box',
      minWidth: 340,
      maxHeight: '90vh',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'stretch',
    },
    modalTitle: {
      fontWeight: 700,
      color: '#22336b',
      fontSize: 22,
      marginBottom: 16,
    },
    label: {
      fontWeight: 600,
      color: '#22336b',
      marginBottom: 6,
      display: 'block',
    },
    select: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: 6,
      border: '1px solid #d1d5db',
      fontSize: 15,
      marginBottom: 10,
      background: '#fff',
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: 6,
      border: '1px solid #d1d5db',
      fontSize: 15,
      marginBottom: 10,
      background: '#fff',
    },
    textarea: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: 6,
      border: '1px solid #d1d5db',
      fontSize: 15,
      marginBottom: 10,
      background: '#fff',
      resize: 'vertical',
    },
    actions: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      marginTop: 18,
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
    },
    approve: {
      background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
      color: '#fff',
    },
    reject: {
      background: 'linear-gradient(90deg, #ef4444 0%, #b91c1c 100%)',
      color: '#fff',
    },
    cancel: {
      background: '#e5e7eb',
      color: '#22336b',
    },
    rejectDialog: {
      marginTop: 18,
      padding: 16,
      background: '#fffbe6',
      border: '1px solid #ffe58f',
      borderRadius: 8,
    },
    closeBtn: {
      position: 'absolute',
      top: 10,
      right: 14,
      fontSize: 22,
      color: '#888',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      zIndex: 2,
    },
    detail: {
      marginBottom: 4,
      color: '#374151',
      fontSize: 15,
    },
    optional: {
      color: '#888',
      fontSize: 13,
      marginLeft: 4,
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
  };

  // Minimal filter bar styles
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
  const filterBtnMinimal = {
    background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    padding: '5px 14px',
    fontWeight: 500,
    fontSize: 14,
    cursor: 'pointer',
    transition: 'background 0.2s',
    marginRight: 2,
  };
  const filterClearBtnMinimal = {
    background: '#e5e7eb',
    color: '#22336b',
    border: 'none',
    borderRadius: 5,
    padding: '5px 10px',
    fontWeight: 500,
    fontSize: 14,
    cursor: 'pointer',
    transition: 'background 0.2s',
  };

  return (
    <div className="admin-layout">
      <style>{responsiveStyles}</style>
      <Navbar />
      <div className="admin-main" style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(120deg, #f9fafb 60%, #e3eafc 100%)' }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: 300, paddingBottom: 40 }}>
          {/* Toast notification */}
          <Toast message={toast} onClose={() => setToast('')} />
          <div className="assignride-container" style={styles.container}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <h1 style={{ ...styles.h2, fontSize: 38, fontWeight: 600, marginBottom: 0 }}>Pending Ride Requests</h1>
              <button
                onClick={handleRefresh}
                title="Refresh"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  marginLeft: 10,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  outline: 'none',
                  boxShadow: 'none',
                  transition: 'transform 0.15s, filter 0.15s',
                  fontSize: 0,
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.92)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                onMouseOver={e => e.currentTarget.firstChild.style.filter = 'brightness(0.7)'}
                onMouseOut={e => e.currentTarget.firstChild.style.filter = 'none'}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', transition: 'filter 0.15s' }}>
                  <path d="M21 2v6h-6" />
                  <path d="M3 12a9 9 0 0 1 15.5-6.36L21 8" />
                  <path d="M3 12a9 9 0 0 0 15.5 6.36L21 16" />
                </svg>
              </button>
            </div>
            {/* Minimal Filters above table */}
            <div style={filterBarMinimal}>
              <select style={filterInputMinimal} value={filterDept} onChange={e => setFilterDept(e.target.value)}>
                {departmentOptions.map(opt => <option key={opt} value={opt}>{opt === 'All' ? 'Dept' : opt}</option>)}
              </select>
              <select style={filterInputMinimal} value={filterShift} onChange={e => setFilterShift(e.target.value)}>
                {shiftOptions.map(opt => <option key={opt} value={opt}>{opt === 'All' ? 'Shift' : opt}</option>)}
              </select>
              <select style={filterInputMinimal} value={filterShiftTime} onChange={e => setFilterShiftTime(e.target.value)}>
                {shiftTimeOptions.map(opt => <option key={opt} value={opt}>{opt === 'All' ? 'Timing' : opt}</option>)}
              </select>
              <input style={filterInputMinimal} value={filterPickup} onChange={e => setFilterPickup(e.target.value)} placeholder="Pickup" />
              <span style={{ color: '#2563eb', fontSize: 18, margin: '0 4px', userSelect: 'none' }}>&#8594;</span>
              <input style={filterInputMinimal} value={filterDrop} onChange={e => setFilterDrop(e.target.value)} placeholder="Destination" />
              <button style={filterBtnMinimal} onClick={handleApplyFilters}>Apply</button>
              <button style={filterClearBtnMinimal} onClick={handleClearFilters}>Clear</button>
            </div>
            {/* Show applied filters */}
            {Object.values(appliedFilters).some(val => val && val !== 'All') && (
              <div style={{ marginBottom: 8, color: '#2563eb', fontSize: 14 }}>
                <b>Filters:</b>
                {appliedFilters.department && appliedFilters.department !== 'All' && ` Dept: ${appliedFilters.department}`}
                {appliedFilters.shift && appliedFilters.shift !== 'All' && ` | Shift: ${appliedFilters.shift}`}
                {appliedFilters.shiftTime && appliedFilters.shiftTime !== 'All' && ` | Timing: ${appliedFilters.shiftTime}`}
                {appliedFilters.pickup && ` | Pickup: ${appliedFilters.pickup}`}
                {appliedFilters.drop && ` | Destination: ${appliedFilters.drop}`}
              </div>
            )}
            {/* Responsive table wrapper */}
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>S. No.</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Gender</th>
                    <th style={styles.th}>Emp ID</th>
                    <th style={styles.th}>Dept</th>
                    <th style={styles.th}>Shift</th>
                    <th style={styles.th}>Timing</th>
                    <th style={styles.th}>Pickup</th>
                    <th style={styles.th}></th>
                    <th style={styles.th}>Drop</th>
                    <th style={styles.th}>Requested Date & Time</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((req, idx) => (
                    <tr key={req.id}>
                      <td style={styles.td}>{idx + 1}</td>
                      <td style={styles.td}>
                        <UserIcon />
                        {req.employeeName}
                      </td>
                      <td style={styles.td}>{req.gender === 'Male' ? 'M' : req.gender === 'Female' ? 'F' : 'O'}</td>
                      <td style={styles.td}>{req.employeeId}</td>
                      <td style={styles.td}>{req.department}</td>
                      <td style={styles.td}>{req.shift}</td>
                      <td style={styles.td}>{req.requestedDateTime ? formatDateTime24(req.requestedDateTime).split(' ')[1] : ''}</td>
                      <td style={styles.td}>{req.pickupLocation}</td>
                      <td style={{ ...styles.td, textAlign: 'center', fontSize: 18, color: '#2563eb', width: 30 }}>
                        &#8594;
                      </td>
                      <td style={styles.td}>{req.dropLocation}</td>
                      <td style={styles.td}>{formatDateTime24(req.requestedDateTime)}</td>
                      <td style={{ ...styles.td, ...styles.status, color: req.status === 'Approved' ? '#22c55e' : req.status === 'Rejected' ? '#ef4444' : '#888' }}>
                        {req.status === 'Approved' ? <CheckIcon /> : req.status}
                      </td>
                      <td style={styles.td}>
                        {req.status === 'Pending' && (
                          <button
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 6,
                              transition: 'background 0.2s',
                              width: 36,
                              height: 36,
                            }}
                            title="View & Approve"
                            onClick={() => handleAssignClick(req)}
                          >
                            <EyeIcon />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Modal for assignment */}
          {modalOpen && selectedRequest && (
            <div style={styles.modalOverlay}>
              <div style={styles.modal}>
                <button style={styles.closeBtn} onClick={handleCancel} title="Close">×</button>
                <div style={styles.modalTitle}>Assign Ride</div>
                <div style={{
                  background: '#f6f8fa',
                  border: '1px solid #e5e7eb',
                  borderRadius: 10,
                  padding: '18px 24px',
                  marginBottom: 18,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '14px 32px',
                  alignItems: 'center',
                }}>
                  <div style={{ ...styles.detail, fontSize: 16, fontWeight: 600 }}><UserIcon size={20} style={{ marginRight: 8, marginBottom: -3 }} /><b>Name:</b> {selectedRequest.employeeName}</div>
                  <div style={{ ...styles.detail, fontSize: 16, fontWeight: 600 }}><b>Gender:</b> {selectedRequest.gender === 'Male' ? 'M' : selectedRequest.gender === 'Female' ? 'F' : 'O'}</div>
                  <div style={styles.detail}><b>Emp ID:</b> {selectedRequest.employeeId}</div>
                  <div style={styles.detail}><b>Department:</b> {selectedRequest.department}</div>
                  <div style={styles.detail}><b>Shift:</b> {selectedRequest.shift}</div>
                  <div style={styles.detail}><b>Timing:</b> {selectedRequest.requestedDateTime ? formatDateTime24(selectedRequest.requestedDateTime).split(' ')[1] : ''}</div>
                  <div style={styles.detail}>
                    <b>Escort:</b> <span style={{ display: 'inline-flex', alignItems: 'center' }}><EscortIcon withEscort={selectedRequest.escort === 'With Escort'} />{selectedRequest.escort}</span>
                  </div>
                  <div style={styles.detail}><b>Pickup Location:</b> {selectedRequest.pickupLocation}</div>
                  <div style={styles.detail}><b>Drop Location:</b> {selectedRequest.dropLocation}</div>
                  <div style={styles.detail}><b>Requested Date & Time:</b> {formatDateTime24(selectedRequest.requestedDateTime)}</div>
                </div>
                <label style={styles.label}>Pickup Date:</label>
                <input
                  type="date"
                  style={{ ...styles.input, background: '#f3f4f6', color: '#888', cursor: 'not-allowed' }}
                  value={pickupDateTime.split('T')[0]}
                  readOnly
                  tabIndex={-1}
                />
                <label style={styles.label}>Pickup Time:</label>
                <input
                  type="text"
                  style={{ ...styles.input, background: '#f3f4f6', color: '#888', cursor: 'not-allowed' }}
                  value={pickupTime}
                  readOnly
                  tabIndex={-1}
                />
                <div style={{ color: '#888', fontSize: 13, marginTop: 2 }}>
                  <b>Selected:</b> {pickupDateTime.split('T')[0]} {pickupTime}
                </div>
                <div style={styles.actions}>
                  <button onClick={handleApproveAssign} style={{ ...styles.assignBtn, ...styles.approve }}>Approve & Assign</button>
                  <button onClick={handleCancel} style={{ ...styles.assignBtn, ...styles.cancel }}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Assignride;