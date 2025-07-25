import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Home = () => {
  return (
    <div className="admin-layout">
      <Navbar />
      <section id="home">
        <div
          id="heroCarousel"
          className="carousel slide hero-carousel"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div
              className="carousel-item active"
              style={{ backgroundImage: "url('/assets/bg1.jpg')" }}
            >
              <div className="overlay"></div>
              <div className="carousel-caption">
                <h1>NefwayRide</h1>
                <p>Your comfort is our priority. Try our Cab Services.</p>
              </div>
            </div>
            <div
              className="carousel-item"
              style={{ backgroundImage: "url('/assets/bg3.jpg')" }}
            >
              <div className="overlay"></div>
              <div className="carousel-caption">
                <h1>Safe & Reliable</h1>
                <p>Professional drivers. Timely pickups. Peace of mind.</p>
              </div>
            </div>
            <div
              className="carousel-item"
              style={{ backgroundImage: "url('/assets/bg4.jpg')" }}
            >
              <div className="overlay"></div>
              <div className="carousel-caption">
                <h1>Easy Booking</h1>
                <p>Just a few clicks away. Book your ride in seconds.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 about-section" id="about">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center">
              <img
                src="/assets/car.png"
                alt="Office Cab"
                className="img-fluid about-image"
              />
            </div>
            <div className="col-lg-6">
              <h6 className="text-uppercase fw-bold mb-2 text-success">About Us</h6>
              <h2 className="mb-3 fw-semibold text-dark">
                NefwayRide is a sub-product of{' '}
                <a
                  href="https://nefway.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-success text-decoration-none"
                >
                  Nefway Technologies Pvt. Ltd.
                </a>
              </h2>
              <h3 className="fw-bold text-dark mb-3">
                We Provide Reliable <span className="text-success">Cab Services</span> For Office Commuters
              </h3>
              <p className="text-dark fs-6 mb-4">
                At <strong>NefwayRide</strong>, we specialize in corporate cab services tailored for employees.
                Our mission is to make your daily commute safe, efficient, and hassle-free, helping you arrive
                on time—every time.
              </p>
              <ul className="list-unstyled">
                <li className="text-dark mb-2">
                  <i className="bi bi-check-circle-fill me-2 text-success"></i>
                  <strong>Mission:</strong> To revolutionize corporate commuting with punctual and safe cab services.
                </li>
                <li className="text-dark mb-2">
                  <i className="bi bi-check-circle-fill me-2 text-success"></i>
                  <strong>Vision:</strong> To become the leading cab partner for companies across India.
                </li>
              </ul>
              <div className="row mt-4">
                <div className="col-4 mb-3">
                  <h4 className="fw-bold mb-0 text-success">1000+</h4>
                  <small className="text-muted">Daily Rides</small>
                </div>
                <div className="col-4 mb-3">
                  <h4 className="fw-bold mb-0 text-success">50+</h4>
                  <small className="text-muted">Corporate Clients</small>
                </div>
                <div className="col-4 mb-3">
                  <h4 className="fw-bold mb-0 text-success">24/7</h4>
                  <small className="text-muted">Support</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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

      <section className="py-5" id="why-us" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="px-4">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark">
              Why Choose <span style={{ color: '#18b850' }}>Us</span>
            </h2>
            <p className="text-muted">
              We stand out with our commitment to comfort, efficiency, and service.
            </p>
          </div>
          <div className="row text-center justify-content-center gy-4">
            <div className="col-6 col-md-2">
              <div className="stat-box h-100">
                <i className="bi bi-clock-fill fs-1 mb-2" style={{ color: '#18b850' }}></i>
                <h6 className="fw-bold text-dark">On-time Pickup & Drop</h6>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="stat-box h-100">
                <i className="bi bi-headset fs-1 mb-2" style={{ color: '#18b850' }}></i>
                <h6 className="fw-bold text-dark">Dedicated Support</h6>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="stat-box h-100">
                <i className="bi bi-cash-coin fs-1 mb-2" style={{ color: '#18b850' }}></i>
                <h6 className="fw-bold text-dark">Transparent Pricing</h6>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="stat-box h-100">
                <i className="bi bi-building-check fs-1 mb-2" style={{ color: '#18b850' }}></i>
                <h6 className="fw-bold text-dark">Scalable for Any Company</h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="app-section">
  <div className="yellow-bg"></div>
  <div className="container app-content">
    <div className="row align-items-center">
      <div className="col-md-6">
        <h6 className="fw-bold" style={{ color: '#184d2b' }}>
          Connect with our ecosystem.
        </h6>
        <h1 className="fw-bold mb-4">Upcoming Mobile Applications</h1>
        <p>
          We're launching two powerful mobile apps to enhance your commuting
          experience and service operations. Stay tuned!
        </p>
        <p>Both apps are currently in development and will be coming soon.</p>
        <div className="d-flex flex-column gap-4 mt-4">
          <div>
            <h6 className="fw-bold mb-2">Driver App</h6>
            <div className="d-flex gap-3 flex-wrap">
              <a href="#" className="store-btn google">
                <i className="bi bi-google-play"></i> Google Play
              </a>
              <a href="#" className="store-btn apple">
                <i className="bi bi-apple"></i> App Store
              </a>
            </div>
          </div>
          <div>
            <h6 className="fw-bold mb-2">Employee App</h6>
            <div className="d-flex gap-3 flex-wrap">
              <a href="#" className="store-btn google">
                <i className="bi bi-google-play"></i> Google Play
              </a>
              <a href="#" className="store-btn apple">
                <i className="bi bi-apple"></i> App Store
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 text-center mt-4 mt-md-0">
        <img
          src="/assets/upcomingapp.png"
          alt="Taxi App"
          className="img-fluid mobile-img"
        />
      </div>
    </div>
  </div>
</section>
      <>
        <div className="text-center my-5">
          <h1>
            NefwayRide One’s Full Range of Services Produces Strategic Results
          </h1>
          <h5 className="fw-normal">
            Secure, easy, and effortless. Our employee commute solution offers all this and beyond.
          </h5>
        </div>

        <div className="container">
          <div className="card-wrapper">
            <div
              className="commute-card"
              style={{ backgroundImage: "url('/assets/Technology.jpg')" }}
            >
              <div className="initial-title">Technology</div>
              <div className="overlay">
                <div className="title">Technology</div>
                <div className="details">
                  Our innovative technology elevates your operations by enhancing every aspect of employee transport.
                  With features such as demand forecasting, fleet management, and real-time analytics, we give you the
                  tools to manage your employee commute seamlessly.
                </div>
              </div>
            </div>
            <div
              className="commute-card"
              style={{ backgroundImage: "url('/assets/Management.jpg')" }}
            >
              <div className="initial-title">Fleet Management</div>
              <div className="overlay">
                <div className="title">Fleet Management</div>
                <div className="details">
                  Seamlessly control your fleet with intelligent route planning, live tracking, utilization reporting, and
                  real-time performance analytics for optimal transport efficiency. Stay ahead of potential issues and
                  ensure maximum productivity with proactive management tools.
                </div>
              </div>
            </div>
            <div
              className="commute-card"
              style={{ backgroundImage: "url('/assets/Operation.jpg')" }}
            >
              <div className="initial-title">Operations</div>
              <div className="overlay">
                <div className="title">Operations</div>
                <div className="details">
                  Enhance your daily transport operations with automated scheduling, intelligent dispatching, and
                  effortless coordination tools. Increase operational efficiency, reduce costs, and achieve timely
                  deliveries with automation that adapts to your business needs.
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      <section className="py-5 contact-section" id="contact">
        <h2 className="fw-bold mb-4 text-center">Let’s Get in Touch</h2>
        <div className="container-fluid px-4">
          <div className="row align-items-center">

            <div className="col-lg-6 mb-4 mb-lg-0 position-relative text-center">
              <img src="/assets/map.jpg" alt="World Map" className="img-fluid" />
            </div>

            <div className="col-lg-6 px-4">
              <p className="text-muted mb-4">If you have any questions, feel free to contact us.</p>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-person"></i>
                      </span>
                      <input type="text" className="form-control" placeholder="First Name" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-person"></i>
                      </span>
                      <input type="text" className="form-control" placeholder="Last Name" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input type="email" className="form-control" placeholder="Email Address" required />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-telephone"></i>
                      </span>
                      <input type="tel" className="form-control" placeholder="+91 00000 00000" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-chat-dots"></i>
                      </span>
                      <textarea rows="2" className="form-control" placeholder="Your Message" required></textarea>
                    </div>
                  </div>
                  <div className="col-12 text-end">
                    <button type="submit" className="btn btn-success px-4 py-2">Send</button>
                  </div>
                </div>
              </form>
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

export default Home;
