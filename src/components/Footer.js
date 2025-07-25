import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const btn = document.getElementById("backToTopBtn");
      if (window.scrollY > 300) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");

      setTimeout(() => {
        setSubscribed(false);
      }, 3000); // hide message after 3 seconds
    }
  };

  return (
    <>
      <footer className="custom-footer text-white">
        <div className="container py-5">
          <div className="row text-md-start text-center">
            <div className="col-md-4 mb-4 fade-in">
              <h5 className="text-uppercase mb-3 fw-bold">NefwayRide</h5>
              <p className="tagline">Innovative Commute Ecosystems for Urban Workforces</p>
              <p><i className="bi bi-geo-alt-fill me-2"></i> Nefway Technologies Pvt. Ltd.<br /> Jayanagar 4th Block, Bengaluru, Karnataka 560041</p>
              <p><i className="bi bi-telephone-fill me-2"></i> +91 9880-817-817</p>
              <div className="footer-icons mt-3">
                <a href="#" className="social-icon"><i className="bi bi-linkedin"></i></a>
                <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
                <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
              </div>
            </div>

            <div className="col-md-3 mb-4 fade-in">
              <h5 className="text-uppercase mb-3 fw-bold">Important Links</h5>
              <p><Link to="/" className="footer-link"><i className="bi bi-caret-right-fill me-2"></i>Home</Link></p>
              <p><Link to="/about" className="footer-link"><i className="bi bi-caret-right-fill me-2"></i>About</Link></p>
              <p><Link to="/services" className="footer-link"><i className="bi bi-caret-right-fill me-2"></i>Service</Link></p>
              <p><Link to="/whyus" className="footer-link"><i className="bi bi-caret-right-fill me-2"></i>Why Us</Link></p>
              <p><Link to="/drivewithnefwayride" className="footer-link"><i className="bi bi-caret-right-fill me-2"></i>Drive with Us</Link></p>
            </div>

            <div className="col-md-5 mb-4 fade-in">
              <h5 className="text-uppercase mb-3 fw-bold">Subscribe to our email list</h5>
              <form className="d-flex flex-column flex-sm-row gap-2" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  className="form-control animate-input"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-subscribe">
                  <i className="bi bi-send-fill me-1"></i>Subscribe
                </button>
              </form>
              {subscribed && (
                <div className="alert alert-success mt-3 py-2 px-3" role="alert">
                  Subscribed successfully!
                </div>
              )}
              <div className="mt-3 d-flex flex-column flex-sm-row gap-3">
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" width="140" />
                <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Google Play" width="160" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="text-center mt-3 text-muted copyright">
        <p>© Nefway Technologies Pvt. Ltd. All rights reserved.</p>
      </div>

      <button id="backToTopBtn" className="back-to-top" onClick={scrollToTop}>
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
};

export default Footer;
