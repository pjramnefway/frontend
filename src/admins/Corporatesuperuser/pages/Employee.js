import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const initialState = {
  name: '',
  employeeId: '',
  email: '',
  phone: '',
  department: '',
  designation: '',
  officeLocation: '',
  shift: '',
  pickup: '',
  drop: '',
  routeNumber: '',
  emergencyContact: '',
  gender: '',
  dob: '',
  doj: '',
};

const Employee = () => {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showManagement, setShowManagement] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [viewEmployee, setViewEmployee] = useState(null);
  const [editEmployee, setEditEmployee] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteEmployee, setDeleteEmployee] = useState(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [currentView, setCurrentView] = useState('onboarding');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else if (name === 'phone' || name === 'emergencyContact') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setForm((prev) => ({ ...prev, [name]: digits }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, form[name]);
  };

  const validateField = (name, value) => {
    let error = '';
    if (name === 'email') {
      if (!value.trim()) error = 'Email is required';
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) error = 'Invalid email';
    }
    if (name === 'phone') {
      if (!value.trim()) error = 'Phone is required';
      else if (!/^\d{10}$/.test(value)) error = 'Phone must be 10 digits';
    }
    if (name === 'name') {
      if (!value.trim()) error = 'Full Name is required';
    }
    if (name === 'employeeId') {
      if (!value.trim()) error = 'Employee ID is required';
    }
    if (name === 'department') {
      if (!value.trim()) error = 'Department is required';
    }
    if (name === 'designation') {
      if (!value.trim()) error = 'Designation is required';
    }
    if (name === 'officeLocation') {
      if (!value.trim()) error = 'Office Location is required';
    }
    if (name === 'shift') {
      if (!value) error = 'Shift is required';
    }
    if (name === 'pickup') {
      if (!value.trim()) error = 'Pickup Address is required';
    }
    if (name === 'drop') {
      if (!value.trim()) error = 'Drop Address is required';
    }
    if (name === 'gender') {
      if (!value) error = 'Gender is required';
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full Name is required';
    if (!form.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (!/^\d{10}$/.test(form.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!form.dob) newErrors.dob = 'Date of Birth is required';
    if (!form.doj) newErrors.doj = 'Date of Joining is required';
    if (!form.department.trim()) newErrors.department = 'Department is required';
    if (!form.designation.trim()) newErrors.designation = 'Designation is required';
    if (!form.officeLocation.trim()) newErrors.officeLocation = 'Office Location is required';
    if (!form.shift) newErrors.shift = 'Shift is required';
    if (!form.pickup.trim()) newErrors.pickup = 'Pickup Address is required';
    if (!form.drop.trim()) newErrors.drop = 'Drop Address is required';
    if (!form.gender) newErrors.gender = 'Gender is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      employeeId: true,
      email: true,
      phone: true,
      department: true,
      designation: true,
      officeLocation: true,
      shift: true,
      pickup: true,
      drop: true,
      gender: true,
      dob: true,
      doj: true,
    });
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }
    setSubmitted(true);
    setErrors({});
    const newEmployee = {
      id: employees.length + 1,
      ...form
    };
    setEmployees((prev) => [...prev, newEmployee]);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      setForm({
        name: '',
        employeeId: '',
        email: '',
        phone: '',
        department: '',
        designation: '',
        officeLocation: '',
        shift: '',
        pickup: '',
        drop: '',
        routeNumber: '',
        emergencyContact: '',
        gender: '',
        dob: '',
        doj: '',
      });
      setErrors({});
      setTouched({});
      setShowManagement(true);
    }, 2000);
  };

  const handleDelete = (id) => {
    // Implement delete logic
  };

  const handleView = (emp) => {
    // Implement view logic
  };

  const closeViewModal = () => {
    // Implement close view logic
  };

  const handleEdit = (emp) => {
    setEditEmployee(emp);
    setEditForm({ ...emp });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setEmployees(prev => prev.map(emp => 
      emp.id === editEmployee.id ? { ...editForm, id: emp.id } : emp
    ));
    setEditEmployee(null);
    setEditForm({});
  };

  const closeEditModal = () => {
    setEditEmployee(null);
    setEditForm({});
  };

  const handleDeleteClick = (emp) => {
    setDeleteEmployee(emp);
  };

  const confirmDelete = () => {
    if (!deleteReason.trim()) {
      alert('Please provide a reason for deletion');
      return;
    }
    setEmployees(prev => prev.filter(emp => emp.id !== deleteEmployee.id));
    setDeleteEmployee(null);
    setDeleteReason('');
  };

  const cancelDelete = () => {
    setDeleteEmployee(null);
    setDeleteReason('');
  };

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-main">
        <Sidebar />
        <div className="admin-content">
          <div className="employee-enroll-center">
            <style>{`
              .employee-enroll-center {
                min-height: calc(100vh - 80px);
                display: flex;
                align-items: flex-start;
                justify-content: center;
                padding: 40px 0;
              }
              .employee-card {
                background: rgba(255,255,255,0.95);
                border-radius: 22px;
                box-shadow: 0 4px 32px rgba(34,51,107,0.10), 0 1.5px 8px rgba(34,51,107,0.06);
                padding: 40px 36px 32px 36px;
                max-width: 1200px;
                width: 100%;
                margin: 0 auto;
                position: relative;
                border: none;
                transition: box-shadow 0.3s;
              }
              .employee-card:hover {
                box-shadow: 0 8px 40px rgba(34,51,107,0.16), 0 2px 12px rgba(34,51,107,0.10);
              }
              .employee-title {
                font-size: 2.2rem;
                font-weight: 800;
                color: #22336b;
                margin-bottom: 10px;
                text-align: left;
                letter-spacing: 0.5px;
              }
              .employee-section-header {
                font-size: 1.15rem;
                font-weight: 700;
                color: #2563eb;
                margin: 18px 0 8px 0;
                letter-spacing: 0.2px;
              }
              .employee-form-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 24px 32px;
              }
              .employee-form-group {
                display: flex;
                flex-direction: column;
                margin-bottom: 0;
                position: relative;
              }
              .employee-form-group .input-icon {
                position: absolute;
                left: 12px;
                top: 38px;
                color: #3b82f6;
                font-size: 1.1rem;
                pointer-events: none;
                z-index: 2;
                transition: color 0.2s;
              }
              .employee-form-group label {
                font-weight: 600;
                color: #22336b;
                margin-bottom: 6px;
                font-size: 1rem;
                letter-spacing: 0.1px;
              }
              .employee-form-group input,
              .employee-form-group select {
                padding: 10px 12px 10px 38px;
                border: 1.5px solid #d1d5db;
                border-radius: 8px;
                font-size: 1rem;
                background: #f8fafc;
                color: #22336b;
                font-weight: 500;
                transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
                box-shadow: 0 1px 2px rgba(34,51,107,0.03);
              }
              .employee-form-group input:focus,
              .employee-form-group select:focus {
                border-color: #3b82f6;
                outline: none;
                background: #fff;
                box-shadow: 0 0 0 2px #a5b4fc;
              }
              .employee-form-group .error-text {
                color: #e53935;
                font-size: 0.82rem;
                margin-top: 2px;
                margin-bottom: 2px;
                font-weight: 500;
              }
              .employee-form-group .phone-row {
                display: flex;
                align-items: center;
                position: relative;
              }
              .employee-form-group .phone-prefix {
                background: #f0fdf4;
                border: 1.5px solid #d1d5db;
                border-radius: 8px 0 0 8px;
                padding: 10px 8px;
                color: #059669;
                font-weight: 700;
                font-size: 1rem;
                border-right: none;
                transition: background 0.2s, color 0.2s;
              }
              .employee-form-group .phone-input {
                border-radius: 0 8px 8px 0;
                border-left: none;
                flex: 1;
                padding-left: 12px !important;
              }
              .employee-form-actions {
                margin-top: 36px;
                display: flex;
                justify-content: flex-end;
              }
              .employee-btn {
                background: linear-gradient(90deg, #2563eb 0%, #22c55e 100%);
                color: #fff;
                border: none;
                border-radius: 8px;
                padding: 13px 36px;
                font-size: 1.15rem;
                font-weight: 800;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(59,130,246,0.10);
                transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
                letter-spacing: 0.2px;
              }
              .employee-btn:hover {
                background: linear-gradient(90deg, #1d4ed8 0%, #16a34a 100%);
                box-shadow: 0 4px 16px rgba(34,51,107,0.13);
                transform: translateY(-2px) scale(1.03);
              }
              @media (max-width: 900px) {
                .employee-card {
                  padding: 18px 6px;
                }
                .employee-form-grid {
                  grid-template-columns: 1fr;
                  gap: 18px 0;
                }
                .employee-title {
                  font-size: 1.5rem;
                }
              }
              @media (max-width: 600px) {
                .employee-card {
                  padding: 8px 2px;
                  border-radius: 12px;
                }
                .employee-title {
                  font-size: 1.1rem;
                }
                .employee-section-header {
                  font-size: 1rem;
                }
              }
              .modal-success {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(34, 51, 107, 0.18);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
              }
              .modal-box-success {
                background: #fff;
                border-radius: 16px;
                box-shadow: 0 4px 32px rgba(34,51,107,0.18);
                padding: 36px 40px 28px 40px;
                min-width: 320px;
                max-width: 90vw;
                text-align: center;
                position: relative;
                animation: modalPop 0.35s cubic-bezier(.68,-0.55,.27,1.55);
              }
              @keyframes modalPop {
                0% { transform: scale(0.85); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
              }
              .success-icon {
                font-size: 2.8rem;
                color: #22c55e;
                margin-bottom: 12px;
                animation: iconPop 0.5s cubic-bezier(.68,-0.55,.27,1.55);
              }
              @keyframes iconPop {
                0% { transform: scale(0.7); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
              }
              .success-title {
                font-size: 1.4rem;
                font-weight: 700;
                color: #22336b;
                margin-bottom: 6px;
              }
              .success-msg {
                color: #4b5563;
                font-size: 1.05rem;
                margin-bottom: 10px;
              }
              .close-btn {
                position: absolute;
                top: 10px;
                right: 16px;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #22336b;
                cursor: pointer;
                font-weight: 700;
                transition: color 0.2s;
              }
              .close-btn:hover {
                color: #e53935;
              }
              .employee-card-header-abs {
                position: absolute;
                top: 18px;
                right: 32px;
                z-index: 100;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: 8px;
              }
              .tab-btn {
                background: linear-gradient(90deg, #2563eb 0%, #22c55e 100%);
                color: #fff;
                border: none;
                border-radius: 8px;
                padding: 10px 24px;
                font-size: 1rem;
                font-weight: 700;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(59,130,246,0.10);
                transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
                letter-spacing: 0.2px;
                z-index: 11;
              }
              .tab-btn:hover {
                background: linear-gradient(90deg, #1d4ed8 0%, #16a34a 100%);
                box-shadow: 0 4px 16px rgba(34,51,107,0.13);
                transform: translateY(-2px) scale(1.03);
              }
              .tab-btn.active {
                background: linear-gradient(90deg, #1d4ed8 0%, #16a34a 100%);
                box-shadow: 0 4px 16px rgba(34,51,107,0.13);
                transform: translateY(-2px) scale(1.03);
              }
              .tab-btn.inactive {
                background: #f8fafc;
                color: #22336b;
                border: 1.5px solid #d1d5db;
                box-shadow: 0 1px 2px rgba(34,51,107,0.03);
              }
              .tab-btn.inactive:hover {
                background: #e5e7eb;
                transform: translateY(-1px) scale(1.02);
              }
              .management-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(34, 51, 107, 0.18);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
              }
              .management-box {
                background: #fff;
                border-radius: 16px;
                box-shadow: 0 4px 32px rgba(34,51,107,0.18);
                padding: 32px 24px 24px 24px;
                min-width: 340px;
                max-width: 96vw;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
              }
              .management-title {
                font-size: 1.3rem;
                font-weight: 700;
                color: #22336b;
                margin-bottom: 18px;
                text-align: left;
              }
              .management-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 12px;
                font-size: 0.98rem;
                table-layout: fixed;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(34,51,107,0.08);
              }
              .management-table th, .management-table td {
                border: 1px solid #e5e7eb;
                padding: 8px 12px;
                text-align: left;
                font-size: 0.98rem;
                word-wrap: break-word;
                overflow-wrap: break-word;
                vertical-align: top;
              }
              .management-table th {
                background: #f0fdf4;
                color: #2563eb;
                font-weight: 700;
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                white-space: nowrap;
                padding: 8px 12px;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .management-table td {
                background: #f8fafc;
                max-width: 120px;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .management-table tr:hover td {
                background: #f8fafc;
                transition: background-color 0.2s ease;
              }
              .management-table td.long-text {
                max-width: 150px;
                white-space: normal;
                word-break: break-word;
              }
              .management-table td.actions-cell {
                max-width: 120px;
                text-align: center;
                white-space: nowrap;
                padding: 8px 12px;
                min-width: 120px;
              }
              .management-table td.id-cell {
                max-width: 80px;
                font-family: 'Courier New', monospace;
                font-weight: 600;
                color: #2563eb;
              }
              .management-table td.email-cell {
                max-width: 180px;
                font-size: 0.8rem;
                color: #374151;
              }
              .management-table td.phone-cell {
                max-width: 100px;
                font-family: 'Courier New', monospace;
                font-weight: 600;
                color: #059669;
              }
              .management-actions button {
                margin-right: 8px;
                background: none;
                border: none;
                cursor: pointer;
                font-size: 1rem;
                color: #2563eb;
                transition: color 0.2s;
                padding: 4px;
                border-radius: 4px;
                display: inline-block;
                min-width: 24px;
                height: 24px;
                line-height: 1;
              }
              .management-actions button:last-child {
                margin-right: 0;
              }
              .management-actions button.delete-btn {
                color: #e53935;
              }
              .management-actions button.view-btn:hover {
                color: #2563eb;
                background: rgba(37, 99, 235, 0.1);
              }
              .management-actions button.edit-btn:hover {
                color: #f59e0b;
                background: rgba(245, 158, 11, 0.1);
              }
              .management-actions button.delete-btn:hover {
                color: #e53935;
                background: rgba(229, 57, 53, 0.1);
              }
              .view-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(34, 51, 107, 0.18);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
              }
              .view-box {
                background: #fff;
                border-radius: 16px;
                box-shadow: 0 4px 32px rgba(34,51,107,0.18);
                padding: 32px 32px 24px 32px;
                min-width: 320px;
                max-width: 90vw;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
              }
              .view-title {
                font-size: 1.2rem;
                font-weight: 700;
                color: #22336b;
                margin-bottom: 12px;
                text-align: left;
              }
              .view-details {
                font-size: 1.05rem;
                color: #22336b;
                margin-bottom: 8px;
              }
              .close-btn-modal {
                position: absolute;
                top: 10px;
                right: 16px;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #22336b;
                cursor: pointer;
                font-weight: 700;
                transition: color 0.2s;
              }
              .close-btn-modal:hover {
                color: #e53935;
              }
              .management-card {
                background: rgba(255,255,255,0.95);
                border-radius: 22px;
                box-shadow: 0 4px 32px rgba(34,51,107,0.10), 0 1.5px 8px rgba(34,51,107,0.06);
                padding: 40px 36px 32px 36px;
                max-width: 1200px;
                width: 100%;
                margin: 0 auto;
                position: relative;
                border: none;
                transition: box-shadow 0.3s;
              }
              .no-employees {
                text-align: center;
                color: #6b7280;
                font-style: italic;
                padding: 20px;
              }
              .delete-confirmation-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                backdrop-filter: blur(4px);
              }
              .delete-confirmation-box {
                background: #ffffff;
                border-radius: 16px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                padding: 32px 40px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                animation: modalSlideIn 0.3s ease-out;
              }
              @keyframes modalSlideIn {
                0% { transform: translateY(-50px); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
              }
              .delete-icon {
                font-size: 3rem;
                color: #e53935;
                margin-bottom: 16px;
                animation: iconPulse 2s infinite;
              }
              @keyframes iconPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
              }
              .delete-title {
                font-size: 1.4rem;
                font-weight: 700;
                color: #1f2937;
                margin-bottom: 8px;
              }
              .delete-message {
                color: #6b7280;
                font-size: 1rem;
                margin-bottom: 24px;
                line-height: 1.5;
              }
              .delete-employee-name {
                color: #e53935;
                font-weight: 600;
                font-size: 1.1rem;
              }
              .delete-actions {
                display: flex;
                gap: 12px;
                justify-content: center;
              }
              .delete-btn-cancel {
                padding: 12px 24px;
                border: 2px solid #d1d5db;
                border-radius: 8px;
                background: #ffffff;
                color: #374151;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
              }
              .delete-btn-cancel:hover {
                background: #f9fafb;
                border-color: #9ca3af;
                transform: translateY(-1px);
              }
              .delete-btn-confirm {
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                background: linear-gradient(135deg, #e53935 0%, #c62828 100%);
                color: #ffffff;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0 2px 8px rgba(229, 57, 53, 0.3);
              }
              .delete-btn-confirm:hover {
                background: linear-gradient(135deg, #c62828 0%, #b71c1c 100%);
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(229, 57, 53, 0.4);
              }
            `}</style>
            {showModal && (
              <div className="modal-success">
                <div className="modal-box-success">
                  <button className="close-btn" onClick={() => setShowModal(false)} title="Close">&times;</button>
                  <div className="success-icon"><i className="fas fa-check-circle"></i></div>
                  <div className="success-title">Employee added successfully!</div>
                  <div className="success-msg">The employee has been enrolled for cab service.</div>
                </div>
              </div>
            )}
            {!showManagement ? (
              <form className="employee-card employee-form" onSubmit={handleSubmit} autoComplete="off">
                <div className="employee-card-header-abs">
                  <button className={`tab-btn ${!showManagement ? 'active' : 'inactive'}`} onClick={() => setShowManagement(false)}>
                    Onboarding
                  </button>
                  <button className={`tab-btn ${showManagement ? 'active' : 'inactive'}`} onClick={() => setShowManagement(true)}>
                    Management
                  </button>
                </div>
                <div className="employee-title">Employee Onboarding</div>
                <div className="employee-section-header">Personal Details</div>
                <div className="employee-form-grid">
                  <div className="employee-form-group">
                    <label htmlFor="name">Full Name*</label>
                    <span className="input-icon"><i className="fas fa-user"></i></span>
                    <input type="text" id="name" name="name" value={form.name} onChange={handleChange} onBlur={handleBlur} className={errors.name && touched.name ? 'input-error' : ''} placeholder="Enter full name" required />
                    {errors.name && touched.name && <div className="error-text">{errors.name}</div>}
                  </div>
                  <div className="employee-form-group">
                    <label htmlFor="employeeId">Employee ID*</label>
                    <span className="input-icon"><i className="fas fa-id-badge"></i></span>
                    <input type="text" id="employeeId" name="employeeId" value={form.employeeId} onChange={handleChange} onBlur={handleBlur} className={errors.employeeId && touched.employeeId ? 'input-error' : ''} placeholder="Enter employee ID" required />
                    {errors.employeeId && touched.employeeId && <div className="error-text">{errors.employeeId}</div>}
                  </div>
                  <div className="employee-form-group">
                    <label htmlFor="email">Email Address*</label>
                    <span className="input-icon"><i className="fas fa-envelope"></i></span>
                    <input type="email" id="email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} className={errors.email && touched.email ? 'input-error' : ''} placeholder="Enter email address" required />
                    {errors.email && touched.email && <div className="error-text">{errors.email}</div>}
                  </div>
                  <div className="employee-form-group">
                    <label htmlFor="phone">Contact Number*</label>
                    <div className="phone-row">
                      <span className="phone-prefix">+91</span>
                      <input type="text" id="phone" name="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur} maxLength={10} pattern="[0-9]{10}" className={`phone-input${errors.phone && touched.phone ? ' input-error' : ''}`} placeholder="Enter 10-digit number" required autoComplete="off" inputMode="numeric" />
                    </div>
                    {errors.phone && touched.phone && <div className="error-text">{errors.phone}</div>}
                  </div>
                  <div className="employee-form-group">
                    <label htmlFor="gender">Gender*</label>
                    <span className="input-icon"><i className="fas fa-venus-mars"></i></span>
                    <select id="gender" name="gender" value={form.gender} onChange={handleChange} onBlur={handleBlur} className={errors.gender && touched.gender ? 'input-error' : ''} required>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && touched.gender && <div className="error-text">{errors.gender}</div>}
                  </div>
                  <div className="employee-form-group">
                    <label htmlFor="dob">Date of Birth*</label>
                    <span className="input-icon"><i className="fas fa-calendar-alt"></i></span>
                    <input type="date" id="dob" name="dob" value={form.dob} onChange={handleChange} onBlur={handleBlur} className={errors.dob && touched.dob ? 'input-error' : ''} required />
                    {errors.dob && touched.dob && <div className="error-text">{errors.dob}</div>}
                  </div>
                  <div className="employee-form-group">
                    <label htmlFor="doj">Date of Joining*</label>
                    <span className="input-icon"><i className="fas fa-calendar-check"></i></span>
                    <input type="date" id="doj" name="doj" value={form.doj} onChange={handleChange} onBlur={handleBlur} className={errors.doj && touched.doj ? 'input-error' : ''} required />
                    {errors.doj && touched.doj && <div className="error-text">{errors.doj}</div>}
                  </div>
                </div>
                <div className="employee-section-header">Work Details</div>
                <div className="employee-form-grid">
                  <div className="employee-form-group">
                    <label htmlFor="department">Department*</label>
                    <span className="input-icon"><i className="fas fa-building"></i></span>
                    <input type="text" id="department" name="department" value={form.department} onChange={handleChange} onBlur={handleBlur} className={errors.department && touched.department ? 'input-error' : ''} placeholder="Enter department name" required />
                    {errors.department && touched.department && <div className="error-text">{errors.department}</div>}
                  </div>
                  <div className="employee-form-group">
                    <label htmlFor="designation">Designation*</label>
                    <span className="input-icon"><i className="fas fa-briefcase"></i></span>
                    <input type="text" id="designation" name="designation" value={form.designation} onChange={handleChange} onBlur={handleBlur} className={errors.designation && touched.designation ? 'input-error' : ''} placeholder="Enter job title" required />
                    {errors.designation && touched.designation && <div className="error-text">{errors.designation}</div>}
                  </div>
                  <div className="employee-form-group">
                    <label htmlFor="officeLocation">Office Location*</label>
                    <span className="input-icon"><i className="fas fa-map-marker-alt"></i></span>
                    <input type="text" id="officeLocation" name="officeLocation" value={form.officeLocation} onChange={handleChange} onBlur={handleBlur} className={errors.officeLocation && touched.officeLocation ? 'input-error' : ''} placeholder="Enter office location" required />
                    {errors.officeLocation && touched.officeLocation && <div className="error-text">{errors.officeLocation}</div>}
                  </div>
                  <div className="employee-form-group">
                    <label htmlFor="shift">Shift*</label>
                    <span className="input-icon"><i className="fas fa-clock"></i></span>
                    <select id="shift" name="shift" value={form.shift} onChange={handleChange} onBlur={handleBlur} className={errors.shift && touched.shift ? 'input-error' : ''} required>
                      <option value="">Select Shift</option>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Night">Night</option>
                    </select>
                    {errors.shift && touched.shift && <div className="error-text">{errors.shift}</div>}
                  </div>
                </div>
                <div className="employee-section-header">Transportation Details</div>
                <div className="employee-form-grid">
                  <div className="employee-form-group">
                    <label htmlFor="pickup">Pickup Address*</label>
                    <span className="input-icon"><i className="fas fa-map-pin"></i></span>
                    <input type="text" id="pickup" name="pickup" value={form.pickup} onChange={handleChange} onBlur={handleBlur} className={errors.pickup && touched.pickup ? 'input-error' : ''} placeholder="Enter pickup location" required />
                    {errors.pickup && touched.pickup && <div className="error-text">{errors.pickup}</div>}
                  </div>
                  <div className="employee-form-group">
                    <label htmlFor="drop">Drop Address*</label>
                    <span className="input-icon"><i className="fas fa-map-pin"></i></span>
                    <input type="text" id="drop" name="drop" value={form.drop} onChange={handleChange} onBlur={handleBlur} className={errors.drop && touched.drop ? 'input-error' : ''} placeholder="Enter drop location" required />
                    {errors.drop && touched.drop && <div className="error-text">{errors.drop}</div>}
                  </div>
                  <div className="employee-form-group">
                    <label htmlFor="routeNumber">Route Number (optional)</label>
                    <span className="input-icon"><i className="fas fa-route"></i></span>
                    <input type="text" id="routeNumber" name="routeNumber" value={form.routeNumber} onChange={handleChange} placeholder="Enter route number (optional)" />
                  </div>
                  <div className="employee-form-group">
                    <label htmlFor="emergencyContact">Emergency Contact (optional)</label>
                    <div className="phone-row">
                      <span className="phone-prefix">+91</span>
                      <input type="text" id="emergencyContact" name="emergencyContact" value={form.emergencyContact} onChange={handleChange} maxLength={10} pattern="[0-9]{10}" className="phone-input" placeholder="Enter 10-digit number" autoComplete="off" inputMode="numeric" />
                    </div>
                  </div>
                </div>
                <div className="employee-form-actions">
                  <button className="employee-btn" type="submit">Enroll Employee</button>
                </div>
              </form>
            ) : (
              <div className="management-card">
                <div className="employee-card-header-abs">
                  <button className={`tab-btn ${!showManagement ? 'active' : 'inactive'}`} onClick={() => setShowManagement(false)}>
                    Onboarding
                  </button>
                  <button className={`tab-btn ${showManagement ? 'active' : 'inactive'}`} onClick={() => setShowManagement(true)}>
                    Management
                  </button>
                </div>
                <div className="management-title">Employee Management</div>
                <table className="management-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>ID</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Gender</th>
                      <th>Dept</th>
                      <th>Designation</th>
                      <th>Shift</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.length === 0 ? (
                      <tr><td colSpan="9" className="no-employees">No employees added yet.</td></tr>
                    ) : employees.map(emp => (
                      <tr key={emp.id}>
                        <td className="long-text">{emp.name}</td>
                        <td className="id-cell">{emp.employeeId}</td>
                        <td className="email-cell">{emp.email}</td>
                        <td className="phone-cell">+91 {emp.phone}</td>
                        <td>{emp.gender}</td>
                        <td className="long-text">{emp.department}</td>
                        <td className="long-text">{emp.designation}</td>
                        <td>{emp.shift}</td>
                        <td className="actions-cell">
                          <div style={{display: 'flex', gap: '8px', justifyContent: 'center'}}>
                            <button 
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '16px',
                                color: '#2563eb',
                                padding: '6px',
                                borderRadius: '4px',
                                transition: 'all 0.2s'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.background = 'rgba(37, 99, 235, 0.1)';
                                e.target.style.transform = 'scale(1.1)';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.background = 'none';
                                e.target.style.transform = 'scale(1)';
                              }}
                              title="View Details" 
                              onClick={() => setViewEmployee(emp)}
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button 
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '16px',
                                color: '#2563eb',
                                padding: '6px',
                                borderRadius: '4px',
                                transition: 'all 0.2s'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.background = 'rgba(245, 158, 11, 0.1)';
                                e.target.style.color = '#f59e0b';
                                e.target.style.transform = 'scale(1.1)';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.background = 'none';
                                e.target.style.color = '#2563eb';
                                e.target.style.transform = 'scale(1)';
                              }}
                              title="Edit Employee" 
                              onClick={() => handleEdit(emp)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '16px',
                                color: '#e53935',
                                padding: '6px',
                                borderRadius: '4px',
                                transition: 'all 0.2s'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.background = 'rgba(229, 57, 53, 0.1)';
                                e.target.style.transform = 'scale(1.1)';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.background = 'none';
                                e.target.style.transform = 'scale(1)';
                              }}
                              title="Delete Employee" 
                              onClick={() => handleDeleteClick(emp)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {viewEmployee && (
                  <div className="view-modal">
                    <div className="view-box" style={{minWidth: '600px', maxWidth: '90vw', padding: '32px 40px'}}>
                      <button className="close-btn-modal" onClick={() => setViewEmployee(null)} title="Close">&times;</button>
                      <div className="view-title" style={{fontSize: '1.5rem', marginBottom: '24px', textAlign: 'center', color: '#22336b', borderBottom: '2px solid #e5e7eb', paddingBottom: '12px'}}>
                        <i className="fas fa-user-circle" style={{marginRight: '8px', color: '#2563eb'}}></i>
                        Employee Details
                      </div>
                      
                      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
                        <div style={{background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
                          <h3 style={{fontSize: '1.1rem', fontWeight: '700', color: '#2563eb', marginBottom: '16px', display: 'flex', alignItems: 'center'}}>
                            <i className="fas fa-user" style={{marginRight: '8px'}}></i>
                            Personal Information
                          </h3>
                          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9'}}>
                              <span style={{fontWeight: '600', color: '#374151'}}>Full Name:</span>
                              <span style={{color: '#22336b', fontWeight: '500'}}>{viewEmployee.name}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9'}}>
                              <span style={{fontWeight: '600', color: '#374151'}}>Employee ID:</span>
                              <span style={{color: '#22336b', fontWeight: '500'}}>{viewEmployee.employeeId}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9'}}>
                              <span style={{fontWeight: '600', color: '#374151'}}>Email:</span>
                              <span style={{color: '#22336b', fontWeight: '500'}}>{viewEmployee.email}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9'}}>
                              <span style={{fontWeight: '600', color: '#374151'}}>Phone:</span>
                              <span style={{color: '#22336b', fontWeight: '500'}}>+91 {viewEmployee.phone}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9'}}>
                              <span style={{fontWeight: '600', color: '#374151'}}>Gender:</span>
                              <span style={{color: '#22336b', fontWeight: '500'}}>{viewEmployee.gender}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9'}}>
                              <span style={{fontWeight: '600', color: '#374151'}}>Date of Birth:</span>
                              <span style={{color: '#22336b', fontWeight: '500'}}>{viewEmployee.dob ? new Date(viewEmployee.dob).toLocaleDateString() : 'Not provided'}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9'}}>
                              <span style={{fontWeight: '600', color: '#374151'}}>Date of Joining:</span>
                              <span style={{color: '#22336b', fontWeight: '500'}}>{viewEmployee.doj ? new Date(viewEmployee.doj).toLocaleDateString() : 'Not provided'}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0'}}>
                              <span style={{fontWeight: '600', color: '#374151'}}>Emergency Contact:</span>
                              <span style={{color: '#22336b', fontWeight: '500'}}>{viewEmployee.emergencyContact ? `+91 ${viewEmployee.emergencyContact}` : 'Not provided'}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div style={{background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
                          <h3 style={{fontSize: '1.1rem', fontWeight: '700', color: '#2563eb', marginBottom: '16px', display: 'flex', alignItems: 'center'}}>
                            <i className="fas fa-briefcase" style={{marginRight: '8px'}}></i>
                            Work Information
                          </h3>
                          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9'}}>
                              <span style={{fontWeight: '600', color: '#374151'}}>Department:</span>
                              <span style={{color: '#22336b', fontWeight: '500'}}>{viewEmployee.department}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9'}}>
                              <span style={{fontWeight: '600', color: '#374151'}}>Designation:</span>
                              <span style={{color: '#22336b', fontWeight: '500'}}>{viewEmployee.designation}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9'}}>
                              <span style={{fontWeight: '600', color: '#374151'}}>Office Location:</span>
                              <span style={{color: '#22336b', fontWeight: '500'}}>{viewEmployee.officeLocation}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0'}}>
                              <span style={{fontWeight: '600', color: '#374151'}}>Shift:</span>
                              <span style={{color: '#22336b', fontWeight: '500'}}>{viewEmployee.shift}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div style={{background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', marginTop: '20px'}}>
                        <h3 style={{fontSize: '1.1rem', fontWeight: '700', color: '#2563eb', marginBottom: '16px', display: 'flex', alignItems: 'center'}}>
                          <i className="fas fa-route" style={{marginRight: '8px'}}></i>
                          Transportation Details
                        </h3>
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9'}}>
                              <span style={{fontWeight: '600', color: '#374151'}}>Pickup Address:</span>
                              <span style={{color: '#22336b', fontWeight: '500', textAlign: 'right', maxWidth: '200px'}}>{viewEmployee.pickup}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0'}}>
                              <span style={{fontWeight: '600', color: '#374151'}}>Route Number:</span>
                              <span style={{color: '#22336b', fontWeight: '500'}}>{viewEmployee.routeNumber || 'Not assigned'}</span>
                            </div>
                          </div>
                          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9'}}>
                              <span style={{fontWeight: '600', color: '#374151'}}>Drop Address:</span>
                              <span style={{color: '#22336b', fontWeight: '500', textAlign: 'right', maxWidth: '200px'}}>{viewEmployee.drop}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {editEmployee && (
                  <div className="view-modal">
                    <div className="view-box" style={{minWidth: '500px', maxWidth: '90vw'}}>
                      <button className="close-btn-modal" onClick={closeEditModal} title="Close">&times;</button>
                      <div className="view-title">Edit Employee</div>
                      <form onSubmit={handleEditSubmit}>
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px'}}>
                          <div>
                            <label style={{display: 'block', fontWeight: '600', marginBottom: '4px', color: '#22336b'}}>Name*</label>
                            <input type="text" name="name" value={editForm.name || ''} onChange={handleEditChange} required 
                              style={{width: '100%', padding: '8px 12px', border: '1.5px solid #d1d5db', borderRadius: '6px', fontSize: '1rem'}} />
                          </div>
                          <div>
                            <label style={{display: 'block', fontWeight: '600', marginBottom: '4px', color: '#22336b'}}>Employee ID*</label>
                            <input type="text" name="employeeId" value={editForm.employeeId || ''} onChange={handleEditChange} required 
                              style={{width: '100%', padding: '8px 12px', border: '1.5px solid #d1d5db', borderRadius: '6px', fontSize: '1rem'}} />
                          </div>
                          <div>
                            <label style={{display: 'block', fontWeight: '600', marginBottom: '4px', color: '#22336b'}}>Email*</label>
                            <input type="email" name="email" value={editForm.email || ''} onChange={handleEditChange} required 
                              style={{width: '100%', padding: '8px 12px', border: '1.5px solid #d1d5db', borderRadius: '6px', fontSize: '1rem'}} />
                          </div>
                          <div>
                            <label style={{display: 'block', fontWeight: '600', marginBottom: '4px', color: '#22336b'}}>Phone*</label>
                            <input type="text" name="phone" value={editForm.phone || ''} onChange={handleEditChange} required maxLength={10} 
                              style={{width: '100%', padding: '8px 12px', border: '1.5px solid #d1d5db', borderRadius: '6px', fontSize: '1rem'}} />
                          </div>
                          <div>
                            <label style={{display: 'block', fontWeight: '600', marginBottom: '4px', color: '#22336b'}}>Department*</label>
                            <input type="text" name="department" value={editForm.department || ''} onChange={handleEditChange} required 
                              style={{width: '100%', padding: '8px 12px', border: '1.5px solid #d1d5db', borderRadius: '6px', fontSize: '1rem'}} />
                          </div>
                          <div>
                            <label style={{display: 'block', fontWeight: '600', marginBottom: '4px', color: '#22336b'}}>Designation*</label>
                            <input type="text" name="designation" value={editForm.designation || ''} onChange={handleEditChange} required 
                              style={{width: '100%', padding: '8px 12px', border: '1.5px solid #d1d5db', borderRadius: '6px', fontSize: '1rem'}} />
                          </div>
                          <div>
                            <label style={{display: 'block', fontWeight: '600', marginBottom: '4px', color: '#22336b'}}>Office Location*</label>
                            <input type="text" name="officeLocation" value={editForm.officeLocation || ''} onChange={handleEditChange} required 
                              style={{width: '100%', padding: '8px 12px', border: '1.5px solid #d1d5db', borderRadius: '6px', fontSize: '1rem'}} />
                          </div>
                          <div>
                            <label style={{display: 'block', fontWeight: '600', marginBottom: '4px', color: '#22336b'}}>Shift*</label>
                            <select name="shift" value={editForm.shift || ''} onChange={handleEditChange} required 
                              style={{width: '100%', padding: '8px 12px', border: '1.5px solid #d1d5db', borderRadius: '6px', fontSize: '1rem'}}>
                              <option value="">Select Shift</option>
                              <option value="Morning">Morning</option>
                              <option value="Afternoon">Afternoon</option>
                              <option value="Night">Night</option>
                            </select>
                          </div>
                          <div>
                            <label style={{display: 'block', fontWeight: '600', marginBottom: '4px', color: '#22336b'}}>Pickup Address*</label>
                            <input type="text" name="pickup" value={editForm.pickup || ''} onChange={handleEditChange} required 
                              style={{width: '100%', padding: '8px 12px', border: '1.5px solid #d1d5db', borderRadius: '6px', fontSize: '1rem'}} />
                          </div>
                          <div>
                            <label style={{display: 'block', fontWeight: '600', marginBottom: '4px', color: '#22336b'}}>Drop Address*</label>
                            <input type="text" name="drop" value={editForm.drop || ''} onChange={handleEditChange} required 
                              style={{width: '100%', padding: '8px 12px', border: '1.5px solid #d1d5db', borderRadius: '6px', fontSize: '1rem'}} />
                          </div>
                          <div>
                            <label style={{display: 'block', fontWeight: '600', marginBottom: '4px', color: '#22336b'}}>Route Number</label>
                            <input type="text" name="routeNumber" value={editForm.routeNumber || ''} onChange={handleEditChange} 
                              style={{width: '100%', padding: '8px 12px', border: '1.5px solid #d1d5db', borderRadius: '6px', fontSize: '1rem'}} />
                          </div>
                          <div>
                            <label style={{display: 'block', fontWeight: '600', marginBottom: '4px', color: '#22336b'}}>Gender*</label>
                            <select name="gender" value={editForm.gender || ''} onChange={handleEditChange} required 
                              style={{width: '100%', padding: '8px 12px', border: '1.5px solid #d1d5db', borderRadius: '6px', fontSize: '1rem'}}>
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label style={{display: 'block', fontWeight: '600', marginBottom: '4px', color: '#22336b'}}>Date of Birth*</label>
                            <input type="date" name="dob" value={editForm.dob || ''} onChange={handleEditChange} required 
                              style={{width: '100%', padding: '8px 12px', border: '1.5px solid #d1d5db', borderRadius: '6px', fontSize: '1rem'}} />
                          </div>
                          <div>
                            <label style={{display: 'block', fontWeight: '600', marginBottom: '4px', color: '#22336b'}}>Date of Joining*</label>
                            <input type="date" name="doj" value={editForm.doj || ''} onChange={handleEditChange} required 
                              style={{width: '100%', padding: '8px 12px', border: '1.5px solid #d1d5db', borderRadius: '6px', fontSize: '1rem'}} />
                          </div>
                          <div>
                            <label style={{display: 'block', fontWeight: '600', marginBottom: '4px', color: '#22336b'}}>Emergency Contact</label>
                            <input type="text" name="emergencyContact" value={editForm.emergencyContact || ''} onChange={handleEditChange} maxLength={10} 
                              style={{width: '100%', padding: '8px 12px', border: '1.5px solid #d1d5db', borderRadius: '6px', fontSize: '1rem'}} />
                          </div>
                        </div>
                        <div style={{display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px'}}>
                          <button type="button" onClick={closeEditModal} 
                            style={{padding: '10px 20px', border: '1.5px solid #d1d5db', borderRadius: '6px', background: '#f8fafc', color: '#22336b', cursor: 'pointer'}}>
                            Cancel
                          </button>
                          <button type="submit" 
                            style={{padding: '10px 20px', border: 'none', borderRadius: '6px', background: 'linear-gradient(90deg, #2563eb 0%, #22c55e 100%)', color: '#fff', cursor: 'pointer', fontWeight: '600'}}>
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                {deleteEmployee && (
                  <div className="delete-confirmation-modal">
                    <div className="delete-confirmation-box">
                      <div className="delete-icon"><i className="fas fa-exclamation-circle"></i></div>
                      <div className="delete-title">Confirm Delete</div>
                      <div className="delete-message">Are you sure you want to delete <strong>{deleteEmployee.name}</strong>?</div>
                      <div style={{marginBottom: '24px'}}>
                        <label style={{display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1f2937', textAlign: 'left'}}>
                          Reason for Deletion*
                        </label>
                        <textarea 
                          value={deleteReason}
                          onChange={(e) => setDeleteReason(e.target.value)}
                          placeholder="Please provide a reason for deleting this employee..."
                          style={{
                            width: '100%',
                            minHeight: '80px',
                            padding: '12px',
                            border: '1.5px solid #d1d5db',
                            borderRadius: '8px',
                            fontSize: '0.95rem',
                            fontFamily: 'inherit',
                            resize: 'vertical',
                            backgroundColor: '#f8fafc'
                          }}
                          required
                        />
                      </div>
                      <div className="delete-actions">
                        <button className="delete-btn-cancel" onClick={cancelDelete}>No, Cancel</button>
                        <button className="delete-btn-confirm" onClick={confirmDelete}>Yes, Delete</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Employee;