import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const VendorOnboarding = () => {
  const [formData, setFormData] = useState({
    vendorId: '',
    companyName: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
    businessType: '',
    fleetSize: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gstNumber: '',
    panNumber: '',
    companyRegistrationNumber: '',
    companyRegistrationDate: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [buttonHover, setButtonHover] = useState(null);
  const [currentView, setCurrentView] = useState('onboarding'); // 'onboarding' or 'management'
  const [showModal, setShowModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [deleteIndex, setDeleteIndex] = useState(null);

  const businessTypeOptions = [
    'Transport Company',
    'Fleet Owner',
    'Individual Driver',
    'Corporate Fleet',
    'Rental Service',
    'Logistics Company'
  ];

  const fleetSizeOptions = [
    '1-5 vehicles',
    '6-10 vehicles',
    '11-25 vehicles',
    '26-50 vehicles',
    '51-100 vehicles',
    '100+ vehicles'
  ];

  const stateOptions = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear password confirmation error when user types in password field
    if (name === 'password' && errors.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: ''
      }));
    }
    
    // Clear password error when user types in confirm password field
    if (name === 'confirmPassword' && errors.password) {
      setErrors(prev => ({
        ...prev,
        password: ''
      }));
    }
    
    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'vendorId', 'companyName', 'contactPerson', 'email', 'phoneNumber',
      'businessType', 'fleetSize', 'address', 'city', 'state', 'pincode',
      'gstNumber', 'panNumber', 'companyRegistrationNumber', 'companyRegistrationDate',
      'bankName', 'accountNumber', 'ifscCode', 'password', 'confirmPassword'
    ];

    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    // Password validation
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Password confirmation validation
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // If confirm password is filled but password is empty
    if (formData.confirmPassword && !formData.password) {
      newErrors.password = 'Please enter a password first';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (editIndex !== null) {
        // Update existing vendor
        setVendors(prev => prev.map((v, i) => i === editIndex ? formData : v));
        setEditIndex(null);
      } else {
        // Add new vendor
        setVendors(prev => [...prev, formData]);
      }
      handleReset();
      alert('Vendor onboarded successfully!');
    } catch (error) {
      alert('Error onboarding vendor. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      vendorId: '',
      companyName: '',
      contactPerson: '',
      email: '',
      phoneNumber: '',
      businessType: '',
      fleetSize: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      gstNumber: '',
      panNumber: '',
      companyRegistrationNumber: '',
      companyRegistrationDate: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const handleView = (vendor) => {
    setSelectedVendor(vendor);
    setShowModal(true);
  };

  const handleEdit = (index) => {
    setFormData(vendors[index]);
    setEditIndex(index);
    setCurrentView('onboarding'); // Switch to onboarding view for editing
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setDeleteReason('');
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteReason.trim()) return;
    setVendors(prev => prev.filter((_, i) => i !== deleteIndex));
    if (editIndex === deleteIndex) {
      handleReset();
      setEditIndex(null);
    }
    setShowDeleteModal(false);
    setDeleteReason('');
    setDeleteIndex(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteReason('');
    setDeleteIndex(null);
  };

  const handleSectionHover = (sectionName) => {
    setHoveredSection(sectionName);
  };

  const handleSectionLeave = () => {
    setHoveredSection(null);
  };

  const handleButtonHover = (buttonName) => {
    setButtonHover(buttonName);
  };

  const handleButtonLeave = () => {
    setButtonHover(null);
  };

  // Modal close handler
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVendor(null);
  };

  // Styles object
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: '#f7f9fb',
      minHeight: '100vh',
      boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      borderRadius: '18px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '3rem',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(6px)',
      borderRadius: '16px',
      padding: '2rem 2.5rem',
      border: '1px solid #e3e6ea',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      color: '#2c3e50'
    },
    headerIcon: {
      fontSize: '2.5rem',
      color: '#1976d2'
    },
    headerSubtitle: {
      fontSize: '1.1rem',
      color: '#5a6c7d',
      margin: '0'
    },
    headerIconContainer: {
      fontSize: '4rem',
      color: '#1976d2'
    },
    formWrapper: {
      background: '#fff',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
      overflow: 'hidden',
      backdropFilter: 'blur(4px)',
      marginBottom: '2rem',
      border: '3px dashed #87CEEB'
    },
    form: {
      padding: '2.5rem 2rem'
    },
    formSection: {
      marginBottom: '2.5rem',
      padding: '1.5rem 1rem',
      borderRadius: '12px',
      background: '#f8f9fa',
      borderLeft: '5px solid #667eea',
      transition: 'all 0.3s ease',
      boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
      border: '1px solid #e9ecef',
      cursor: 'pointer'
    },
    formSectionHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
      background: '#f0f4f8',
      borderColor: '#667eea'
    },
    sectionHeader: {
      marginBottom: '1.5rem',
      textAlign: 'center',
      paddingLeft: '0.5rem'
    },
    sectionTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      color: '#2c3e50',
      fontSize: '1.35rem',
      fontWeight: '600',
      marginBottom: '0.25rem'
    },
    sectionIcon: {
      fontSize: '1.4rem'
    },
    sectionLine: {
      width: '40px',
      height: '3px',
      background: 'linear-gradient(90deg, #667eea, #764ba2)',
      margin: '0 auto',
      borderRadius: '2px'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '1.2rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    formLabel: {
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '0.5rem',
      fontSize: '0.95rem',
      display: 'flex',
      alignItems: 'center'
    },
    formInput: {
      padding: '0.75rem 1rem',
      border: '2px solid #e1e5e9',
      borderRadius: '10px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      background: '#e3f2fd',
      fontFamily: 'inherit',
      color: '#2c3e50'
    },
    formActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '1rem',
      marginTop: '1.5rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid #e1e5e9'
    },
    btn: {
      padding: '0.75rem 2rem',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      minWidth: '140px',
      justifyContent: 'center',
      fontFamily: 'inherit'
    },
    btnPrimary: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    },
    btnPrimaryHover: {
      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)'
    },
    btnSecondary: {
      background: '#ecf0f1',
      color: '#2c3e50',
      border: '2px solid #bdc3c7'
    },
    btnSecondaryHover: {
      background: '#d5dbdb',
      borderColor: '#95a5a6',
      transform: 'translateY(-1px)',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
    },
    formInputError: {
      borderColor: '#e74c3c',
      background: '#fdf2f2'
    },
    errorMessage: {
      color: '#e74c3c',
      fontSize: '0.85rem',
      marginTop: '0.5rem',
      fontWeight: '500'
    },
    tableContainer: {
      marginTop: '2rem',
      overflowX: 'auto'
    },
    tableTitle: {
      marginBottom: '1rem',
      color: '#2c3e50',
      fontSize: '1.5rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    tableTitleIcon: {
      fontSize: '1.6rem',
      color: '#1976d2'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      fontSize: '0.97rem',
      overflow: 'hidden'
    },
    tableHeader: {
      background: '#e3f2fd',
      color: '#2c3e50',
      fontWeight: '600',
      padding: '0.5rem 0.75rem',
      border: '1px solid #e1e5e9',
      textAlign: 'left',
      verticalAlign: 'middle'
    },
    tableCell: {
      padding: '0.5rem 0.75rem',
      border: '1px solid #e1e5e9',
      textAlign: 'left',
      verticalAlign: 'middle'
    },
    tableRowEven: {
      background: '#f7f9fb'
    },
    tableRowOdd: {
      background: '#fff'
    },
    actionsCell: {
      minWidth: '110px',
      textAlign: 'center',
      whiteSpace: 'nowrap'
    },
    actionBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.2rem',
      marginRight: '8px',
      transition: 'color 0.2s, transform 0.2s',
      padding: '2px 6px',
      borderRadius: '5px',
      verticalAlign: 'middle',
      display: 'inline-block',
      lineHeight: '1'
    },
    noRecordsCell: {
      textAlign: 'center',
      padding: '2rem',
      color: '#7f8c8d',
      fontStyle: 'italic',
      fontSize: '1.1rem'
    },
    noRecordsIcon: {
      fontSize: '1.5rem',
      marginRight: '0.5rem',
      verticalAlign: 'middle'
    },
    securitySectionHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
    },
    // View toggle buttons styles
    viewToggleContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '1rem',
      marginBottom: '2rem',
      padding: '1rem',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid #e3e6ea'
    },
    viewToggleBtn: {
      padding: '0.75rem 1.5rem',
      border: '2px solid #667eea',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontFamily: 'inherit'
    },
    viewToggleBtnActive: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: '2px solid transparent',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
    },
    viewToggleBtnInactive: {
      background: 'transparent',
      color: '#667eea',
      border: '2px solid #667eea'
    },
    viewToggleBtnHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(102, 126, 234, 0.2)'
    },
    // Modal Styles
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    },
    modalContent: {
      background: '#fff',
      borderRadius: '16px',
      padding: '2rem',
      maxWidth: '800px',
      width: '90%',
      maxHeight: '90vh',
      overflow: 'auto',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      position: 'relative'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: '2px solid #e3f2fd'
    },
    modalTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#2c3e50',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    modalTitleIcon: {
      fontSize: '2rem',
      color: '#1976d2'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '2rem',
      cursor: 'pointer',
      color: '#95a5a6',
      padding: '0.5rem',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      lineHeight: '1'
    },
    modalBody: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    modalSection: {
      background: '#f8f9fa',
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid #e9ecef'
    },
    modalSectionTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      paddingBottom: '0.5rem',
      borderBottom: '2px solid #e3f2fd'
    },
    modalSectionIcon: {
      fontSize: '1.3rem'
    },
    modalField: {
      marginBottom: '1rem'
    },
    modalFieldLabel: {
      fontWeight: '600',
      color: '#5a6c7d',
      fontSize: '0.9rem',
      marginBottom: '0.3rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    modalFieldValue: {
      color: '#2c3e50',
      fontSize: '1rem',
      padding: '0.5rem',
      background: '#fff',
      borderRadius: '6px',
      border: '1px solid #e1e5e9',
      minHeight: '20px'
    },
    modalFooter: {
      marginTop: '2rem',
      paddingTop: '1rem',
      borderTop: '2px solid #e3f2fd',
      textAlign: 'center'
    },
    modalFooterText: {
      color: '#7f8c8d',
      fontSize: '0.9rem',
      fontStyle: 'italic'
    }
  };

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-main">
        <Sidebar />
        <div className="admin-content">
          <div style={styles.container}>
            <div style={styles.header}>
              <div>
                <h1 style={styles.headerTitle}>
                  {/* <i className="bi bi-truck" style={styles.headerIcon}></i> */}
                  Vendor Onboarding
                </h1>
                <p style={styles.headerSubtitle}>Register new transportation vendors to expand our fleet network</p>
              </div>
              <div>
                {/* <i className="bi bi-truck" style={styles.headerIconContainer}></i> */}
              </div>
            </div>

            {/* Form Container with Toggle Buttons */}
            <div style={styles.formWrapper}>
              {/* View Toggle Buttons - Top Right */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem',
                padding: '1.5rem 2rem 0 2rem'
              }}>
                <button
                  style={{
                    ...styles.viewToggleBtn,
                    ...(currentView === 'onboarding' ? styles.viewToggleBtnActive : styles.viewToggleBtnInactive),
                    ...(buttonHover === 'onboarding' ? styles.viewToggleBtnHover : {})
                  }}
                  onClick={() => setCurrentView('onboarding')}
                  onMouseEnter={() => handleButtonHover('onboarding')}
                  onMouseLeave={handleButtonLeave}
                >
                  <i className="bi bi-person-plus"></i>
                  Onboarding
                </button>
                <button
                  style={{
                    ...styles.viewToggleBtn,
                    ...(currentView === 'management' ? styles.viewToggleBtnActive : styles.viewToggleBtnInactive),
                    ...(buttonHover === 'management' ? styles.viewToggleBtnHover : {})
                  }}
                  onClick={() => setCurrentView('management')}
                  onMouseEnter={() => handleButtonHover('management')}
                  onMouseLeave={handleButtonLeave}
                >
                  <i className="bi bi-gear"></i>
                  Management
                </button>
              </div>

              {/* Onboarding Form View */}
              {currentView === 'onboarding' && (
                <form onSubmit={handleSubmit} style={styles.form}>
                  {/* Company Information Section */}
                  <div 
                    style={{
                      ...styles.formSection,
                      ...(hoveredSection === 'company' ? styles.formSectionHover : {})
                    }}
                    onMouseEnter={() => handleSectionHover('company')}
                    onMouseLeave={handleSectionLeave}
                  >
                    <div style={styles.sectionHeader}>
                      <h2 style={styles.sectionTitle}>
                        <i className="bi bi-building" style={{...styles.sectionIcon, color: '#2196f3'}}></i>
                        Company Information
                      </h2>
                      <div style={styles.sectionLine}></div>
                    </div>
                    
                    <div style={styles.formGrid}>
                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Vendor ID *</label>
                        <input
                          type="text"
                          name="vendorId"
                          value={formData.vendorId}
                          onChange={handleInputChange}
                          placeholder="Enter vendor ID"
                          style={{
                            ...styles.formInput,
                            ...(errors.vendorId ? styles.formInputError : {})
                          }}
                        />
                        {errors.vendorId && <div style={styles.errorMessage}>{errors.vendorId}</div>}
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Company Name *</label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="Enter company name"
                          style={{
                            ...styles.formInput,
                            ...(errors.companyName ? styles.formInputError : {})
                          }}
                        />
                        {errors.companyName && <div style={styles.errorMessage}>{errors.companyName}</div>}
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Contact Person *</label>
                        <input
                          type="text"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleInputChange}
                          placeholder="Enter contact person name"
                          style={{
                            ...styles.formInput,
                            ...(errors.contactPerson ? styles.formInputError : {})
                          }}
                        />
                        {errors.contactPerson && <div style={styles.errorMessage}>{errors.contactPerson}</div>}
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter email address"
                          style={{
                            ...styles.formInput,
                            ...(errors.email ? styles.formInputError : {})
                          }}
                        />
                        {errors.email && <div style={styles.errorMessage}>{errors.email}</div>}
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Phone Number *</label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="Enter phone number"
                          style={{
                            ...styles.formInput,
                            ...(errors.phoneNumber ? styles.formInputError : {})
                          }}
                        />
                        {errors.phoneNumber && <div style={styles.errorMessage}>{errors.phoneNumber}</div>}
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Business Type *</label>
                        <select
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleInputChange}
                          style={{
                            ...styles.formInput,
                            ...(errors.businessType ? styles.formInputError : {})
                          }}
                        >
                          <option value="">Select business type</option>
                          {businessTypeOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        {errors.businessType && <div style={styles.errorMessage}>{errors.businessType}</div>}
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Fleet Size *</label>
                        <select
                          name="fleetSize"
                          value={formData.fleetSize}
                          onChange={handleInputChange}
                          style={{
                            ...styles.formInput,
                            ...(errors.fleetSize ? styles.formInputError : {})
                          }}
                        >
                          <option value="">Select fleet size</option>
                          {fleetSizeOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        {errors.fleetSize && <div style={styles.errorMessage}>{errors.fleetSize}</div>}
                      </div>
                    </div>
                  </div>

                  {/* Address Section */}
                  <div 
                    style={{
                      ...styles.formSection,
                      ...(hoveredSection === 'address' ? styles.formSectionHover : {})
                    }}
                    onMouseEnter={() => handleSectionHover('address')}
                    onMouseLeave={handleSectionLeave}
                  >
                    <div style={styles.sectionHeader}>
                      <h2 style={styles.sectionTitle}>
                        <i className="bi bi-geo-alt" style={{...styles.sectionIcon, color: '#4caf50'}}></i>
                        Address Information
                      </h2>
                      <div style={styles.sectionLine}></div>
                    </div>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Complete Address *</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter complete address"
                        rows="3"
                        style={styles.formInput}
                      ></textarea>
                    </div>

                    <div style={styles.formGrid}>
                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Enter city"
                          style={styles.formInput}
                        />
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>State *</label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          style={styles.formInput}
                        >
                          <option value="">Select state</option>
                          {stateOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Pincode *</label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="Enter pincode"
                          maxLength="6"
                          style={styles.formInput}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business Documents Section */}
                  <div 
                    style={{
                      ...styles.formSection,
                      ...(hoveredSection === 'documents' ? styles.formSectionHover : {})
                    }}
                    onMouseEnter={() => handleSectionHover('documents')}
                    onMouseLeave={handleSectionLeave}
                  >
                    <div style={styles.sectionHeader}>
                      <h2 style={styles.sectionTitle}>
                        <i className="bi bi-file-earmark-text" style={{...styles.sectionIcon, color: '#ff9800'}}></i>
                        Business Documents
                      </h2>
                      <div style={styles.sectionLine}></div>
                    </div>
                    
                    <div style={styles.formGrid}>
                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>GST Number *</label>
                        <input
                          type="text"
                          name="gstNumber"
                          value={formData.gstNumber}
                          onChange={handleInputChange}
                          placeholder="Enter GST number"
                          style={{
                            ...styles.formInput,
                            ...(errors.gstNumber ? styles.formInputError : {})
                          }}
                        />
                        {errors.gstNumber && <div style={styles.errorMessage}>{errors.gstNumber}</div>}
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>PAN Number *</label>
                        <input
                          type="text"
                          name="panNumber"
                          value={formData.panNumber}
                          onChange={handleInputChange}
                          placeholder="Enter PAN number"
                          style={{
                            ...styles.formInput,
                            ...(errors.panNumber ? styles.formInputError : {})
                          }}
                        />
                        {errors.panNumber && <div style={styles.errorMessage}>{errors.panNumber}</div>}
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Company Registration Number *</label>
                        <input
                          type="text"
                          name="companyRegistrationNumber"
                          value={formData.companyRegistrationNumber}
                          onChange={handleInputChange}
                          placeholder="Enter company registration number"
                          style={{
                            ...styles.formInput,
                            ...(errors.companyRegistrationNumber ? styles.formInputError : {})
                          }}
                        />
                        {errors.companyRegistrationNumber && <div style={styles.errorMessage}>{errors.companyRegistrationNumber}</div>}
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Company Registration Date *</label>
                        <input
                          type="date"
                          name="companyRegistrationDate"
                          value={formData.companyRegistrationDate}
                          onChange={handleInputChange}
                          style={{
                            ...styles.formInput,
                            ...(errors.companyRegistrationDate ? styles.formInputError : {})
                          }}
                        />
                        {errors.companyRegistrationDate && <div style={styles.errorMessage}>{errors.companyRegistrationDate}</div>}
                      </div>
                    </div>
                  </div>

                  {/* Bank Details Section */}
                  <div 
                    style={{
                      ...styles.formSection,
                      ...(hoveredSection === 'bank' ? styles.formSectionHover : {})
                    }}
                    onMouseEnter={() => handleSectionHover('bank')}
                    onMouseLeave={handleSectionLeave}
                  >
                    <div style={styles.sectionHeader}>
                      <h2 style={styles.sectionTitle}>
                        <i className="bi bi-bank" style={{...styles.sectionIcon, color: '#e91e63'}}></i>
                        Bank Details
                      </h2>
                      <div style={styles.sectionLine}></div>
                    </div>
                    
                    <div style={styles.formGrid}>
                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Bank Name *</label>
                        <input
                          type="text"
                          name="bankName"
                          value={formData.bankName}
                          onChange={handleInputChange}
                          placeholder="Enter bank name"
                          style={styles.formInput}
                        />
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Account Number *</label>
                        <input
                          type="text"
                          name="accountNumber"
                          value={formData.accountNumber}
                          onChange={handleInputChange}
                          placeholder="Enter account number"
                          style={styles.formInput}
                        />
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>IFSC Code *</label>
                        <input
                          type="text"
                          name="ifscCode"
                          value={formData.ifscCode}
                          onChange={handleInputChange}
                          placeholder="Enter IFSC code"
                          style={styles.formInput}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Security Section */}
                  <div 
                    style={{
                      ...styles.formSection,
                      ...(hoveredSection === 'security' ? styles.formSectionHover : {})
                    }}
                    onMouseEnter={() => handleSectionHover('security')}
                    onMouseLeave={handleSectionLeave}
                  >
                    <div style={styles.sectionHeader}>
                      <h2 style={styles.sectionTitle}>
                        <i className="bi bi-shield-lock" style={{...styles.sectionIcon, color: '#3f51b5'}}></i>
                        Security
                      </h2>
                      <div style={styles.sectionLine}></div>
                    </div>
                    
                    <div style={styles.formGrid}>
                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Password *</label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter password"
                          style={{
                            ...styles.formInput,
                            ...(errors.password ? styles.formInputError : {})
                          }}
                        />
                        {errors.password && <div style={styles.errorMessage}>{errors.password}</div>}
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Confirm Password *</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm password"
                          style={{
                            ...styles.formInput,
                            ...(errors.confirmPassword ? styles.formInputError : {})
                          }}
                        />
                        {errors.confirmPassword && <div style={styles.errorMessage}>{errors.confirmPassword}</div>}
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div style={styles.formActions}>
                    <button
                      type="button"
                      onClick={handleReset}
                      style={{
                        ...styles.btn, 
                        ...styles.btnSecondary,
                        ...(buttonHover === 'reset' ? styles.btnSecondaryHover : {})
                      }}
                      disabled={isSubmitting}
                      onMouseEnter={() => handleButtonHover('reset')}
                      onMouseLeave={handleButtonLeave}
                    >
                      <i className="bi bi-arrow-clockwise"></i>
                      Reset Form
                    </button>
                    <button
                      type="submit"
                      style={{
                        ...styles.btn, 
                        ...styles.btnPrimary,
                        ...(buttonHover === 'submit' ? styles.btnPrimaryHover : {})
                      }}
                      disabled={isSubmitting}
                      onMouseEnter={() => handleButtonHover('submit')}
                      onMouseLeave={handleButtonLeave}
                    >
                      {isSubmitting ? 'Onboarding Vendor...' : (
                        <>
                          <i className="bi bi-truck"></i>
                          Onboard Vendor
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Management View */}
              {currentView === 'management' && (
                <div style={styles.form}>
                  {/* Vendor Details Table */}
                  <div style={styles.tableContainer}>
                    <h3 style={styles.tableTitle}>
                      <i className="bi bi-clipboard-data" style={styles.tableTitleIcon}></i>
                      Vendor Details
                    </h3>
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          <th style={styles.tableHeader}>Vendor ID</th>
                          <th style={styles.tableHeader}>Company Name</th>
                          <th style={styles.tableHeader}>Contact Person</th>
                          <th style={styles.tableHeader}>Email</th>
                          <th style={styles.tableHeader}>Phone</th>
                          <th style={styles.tableHeader}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendors.length > 0 ? (
                          vendors.map((vendor, idx) => (
                            <tr key={idx} style={idx % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                              <td style={styles.tableCell}>{vendor.vendorId}</td>
                              <td style={styles.tableCell}>{vendor.companyName}</td>
                              <td style={styles.tableCell}>{vendor.contactPerson}</td>
                              <td style={styles.tableCell}>{vendor.email}</td>
                              <td style={styles.tableCell}>{vendor.phoneNumber}</td>
                              <td style={styles.actionsCell}>
                                <button
                                  type="button"
                                  title="View"
                                  aria-label="View"
                                  style={{...styles.actionBtn, color: '#388e3c'}}
                                  onClick={() => handleView(vendor)}
                                >
                                  <i className="bi bi-eye" aria-hidden="true"></i>
                                </button>
                                <button
                                  type="button"
                                  title="Edit"
                                  aria-label="Edit"
                                  style={{...styles.actionBtn, color: '#1976d2'}}
                                  onClick={() => handleEdit(idx)}
                                >
                                  <i className="bi bi-pencil-square" aria-hidden="true"></i>
                                </button>
                                <button
                                  type="button"
                                  title="Delete"
                                  aria-label="Delete"
                                  style={{...styles.actionBtn, color: '#e74c3c'}}
                                  onClick={() => handleDelete(idx)}
                                >
                                  <i className="bi bi-trash" aria-hidden="true"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="17" style={styles.noRecordsCell}>
                              <i className="bi bi-inbox" style={styles.noRecordsIcon}></i>
                              No records found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Vendor Details Modal */}
            {showModal && selectedVendor && (
              <div style={styles.modalOverlay} onClick={handleCloseModal}>
                <div style={{...styles.modalContent, padding: 0, maxWidth: 900}} onClick={e => e.stopPropagation()}>
                  {/* Modal Header with gradient */}
                  <div style={{
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    padding: '1.5rem 2rem 1rem 2rem',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                      <i className="bi bi-clipboard-data" style={{fontSize: '2rem', color: 'white'}}></i>
                      <span style={{fontSize: '1.5rem', fontWeight: 700, color: 'white', letterSpacing: 1}}>
                        Vendor Details - {selectedVendor.companyName}
                      </span>
                    </div>
                    <button
                      style={{...styles.closeButton, color: 'white', background: 'rgba(255,255,255,0.08)'}}
                      onClick={handleCloseModal}
                      onMouseEnter={e => e.target.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={e => e.target.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                    >
                      ×
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div style={{padding: '2rem', maxHeight: '75vh', overflowY: 'auto'}}>
                    {/* Company Information Section */}
                    <div style={{background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px rgba(102,126,234,0.07)', marginBottom: 24, padding: '1.5rem', border: '1px solid #e3e6ea'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12}}>
                        <i className="bi bi-building" style={{fontSize: '1.3rem', color: '#2196f3'}}></i>
                        <span style={{fontWeight: 600, fontSize: '1.15rem'}}>Company Information</span>
                      </div>
                      <div style={{borderBottom: '2px solid #e3e6ea', marginBottom: 18}}></div>
                      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2.5rem'}}>
                        <div>
                          <div style={{fontWeight: 700, color: '#7b809a', fontSize: '0.95rem', marginBottom: 2}}>VENDOR ID</div>
                          <div style={{fontWeight: 500, color: '#222'}}>{selectedVendor.vendorId}</div>
                        </div>
                        <div>
                          <div style={{fontWeight: 700, color: '#7b809a', fontSize: '0.95rem', marginBottom: 2}}>COMPANY NAME</div>
                          <div style={{fontWeight: 500, color: '#222'}}>{selectedVendor.companyName}</div>
                        </div>
                        <div>
                          <div style={{fontWeight: 700, color: '#7b809a', fontSize: '0.95rem', marginBottom: 2}}>CONTACT PERSON</div>
                          <div style={{fontWeight: 500, color: '#222'}}>{selectedVendor.contactPerson}</div>
                        </div>
                        <div>
                          <div style={{fontWeight: 700, color: '#7b809a', fontSize: '0.95rem', marginBottom: 2}}>EMAIL ADDRESS</div>
                          <div style={{fontWeight: 500, color: '#222'}}>{selectedVendor.email}</div>
                        </div>
                        <div>
                          <div style={{fontWeight: 700, color: '#7b809a', fontSize: '0.95rem', marginBottom: 2}}>PHONE NUMBER</div>
                          <div style={{fontWeight: 500, color: '#222'}}>{selectedVendor.phoneNumber}</div>
                        </div>
                        <div>
                          <div style={{fontWeight: 700, color: '#7b809a', fontSize: '0.95rem', marginBottom: 2}}>BUSINESS TYPE</div>
                          <div style={{fontWeight: 500, color: '#222'}}>{selectedVendor.businessType}</div>
                        </div>
                        <div>
                          <div style={{fontWeight: 700, color: '#7b809a', fontSize: '0.95rem', marginBottom: 2}}>FLEET SIZE</div>
                          <div style={{fontWeight: 500, color: '#222'}}>{selectedVendor.fleetSize}</div>
                        </div>
                      </div>
                    </div>

                    {/* Address Information Section */}
                    <div style={{background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px rgba(102,126,234,0.07)', marginBottom: 24, padding: '1.5rem', border: '1px solid #e3e6ea'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12}}>
                        <i className="bi bi-geo-alt" style={{fontSize: '1.3rem', color: '#4caf50'}}></i>
                        <span style={{fontWeight: 600, fontSize: '1.15rem'}}>Address Information</span>
                      </div>
                      <div style={{borderBottom: '2px solid #e3e6ea', marginBottom: 18}}></div>
                      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2.5rem'}}>
                        <div>
                          <div style={{fontWeight: 700, color: '#7b809a', fontSize: '0.95rem', marginBottom: 2}}>ADDRESS</div>
                          <div style={{fontWeight: 500, color: '#222'}}>{selectedVendor.address}</div>
                        </div>
                        <div>
                          <div style={{fontWeight: 700, color: '#7b809a', fontSize: '0.95rem', marginBottom: 2}}>CITY</div>
                          <div style={{fontWeight: 500, color: '#222'}}>{selectedVendor.city}</div>
                        </div>
                        <div>
                          <div style={{fontWeight: 700, color: '#7b809a', fontSize: '0.95rem', marginBottom: 2}}>STATE</div>
                          <div style={{fontWeight: 500, color: '#222'}}>{selectedVendor.state}</div>
                        </div>
                        <div>
                          <div style={{fontWeight: 700, color: '#7b809a', fontSize: '0.95rem', marginBottom: 2}}>PINCODE</div>
                          <div style={{fontWeight: 500, color: '#222'}}>{selectedVendor.pincode}</div>
                        </div>
                      </div>
                    </div>

                    {/* Business Documents Section */}
                    <div style={{background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px rgba(102,126,234,0.07)', marginBottom: 24, padding: '1.5rem', border: '1px solid #e3e6ea'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12}}>
                        <i className="bi bi-file-earmark-text" style={{fontSize: '1.3rem', color: '#ff9800'}}></i>
                        <span style={{fontWeight: 600, fontSize: '1.15rem'}}>Business Documents</span>
                      </div>
                      <div style={{borderBottom: '2px solid #e3e6ea', marginBottom: 18}}></div>
                      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2.5rem'}}>
                        <div>
                          <div style={{fontWeight: 700, color: '#7b809a', fontSize: '0.95rem', marginBottom: 2}}>GST NUMBER</div>
                          <div style={{fontWeight: 500, color: '#222'}}>{selectedVendor.gstNumber}</div>
                        </div>
                        <div>
                          <div style={{fontWeight: 700, color: '#7b809a', fontSize: '0.95rem', marginBottom: 2}}>PAN NUMBER</div>
                          <div style={{fontWeight: 500, color: '#222'}}>{selectedVendor.panNumber}</div>
                        </div>
                        <div>
                          <div style={{fontWeight: 700, color: '#7b809a', fontSize: '0.95rem', marginBottom: 2}}>COMPANY REGISTRATION NUMBER</div>
                          <div style={{fontWeight: 500, color: '#222'}}>{selectedVendor.companyRegistrationNumber}</div>
                        </div>
                        <div>
                          <div style={{fontWeight: 700, color: '#7b809a', fontSize: '0.95rem', marginBottom: 2}}>COMPANY REGISTRATION DATE</div>
                          <div style={{fontWeight: 500, color: '#222'}}>{selectedVendor.companyRegistrationDate}</div>
                        </div>
                      </div>
                    </div>

                    {/* Banking Information Section */}
                    <div style={{background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px rgba(102,126,234,0.07)', marginBottom: 24, padding: '1.5rem', border: '1px solid #e3e6ea'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12}}>
                        <i className="bi bi-bank" style={{fontSize: '1.3rem', color: '#e91e63'}}></i>
                        <span style={{fontWeight: 600, fontSize: '1.15rem'}}>Banking Information</span>
                      </div>
                      <div style={{borderBottom: '2px solid #e3e6ea', marginBottom: 18}}></div>
                      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2.5rem'}}>
                        <div>
                          <div style={{fontWeight: 700, color: '#7b809a', fontSize: '0.95rem', marginBottom: 2}}>BANK NAME</div>
                          <div style={{fontWeight: 500, color: '#222'}}>{selectedVendor.bankName}</div>
                        </div>
                        <div>
                          <div style={{fontWeight: 700, color: '#7b809a', fontSize: '0.95rem', marginBottom: 2}}>ACCOUNT NUMBER</div>
                          <div style={{fontWeight: 500, color: '#222'}}>{selectedVendor.accountNumber}</div>
                        </div>
                        <div>
                          <div style={{fontWeight: 700, color: '#7b809a', fontSize: '0.95rem', marginBottom: 2}}>IFSC CODE</div>
                          <div style={{fontWeight: 500, color: '#222'}}>{selectedVendor.ifscCode}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
              <div style={styles.modalOverlay} onClick={handleCancelDelete}>
                <div style={{...styles.modalContent, padding: 0, maxWidth: 600}} onClick={e => e.stopPropagation()}>
                  {/* Modal Header with gradient and warning icon */}
                  <div style={{
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    padding: '1.5rem 2rem 1rem 2rem',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                      <i className="bi bi-exclamation-triangle" style={{fontSize: '2rem', color: '#ff5252'}}></i>
                      <span style={{fontSize: '1.5rem', fontWeight: 700, color: 'white', letterSpacing: 1}}>
                        Delete Vendor
                      </span>
                    </div>
                    <button
                      style={{...styles.closeButton, color: 'white', background: 'rgba(255,255,255,0.08)'}}
                      onClick={handleCancelDelete}
                      onMouseEnter={e => e.target.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={e => e.target.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                    >
                      ×
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div style={{padding: '2rem', maxHeight: '75vh', overflowY: 'auto'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24}}>
                      <div style={{
                        width: 56, height: 56, borderRadius: '50%', background: '#fff3f3',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16
                      }}>
                        <i className="bi bi-exclamation-circle" style={{fontSize: '2.2rem', color: '#ff5252'}}></i>
                      </div>
                      <div style={{fontWeight: 700, fontSize: '1.35rem', color: '#222', textAlign: 'center', marginBottom: 8}}>
                        Are you sure you want to delete this vendor?
                      </div>
                      <div style={{color: '#5a6c7d', fontSize: '1.05rem', textAlign: 'center', marginBottom: 0}}>
                        This action cannot be undone. The vendor <b>"{vendors[deleteIndex]?.companyName || ''}"</b> will be permanently removed from the system.
                      </div>
                    </div>
                    <div style={{marginBottom: 24}}>
                      <label style={{fontWeight: 700, color: '#222', fontSize: '1.05rem', marginBottom: 8, display: 'block'}}>Reason for Deletion <span style={{color: '#ff5252'}}>*</span></label>
                      <textarea
                        value={deleteReason}
                        onChange={(e) => setDeleteReason(e.target.value)}
                        placeholder="Please provide a reason for deleting this vendor..."
                        rows="3"
                        style={{
                          width: '100%',
                          borderRadius: 12,
                          border: '1.5px solid #d1d5db',
                          padding: '1rem',
                          fontSize: '1.05rem',
                          background: '#f5faff',
                          color: '#222',
                          outline: 'none',
                          resize: 'vertical',
                          minHeight: 80,
                          boxSizing: 'border-box',
                        }}
                      ></textarea>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: 32}}>
                      <button
                        type="button"
                        onClick={handleCancelDelete}
                        style={{
                          ...styles.btn,
                          border: '2px solid #e74c3c',
                          color: '#e74c3c',
                          background: '#fff',
                          fontWeight: 600,
                          minWidth: 120,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => e.target.style.background = '#fdeaea'}
                        onMouseLeave={e => e.target.style.background = '#fff'}
                      >
                        <i className="bi bi-x-circle"></i> Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirmDelete}
                        style={{
                          ...styles.btn,
                          ...(deleteReason.trim()
                            ? {
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                cursor: 'pointer',
                                opacity: 1,
                              }
                            : {
                                background: '#e0e3ea',
                                color: '#888',
                                cursor: 'not-allowed',
                                opacity: 0.6,
                              }),
                          fontWeight: 600,
                          minWidth: 160,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                          border: 'none',
                        }}
                        disabled={!deleteReason.trim()}
                      >
                        <i className="bi bi-trash"></i> Delete Vendor
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VendorOnboarding;