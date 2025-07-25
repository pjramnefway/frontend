import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Modal, Button, Form } from 'react-bootstrap';

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="admin-layout">
      <Navbar />
      <section className="hero-wrappers py-5">
        <div className="row align-items-center driver-section m-0">
          <div className="col-md-6 mb-4 mb-md-0 text-center">
            <img
              src="/assets/Driveimg.jpg"
              alt="Driver with car"
              className="img-fluid driver-img"
            />
          </div>
          <div className="col-md-6">
            <p className="text-success fw-semibold">Drive with NefwayRide!</p>
            <h2 className="fw-bold mb-3">
              Join NefwayRide, Drive Smart,<br />and Enjoy Exclusive Benefits!
            </h2>
            <p>
              Become a part of <strong>NefwayRide</strong>, a premium cab service dedicated to safely
              transporting office employees. As a NefwayRide driver, you’ll enjoy competitive earnings,
              flexible shifts, and a supportive ecosystem that values your dedication.
              <br /><br />
              Start your journey with NefwayRide today—where your commitment fuels smart mobility.
            </p>
            <Button className="apply-btn" variant="success" onClick={handleShow}>
              Apply to Drive
            </Button>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center g-4">
            <div className="col-md-6 col-lg-5 d-flex">
              <div className="custom-card text-center p-4 d-flex flex-column justify-content-between w-100">
                <div>
                  <h4 className="card-title mb-3">Got a vehicle and want to work<br />with NefwayRide?</h4>
                  <p className="card-text text-secondary">
                    We are happy to get in touch and collaborate with you<br />
                    regarding your vehicle
                  </p>
                </div>
                <div className="mt-4">
                  <button className="btn apply-btn mt-3" onClick={handleShow}>
                    Attach a Vehicle
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-5 d-flex">
              <div className="custom-card text-center p-4 d-flex flex-column justify-content-between w-100">
                <div>
                  <h4 className="card-title mb-3">Looking for your next opportunity<br />to drive for NefwayRide?</h4>
                  <p className="card-text text-secondary">
                    We are always looking for drivers who seek stable job<br />
                    and financial security. Apply here and we will get in<br />
                    touch with you for assignments.
                  </p>
                </div>
                <div className="mt-4">
                  <button className="btn apply-btn mt-3" onClick={handleShow}>
                    Apply to Drive
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row shadow rounded-4 overflow-hidden" style={{ backgroundColor: '#f8f9fa', minHeight: '450px' }}>
            <div className="col-lg-6 d-flex align-items-center justify-content-center">
              <div>
                <h2 className="fw-bold text-dark mb-4 text-center">A secure place of work</h2>

                <div className="d-flex align-items-start bg-white shadow-sm p-3 mb-3 rounded-4">
                  <div className="me-3">
                    <i className="bi bi-cash-coin fs-2 text-dark"></i>
                  </div>
                  <div>
                    <h5 className="mb-1 fw-semibold">Guaranteed Earnings</h5>
                    <p className="mb-0 text-muted small">Earn salaried payments with assurance</p>
                  </div>
                </div>

                <div className="d-flex align-items-start bg-white shadow-sm p-3 mb-3 rounded-4">
                  <div className="me-3">
                    <i className="bi bi-calendar-check fs-2 text-dark"></i>
                  </div>
                  <div>
                    <h5 className="mb-1 fw-semibold">Timely Payments</h5>
                    <p className="mb-0 text-muted small">Assured payment on time for every month</p>
                  </div>
                </div>

                <div className="d-flex align-items-start bg-white shadow-sm p-3 rounded-4">
                  <div className="me-3">
                    <i className="bi bi-person-badge fs-2 text-dark"></i>
                  </div>
                  <div>
                    <h5 className="mb-1 fw-semibold">Corporate Duty</h5>
                    <p className="mb-0 text-muted small">Drive without drama. Corporate duty only</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 p-0">
              <img src="/assets/Cabdriver.jpg" alt="Driver with Car" className="img-fluid w-100 h-100" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>
      <section className="py-5" style={{ backgroundColor: '#f5fafc' }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-3">At NefwayRide, every partner is cared for</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
            We genuinely value every partner. NefwayRide takes their well-being and professional growth seriously and
            does everything to facilitate that. By fostering a supportive environment, NefwayRide ensures that each team
            member feels appreciated and respected.
          </p>

          <div className="row mt-5 g-4">
            <div className="col-md-6">
              <div className="d-flex flex-column align-items-center px-3">
                <i className="bi bi-headset fs-1 text-success mb-3"></i>
                <h5 className="fw-semibold">Driver Support (Help Desk)</h5>
                <p className="text-muted small">24/7 support to help you with navigation, queries, or emergencies.</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex flex-column align-items-center px-3">
                <i className="bi bi-exclamation-triangle-fill fs-1 text-warning mb-3"></i>
                <h5 className="fw-semibold">24/7 Emergency Assistance</h5>
                <p className="text-muted small">Instant access to emergency support for safety and on-road protection.</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex flex-column align-items-center px-3">
                <i className="bi bi-book-half fs-1 text-primary mb-3"></i>
                <h5 className="fw-semibold">In-App Training Modules</h5>
                <p className="text-muted small">Grow professionally with easy access to skill-building and safety resources.</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex flex-column align-items-center px-3">
                <i className="bi bi-award-fill fs-1 text-danger mb-3"></i>
                <h5 className="fw-semibold">Performance Rewards Program</h5>
                <p className="text-muted small">Earn rewards and recognition for consistent, quality performance and punctuality.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 bg-light border-top text-center">
        <div className="container">
          <a href="https://nefway.com" target="_blank" rel="noopener noreferrer">
            <img
              src="/assets/Logo_Nefway.png"
              alt="Nefway Logo"
              style={{ height: "40px" }}
              className="mb-2"
            />
          </a>
          <p className="mb-1 fw-semibold text-dark">
            NefwayRide is a sub-product of{" "}
            <a
              href="https://nefway.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-success text-decoration-none"
            >
              Nefway Technologies Pvt. Ltd.
            </a>
          </p>
          <p className="text-muted small">
            Nefway Technologies is committed to building smart, scalable solutions that simplify urban mobility and workplace transportation.
          </p>
        </div>
      </section>
      
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Share your contact and we will get in touch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Select required>
                <option value="">Choose...</option>
                <option>Attach Document</option>
                <option>Drive Info</option>
                <option>Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Tell us more..." />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="success">
            <i className="bi bi-send-fill me-2"></i>Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default Home;