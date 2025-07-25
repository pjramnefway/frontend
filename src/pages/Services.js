import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Services = () => {
    const stepTitles = [
        "Company Registers",
        "Shifts & Sectors Set",
        "Employees Request Rides",
        "Drivers Assigned & Tracked"
    ];

    const stepColors = ["primary", "success", "warning", "danger"];

    const faqs = [
        {
            icon: "bi-car-front",
            question: "How do I book a ride?",
            answer: `Open the app, log in, enter your pickup date and time, and tap "Book Now" — it's that easy.`,
        },
        {
            icon: "bi-clock-history",
            question: "Can I view my ride history?",
            answer: `Yes, go to the "History" section in the app to view your past rides including times, dates, and routes.`,
        },
        {
            icon: "bi-shield-lock",
            question: "Is my data secure?",
            answer: `Absolutely. We use end-to-end encryption and your personal data is never shared without consent.`,
        },
        {
            icon: "bi-geo-alt",
            question: "Can I track my cab in real-time?",
            answer: `Yes, once your ride is confirmed, you'll be able to view live tracking from pickup to destination.`,
        },
        {
            icon: "bi-person-vcard",
            question: "How are drivers verified?",
            answer: `All drivers undergo strict background checks, license verification, and orientation before onboarding.`,
        },
        {
            icon: "bi-telephone-inbound",
            question: "Who do I contact in case of an emergency?",
            answer: `Use the in-app emergency button to contact our 24/7 helpline. Your live location is instantly shared with the support team.`,
        },
    ];

    return (
        <div className="admin-layout">
            <Navbar />
            <section className="py-4 services-section" id="services">
                <div className="container">
                    <div className="row align-items-center g-5 flex-column-reverse flex-lg-row">
                        <div className="col-lg-6">
                            <h6 className="text-uppercase fw-bold mb-2" style={{ color: '#18b850' }}>
                                Our Services
                            </h6>
                            <h2 className="fw-bold text-dark mb-4">
                                Smart Cab Solutions <span style={{ color: '#18b850' }}>for Modern Offices</span>
                            </h2>

                            <div className="row">
                                <div className="col-12 col-md-6 mb-3 d-flex align-items-start">
                                    <i className="bi bi-car-front-fill fs-4 me-3 text-success"></i>
                                    <span className="text-dark">Cab Booking for Employees</span>
                                </div>
                                <div className="col-12 col-md-6 mb-3 d-flex align-items-start">
                                    <i className="bi bi-building-check fs-4 me-3 text-success"></i>
                                    <span className="text-dark">Admin Portal for Companies</span>
                                </div>
                                <div className="col-12 col-md-6 mb-3 d-flex align-items-start">
                                    <i className="bi bi-calendar-check fs-4 me-3 text-success"></i>
                                    <span className="text-dark">Driver Scheduling & Tracking</span>
                                </div>
                                <div className="col-12 col-md-6 mb-3 d-flex align-items-start">
                                    <i className="bi bi-geo-alt-fill fs-4 me-3 text-success"></i>
                                    <span className="text-dark">Real-time Location Sharing</span>
                                </div>
                                <div className="col-12 col-md-6 mb-3 d-flex align-items-start">
                                    <i className="bi bi-exclamation-triangle-fill fs-4 me-3 text-success"></i>
                                    <span className="text-dark">Emergency Alerts</span>
                                </div>
                                <div className="col-12 col-md-6 mb-3 d-flex align-items-start">
                                    <i className="bi bi-chat-dots-fill fs-4 me-3 text-success"></i>
                                    <span className="text-dark">24/7 Dedicated Support</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 text-center">
                            <img
                                src="/assets/service.jpg"
                                alt="Cab Services"
                                className="img-fluid"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-4 fw-bold">Our Core Services</h2>
                    <p className="text-center text-muted mb-5">
                        Tailored cab solutions for Employees, Drivers, and Company Admins.
                    </p>

                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow service-card">
                                <div className="card-body text-center border-bottom">
                                    <div className="icon-box bg-primary text-white mx-auto mb-3">
                                        <i className="bi bi-person-badge-fill fs-2"></i>
                                    </div>
                                    <h5 className="card-title fw-semibold mb-0">For Employees</h5>
                                </div>
                                <div className="card-body bg-white feature-box">
                                    <ul className="list-unstyled text-start px-2">
                                        <li>
                                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                                            <strong className='text-dark'>On-Time Pickup & Drop</strong>
                                            <br />
                                            <small className="text-muted">Matches shift schedules accurately.</small>
                                        </li>
                                        <li>
                                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                                            <strong className='text-dark'>Live Ride Tracking</strong>
                                            <br />
                                            <small className="text-muted">Real-time location and ETA updates.</small>
                                        </li>
                                        <li>
                                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                                            <strong className='text-dark'>Secure QR/OTP Boarding</strong>
                                            <br />
                                            <small className="text-muted">Authentication with OTP or QR code.</small>
                                        </li>
                                        <li>
                                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                                            <strong className='text-dark'>Trip History & Alerts</strong>
                                            <br />
                                            <small className="text-muted">Keep track of all ride data.</small>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow service-card">
                                <div className="card-body text-center border-bottom">
                                    <div className="icon-box bg-danger text-white mx-auto mb-3">
                                        <i className="bi bi-truck-front-fill fs-2"></i>
                                    </div>
                                    <h5 className="card-title fw-semibold mb-0">For Drivers</h5>
                                </div>
                                <div className="card-body bg-white feature-box">
                                    <ul className="list-unstyled text-start px-2">
                                        <li>
                                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                                            <strong className='text-dark'>Auto Trip Assignment</strong>
                                            <br />
                                            <small className="text-muted">Based on location and availability.</small>
                                        </li>
                                        <li>
                                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                                            <strong className='text-dark'>Integrated Navigation</strong>
                                            <br />
                                            <small className="text-muted">Get turn-by-turn directions.</small>
                                        </li>
                                        <li>
                                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                                            <strong className='text-dark'>ID Verification</strong>
                                            <br />
                                            <small className="text-muted">QR/OTP-based employee confirmation.</small>
                                        </li>
                                        <li>
                                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                                            <strong className='text-dark'>Live Location Reporting</strong>
                                            <br />
                                            <small className="text-muted">Every 2 minutes update to admin.</small>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow service-card">
                                <div className="card-body text-center border-bottom">
                                    <div className="icon-box bg-success text-white mx-auto mb-3">
                                        <i className="bi bi-building-check fs-2"></i>
                                    </div>
                                    <h5 className="card-title fw-semibold mb-0">For Company Admins</h5>
                                </div>
                                <div className="card-body bg-white feature-box">
                                    <ul className="list-unstyled text-start px-2">
                                        <li>
                                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                                            <strong className='text-dark'>Admin Dashboard</strong>
                                            <br />
                                            <small className="text-muted">Manage trips, employees, and reports.</small>
                                        </li>
                                        <li>
                                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                                            <strong className='text-dark'>Shift Scheduling</strong>
                                            <br />
                                            <small className="text-muted">Easily assign and optimize shifts.</small>
                                        </li>
                                        <li>
                                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                                            <strong className='text-dark'>Expense Reporting</strong>
                                            <br />
                                            <small className="text-muted">View and export cost reports.</small>
                                        </li>
                                        <li>
                                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                                            <strong className='text-dark'>Live Monitoring</strong>
                                            <br />
                                            <small className="text-muted">Track cab movement in real-time.</small>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5 bg-white">
                <div className="container">
                    <h2 className="text-center fw-bold mb-5">How Our Service Works</h2>
                    <div className="row justify-content-center">
                        <div className="col-10 col-md-12">
                            <div className="d-flex justify-content-between flex-wrap position-relative timeline">
                                {stepTitles.map((title, index) => (
                                    <div className="step text-center position-relative" key={index}>
                                        {index !== 0 && <span className="timeline-line"></span>}
                                        <div className={`step-icon bg-${stepColors[index]} text-white mx-auto`}>
                                            <span>{index + 1}</span>
                                        </div>
                                        <h6 className="fw-semibold mt-3">{title}</h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="faq-section py-5" style={{ background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)' }}>
                <div className="container">
                    <div className="row align-items-start justify-content-center gy-4">
                        <div className="col-lg-4 text-start">
                            <h2 className="fw-bold display-6">Frequently Asked Questions</h2>
                            <p className="lead text-muted">
                                Everything you need to know about using <strong>NefwayRide</strong> – fast, safe, and reliable.
                            </p>
                        </div>
                        <div className="col-lg-8">
                            <div className="accordion accordion-flush" id="faqAccordion">
                                {faqs.map((faq, i) => (
                                    <div
                                        className="accordion-item shadow rounded mb-3 border-0"
                                        key={i}
                                        style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(10px)' }}
                                    >
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed fw-semibold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#faq${i}`}
                                            >
                                                <i className={`bi ${faq.icon} me-2`}></i> {faq.question}
                                            </button>
                                        </h2>
                                        <div
                                            id={`faq${i}`}
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#faqAccordion"
                                        >
                                            <div className="accordion-body">{faq.answer}</div>
                                        </div>
                                    </div>
                                ))}
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

            <Footer />
        </div>
    );
};

export default Services;
