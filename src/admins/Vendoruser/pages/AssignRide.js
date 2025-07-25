import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

// Dummy data for illustration (replace with API calls or props)
const EMPLOYEES = [
  { id: 'Emp106', name: 'Frank', pickupLocation: 'Zone A', fromLocation: 'House F6', toLocation: 'Software City', Schedules: [] },
  { id: 'Emp104', name: 'David', pickupLocation: 'Zone C', fromLocation: 'Villa D4', toLocation: 'Business Center', Schedules: [] },
  { id: 'Emp107', name: 'Grace', pickupLocation: 'Zone C', fromLocation: 'Tower G7', toLocation: 'Industrial Zone', Schedules: [] },
  { id: 'Emp110', name: 'Jack', pickupLocation: 'Zone A', fromLocation: 'Cottage J10', toLocation: 'Enterprise Plaza', Schedules: [] },
  { id: 'Emp102', name: 'Bob', pickupLocation: 'Zone B', fromLocation: 'Home B2', toLocation: 'IT Hub 2', Schedules: [] },
  { id: 'Emp108', name: 'Hank', pickupLocation: 'Zone D', fromLocation: 'Flat H8', toLocation: 'Downtown Office', Schedules: [] },
  { id: 'Emp103', name: 'Charlie', pickupLocation: 'Zone A', fromLocation: 'Apartment C3', toLocation: 'Corporate Tower', Schedules: [] },
  { id: 'Emp105', name: 'Eve', pickupLocation: 'Zone B', fromLocation: 'Block E5', toLocation: 'Innovation Park', Schedules: [] },
  { id: 'Emp101', name: 'Alice', pickupLocation: 'Zone A', fromLocation: 'Home A1', toLocation: 'Tech Park 1', Schedules: [] },
  { id: 'Emp109', name: 'Ivy', pickupLocation: 'Zone B', fromLocation: 'Residence I9', toLocation: 'Startup Valley', Schedules: [] }
];
const VEHICLES = [
  { id: 'DVR104', number: 'KA 03 BR 2938', type: 'SUV', seatingCapacity: 4, status: 'available', Schedules: [] },
  { id: 'DVR101', number: 'KA 01 MC 8765', type: 'VAN', seatingCapacity: 9, status: 'available', Schedules: [] },
  { id: 'DVR103', number: 'KA 05 AS 1290', type: 'Sedan', seatingCapacity: 3, status: 'available', Schedules: [] },
  { id: 'DVR102', number: 'KA 02 ZY 5543', type: 'SUV', seatingCapacity: 2, status: 'available', Schedules: [] }
];
const TIME_SLOTS = [
  '08:00-09:00',
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
];

function isTimeConflict(slot1, slot2) {
  // Implement time overlap logic
  return false;
}

function isVehicleFree(vehicle, timeSlot) {
  return vehicle.Schedules.every(a => !isTimeConflict(a.timeSlot, timeSlot));
}

function hasEmployeeTimeConflict(employee, timeSlot) {
  return employee.Schedules.some(a => isTimeConflict(a.timeSlot, timeSlot));
}

// Modern styles
const styles = {
  container: {
    background: '#f8f9fa',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    padding: '32px',
    margin: '32px auto',
    maxWidth: '1100px',
    fontFamily: 'Segoe UI, Arial, sans-serif',
  },
  section: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    padding: '24px',
    marginBottom: '24px',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    background: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
  },
  th: {
    background: '#f1f3f6',
    color: '#333',
    fontWeight: 600,
    padding: '10px',
    borderBottom: '1px solid #e0e0e0',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #f0f0f0',
    color: '#444',
  },
  button: {
    background: 'linear-gradient(90deg, #4f8cff 0%, #2355e6 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 24px',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '16px',
    boxShadow: '0 2px 8px rgba(79,140,255,0.08)',
    transition: 'background 0.2s',
  },
  radioLabel: {
    display: 'block',
    marginBottom: 8,
    fontWeight: 500,
    color: '#2355e6',
    cursor: 'pointer',
  },
  alert: {
    color: '#d7263d',
    background: '#fff0f3',
    border: '1px solid #ffd6de',
    borderRadius: '6px',
    padding: '10px 16px',
    margin: '16px 0',
    fontWeight: 500,
  },
};

const AssignRide = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [employeeData, setEmployeeData] = useState(EMPLOYEES);
  const [showModal, setShowModal] = useState(false);

  // Filter vehicles when employees or time slot changes
  useEffect(() => {
    if (!selectedTimeSlot || selectedEmployees.length === 0) {
      setAvailableVehicles([]);
      return;
    }
    const filtered = VEHICLES.filter(vehicle =>
      vehicle.status === 'available' &&
      vehicle.seatingCapacity === selectedEmployees.length &&
      isVehicleFree(vehicle, selectedTimeSlot)
    );
    setAvailableVehicles(filtered);
  }, [selectedEmployees, selectedTimeSlot]);

  // Validation before Schedule
  const validateSchedule = () => {
    const newAlerts = [];
    if (!selectedVehicle) newAlerts.push('Please select a vehicle.');
    if (selectedEmployees.length !== (selectedVehicle?.seatingCapacity || 0)) {
      newAlerts.push('Vehicle capacity must match the number of selected employees.');
    }
    selectedEmployees.forEach(emp => {
      if (hasEmployeeTimeConflict(emp, selectedTimeSlot)) {
        newAlerts.push(`Employee ${emp.name} has a time conflict.`);
      }
    });
    setAlerts(newAlerts);
    return newAlerts.length === 0;
  };

  const handleAssign = () => {
    if (!validateSchedule()) return;
    // Remove assigned employees from employeeData entirely
    setEmployeeData(prev => prev.filter(emp => !selectedEmployees.some(se => se.id === emp.id)));
    setSelectedEmployees([]);
    setSelectedVehicle(null);
    setAlerts([]);
    setShowModal(true);
  };

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-main">
        <Sidebar />
        <div className="admin-content">
          <h2 style={{ textAlign: 'center', color: '#2355e6', marginBottom: 32 }}>Assign Vehicle to Employees</h2>
          {/* Step 2: Time Slot Selection (popdown) */}
          <div style={styles.section}>
            <h3 style={{ color: '#4f8cff' }}>Select Time Slot</h3>
            <select
              value={selectedTimeSlot || ''}
              onChange={e => setSelectedTimeSlot(e.target.value)}
              style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #e0e0e0', fontSize: '1rem', minWidth: 180 }}
            >
              <option value="" disabled>Select a time slot</option>
              {TIME_SLOTS.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          {/* Show employee and vehicle selection only after time slot is selected */}
          {selectedTimeSlot ? (
            <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
              {/* Left: Employee Selection Table */}
              <div style={{ flex: 1, ...styles.section }}>
                <h3 style={{ color: '#4f8cff' }}>Select Employees</h3>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Select</th>
                      <th style={styles.th}>ID</th>
                      <th style={styles.th}>Name</th>
                      <th style={styles.th}>From</th>
                      <th style={styles.th}>To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeData.filter(emp => !hasEmployeeTimeConflict(emp, selectedTimeSlot)).map(emp => {
                      const isSelected = selectedEmployees.includes(emp);
                      return (
                        <tr
                          key={emp.id}
                          style={{
                            background: isSelected ? '#eaf1ff' : undefined,
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                          }}
                          onClick={() => {
                            setSelectedEmployees(prev =>
                              isSelected
                                ? prev.filter(se => se.id !== emp.id)
                                : [...prev, emp]
                            );
                          }}
                        >
                          <td style={styles.td} onClick={e => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={e => {
                                setSelectedEmployees(prev =>
                                  e.target.checked
                                    ? [...prev, emp]
                                    : prev.filter(se => se.id !== emp.id)
                                );
                              }}
                            />
                          </td>
                          <td style={styles.td}>{emp.id}</td>
                          <td style={styles.td}>{emp.name}</td>
                          <td style={styles.td}>{emp.fromLocation}</td>
                          <td style={styles.td}>{emp.toLocation}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div style={{ marginTop: 12, color: '#888' }}>Selected: {selectedEmployees.length}</div>
              </div>
              {/* Right: Vehicle Selection and Schedule Preview */}
              <div style={{ flex: 1, ...styles.section }}>
                <h3 style={{ color: '#4f8cff' }}>Select Vehicle</h3>
                {availableVehicles.length === 0 && <div style={{ color: '#d7263d', marginBottom: 12 }}>No matching vehicles available.</div>}
                {availableVehicles.map(vehicle => (
                  <label key={vehicle.id} style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="vehicle"
                      checked={selectedVehicle?.id === vehicle.id}
                      onChange={() => setSelectedVehicle(vehicle)}
                      style={{ marginRight: 8 }}
                    />
                    {vehicle.number} <span style={{ color: '#888' }}>({vehicle.type}, Seats: {vehicle.seatingCapacity})</span>
                  </label>
                ))}
                {/* Schedule Preview */}
                <h3 style={{ color: '#4f8cff', marginTop: 32 }}>Schedule Preview</h3>
                {selectedVehicle && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontWeight: 500, marginBottom: 8 }}>Vehicle: <span style={{ color: '#2355e6' }}>{selectedVehicle.number}</span> ({selectedVehicle.type})</div>
                    <div style={{ marginBottom: 8 }}>Time Slot: <span style={{ color: '#2355e6' }}>{selectedTimeSlot}</span></div>
                    <div style={{ marginBottom: 8 }}>Employees:</div>
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          <th style={styles.th}>ID</th>
                          <th style={styles.th}>Name</th>
                          <th style={styles.th}>From</th>
                          <th style={styles.th}>To</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedEmployees.map(emp => (
                          <tr key={emp.id}>
                            <td style={styles.td}>{emp.id}</td>
                            <td style={styles.td}>{emp.name}</td>
                            <td style={styles.td}>{emp.fromLocation}</td>
                            <td style={styles.td}>{emp.toLocation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button onClick={handleAssign} style={styles.button}>Confirm Schedule</button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ margin: '20px 0', color: '#888', textAlign: 'center', fontSize: '1.1rem' }}>
              Please select a time slot to view available employees and vehicles.
            </div>
          )}
          {/* Alerts */}
          {alerts.length > 0 && (
            <div style={styles.alert}>
              {alerts.map((a, i) => <div key={i}>{a}</div>)}
            </div>
          )}
          {/* Modal Popup */}
          {showModal && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}>
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                padding: '40px 32px',
                minWidth: 320,
                textAlign: 'center',
                position: 'relative',
              }}>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 16,
                    background: 'none',
                    border: 'none',
                    fontSize: 22,
                    color: '#aaa',
                    cursor: 'pointer',
                  }}
                  aria-label="Close"
                >
                  ×
                </button>
                <div style={{ fontSize: 28, color: '#2355e6', marginBottom: 12 }}>✅</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: '#222', marginBottom: 8 }}>
                  Confirmed successfully
                </div>
                <div style={{ color: '#666', fontSize: 15 }}>Your schedule has been saved.</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default AssignRide;
