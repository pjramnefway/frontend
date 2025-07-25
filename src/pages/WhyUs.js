import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WhyUs = () => {
  const [imageSrc, setImageSrc] = useState('/assets/safe.jpeg');

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="container-fluid hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 hero-text">
              <h1>
                Trusted by Teams. <br />
                Built for Business.
              </h1>
              <p className="mt-3">
                We offer reliable and stress-free daily commute solutions tailored for corporate workforces...
              </p>
            </div>
            <div className="col-md-6 text-center video-container">
              <video className="img-fluid" autoPlay muted loop playsInline>
                <source src="/assets/whyv.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-1 py-4 bg-white rounded-4 shadow-sm">
        <div className="text-center px-3">
          <h2 className="fw-bold">
            Merging reliability, safety, and sustainability
            <br />
            with effortless employee commute
          </h2>
          <p className="mt-3 mb-0 text-muted">
            NefwayRide was founded to redefine connectivity and innovation...
          </p>
        </div>
      </div>
      <div className="container my-5">
        <div className="d-flex flex-column flex-lg-row align-items-stretch gap-4 rounded-4 shadow-sm p-4 bg-white">
          <div className="flex-fill">
            <div className="accordion" id="whyUsAccordion">
              <div className="accordion-item border-0 active">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#safeCollapse"
                    aria-expanded="true"
                    aria-controls="safeCollapse"
                    onClick={() => setImageSrc('/assets/safe.jpeg')}
                  >
                    <strong><span className="accordion-title-line">Safe</span></strong>
                  </button>
                </h2>
                <div
                  id="safeCollapse"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#whyUsAccordion"
                >
                  <div className="accordion-body">
                    <p>
                      Safety is the cornerstone of a reliable cab service. For your app, this means ensuring that every
                      ride is secure for both the passengers and drivers. This starts with thoroughly verified drivers,
                      including background checks and training to meet the highest standards. To further enhance safety, the
                      app can incorporate real-time tracking, emergency buttons, and driver ratings, giving passengers peace
                      of mind throughout their journey.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item border-0">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#reliableCollapse"
                    aria-expanded="false"
                    aria-controls="reliableCollapse"
                    onClick={() => setImageSrc('/assets/reliable.jpeg')}
                  >
                    <strong><span className="accordion-title-line">Reliable</span></strong>
                  </button>
                </h2>
                <div
                  id="reliableCollapse"
                  className="accordion-collapse collapse"
                  data-bs-parent="#whyUsAccordion"
                >
                  <div className="accordion-body">
                    <p>
                      Reliability is equally essential in a corporate transport service, where punctuality and consistency
                      are paramount. This includes having a dependable system for booking, ride assignment, and real-time
                      updates, so users always know the status of their ride. Additionally, providing consistent
                      high-quality service across all trips ensures that passengers can count on the same level of comfort
                      and professionalism every time they use the service.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item border-0">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sustainableCollapse"
                    aria-expanded="false"
                    aria-controls="sustainableCollapse"
                    onClick={() => setImageSrc('/assets/sustainable.jpeg')}
                  >
                    <strong><span className="accordion-title-line">Sustainable</span></strong>
                  </button>
                </h2>
                <div
                  id="sustainableCollapse"
                  className="accordion-collapse collapse"
                  data-bs-parent="#whyUsAccordion"
                >
                  <div className="accordion-body">
                    <p>
                      Sustainability goes beyond environmental concerns—it's about thinking long-term. Additionally,
                      fostering sustainable business practices, such as minimizing waste and maximizing energy efficiency,
                      shows that your brand is dedicated to responsible growth, benefiting both the environment and the
                      community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 d-flex justify-content-center align-items-center">
            <img
              id="accordionImage"
              src={imageSrc}
              alt="Corporate cab service"
              className="img-fluid rounded-4 shadow"
              style={{ width: '400px', height: '450px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      <div className="row all-cards text-center py-80">
        <div className="col-md-4 mb-4">
          <div className="advantage-title-card p-4">
            <h2>
              Tech & Fleet <br />
              Advantage
            </h2>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="advantage-card p-4">
            <div className="advantage-icon text-success mb-3">
              <i className="fas fa-tasks"></i>
            </div>
            <h6>Vehicle Compliance</h6>
            <p className="small">Ensure all vehicles meet operational and regulatory standards.</p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="advantage-card p-4">
            <div className="advantage-icon text-warning mb-3">
              <i className="fas fa-user-lock"></i>
            </div>
            <h5>Top-Notch Safety</h5>
            <p>
              Our vehicles are equipped with GPS tracking, panic buttons, and trip monitoring to ensure passenger security.
            </p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="advantage-card p-4">
            <div className="advantage-icon text-warning mb-3">
              <i className="fas fa-broadcast-tower"></i>
            </div>
            <h6>Real-Time Tracking</h6>
            <p className="small">Monitor vehicles live with accurate GPS data and route visibility.</p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="advantage-card p-4">
            <div className="advantage-icon text-primary mb-3">
              <i className="fas fa-headphones-alt"></i>
            </div>
            <h6>24/7 Support</h6>
            <p className="small">Dedicated assistance round the clock to resolve any issues quickly.</p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="advantage-card p-4">
            <div className="advantage-icon text-dark mb-3">
              <i className="fas fa-file-invoice"></i>
            </div>
            <h6>Automated Billing</h6>
            <p className="small">Seamless, error-free invoicing for fleet usage and services.</p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="advantage-card p-4">
            <div className="advantage-icon text-success mb-3">
              <i className="fas fa-soap"></i>
            </div>
            <h6>Hygiene & Sanitization</h6>
            <p className="small">
              Daily vehicle cleaning, sanitization protocols, and hygiene kits ensure a safe, clean ride every time.
            </p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="advantage-card p-4">
            <div className="advantage-icon text-info mb-3">
              <i className="fas fa-route"></i>
            </div>
            <h6>Route Optimization</h6>
            <p className="small">
              AI-based route planning ensures minimal travel time and fuel efficiency for your team’s commute.
            </p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="advantage-card p-4">
            <div className="advantage-icon text-primary mb-3">
              <i className="fas fa-couch"></i>
            </div>
            <h6>Comfortable Rides</h6>
            <p className="small">
              Air-conditioned, well-maintained cabs designed to make daily commutes pleasant and relaxing.
            </p>
          </div>
        </div>
      </div>

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

export default WhyUs;
