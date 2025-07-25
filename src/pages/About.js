import React, { useState } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Demo request submitted!");
    closeModal();
  };

  return (
    <div className="admin-layout">
      <Navbar />
      <>
        <style>{`
        .mission-section {
          position: relative;
          max-height: 400px;
          overflow: hidden;
          border-radius: 30px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          margin-bottom: 40px;
        }
        .mission-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.6);
        }
        .mission-text-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 20px;
          text-align: center;
          color: #fff;
          max-width: 600px;
        }
        .mission-text-overlay small {
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #0dcaf0;
        }
        .mission-text-overlay h2 {
          font-weight: 700;
          line-height: 1.3;
          margin-top: 10px;
          color:#fff;
        }
        .about-heading {
          font-weight: 700;
          color: #000;
        }
        .about-paragraph {
          font-weight: 400;
          font-size: 1rem;
          color: #333;
        }
        .modal-overlay {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.6);
          z-index: 1000;
        }
        .modal-box {
          background: white;
          border-radius: 12px;
          padding: 30px;
          width: 90%;
          max-width: 500px;
          position: relative;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 1.5rem;
          font-weight: bold;
          cursor: pointer;
        }
      `}</style>
        <div className="container mt-5">
          <div className="mission-section">
            <img
              src="/assets/mission.jpg"
              alt="Our Mission"
              className="mission-bg-image"
            />
            <div className="mission-text-overlay">
              <small>Our Mission</small>
              <h2>
                To revolutionize daily commutes through <br />
                innovative, trustworthy, and environmentally <br />
                responsible transit solutions.
              </h2>
            </div>
          </div>
        </div>
        <section className="about-section text-center my-5">
          <div className="container">
            <h2 className="about-heading">Get to Know NefwayRide</h2>
            <p>
              NefwayRide was founded with a vision to transform corporate transportation by delivering safe,
              efficient, and technology-driven cab services for employees. Our mission is to provide smart and
              sustainable commuting solutions that improve the way organizations manage employee travel.
              Though we’re at the beginning of our journey, our commitment is strong—to create a future-ready
              platform that businesses can rely on for seamless daily transportation.
            </p>
            <p>
              Powered by innovation and a user-centric approach, NefwayRide is built to offer real-time tracking,
              optimized routing, and a streamlined ride experience for both employers and employees. We aim to
              simplify commute management while enhancing safety, reliability, and work-life balance for the modern
              workforce.
            </p>
            <p>
              As a dedicated employee transportation partner, NefwayRide is focused on redefining the standards of
              service in corporate mobility. From shift-based operations to custom fleet planning, we’re setting the
              stage to become a trusted mobility solution for today’s dynamic business environment.
            </p>
          </div>
        </section>
        <div className="vision-wrapper py-5 bg-light">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h6 className="text-success">Our Vision</h6>
                <h2 className="mt-3">Where excellence meets reliability.</h2>
                <p className="text-secondary mt-3">
                  <b>
                    We aim to be the world’s most trusted employee transport
                    partner, delivering unmatched service quality.
                  </b>
                </p>
                <p>
                  Our commitment goes beyond transportation—we create seamless,
                  safe, and comfortable journeys by combining innovative tech and
                  a customer-first mindset.
                </p>
              </div>
              <div className="col-md-6 text-center">
                <img
                  src="/assets/Vision.jpg"
                  alt="Vision"
                  className="img-fluid shadow"
                  style={{ maxHeight: "320px", borderRadius: "15px" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="transport-banner-wrapper my-5 mx-auto"
          style={{
            maxWidth: "1200px",
            width: "95%",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
            minHeight: "250px",
            position: "relative",
            backgroundImage: `url("/assets/Cabdriver.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              borderRadius: "12px",
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "30px 25px",
              height: "100%",
            }}
          >
            <h3 style={{ fontWeight: "700", fontSize: "1.8rem" }}>
              One employee <br />
              transportation solution <br />
              for all your needs
            </h3>
            <p style={{ fontSize: "1.1rem" }}>
              See what we have to offer in our demo.
            </p>
            <button
              className="btn btn-light text-success fw-semibold"
              onClick={openModal}
              style={{
                fontSize: "1.1rem",
                borderRadius: "30px",
                padding: "10px 30px",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.15)",
              }}
            >
              Request a Demo
            </button>
          </div>
        </div>
        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <span className="close-button" onClick={closeModal}>
                &times;
              </span>
              <h4 className="mb-3">Request a Demo</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Name</label>
                  <input className="form-control" required />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input type="email" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label>Company</label>
                  <input className="form-control" required />
                </div>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </form>
            </div>
          </div>

        )}
        <div className="container text-center my-5">
          <hr
            className="mb-4"
            style={{ borderTop: "2px solid #0dcaf0", width: "60px", margin: "0 auto" }}
          />
        </div>

      </>
      <Footer />
    </div>
  );
};

export default About;