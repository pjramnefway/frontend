import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isReportOpen, setIsReportOpen] = useState(false);

  const navLinks = [
    {
      to: "/Nefwayrideadmin/dashboard",
      label: "Dashboard",
      icon: "fas fa-tachometer-alt",
    },
    // {
    //   to: "/Nefwayrideadmin/superuseronboarding",
    //   label: "Super User Onboarding",
    //   icon: "fas fa-user-plus",
    // },
    {
      to: "/Nefwayrideadmin/superuser",
      label: "Super User Onboarding",
      icon: "fas fa-briefcase",
    },
    {
      to: "/Nefwayrideadmin/reports",
      label: "Reports",
      icon: "fas fa-chart-line",
    },
    {
      to: "/Nefwayrideadmin/settings",
      label: "Settings",
      icon: "fas fa-cog",
    },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (to, isDropdown) => {
    if (isDropdown) {
      setIsReportOpen((prev) => !prev);
    } else {
      navigate(to);
    }
  };

  return (
    <aside style={styles.sidebar}>
      <h4 style={styles.title}>☰ Menu</h4>
      <nav style={styles.nav}>
        {navLinks.map((link) => (
          <div key={link.label}>
            <div
              onClick={() => handleNavigation(link.to, link.isDropdown)}
              style={{
                ...styles.link,
                ...(isActive(link.to) ? styles.activeLink : {}),
              }}
            >
              <i className={link.icon} style={{ marginRight: 10 }}></i>
              {link.label}
              {link.isDropdown && (
                <i
                  className={`fas fa-chevron-${isReportOpen ? "up" : "down"}`}
                  style={{ marginLeft: "auto" }}
                ></i>
              )}
            </div>

            {/* Submenu */}
            {link.isDropdown && isReportOpen && (
              <div style={styles.subMenu}>
                {link.subItems.map((sub) => (
                  <div
                    key={sub.to}
                    onClick={() => navigate(sub.to)}
                    style={{
                      ...styles.link,
                      ...styles.subLink,
                      ...(isActive(sub.to) ? styles.activeLink : {}),
                    }}
                  >
                    <i className={sub.icon} style={{ marginRight: 10 }}></i>
                    {sub.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div style={styles.version}>Version 1.0.0</div>
    </aside>
  );
};

const styles = {
  sidebar: {
    position: "fixed",
    top: "60px",
    left: 0,
    width: "300px",
    height: "calc(100vh - 60px)",
    backgroundColor: "#f1f3f6",
    padding: "20px 15px",
    boxShadow: "2px 0 6px rgba(0, 0, 0, 0.3)",
    zIndex: 999,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#222",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
  },
  link: {
    color: "#444",
    textDecoration: "none",
    fontSize: "15px",
    padding: "10px 15px",
    margin: "5px 0",
    borderRadius: "4px",
    transition: "background-color 0.2s ease",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  subMenu: {
    paddingLeft: "20px",
  },
  subLink: {
    fontSize: "14px",
    padding: "8px 15px",
    backgroundColor: "#e9ecef",
    marginTop: "2px",
  },
  activeLink: {
    backgroundColor: "#0d6efd",
    color: "#ffffff",
  },
  version: {
    fontSize: "13px",
    color: "#888",
    textAlign: "center",
    marginTop: "auto",
  },
};

export default Sidebar;
