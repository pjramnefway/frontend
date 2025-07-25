import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const errorInputStyle = {
  border: '2px solid #e74c3c',
  background: '#fff6f6',
};
const errorTextStyle = {
  color: '#e74c3c',
  fontSize: 13,
  marginTop: 2,
  marginLeft: 2,
};

const initialDriver = {
  firstName: '', lastName: '', dob: '', age: '', gender: '', phone: '', email: '',
  street: '', city: '', state: '', pin: '',
  emergencyName: '', emergencyPhone: '',
  govIdType: '', govIdNumber: '', govIdFile: null,
  licenseNumber: '', licenseExpiry: '', licenseFile: null,
  profilePhoto: null,
};
const initialVehicle = {
  type: '', make: '', model: '', year: '', regNumber: '', vehicleNumber: '', chassis: '', engine: '', seats: '', fuel: '',
  insuranceNumber: '', insuranceExpiry: '', insuranceFile: null,
  pucNumber: '', pucExpiry: '', pucFile: null,
  rcNumber: '', rcFile: null,
  vehiclePhoto: null,
};

const requiredDriverFields = [
  'firstName','lastName','dob','gender','phone','email','street','city','state','pin',
  'emergencyName','emergencyPhone','govIdType','govIdNumber','govIdFile',
  'licenseNumber','licenseExpiry','licenseFile','profilePhoto'
];
const requiredVehicleFields = [
  'type','make','model','year','regNumber','vehicleNumber','seats','fuel',
  'insuranceNumber','insuranceExpiry','insuranceFile',
  'pucNumber','pucExpiry','pucFile','rcNumber','rcFile','vehiclePhoto'
];

const DriverVehicleOnboarding = () => {
  const [step, setStep] = useState(1);
  const [driver, setDriver] = useState(initialDriver);
  const [vehicle, setVehicle] = useState(initialVehicle);
  const [driverTouched, setDriverTouched] = useState({});
  const [vehicleTouched, setVehicleTouched] = useState({});
  const [driverSubmitAttempted, setDriverSubmitAttempted] = useState(false);
  const [vehicleSubmitAttempted, setVehicleSubmitAttempted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [records, setRecords] = useState([]);
  const [viewRecord, setViewRecord] = useState(null);

  // Validation helpers
  const getDriverError = (field) => {
    if (requiredDriverFields.includes(field)) {
      if (!driver[field] || (typeof driver[field] === 'string' && driver[field].trim() === '')) return 'Required';
    }
    return '';
  };
  const getVehicleError = (field) => {
    if (requiredVehicleFields.includes(field)) {
      if (!vehicle[field] || (typeof vehicle[field] === 'string' && vehicle[field].trim() === '')) return 'Required';
    }
    return '';
  };
  const isDriverValid = () => requiredDriverFields.every(f => driver[f] && (typeof driver[f] !== 'string' || driver[f].trim() !== ''));
  const isVehicleValid = () => requiredVehicleFields.every(f => vehicle[f] && (typeof vehicle[f] !== 'string' || vehicle[f].trim() !== ''));

  // Handlers
  const handleDriverChange = (field, value) => {
    setDriver(prev => ({ ...prev, [field]: value }));
  };
  const handleDriverFile = (field, file) => {
    setDriver(prev => ({ ...prev, [field]: file }));
  };
  const handleVehicleChange = (field, value) => {
    setVehicle(prev => ({ ...prev, [field]: value }));
  };
  const handleVehicleFile = (field, file) => {
    setVehicle(prev => ({ ...prev, [field]: file }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setDriverSubmitAttempted(true);
    const touched = {};
    requiredDriverFields.forEach(f => { touched[f] = true; });
    setDriverTouched(touched);
    if (isDriverValid()) {
      setStep(2);
      setDriverSubmitAttempted(false);
    }
  };
  const handleBack = () => {
    setStep(1);
    setVehicleSubmitAttempted(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setVehicleSubmitAttempted(true);
    const touched = {};
    requiredVehicleFields.forEach(f => { touched[f] = true; });
    setVehicleTouched(touched);
    if (isVehicleValid()) {
      setShowSuccess(true);
      setRecords(prev => [...prev, { driver, vehicle }]);
      setTimeout(() => {
        setShowSuccess(false);
        setRedirecting(true);
        setTimeout(() => {
          setRedirecting(false);
          setStep(3);
          setDriver(initialDriver);
          setVehicle(initialVehicle);
          setDriverTouched({});
          setVehicleTouched({});
        }, 1200);
      }, 1500);
    }
  };

  // Age calculation
  React.useEffect(() => {
    if (driver.dob) {
      const today = new Date();
      const dob = new Date(driver.dob);
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
      setDriver(d => ({ ...d, age: age > 0 ? age : '' }));
    }
  }, [driver.dob]);

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-main">
        <Sidebar />
        <div className="admin-content">
          <div className="onboarding-container mb-5">
            <h3 className="text-center fw-bold mb-2" style={{ fontSize: '2rem' }}>Driver & Vehicle Onboarding</h3>
            <p className="text-center mb-4" style={{ fontSize: '1rem', color: '#6c757d', fontFamily: 'Roboto, Segoe UI, Arial, sans-serif', fontWeight: 400 }}>Complete driver and vehicle registration for fleet management</p>
            <hr style={{ width: '100%', height: '3px', background: '#e0e6ed', borderRadius: '2px', margin: '0 0 32px 0', border: 'none' }} />
            {/* Stepper */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 32, gap: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                {/* Step 1 */}
                <div
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
                    opacity: 1, transition: 'opacity 0.2s',
                  }}
                  onClick={() => { setStep(1); }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: step === 1 ? 'linear-gradient(135deg, #3498db, #2980b9)' : (step > 1 ? 'linear-gradient(135deg, #27ae60, #2ecc71)' : '#e0e6ed'),
                    color: step === 1 ? '#fff' : (step > 1 ? '#fff' : '#7f8c8d'),
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.5rem',
                    boxShadow: step === 1 ? '0 2px 8px rgba(52,152,219,0.15)' : (step > 1 ? '0 2px 8px rgba(39,174,96,0.15)' : 'none'),
                    marginBottom: 6, transition: 'background 0.2s, color 0.2s',
                    border: step === 1 ? 'none' : (step > 1 ? 'none' : 'none'),
                  }}>
                    {step > 1 ? <span style={{ fontSize: 22, fontWeight: 900 }}>✓</span> : 1}
                  </div>
                  <span style={{ fontSize: 15, color: step === 1 ? '#2980b9' : (step > 1 ? '#27ae60' : '#7f8c8d'), fontWeight: step === 1 ? 700 : (step > 1 ? 600 : 400) }}>Driver Details</span>
                </div>
                {/* Connecting line */}
                <div style={{ width: 48, height: 4, background: step > 1 ? 'linear-gradient(90deg, #27ae60, #2ecc71)' : '#e0e6ed', borderRadius: 2, transition: 'background 0.2s' }} />
                {/* Step 2 */}
                <div
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    cursor: isDriverValid() ? 'pointer' : 'not-allowed',
                    opacity: isDriverValid() ? 1 : 0.5, transition: 'opacity 0.2s',
                  }}
                  onClick={() => { if (isDriverValid()) setStep(2); }}
                  title={!isDriverValid() ? 'Please complete Driver Details first' : ''}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: step === 2 ? 'linear-gradient(135deg, #3498db, #2980b9)' : (step > 2 ? 'linear-gradient(135deg, #27ae60, #2ecc71)' : '#e0e6ed'),
                    color: step === 2 ? '#fff' : (step > 2 ? '#fff' : '#7f8c8d'),
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.5rem',
                    boxShadow: step === 2 ? '0 2px 8px rgba(52,152,219,0.15)' : (step > 2 ? '0 2px 8px rgba(39,174,96,0.15)' : 'none'),
                    marginBottom: 6, transition: 'background 0.2s, color 0.2s',
                    border: step === 2 ? 'none' : (step > 2 ? 'none' : 'none'),
                  }}>
                    {step > 2 ? <span style={{ fontSize: 22, fontWeight: 900 }}>✓</span> : 2}
                  </div>
                  <span style={{ fontSize: 15, color: step === 2 ? '#2980b9' : (step > 2 ? '#27ae60' : '#7f8c8d'), fontWeight: step === 2 ? 700 : (step > 2 ? 600 : 400) }}>Vehicle Details</span>
                </div>
                {/* Connecting line */}
                <div style={{ width: 48, height: 4, background: step > 2 ? 'linear-gradient(90deg, #27ae60, #2ecc71)' : '#e0e6ed', borderRadius: 2, transition: 'background 0.2s' }} />
                {/* Step 3: Management */}
                <div
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
                    opacity: 1, transition: 'opacity 0.2s',
                  }}
                  onClick={() => setStep(3)}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: step === 3 ? 'linear-gradient(135deg, #3498db, #2980b9)' : '#e0e6ed',
                    color: step === 3 ? '#fff' : '#7f8c8d',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.5rem',
                    boxShadow: step === 3 ? '0 2px 8px rgba(52,152,219,0.15)' : 'none',
                    marginBottom: 6, transition: 'background 0.2s, color 0.2s',
                    border: step === 3 ? 'none' : 'none',
                  }}>M</div>
                  <span style={{ fontSize: 15, color: step === 3 ? '#2980b9' : '#7f8c8d', fontWeight: step === 3 ? 700 : 400 }}>Management</span>
                </div>
              </div>
            </div>

            {/* Success Popup */}
            {showSuccess && (
              <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: '#fff', padding: '40px 60px', borderRadius: 12, boxShadow: '0 4px 24px rgba(39,174,96,0.18)', color: '#27ae60', fontWeight: 700, fontSize: 24, textAlign: 'center' }}>
                  Submitted successfully!
                </div>
              </div>
            )}
            {redirecting && (
              <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.10)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: '#fff', padding: '30px 50px', borderRadius: 12, color: '#2980b9', fontWeight: 600, fontSize: 22, textAlign: 'center' }}>
                  Redirecting to management...
                </div>
              </div>
            )}

            {/* Step 1: Driver Details */}
            {step === 1 && (
              <>
                <div style={{ position: 'relative', background: '#f1f5f9', borderRadius: '12px', padding: '20px 28px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(37,99,235,0.06)', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', background: '#3498db', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}></div>
                  <div style={{ marginLeft: 18, width: '100%' }}>
                    <span style={{ fontSize: '1.35rem', color: '#111', fontWeight: 800, fontFamily: 'Segoe UI, Arial, sans-serif', display: 'block' }}>Driver Details</span>
                    <span style={{ color: '#6c757d', fontWeight: 400, fontSize: '1.12rem', fontFamily: 'Segoe UI, Arial, sans-serif', display: 'block', marginTop: 2 }}>Essential information for identity verification and licensing</span>
                  </div>
                </div>
                <form onSubmit={handleNext} autoComplete="off">
                  <div className="row mb-3">
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">First Name *</label>
                      <input className="custom-form-control" placeholder="First Name *" required
                        value={driver.firstName}
                        onChange={e => handleDriverChange('firstName', e.target.value)}
                        onBlur={() => setDriverTouched(t => ({ ...t, firstName: true }))}
                        style={getDriverError('firstName') && (driverTouched['firstName'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getDriverError('firstName') && (driverTouched['firstName'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Last Name *</label>
                      <input className="custom-form-control" placeholder="Last Name *" required
                        value={driver.lastName}
                        onChange={e => handleDriverChange('lastName', e.target.value)}
                        onBlur={() => setDriverTouched(t => ({ ...t, lastName: true }))}
                        style={getDriverError('lastName') && (driverTouched['lastName'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getDriverError('lastName') && (driverTouched['lastName'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Date of Birth *</label>
                      <input type="date" className="custom-form-control" required
                        value={driver.dob}
                        onChange={e => handleDriverChange('dob', e.target.value)}
                        onBlur={() => setDriverTouched(t => ({ ...t, dob: true }))}
                        style={getDriverError('dob') && (driverTouched['dob'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getDriverError('dob') && (driverTouched['dob'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Age</label>
                      <input className="custom-form-control" placeholder="Age" value={driver.age} readOnly />
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Gender *</label>
                      <select className="custom-form-control" required
                        value={driver.gender}
                        onChange={e => handleDriverChange('gender', e.target.value)}
                        onBlur={() => setDriverTouched(t => ({ ...t, gender: true }))}
                        style={getDriverError('gender') && (driverTouched['gender'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {getDriverError('gender') && (driverTouched['gender'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Phone Number *</label>
                      <input className="custom-form-control" placeholder="Phone Number *" required
                        value={driver.phone}
                        onChange={e => handleDriverChange('phone', e.target.value)}
                        onBlur={() => setDriverTouched(t => ({ ...t, phone: true }))}
                        style={getDriverError('phone') && (driverTouched['phone'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getDriverError('phone') && (driverTouched['phone'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Email ID *</label>
                      <input type="email" className="custom-form-control" placeholder="Email ID *" required
                        value={driver.email}
                        onChange={e => handleDriverChange('email', e.target.value)}
                        onBlur={() => setDriverTouched(t => ({ ...t, email: true }))}
                        style={getDriverError('email') && (driverTouched['email'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getDriverError('email') && (driverTouched['email'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-6" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Street Address *</label>
                      <input className="custom-form-control" placeholder="Street Address *" required
                        value={driver.street}
                        onChange={e => handleDriverChange('street', e.target.value)}
                        onBlur={() => setDriverTouched(t => ({ ...t, street: true }))}
                        style={getDriverError('street') && (driverTouched['street'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getDriverError('street') && (driverTouched['street'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">City *</label>
                      <input className="custom-form-control" placeholder="City *" required
                        value={driver.city}
                        onChange={e => handleDriverChange('city', e.target.value)}
                        onBlur={() => setDriverTouched(t => ({ ...t, city: true }))}
                        style={getDriverError('city') && (driverTouched['city'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getDriverError('city') && (driverTouched['city'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">State *</label>
                      <input className="custom-form-control" placeholder="State *" required
                        value={driver.state}
                        onChange={e => handleDriverChange('state', e.target.value)}
                        onBlur={() => setDriverTouched(t => ({ ...t, state: true }))}
                        style={getDriverError('state') && (driverTouched['state'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getDriverError('state') && (driverTouched['state'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">PIN Code *</label>
                      <input className="custom-form-control" placeholder="PIN Code *" required
                        value={driver.pin}
                        onChange={e => handleDriverChange('pin', e.target.value)}
                        onBlur={() => setDriverTouched(t => ({ ...t, pin: true }))}
                        style={getDriverError('pin') && (driverTouched['pin'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getDriverError('pin') && (driverTouched['pin'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Emergency Contact Name *</label>
                      <input className="custom-form-control" placeholder="Emergency Contact Name *" required
                        value={driver.emergencyName}
                        onChange={e => handleDriverChange('emergencyName', e.target.value)}
                        onBlur={() => setDriverTouched(t => ({ ...t, emergencyName: true }))}
                        style={getDriverError('emergencyName') && (driverTouched['emergencyName'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getDriverError('emergencyName') && (driverTouched['emergencyName'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Emergency Contact Number *</label>
                      <input className="custom-form-control" placeholder="Emergency Contact Number *" required
                        value={driver.emergencyPhone}
                        onChange={e => handleDriverChange('emergencyPhone', e.target.value)}
                        onBlur={() => setDriverTouched(t => ({ ...t, emergencyPhone: true }))}
                        style={getDriverError('emergencyPhone') && (driverTouched['emergencyPhone'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getDriverError('emergencyPhone') && (driverTouched['emergencyPhone'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Government ID Type *</label>
                      <select className="custom-form-control" required
                        value={driver.govIdType}
                        onChange={e => handleDriverChange('govIdType', e.target.value)}
                        onBlur={() => setDriverTouched(t => ({ ...t, govIdType: true }))}
                        style={getDriverError('govIdType') && (driverTouched['govIdType'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      >
                        <option value="">Select ID Type</option>
                        <option value="aadhar">Aadhar Card</option>
                        <option value="passport">Passport</option>
                        <option value="voter">Voter ID</option>
                        <option value="pan">PAN Card</option>
                      </select>
                      {getDriverError('govIdType') && (driverTouched['govIdType'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Government ID Number *</label>
                      <input className="custom-form-control" placeholder="Government ID Number *" required
                        value={driver.govIdNumber}
                        onChange={e => handleDriverChange('govIdNumber', e.target.value)}
                        onBlur={() => setDriverTouched(t => ({ ...t, govIdNumber: true }))}
                        style={getDriverError('govIdNumber') && (driverTouched['govIdNumber'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getDriverError('govIdNumber') && (driverTouched['govIdNumber'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Upload Government ID Document *</label>
                      <input type="file" className="custom-form-control" required
                        onChange={e => handleDriverFile('govIdFile', e.target.files[0])}
                        onBlur={() => setDriverTouched(t => ({ ...t, govIdFile: true }))}
                        style={getDriverError('govIdFile') && (driverTouched['govIdFile'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getDriverError('govIdFile') && (driverTouched['govIdFile'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Driver's License Number *</label>
                      <input className="custom-form-control" placeholder="Driver's License Number *" required
                        value={driver.licenseNumber}
                        onChange={e => handleDriverChange('licenseNumber', e.target.value)}
                        onBlur={() => setDriverTouched(t => ({ ...t, licenseNumber: true }))}
                        style={getDriverError('licenseNumber') && (driverTouched['licenseNumber'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getDriverError('licenseNumber') && (driverTouched['licenseNumber'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Driver's License Expiry Date *</label>
                      <input type="date" className="custom-form-control" required
                        value={driver.licenseExpiry}
                        onChange={e => handleDriverChange('licenseExpiry', e.target.value)}
                        onBlur={() => setDriverTouched(t => ({ ...t, licenseExpiry: true }))}
                        style={getDriverError('licenseExpiry') && (driverTouched['licenseExpiry'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getDriverError('licenseExpiry') && (driverTouched['licenseExpiry'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Upload Driver's License Copy *</label>
                      <input type="file" className="custom-form-control" required
                        onChange={e => handleDriverFile('licenseFile', e.target.files[0])}
                        onBlur={() => setDriverTouched(t => ({ ...t, licenseFile: true }))}
                        style={getDriverError('licenseFile') && (driverTouched['licenseFile'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getDriverError('licenseFile') && (driverTouched['licenseFile'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Profile Photo *</label>
                      <input type="file" className="custom-form-control" required
                        onChange={e => handleDriverFile('profilePhoto', e.target.files[0])}
                        onBlur={() => setDriverTouched(t => ({ ...t, profilePhoto: true }))}
                        style={getDriverError('profilePhoto') && (driverTouched['profilePhoto'] || driverSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getDriverError('profilePhoto') && (driverTouched['profilePhoto'] || driverSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <button type="submit" className="custom-next-btn">Next: Vehicle Details</button>
                  </div>
                </form>
              </>
            )}

            {/* Step 2: Vehicle Details */}
            {step === 2 && (
              <>
                <div style={{ position: 'relative', background: '#f1f5f9', borderRadius: '12px', padding: '20px 28px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(37,99,235,0.06)', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', background: '#3498db', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}></div>
                  <div style={{ marginLeft: 18, width: '100%' }}>
                    <span style={{ fontSize: '1.35rem', color: '#111', fontWeight: 800, fontFamily: 'Segoe UI, Arial, sans-serif', display: 'block' }}>Vehicle Details</span>
                    <span style={{ color: '#6c757d', fontWeight: 400, fontSize: '1.12rem', fontFamily: 'Segoe UI, Arial, sans-serif', display: 'block', marginTop: 2 }}>Legal compliance, insurance, and operational suitability information</span>
                  </div>
                </div>
                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className="row mb-3">
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Vehicle Type *</label>
                      <select className="custom-form-control" required
                        value={vehicle.type}
                        onChange={e => handleVehicleChange('type', e.target.value)}
                        onBlur={() => setVehicleTouched(t => ({ ...t, type: true }))}
                        style={getVehicleError('type') && (vehicleTouched['type'] || vehicleSubmitAttempted) ? errorInputStyle : {}}
                      >
                        <option value="">Select Vehicle Type</option>
                        <option>Mini Cab</option>
                        <option>Sedan</option>
                        <option>SUV</option>
                      </select>
                      {getVehicleError('type') && (vehicleTouched['type'] || vehicleSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Make *</label>
                      <input className="custom-form-control" placeholder="Make *" required
                        value={vehicle.make}
                        onChange={e => handleVehicleChange('make', e.target.value)}
                        onBlur={() => setVehicleTouched(t => ({ ...t, make: true }))}
                        style={getVehicleError('make') && (vehicleTouched['make'] || vehicleSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getVehicleError('make') && (vehicleTouched['make'] || vehicleSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Model *</label>
                      <input className="custom-form-control" placeholder="Model *" required
                        value={vehicle.model}
                        onChange={e => handleVehicleChange('model', e.target.value)}
                        onBlur={() => setVehicleTouched(t => ({ ...t, model: true }))}
                        style={getVehicleError('model') && (vehicleTouched['model'] || vehicleSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getVehicleError('model') && (vehicleTouched['model'] || vehicleSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Year of Manufacture *</label>
                      <input className="custom-form-control" placeholder="Year of Manufacture *" required
                        value={vehicle.year}
                        onChange={e => handleVehicleChange('year', e.target.value)}
                        onBlur={() => setVehicleTouched(t => ({ ...t, year: true }))}
                        style={getVehicleError('year') && (vehicleTouched['year'] || vehicleSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getVehicleError('year') && (vehicleTouched['year'] || vehicleSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Registration Number *</label>
                      <input className="custom-form-control" placeholder="Registration Number *" required
                        value={vehicle.regNumber}
                        onChange={e => handleVehicleChange('regNumber', e.target.value)}
                        onBlur={() => setVehicleTouched(t => ({ ...t, regNumber: true }))}
                        style={getVehicleError('regNumber') && (vehicleTouched['regNumber'] || vehicleSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getVehicleError('regNumber') && (vehicleTouched['regNumber'] || vehicleSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Vehicle Number *</label>
                      <input className="custom-form-control" placeholder="Vehicle Number *" required
                        value={vehicle.vehicleNumber}
                        onChange={e => handleVehicleChange('vehicleNumber', e.target.value)}
                        onBlur={() => setVehicleTouched(t => ({ ...t, vehicleNumber: true }))}
                        style={getVehicleError('vehicleNumber') && (vehicleTouched['vehicleNumber'] || vehicleSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getVehicleError('vehicleNumber') && (vehicleTouched['vehicleNumber'] || vehicleSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Chassis Number</label>
                      <input className="custom-form-control" placeholder="Chassis Number" value={vehicle.chassis}
                        onChange={e => handleVehicleChange('chassis', e.target.value)}
                      />
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Engine Number</label>
                      <input className="custom-form-control" placeholder="Engine Number" value={vehicle.engine}
                        onChange={e => handleVehicleChange('engine', e.target.value)}
                      />
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Seating Capacity *</label>
                      <input className="custom-form-control" placeholder="Seating Capacity *" required
                        value={vehicle.seats}
                        onChange={e => handleVehicleChange('seats', e.target.value)}
                        onBlur={() => setVehicleTouched(t => ({ ...t, seats: true }))}
                        style={getVehicleError('seats') && (vehicleTouched['seats'] || vehicleSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getVehicleError('seats') && (vehicleTouched['seats'] || vehicleSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Fuel Type *</label>
                      <select className="custom-form-control" required
                        value={vehicle.fuel}
                        onChange={e => handleVehicleChange('fuel', e.target.value)}
                        onBlur={() => setVehicleTouched(t => ({ ...t, fuel: true }))}
                        style={getVehicleError('fuel') && (vehicleTouched['fuel'] || vehicleSubmitAttempted) ? errorInputStyle : {}}
                      >
                        <option value="">Select Fuel Type</option>
                        <option>Petrol</option>
                        <option>Diesel</option>
                        <option>Electric</option>
                      </select>
                      {getVehicleError('fuel') && (vehicleTouched['fuel'] || vehicleSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Insurance Policy Number *</label>
                      <input className="custom-form-control" placeholder="Insurance Policy Number *" required
                        value={vehicle.insuranceNumber}
                        onChange={e => handleVehicleChange('insuranceNumber', e.target.value)}
                        onBlur={() => setVehicleTouched(t => ({ ...t, insuranceNumber: true }))}
                        style={getVehicleError('insuranceNumber') && (vehicleTouched['insuranceNumber'] || vehicleSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getVehicleError('insuranceNumber') && (vehicleTouched['insuranceNumber'] || vehicleSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Insurance Expiry Date *</label>
                      <input type="date" className="custom-form-control" required
                        value={vehicle.insuranceExpiry}
                        onChange={e => handleVehicleChange('insuranceExpiry', e.target.value)}
                        onBlur={() => setVehicleTouched(t => ({ ...t, insuranceExpiry: true }))}
                        style={getVehicleError('insuranceExpiry') && (vehicleTouched['insuranceExpiry'] || vehicleSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getVehicleError('insuranceExpiry') && (vehicleTouched['insuranceExpiry'] || vehicleSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Upload Insurance Document *</label>
                      <input type="file" className="custom-form-control" required
                        onChange={e => handleVehicleFile('insuranceFile', e.target.files[0])}
                        onBlur={() => setVehicleTouched(t => ({ ...t, insuranceFile: true }))}
                        style={getVehicleError('insuranceFile') && (vehicleTouched['insuranceFile'] || vehicleSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getVehicleError('insuranceFile') && (vehicleTouched['insuranceFile'] || vehicleSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">PUC Certificate Number *</label>
                      <input className="custom-form-control" placeholder="PUC Certificate Number *" required
                        value={vehicle.pucNumber}
                        onChange={e => handleVehicleChange('pucNumber', e.target.value)}
                        onBlur={() => setVehicleTouched(t => ({ ...t, pucNumber: true }))}
                        style={getVehicleError('pucNumber') && (vehicleTouched['pucNumber'] || vehicleSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getVehicleError('pucNumber') && (vehicleTouched['pucNumber'] || vehicleSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">PUC Expiry Date *</label>
                      <input type="date" className="custom-form-control" required
                        value={vehicle.pucExpiry}
                        onChange={e => handleVehicleChange('pucExpiry', e.target.value)}
                        onBlur={() => setVehicleTouched(t => ({ ...t, pucExpiry: true }))}
                        style={getVehicleError('pucExpiry') && (vehicleTouched['pucExpiry'] || vehicleSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getVehicleError('pucExpiry') && (vehicleTouched['pucExpiry'] || vehicleSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Upload PUC Certificate *</label>
                      <input type="file" className="custom-form-control" required
                        onChange={e => handleVehicleFile('pucFile', e.target.files[0])}
                        onBlur={() => setVehicleTouched(t => ({ ...t, pucFile: true }))}
                        style={getVehicleError('pucFile') && (vehicleTouched['pucFile'] || vehicleSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getVehicleError('pucFile') && (vehicleTouched['pucFile'] || vehicleSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">RC Number *</label>
                      <input className="custom-form-control" placeholder="RC Number *" required
                        value={vehicle.rcNumber}
                        onChange={e => handleVehicleChange('rcNumber', e.target.value)}
                        onBlur={() => setVehicleTouched(t => ({ ...t, rcNumber: true }))}
                        style={getVehicleError('rcNumber') && (vehicleTouched['rcNumber'] || vehicleSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getVehicleError('rcNumber') && (vehicleTouched['rcNumber'] || vehicleSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Upload RC Document *</label>
                      <input type="file" className="custom-form-control" required
                        onChange={e => handleVehicleFile('rcFile', e.target.files[0])}
                        onBlur={() => setVehicleTouched(t => ({ ...t, rcFile: true }))}
                        style={getVehicleError('rcFile') && (vehicleTouched['rcFile'] || vehicleSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getVehicleError('rcFile') && (vehicleTouched['rcFile'] || vehicleSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                      <label className="form-label">Vehicle Photo *</label>
                      <input type="file" className="custom-form-control" required
                        onChange={e => handleVehicleFile('vehiclePhoto', e.target.files[0])}
                        onBlur={() => setVehicleTouched(t => ({ ...t, vehiclePhoto: true }))}
                        style={getVehicleError('vehiclePhoto') && (vehicleTouched['vehiclePhoto'] || vehicleSubmitAttempted) ? errorInputStyle : {}}
                      />
                      {getVehicleError('vehiclePhoto') && (vehicleTouched['vehiclePhoto'] || vehicleSubmitAttempted) && <div style={errorTextStyle}>Required</div>}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                    <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>
                    <button type="submit" className="custom-next-btn">Submit Onboarding</button>
                  </div>
                </form>
              </>
            )}

            {/* Management Table */}
            {step === 3 && (
              <div className="card border-0">
                <div className="card-header bg-white border-bottom-0 d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Management</strong> <br />
                    <small>View, edit, or delete onboarded drivers and vehicles</small>
                  </div>
                  <button className="btn btn-success" onClick={() => setStep(1)}>+ Add New</button>
                </div>
                <div className="card-body pt-0">
                  {records.length === 0 ? (
                    <div className="text-center text-muted py-5">No records found.</div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table className="table table-bordered table-hover">
                        <thead className="table-light">
                          <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Vehicle No.</th>
                            <th>License No.</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {records.map((rec, idx) => (
                            <tr key={idx}>
                              <td>{rec.driver.firstName} {rec.driver.lastName}</td>
                              <td>{rec.driver.phone}</td>
                              <td>{rec.vehicle.vehicleNumber}</td>
                              <td>{rec.driver.licenseNumber}</td>
                              <td>
                                <button className="btn btn-sm btn-info me-2" onClick={() => setViewRecord(rec)}>View</button>
                                <button className="btn btn-sm btn-danger" onClick={() => setRecords(records.filter((_, i) => i !== idx))}>Delete</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {/* View Modal */}
                  {viewRecord && (
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setViewRecord(null)}>
                      <div style={{ background: '#fff', padding: '40px 60px', borderRadius: 12, minWidth: 350, maxWidth: 600, boxShadow: '0 8px 32px rgba(44,62,80,0.18)', position: 'relative' }} onClick={e => e.stopPropagation()}>
                        <h4 style={{ marginBottom: 16 }}>Driver & Vehicle Details</h4>
                        <div style={{ maxHeight: 400, overflowY: 'auto', marginBottom: 20 }}>
                          <strong>Driver:</strong> {viewRecord.driver.firstName} {viewRecord.driver.lastName}<br />
                          <strong>Phone:</strong> {viewRecord.driver.phone}<br />
                          <strong>License No.:</strong> {viewRecord.driver.licenseNumber}<br />
                          <strong>Vehicle No.:</strong> {viewRecord.vehicle.vehicleNumber}<br />
                          <strong>Vehicle Type:</strong> {viewRecord.vehicle.type}<br />
                          <strong>Make:</strong> {viewRecord.vehicle.make}<br />
                          <strong>Model:</strong> {viewRecord.vehicle.model}<br />
                          <strong>Year:</strong> {viewRecord.vehicle.year}<br />
                        </div>
                        <button className="btn btn-success" onClick={() => setViewRecord(null)}>Close</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <style>{`
        .custom-form-control {
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(37,99,235,0.06);
          font-size: 1.08rem;
          padding: 14px 16px;
          font-family: 'Segoe UI', Arial, sans-serif;
          font-weight: 500;
          margin-bottom: 2px;
          border: 2px solid #d1d5db;
          transition: border 0.2s, box-shadow 0.2s;
          background: #fff;
        }
        .custom-form-control:focus {
          border-color: #3498db;
          box-shadow: 0 0 0 0.18rem rgba(52,152,219,0.18);
          outline: none;
        }
        .custom-next-btn {
          background: linear-gradient(90deg, #2563eb 0%, #3498db 100%);
          color: #fff;
          font-weight: 700;
          font-size: 1.13rem;
          border-radius: 24px;
          padding: 14px 38px;
          border: none;
          box-shadow: 0 2px 8px rgba(37,99,235,0.10);
          transition: background 0.2s, box-shadow 0.2s;
          margin-top: 10px;
          letter-spacing: 0.2px;
        }
        .custom-next-btn:hover, .custom-next-btn:focus {
          background: linear-gradient(90deg, #1746a0 0%, #2563eb 100%);
          box-shadow: 0 4px 16px rgba(37,99,235,0.13);
          color: #fff;
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default DriverVehicleOnboarding;