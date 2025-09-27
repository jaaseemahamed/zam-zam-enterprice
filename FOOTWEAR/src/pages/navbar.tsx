// Navbar.tsx
import React from "react";
// 1. IMPORT Link from react-router-dom
import { Link } from "react-router-dom";

function Navbar() {
  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '50px',
    padding: '16px 32px',
    display: 'flex',
    alignItems: 'center',
    gap: '32px'
  };

  const linkStyle: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    transition: 'color 0.3s'
  };

  return (
    <nav style={navStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '24px' }}>✨</span>
        <span style={{
          fontSize: '20px',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #fff, #d1d5db)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          LUXE
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px' }}>
        {/* 2. REPLACE <a> with <Link> and href with to */}
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;