import React from "react";
import { Link } from "react-router-dom";

export default function MenuBar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/makeup" style={styles.link}>Makeup</Link>
        <Link to="/nailsart" style={styles.link}>Nails Art</Link>
        <Link to="/facial" style={styles.link}>Facial</Link>
        <Link to="/calendar" style={styles.link}>Calendar</Link>
        <Link to="/contact" style={{ ...styles.link, ...styles.contactBtn }}>
          Contact
        </Link>
      </div>
    </nav>
  );
}

// ✅ TypeScript-friendly CSS
const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  links: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: 500,
    fontSize: "1rem",
    transition: "color 0.3s ease",
  },
  contactBtn: {
    backgroundColor: "#e91e63",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "6px",
  },
};
