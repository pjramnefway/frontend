import React from "react";

const UnderDevelopment = () => {
  return (
    <div className="under-dev-bg">
      <style>{`
        .under-dev-bg {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(120deg, #f8fafc 0%, #e0e7ef 100%);
          font-family: 'Segoe UI', Roboto, Arial, sans-serif;
          animation: bgMove 8s ease-in-out infinite alternate;
        }
        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .under-dev-card {
          background: rgba(255,255,255,0.95);
          padding: 48px 36px 40px 36px;
          border-radius: 22px;
          box-shadow: 0 12px 40px rgba(60, 72, 88, 0.16);
          text-align: center;
          max-width: 420px;
          position: relative;
          overflow: hidden;
        }
        .under-dev-glow {
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 180px;
          height: 60px;
          background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
          opacity: 0.18;
          filter: blur(8px);
          z-index: 0;
        }
        .under-dev-icon {
          margin-bottom: 28px;
          animation: bounce 1.8s infinite;
          z-index: 1;
          position: relative;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .under-dev-title {
          font-size: 2.2rem;
          color: #1e293b;
          margin-bottom: 14px;
          font-weight: 700;
          letter-spacing: 0.5px;
          z-index: 1;
          position: relative;
        }
        .under-dev-desc {
          color: #64748b;
          font-size: 1.15rem;
          z-index: 1;
          position: relative;
        }
      `}</style>
      <div className="under-dev-card">
        <div className="under-dev-glow"></div>
        <svg
          className="under-dev-icon"
          width="68"
          height="68"
          viewBox="0 0 68 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="34" cy="34" r="32" fill="#e0e7ef" />
          <path
            d="M22 46V42C22 38.6863 24.6863 36 28 36H40C43.3137 36 46 38.6863 46 42V46"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="34" cy="28" r="7" stroke="#3b82f6" strokeWidth="2.5" />
        </svg>
        <h1 className="under-dev-title">Page Under Development</h1>
        <p className="under-dev-desc">
          This page will be available soon.<br />Thank you for your patience!
        </p>
      </div>
    </div>
  );
};

export default UnderDevelopment;
