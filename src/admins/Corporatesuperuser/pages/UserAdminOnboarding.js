import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import './UserAdminOnboarding.css';

const AdminOnboardingForm = () => {
  const initialFormState = {
    fullName: '',
    employeeId: '',
    designation: '',
    department: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: '',
    companyName: '',
    companyCode: '',
    location: '',
    joiningDate: '',
    status: 'Active',
    idProof: '',
    profilePicture: '',
    authorizationLetter: '',
    moduleAccess: [],
    gender: '',
    dob: '',
    permanentAddress: '',
    companyAddress: '',
  };

  const [activeView, setActiveView] = useState('form');
  const [adminList, setAdminList] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [viewAdmin, setViewAdmin] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteReason, setDeleteReason] = useState('');

  const modules = ['Dashboard', 'Bookings', 'Reports', 'Users', 'Vendors', 'Settings'];

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name === 'moduleAccess') {
      const updatedAccess = checked
        ? [...formData.moduleAccess, value]
        : formData.moduleAccess.filter((mod) => mod !== value);
      setFormData({ ...formData, moduleAccess: updatedAccess });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Generate URLs for file previews
    const formCopy = {
      ...formData,
      idProof: formData.idProof ? URL.createObjectURL(formData.idProof) : null,
      profilePicture: formData.profilePicture ? URL.createObjectURL(formData.profilePicture) : null,
      authorizationLetter: formData.authorizationLetter ? URL.createObjectURL(formData.authorizationLetter) : null,
    };
  
    if (editIndex !== null) {
      const updated = [...adminList];
      updated[editIndex] = formCopy;
      setAdminList(updated);
      setEditIndex(null);
    } else {
      setAdminList([...adminList, formCopy]);
    }
  
    setFormData(initialFormState);
    setActiveView('management');
  };  

  const handleEdit = (index) => {
    setFormData(adminList[index]);
    setEditIndex(index);
    setActiveView('form');
  };

  const handleDelete = () => {
    const updated = [...adminList];
    updated.splice(deleteIndex, 1);
    setAdminList(updated);
    setDeleteReason('');
    setDeleteIndex(null);
  };

  return (
    <div className="admin-layout custom-admin-layout">
      <Navbar />
      <div className="admin-main">
        <Sidebar />
        <div className="admin-content">
          <Container className="mt-4 mb-4 custom-container">
            <div className="d-flex justify-content-between align-items-center mb-4 custom-header">
              <h3 className="custom-title">Corporate Admin Panel</h3>
              <div>
                <Button className="custom-switch-btn" variant={activeView === 'form' ? 'primary' : 'outline-primary'} onClick={() => setActiveView('form')}>Onboarding</Button>{' '}
                <Button className="custom-switch-btn" variant={activeView === 'management' ? 'primary' : 'outline-primary'} onClick={() => setActiveView('management')}>Management</Button>
              </div>
            </div>

            {activeView === 'form' && (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Enter full name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Employee ID</Form.Label>
                      <Form.Control type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} required placeholder="Enter employee ID" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Designation</Form.Label>
                      <Form.Control type="text" name="designation" value={formData.designation} onChange={handleChange} required placeholder="Enter designation" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Department</Form.Label>
                      <Form.Control type="text" name="department" value={formData.department} onChange={handleChange} required placeholder="Enter department" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required placeholder="Enter contact number" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address (Personal)</Form.Label>
                      <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter email address" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">-- Select Gender --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} required placeholder="Select date of birth" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Permanent Address</Form.Label>
                      <Form.Control as="textarea" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required placeholder="Enter permanent address" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Company Address</Form.Label>
                      <Form.Control as="textarea" name="companyAddress" value={formData.companyAddress} onChange={handleChange} required placeholder="Enter company address" />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Username (Corporate Email Id)</Form.Label>
                      <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required placeholder="Choose a username" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Create a password" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Re-enter password" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Admin Role</Form.Label>
                      <Form.Select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="">-- Select Role --</option>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Travel Manager">Travel Manager</option>
                        <option value="HR Admin">HR Admin</option>
                        <option value="Viewer">Viewer (Read Only)</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control type="text" name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="Enter company name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Company Code</Form.Label>
                      <Form.Control type="text" name="companyCode" value={formData.companyCode} onChange={handleChange} required placeholder="Enter company code" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Location</Form.Label>
                      <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="Enter location" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Joining Date</Form.Label>
                      <Form.Control type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required placeholder="Select joining date" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select name="status" value={formData.status} onChange={handleChange}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending Approval">Pending Approval</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ID Proof</Form.Label>
                      <Form.Control type="file" name="idProof" onChange={handleChange} required placeholder="Upload ID proof" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Profile Picture</Form.Label>
                      <Form.Control type="file" name="profilePicture" onChange={handleChange} required placeholder="Upload profile picture" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Authorization Letter</Form.Label>
                      <Form.Control type="file" name="authorizationLetter" onChange={handleChange} required placeholder="Upload authorization letter" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Module Access</Form.Label>
                  <div>
                    {modules.map((mod) => (
                      <Form.Check
                        inline
                        key={mod}
                        label={mod}
                        type="checkbox"
                        name="moduleAccess"
                        value={mod}
                        checked={formData.moduleAccess.includes(mod)}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                </Form.Group>

                <Button variant="success" type="submit" className="custom-submit-btn">
                  {editIndex !== null ? 'Update' : 'Onboard Admin'}
                </Button>
              </Form>
            )}

            {activeView === 'management' && (
              <>
                <h4>Admin Management</h4>
                {adminList.length === 0 ? (
                  <p>No admins onboarded yet.</p>
                ) : (
                  <Table striped bordered hover responsive className="custom-table">
                    <thead>
                      <tr>
                        <th>Full Name</th>
                        <th>Employee ID</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminList.map((admin, index) => (
                        <tr key={index}>
                          <td>{admin.fullName}</td>
                          <td>{admin.employeeId}</td>
                          <td>{admin.email}</td>
                          <td>{admin.role}</td>
                          <td>{admin.department}</td>
                          <td>{admin.status}</td>
                          <td>
                            <Button size="sm" variant="info" className="custom-action-btn" onClick={() => setViewAdmin(admin)}>View</Button>{' '}
                            <Button size="sm" variant="warning" className="custom-action-btn" onClick={() => handleEdit(index)}>Edit</Button>{' '}
                            <Button size="sm" variant="danger" className="custom-action-btn" onClick={() => setDeleteIndex(index)}>Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </>
            )}

            {/* View Modal */}
            <Modal 
              show={!!viewAdmin} 
              onHide={() => setViewAdmin(null)} 
              size="lg" 
              className="custom-modal"
              backdrop="static"
              keyboard={false}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Admin Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {viewAdmin && (
                  <>
                    <div className="admin-details-grid">
                      <div className="admin-detail-item">
                        <div className="admin-detail-label">Full Name</div>
                        <div className="admin-detail-value">{viewAdmin.fullName}</div>
                      </div>
                      <div className="admin-detail-item">
                        <div className="admin-detail-label">Employee ID</div>
                        <div className="admin-detail-value">{viewAdmin.employeeId}</div>
                      </div>
                      <div className="admin-detail-item">
                        <div className="admin-detail-label">Email Address</div>
                        <div className="admin-detail-value">{viewAdmin.email}</div>
                      </div>
                      <div className="admin-detail-item">
                        <div className="admin-detail-label">Username</div>
                        <div className="admin-detail-value">{viewAdmin.username}</div>
                      </div>
                      <div className="admin-detail-item">
                        <div className="admin-detail-label">Role</div>
                        <div className="admin-detail-value">{viewAdmin.role}</div>
                      </div>
                      <div className="admin-detail-item">
                        <div className="admin-detail-label">Department</div>
                        <div className="admin-detail-value">{viewAdmin.department}</div>
                      </div>
                      <div className="admin-detail-item">
                        <div className="admin-detail-label">Contact Number</div>
                        <div className="admin-detail-value">{viewAdmin.contactNumber}</div>
                      </div>
                      <div className="admin-detail-item">
                        <div className="admin-detail-label">Company Name</div>
                        <div className="admin-detail-value">{viewAdmin.companyName}</div>
                      </div>
                      <div className="admin-detail-item">
                        <div className="admin-detail-label">Company Code</div>
                        <div className="admin-detail-value">{viewAdmin.companyCode}</div>
                      </div>
                      <div className="admin-detail-item">
                        <div className="admin-detail-label">Location</div>
                        <div className="admin-detail-value">{viewAdmin.location}</div>
                      </div>
                      <div className="admin-detail-item">
                        <div className="admin-detail-label">Status</div>
                        <div className="admin-detail-value">{viewAdmin.status}</div>
                      </div>
                      <div className="admin-detail-item">
                        <div className="admin-detail-label">Gender</div>
                        <div className="admin-detail-value">{viewAdmin.gender}</div>
                      </div>
                      <div className="admin-detail-item">
                        <div className="admin-detail-label">Date of Birth</div>
                        <div className="admin-detail-value">{viewAdmin.dob}</div>
                      </div>
                      <div className="admin-detail-item">
                        <div className="admin-detail-label">Joining Date</div>
                        <div className="admin-detail-value">{viewAdmin.joiningDate}</div>
                      </div>
                      <div className="admin-detail-item admin-detail-value full-width">
                        <div className="admin-detail-label">Permanent Address</div>
                        <div className="admin-detail-value">{viewAdmin.permanentAddress}</div>
                      </div>
                      <div className="admin-detail-item admin-detail-value full-width">
                        <div className="admin-detail-label">Company Address</div>
                        <div className="admin-detail-value">{viewAdmin.companyAddress}</div>
                      </div>
                    </div>

                    <div className="modules-section">
                      <div className="admin-detail-label">Module Access</div>
                      <div className="modules-grid">
                        {viewAdmin.moduleAccess.map((module, index) => (
                          <span key={index} className="module-badge">{module}</span>
                        ))}
                      </div>
                    </div>

                    <div className="modal-divider"></div>

                    <div className="file-preview-section">
                      <div className="file-preview-title">Document Previews</div>
                      <div className="file-preview-grid">
                        <div className="file-preview-item">
                          <div className="file-preview-label">ID Proof</div>
                          {viewAdmin.idProof && (
                            <img src={viewAdmin.idProof} alt="ID Proof" className="file-preview-image" />
                          )}
                        </div>
                        <div className="file-preview-item">
                          <div className="file-preview-label">Profile Picture</div>
                          {viewAdmin.profilePicture && (
                            <img src={viewAdmin.profilePicture} alt="Profile" className="file-preview-image" />
                          )}
                        </div>
                        <div className="file-preview-item">
                          <div className="file-preview-label">Authorization Letter</div>
                          {viewAdmin.authorizationLetter && (
                            <img src={viewAdmin.authorizationLetter} alt="Letter" className="file-preview-image" />
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Modal.Body>
            </Modal>

            {/* Delete Modal */}
            <Modal 
              show={deleteIndex !== null} 
              onHide={() => setDeleteIndex(null)} 
              className="custom-modal"
              backdrop="static"
              keyboard={false}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Delete Admin</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>Reason for Deletion</Form.Label>
                  <Form.Control as="textarea" value={deleteReason} onChange={(e) => setDeleteReason(e.target.value)} />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" className="custom-cancel-btn" onClick={() => setDeleteIndex(null)}>Cancel</Button>
                <Button variant="danger" className="custom-delete-btn" onClick={handleDelete} disabled={!deleteReason.trim()}>Delete</Button>
              </Modal.Footer>
            </Modal>

          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminOnboardingForm;