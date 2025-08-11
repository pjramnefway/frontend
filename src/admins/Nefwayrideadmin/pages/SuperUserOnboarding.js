import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {
  Form,
  Button,
  Row,
  Col,
  Alert,
  Tabs,
  Tab,
  Table,
  Modal,
  InputGroup,
  Card,
  Container,
} from "react-bootstrap";
import { FaRegImage } from "react-icons/fa";
import axios from "axios";

/* const initialState = {
  // Basic Details
  fullName: '',
  username: '',
  email: '',
  mobile: '',
  gender: '',
  profilePhoto: null,
  designation: '',
  // Company Information
  companyName: '',
  corporateCode: '',
  department: '',
  officeLocation: '',
  // Authentication & Access
  role: '',
  password: '',
  confirmPassword: '',
  otp: '',
  twoFactor: false,
  // Contact & Communication
  alternateContact: '',
  officialEmail: '',
  preferredContact: '',
  // Documents & Verification
  idProof: null,
  corporateIdCard: null,
  employeeCode: '',
  digitalSignature: null,
}; 

const validate = (fields) => {
  const errors = {};
  // Basic Details
  if (!fields.fullName.trim()) errors.fullName = 'Full Name is required';
  if (!fields.username.trim()) errors.username = 'Username/User ID is required';
  if (!fields.email.trim()) errors.email = 'Email Address is required';
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.email)) errors.email = 'Invalid email address';
  if (!fields.mobile.trim()) errors.mobile = 'Mobile Number is required';
  else if (!/^\d{10}$/.test(fields.mobile)) errors.mobile = 'Enter a valid 10-digit mobile number';
  if (!fields.gender) errors.gender = 'Gender is required';
  if (!fields.profilePhoto) errors.profilePhoto = 'Profile Photo is required';
  if (!fields.designation.trim()) errors.designation = 'Designation is required';
  // Company Information
  if (!fields.companyName.trim()) errors.companyName = 'Company Name is required';
  if (!fields.corporateCode.trim()) errors.corporateCode = 'Corporate Code/ID is required';
  if (!fields.department.trim()) errors.department = 'Department/Division is required';
  if (!fields.officeLocation.trim()) errors.officeLocation = 'Office Location/Branch is required';
  // Authentication & Access
  if (!fields.role) errors.role = 'Role is required';
  if (!fields.password) errors.password = 'Password is required';
  else if (fields.password.length < 8) errors.password = 'Password must be at least 8 characters';
  else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(fields.password)) errors.password = 'Password must contain uppercase, lowercase, and a number';
  if (!fields.confirmPassword) errors.confirmPassword = 'Confirm Password is required';
  else if (fields.password !== fields.confirmPassword) errors.confirmPassword = 'Passwords do not match';
  if (!fields.otp.trim()) errors.otp = 'OTP Verification is required';
  if (!fields.twoFactor) errors.twoFactor = 'Two-Factor Authentication must be enabled';
  // Contact & Communication
  if (!fields.alternateContact.trim()) errors.alternateContact = 'Alternate Contact Number is required';
  if (!fields.officialEmail.trim()) errors.officialEmail = 'Official Email ID is required';
  if (!fields.preferredContact) errors.preferredContact = 'Preferred Contact Mode is required';
  // Documents & Verification
  if (!fields.idProof) errors.idProof = 'ID Proof is required';
  if (!fields.corporateIdCard) errors.corporateIdCard = 'Corporate ID Card is required';
  if (!fields.employeeCode.trim()) errors.employeeCode = 'Employee Code is required';
  if (!fields.digitalSignature) errors.digitalSignature = 'Digital Signature is required';
  return errors;
};
*/

const cardStyle = {
  borderRadius: "18px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  background: "#fff",
  padding: "2rem 2.5rem",
  border: 0,
};
const sectionTitleStyle = {
  fontSize: "2rem",
  fontWeight: 700,
  color: "#2a4365",
  letterSpacing: "0.5px",
  marginBottom: "1.5rem",
};
const sectionHeaderStyle = {
  fontSize: "1.2rem",
  fontWeight: 600,
  color: "#234e70",
  marginBottom: "1rem",
};
const sectionDividerStyle = {
  border: "none",
  borderTop: "2px solid #e2e8f0",
  margin: "2rem 0 1.5rem 0",
};
const proBtnStyle = {
  padding: "0.6rem 2.2rem",
  fontSize: "1.1rem",
  borderRadius: "8px",
  fontWeight: 600,
  background: "linear-gradient(90deg, #234e70 0%, #2a4365 100%)",
  border: "none",
  transition: "background 0.2s",
};
const proTableThStyle = {
  background: "#f7fafc",
  color: "#234e70",
  fontWeight: 700,
};
const proTableCellStyle = {
  verticalAlign: "middle",
};

const UserOnboarding = () => {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [activeTab, setActiveTab] = useState("onboarding");
  const [users, setUsers] = useState([]);
  const [viewUser, setViewUser] = useState(null);
  const [editUserIdx, setEditUserIdx] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    mobile: "",
    gender: "",
    profilePhoto: null,
    designation: "",
    companyName: "",
    corporateCode: "",
    department: "",
    officeLocation: "",
    role: "Admin  ",
    password: "",
    confirmPassword: "",
    otp: "",
    twoFactor: false,
    alternateContact: "",
    officialEmail: "",
    preferredContact: "",
    idProof: null,
    corporateIdCard: null,
    employeeCode: "",
    digitalSignature: null,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [fields, setFields] = useState(formData);

  const [getSuperCoporateAdmins, setSuperCorporateAdmin] = useState([]);

  useEffect(() => {
    fetchSuperCorporateAdmin();
  }, []);

  //to get all sca admins
  const fetchSuperCorporateAdmin = async () => {
    try {
      const res = await axios.get(
        "http://132.156.145.6:9800/api/super-corporate-admin/"
      );
      setSuperCorporateAdmin(res.data);
    } catch (err) {
      console.error(`Failed to fetch admins ${err}`);
    }
  };

  const handleChange = async (e) => {
    const { name, value, type, checked, files } = e.target;

    let updatedFormData = { ...formData };

    if (type === "file") {
      updatedFormData[name] = files[0];
    } else if (type === "checkbox") {
      updatedFormData[name] = checked;

      // ✅ Trigger OTP only on 'twoFactor' toggle ON and user already saved
      if (name === "twoFactor" && checked) {
        if (formData.user_id) {
          try {
            console.log("Sending OTP for user_id:", formData.user_id);

            if (formData.email) {
              await axios.post("http://132.156.145.6:9800/api/otp/send-otp", {
                type: "email",
                email: formData.email,
                user_id: formData.user_id,
              });
              console.log("Email OTP sent");
            } else {
              alert("Please enter a valid email before sending Email OTP.");
            }

            if (formData.mobile) {
              await axios.post("http://132.156.145.6:9800/api/otp/send-otp", {
                type: "mobile",
                mobile: formData.mobile,
                user_id: formData.user_id,
              });
              console.log("Mobile OTP sent");
            } else {
              alert(
                "Please enter a valid mobile number before sending Mobile OTP."
              );
            }

            alert("OTP sent successfully");
          } catch (error) {
            console.error(
              "OTP Send Error:",
              error.response?.data || error.message
            );
            alert("Failed to send OTP");
          }
        } else {
          alert("Please submit the form first to receive OTP.");
        }
      }
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.fullName?.trim()) errors.fullName = "Full Name is required";
    if (!formData.username?.trim())
      errors.username = "Username/User ID is required";

    if (!formData.email?.trim()) errors.email = "Email Address is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email))
      errors.email = "Invalid email address";

    if (!formData.mobile?.trim()) errors.mobile = "Mobile Number is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      errors.mobile = "Enter a valid 10-digit mobile number";

    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.profilePhoto)
      errors.profilePhoto = "Profile Photo is required";
    if (!formData.designation?.trim())
      errors.designation = "Designation is required";

    // Company Information
    if (!formData.companyName?.trim())
      errors.companyName = "Company Name is required";
    if (!formData.corporateCode?.trim())
      errors.corporateCode = "Corporate Code/ID is required";
    if (!formData.department?.trim())
      errors.department = "Department/Division is required";
    if (!formData.officeLocation?.trim())
      errors.officeLocation = "Office Location/Branch is required";

    // Authentication & Access
    if (!formData.role) errors.role = "Role is required";
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters";
    else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(formData.password)) {
      errors.password =
        "Password must contain uppercase, lowercase, and a number";
    }

    if (!formData.confirmPassword)
      errors.confirmPassword = "Confirm Password is required";
    //else if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';

    //if (!formData.otp?.trim()) errors.otp = 'OTP Verification is required';
    if (!formData.twoFactor)
      errors.twoFactor = "Two-Factor Authentication must be enabled";

    if (formData.twoFactor && !formData.preferredContact) {
      errors.preferredContact = "Preferred Contact Mode is required";
    }

    // Contact & Communication
    if (!formData.alternateContact?.trim())
      errors.alternateContact = "Alternate Contact Number is required";
    if (!formData.officialEmail?.trim())
      errors.officialEmail = "Official Email ID is required";

    // Documents & Verification
    if (!formData.idProof) errors.idProof = "ID Proof is required";
    if (!formData.corporateIdCard)
      errors.corporateIdCard = "Corporate ID Card is required";
    if (!formData.employeeCode?.trim())
      errors.employeeCode = "Employee Code is required";
    if (!formData.digitalSignature)
      errors.digitalSignature = "Digital Signature is required";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        "http://132.156.145.6:9800//api/super-corporate-admin/add",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { user_id } = response.data;
      if (user_id) {
        setFormData((prev) => ({
          ...prev,
          user_id,
        }));
      }

      alert("User Created Successfully");
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Failed to create user");
    }
  };

  //to view the users in management page
  const handleView = (idx) => {
    setViewUser(users[idx]);
  };

  //edit the users will take to the user onboarding form page 
  const handleEdit = (idx) => {
    const selectedUser = users[idx];
    setFields({ ...selectedUser });
    setEditUserIdx(idx);
    setActiveTab("onboarding");
    setErrors({});
    setSubmitted(false);
  };

  //delete the users in the same page by specifing some reason 
  const handleDelete = (idx) => {
    setDeleteIdx(idx);
    setDeleteReason("");
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteReason.trim()) return;

    if (deleteIdx === null || deleteIdx >= users.length) {
      alert("Invalid delete index.");
      return;
    }

    const userToDelete = users[deleteIdx];
    console.log("User to delete:", userToDelete);

    if (!userToDelete || !userToDelete.id) {
      alert("Missing user or ID.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://127.0.0.1:9800/api/super-corporate-admin/${userToDelete.id}`,
        { data: { reason: deleteReason } }
      );

      if (response.status === 200) {
        const updatedUsers = users.filter((_, i) => i !== deleteIdx);
        setUsers(updatedUsers);
        setShowDeleteModal(false);
        setDeleteIdx(null);
        setDeleteReason("");
      }
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-main">
        <Sidebar />
        <div className="admin-content p-4">
          {/* Super_corporate_admin Onboarding   */}

          <Container fluid>
            <Tabs
              activeKey={activeTab}
              onSelect={setActiveTab}
              className="mb-3"
            >
              <Tab eventKey="onboarding" title="User Onboarding">
                <Card className="shadow-lg border-0 mb-4" style={cardStyle}>
                  <Card.Body>
                    <h2 style={sectionTitleStyle} className="mb-4">
                      User Onboarding
                    </h2>
                    <Form
                      onSubmit={handleSubmit}
                      encType="multipart/form-data"
                      className="mb-4"
                    >
                      {/* Basic Details */}
                      <h4 className="mt-4" style={sectionHeaderStyle}>
                        💼 Basic Details
                      </h4>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Full Name *</Form.Label>
                            <Form.Control
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleChange}
                              isInvalid={!!errors.fullName}
                              placeholder="First + Last Name"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.fullName}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Username / User ID *</Form.Label>
                            <Form.Control
                              type="text"
                              name="username"
                              value={formData.username}
                              onChange={handleChange}
                              isInvalid={!!errors.username}
                              placeholder="Unique username"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.username}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email Address *</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              isInvalid={!!errors.email}
                              placeholder="Corporate email preferred"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Mobile Number *</Form.Label>
                            <Form.Control
                              type="tel"
                              name="mobile"
                              value={formData.mobile}
                              onChange={handleChange}
                              isInvalid={!!errors.mobile}
                              placeholder="10-digit mobile number"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.mobile}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Gender *</Form.Label>
                            <Form.Select
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              isInvalid={!!errors.gender}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.gender}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>
                              <FaRegImage style={{ marginRight: 6 }} /> Profile
                              Photo *
                            </Form.Label>
                            <Form.Control
                              type="file"
                              name="profilePhoto"
                              accept="image/*"
                              onChange={handleChange}
                              isInvalid={!!errors.profilePhoto}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.profilePhoto}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Designation *</Form.Label>
                            <Form.Control
                              type="text"
                              name="designation"
                              value={formData.designation}
                              onChange={handleChange}
                              isInvalid={!!errors.designation}
                              placeholder="e.g., Corporate Admin, Travel Head"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.designation}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      {/* Company Information */}
                      <hr style={sectionDividerStyle} />
                      <h4 className="mt-4" style={sectionHeaderStyle}>
                        🏢 Company Information
                      </h4>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Company Name *</Form.Label>
                            <Form.Control
                              type="text"
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleChange}
                              isInvalid={!!errors.companyName}
                              placeholder="Auto-fill if already registered"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.companyName}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Corporate Code / ID *</Form.Label>
                            <Form.Control
                              type="text"
                              name="corporateCode"
                              value={formData.corporateCode}
                              onChange={handleChange}
                              isInvalid={!!errors.corporateCode}
                              placeholder="Unique identifier"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.corporateCode}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Department / Division *</Form.Label>
                            <Form.Control
                              type="text"
                              name="department"
                              value={formData.department}
                              onChange={handleChange}
                              isInvalid={!!errors.department}
                              placeholder="Department / Division"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.department}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Office Location / Branch *</Form.Label>
                            <Form.Control
                              type="text"
                              name="officeLocation"
                              value={formData.officeLocation}
                              onChange={handleChange}
                              isInvalid={!!errors.officeLocation}
                              placeholder="Branch or location"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.officeLocation}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      {/* Authentication & Access */}
                      <hr style={sectionDividerStyle} />
                      <h4 className="mt-4" style={sectionHeaderStyle}>
                        🔐 Authentication & Access
                      </h4>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Role *</Form.Label>
                            <Form.Select
                              name="role"
                              value={formData.role}
                              onChange={handleChange}
                              isInvalid={!!errors.role}
                            >
                              <option value="">Select Role</option>
                              <option value="Super Admin">Super Admin</option>
                              <option value="Admin">Admin</option>
                              <option value="Viewer">Viewer</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.role}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Password *</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              isInvalid={!!errors.password}
                              placeholder="Password"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Confirm Password *</Form.Label>
                            <Form.Control
                              type="password"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              isInvalid={!!errors.confirmPassword}
                              placeholder="Re-enter password"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.confirmPassword}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>OTP Verification *</Form.Label>
                            <Form.Control
                              type="text"
                              name="otp"
                              value={formData.otp}
                              onChange={handleChange}
                              isInvalid={!!errors.otp}
                              placeholder="Enter OTP"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.otp}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Check
                              type="switch"
                              id="twoFactor"
                              name="twoFactor"
                              label="Enable Two-Factor Authentication"
                              checked={formData.twoFactor}
                              onChange={handleChange}
                              isInvalid={!!errors.twoFactor}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.twoFactor}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      {/* Contact & Communication */}
                      <hr style={sectionDividerStyle} />
                      <h4 className="mt-4" style={sectionHeaderStyle}>
                        📞 Contact & Communication
                      </h4>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Alternate Contact Number *</Form.Label>
                            <Form.Control
                              type="tel"
                              name="alternateContact"
                              value={formData.alternateContact}
                              onChange={handleChange}
                              isInvalid={!!errors.alternateContact}
                              placeholder="Alternate Contact Number "
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.alternateContact}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Official Email ID *</Form.Label>
                            <Form.Control
                              type="email"
                              name="officialEmail"
                              value={formData.officialEmail}
                              onChange={handleChange}
                              isInvalid={!!errors.officialEmail}
                              placeholder="If different from login email"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.officialEmail}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Preferred Contact Mode *</Form.Label>
                            <Form.Select
                              name="preferredContact"
                              value={formData.preferredContact}
                              onChange={handleChange}
                              isInvalid={!!errors.preferredContact}
                            >
                              <option value="">Select</option>
                              <option value="Email">Email</option>
                              <option value="Phone">Phone</option>
                              <option value="Both">Both</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.preferredContact}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      {/* Documents & Verification */}
                      <hr style={sectionDividerStyle} />
                      <h4 className="mt-4" style={sectionHeaderStyle}>
                        📎 Documents & Verification
                      </h4>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>ID Proof (Govt issued) *</Form.Label>
                            <Form.Control
                              type="file"
                              name="idProof"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={handleChange}
                              isInvalid={!!errors.idProof}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.idProof}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Corporate ID Card *</Form.Label>
                            <Form.Control
                              type="file"
                              name="corporateIdCard"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={handleChange}
                              isInvalid={!!errors.corporateIdCard}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.corporateIdCard}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Employee Code</Form.Label>
                            <Form.Control
                              type="text"
                              name="employeeCode"
                              value={formData.employeeCode}
                              onChange={handleChange}
                              placeholder="If integrated with HRMS"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Digital Signature *</Form.Label>
                            <Form.Control
                              type="file"
                              name="digitalSignature"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={handleChange}
                              isInvalid={!!errors.digitalSignature}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.digitalSignature}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button
                        variant="primary"
                        type="submit"
                        style={proBtnStyle}
                      >
                        {editUserIdx !== null ? "Update" : "Submit"}
                      </Button>
                    </Form>
                    {showAlert && (
                      <Alert variant="success">
                        Form submitted successfully!
                      </Alert>
                    )}
                  </Card.Body>
                </Card>
              </Tab>

              {/* User management TO View the user in the user_management tab */}
              <Tab eventKey="management" title="User Management">
                <Card className="shadow-lg border-0" style={cardStyle}>
                  <Card.Body>
                    <h2 style={sectionTitleStyle} className="mb-4">
                      User Management
                    </h2>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th style={proTableThStyle}>Sl.no</th>
                          <th style={proTableThStyle}>Company Name</th>
                          <th style={proTableThStyle}>Full Name</th>
                          <th style={proTableThStyle}>Email Address</th>
                          <th style={proTableThStyle}>Mobile Number</th>
                          <th style={proTableThStyle}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getSuperCoporateAdmins.length === 0 ? (
                          <tr>
                            <td
                              colSpan="6"
                              className="text-center"
                              style={proTableCellStyle}
                            >
                              No users onboarded yet.
                            </td>
                          </tr>
                        ) : (
                          getSuperCoporateAdmins.map((user, idx) => (
                            <tr key={idx}>
                              <td style={proTableCellStyle}>{idx + 1}</td>
                              <td style={proTableCellStyle}>
                                {user.companyName}
                              </td>
                              <td style={proTableCellStyle}>{user.fullName}</td>
                              <td style={proTableCellStyle}>{user.email}</td>
                              <td style={proTableCellStyle}>{user.mobile}</td>
                              <td style={proTableCellStyle}>
                                <Button
                                  size="sm"
                                  variant="info"
                                  className="me-2"
                                  onClick={() => handleView(idx)}
                                >
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="warning"
                                  className="me-2"
                                  onClick={() => handleEdit(idx)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="danger"
                                  onClick={() => handleDelete(idx)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Tab>
            </Tabs>
          </Container>

          {/* View The added Super_corporate_admin users */}
          <Modal show={!!viewUser} onHide={() => setViewUser(null)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {viewUser ? (
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(viewUser).map(([key, value]) => (
                    <div key={key}>
                      <strong>
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                        :
                      </strong>{" "}
                      {String(value)}
                    </div>
                  ))}
                </div>
              ) : null}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setViewUser(null)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Delete Modal */}
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Please provide a reason for deletion:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={confirmDelete}
                disabled={!deleteReason.trim()}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserOnboarding;
