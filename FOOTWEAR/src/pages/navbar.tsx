// Navbar.tsx
import React from "react";

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
        <a href="/" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}>Home</a>
        <a href="/about" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}>About</a>
        <a href="/contact" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}>Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
