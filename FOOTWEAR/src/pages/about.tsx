// src/components/About.tsx
import { Link } from 'react-router-dom';

function About() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #581c87, #1e3a8a)', 
      color: '#fff',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Navigation */}
      <nav style={{ 
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '50px',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: '32px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>👟</span>
          <span style={{ 
            fontSize: '20px', 
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #fff, #d1d5db)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}>
            ZAM ZAM ENTERPRISES
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px' }}>
          <Link 
            to="/" 
            style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              textDecoration: 'none',
              transition: 'color 0.3s'
            }}
          >
            Home
          </Link>
          <a 
            href="#" 
            style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              textDecoration: 'none',
              transition: 'color 0.3s'
            }}
          >
            Collections
          </a>
          <span style={{ color: '#fff' }}>About</span>
          <a 
            href="#" 
            style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              textDecoration: 'none',
              transition: 'color 0.3s'
            }}
          >
            Contact
          </a>
        </div>
      </nav>

      {/* About Content */}
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        paddingTop: '120px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: 'bold',
          marginBottom: '2rem',
          background: 'linear-gradient(to right, #fff, #d1d5db)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        }}>
          About ZAM ZAM ENTERPRISES
        </h1>
        
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          padding: '3rem',
          marginBottom: '2rem',
          textAlign: 'left',
          lineHeight: '1.8',
          fontSize: '1.125rem'
        }}>
          <h2 style={{ 
            color: '#e9d5ff', 
            marginBottom: '1.5rem',
            fontSize: '1.5rem',
            fontWeight: '600'
          }}>
            Our Story
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#d1d5db' }}>
            Founded in 2020, ZAM ZAM Enterprises has been at the forefront of luxury footwear, 
            combining traditional craftsmanship with contemporary design. We believe that every 
            step should be a statement of style, comfort, and confidence.
          </p>
          
          <h3 style={{ 
            color: '#e9d5ff', 
            marginBottom: '1rem',
            fontSize: '1.25rem',
            fontWeight: '600'
          }}>
            Our Mission
          </h3>
          <p style={{ marginBottom: '1.5rem', color: '#d1d5db' }}>
            To provide premium quality footwear that doesn't compromise on style or comfort. 
            We source the finest materials and work with skilled artisans to create shoes 
            that stand the test of time.
          </p>

          <h3 style={{ 
            color: '#e9d5ff', 
            marginBottom: '1rem',
            fontSize: '1.25rem',
            fontWeight: '600'
          }}>
            Why Choose Us
          </h3>
          <ul style={{ 
            color: '#d1d5db', 
            paddingLeft: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <li style={{ marginBottom: '0.5rem' }}>Premium materials sourced globally</li>
            <li style={{ marginBottom: '0.5rem' }}>Expert craftsmanship with attention to detail</li>
            <li style={{ marginBottom: '0.5rem' }}>Fast and reliable delivery service</li>
            <li style={{ marginBottom: '0.5rem' }}>30-day quality guarantee</li>
            <li style={{ marginBottom: '0.5rem' }}>Exceptional customer service</li>
          </ul>
        </div>

        <Link 
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
            color: '#fff',
            fontWeight: '600',
            borderRadius: '50px',
            padding: '16px 32px',
            textDecoration: 'none',
            transition: 'all 0.3s',
            fontSize: '1.125rem'
          }}
        >
          <span>🏠</span>
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}

export default About;