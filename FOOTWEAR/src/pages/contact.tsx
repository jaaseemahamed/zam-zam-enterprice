// src/components/Contact.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

function Contact() {
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Telegram Bot Configuration (same as your homepage)
  const TELEGRAM_BOT_TOKEN = "8298136298:AAHfZQ715gzQ016w9kimtTp3rMfGOClOFOI"; 
  const TELEGRAM_CHAT_ID = "1350433378";

  const sendToTelegram = async (message: string) => {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });
    return response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    
    const contactMessage = `
📧 *New Contact Form Submission - ZAM ZAM ENTERPRISES*

👤 *Name:* ${contactForm.name}
📧 *Email:* ${contactForm.email}
📞 *Phone:* ${contactForm.phone || 'Not provided'}
📝 *Subject:* ${contactForm.subject || 'General Inquiry'}

💬 *Message:*
${contactForm.message}

---
*Submitted from Contact Page*
    `.trim();

    try {
      const result = await sendToTelegram(contactMessage);
      
      if (result.ok) {
        setSubmitStatus('success');
        setContactForm({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(`Telegram API Error: ${result.description || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    }
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
    if (submitStatus !== 'idle') setSubmitStatus('idle');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f172a, #1e293b, #334155)', 
      color: '#fff',
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
          <Link 
            to="/about" 
            style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              textDecoration: 'none',
              transition: 'color 0.3s'
            }}
          >
            About
          </Link>
          <span style={{ color: '#fff' }}>Contact</span>
        </div>
      </nav>

      {/* Contact Content */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        paddingTop: '120px',
        padding: '120px 2rem 2rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ 
            fontSize: '4rem', 
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(to right, #fff, #d1d5db)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}>
            Get In Touch
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Have questions about our products? Need assistance with an order? We'd love to hear from you.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Contact Info */}
          <div>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '600',
              marginBottom: '2rem',
              color: '#e2e8f0'
            }}>
              Contact Information
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>📍</span>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#f1f5f9' }}>
                    Address
                  </h3>
                </div>
                <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
                  123 Luxury Lane<br />
                  Fashion District<br />
                  New York, NY 10001
                </p>
              </div>

              <div style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>📞</span>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#f1f5f9' }}>
                    Phone
                  </h3>
                </div>
                <p style={{ color: '#cbd5e1' }}>+1 (555) 123-4567</p>
              </div>

              <div style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>📧</span>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#f1f5f9' }}>
                    Email
                  </h3>
                </div>
                <p style={{ color: '#cbd5e1' }}>info@zamzamenterprises.com</p>
              </div>

              <div style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>🕒</span>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#f1f5f9' }}>
                    Business Hours
                  </h3>
                </div>
                <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '600',
              marginBottom: '2rem',
              color: '#e2e8f0'
            }}>
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '24px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)'
            }}>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                  <label style={{ 
                    display: 'block',
                    color: '#f1f5f9',
                    fontWeight: '500',
                    marginBottom: '8px',
                    fontSize: '0.875rem'
                  }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    placeholder="Enter your full name"
                    style={{
                      width: '100%',
                      background: 'rgba(55, 65, 81, 0.5)',
                      border: '1px solid rgba(75, 85, 99, 0.5)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '1rem',
                      padding: '12px 16px',
                      transition: 'all 0.3s',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#a855f7';
                      e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block',
                    color: '#f1f5f9',
                    fontWeight: '500',
                    marginBottom: '8px',
                    fontSize: '0.875rem'
                  }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    placeholder="your.email@example.com"
                    style={{
                      width: '100%',
                      background: 'rgba(55, 65, 81, 0.5)',
                      border: '1px solid rgba(75, 85, 99, 0.5)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '1rem',
                      padding: '12px 16px',
                      transition: 'all 0.3s',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#a855f7';
                      e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block',
                    color: '#f1f5f9',
                    fontWeight: '500',
                    marginBottom: '8px',
                    fontSize: '0.875rem'
                  }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    style={{
                      width: '100%',
                      background: 'rgba(55, 65, 81, 0.5)',
                      border: '1px solid rgba(75, 85, 99, 0.5)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '1rem',
                      padding: '12px 16px',
                      transition: 'all 0.3s',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#a855f7';
                      e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block',
                    color: '#f1f5f9',
                    fontWeight: '500',
                    marginBottom: '8px',
                    fontSize: '0.875rem'
                  }}>
                    Subject
                  </label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(55, 65, 81, 0.5)',
                      border: '1px solid rgba(75, 85, 99, 0.5)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '1rem',
                      padding: '12px 16px',
                      transition: 'all 0.3s',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#a855f7';
                      e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Product Question">Product Question</option>
                    <option value="Order Support">Order Support</option>
                    <option value="Returns & Exchanges">Returns & Exchanges</option>
                    <option value="Wholesale Inquiry">Wholesale Inquiry</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ 
                    display: 'block',
                    color: '#f1f5f9',
                    fontWeight: '500',
                    marginBottom: '8px',
                    fontSize: '0.875rem'
                  }}>
                    Message *
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    style={{
                      width: '100%',
                      background: 'rgba(55, 65, 81, 0.5)',
                      border: '1px solid rgba(75, 85, 99, 0.5)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '1rem',
                      padding: '12px 16px',
                      transition: 'all 0.3s',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '120px',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#a855f7';
                      e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {submitStatus === 'success' && (
                  <div style={{
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    color: '#22c55e',
                    fontSize: '0.875rem'
                  }}>
                    ✅ Message sent successfully! We'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    color: '#ef4444',
                    fontSize: '0.875rem'
                  }}>
                    ❌ Failed to send message. Please try again or contact us directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    background: isSubmitting 
                      ? 'rgba(168, 85, 247, 0.5)' 
                      : 'linear-gradient(135deg, #a855f7, #ec4899)',
                    color: '#fff',
                    fontWeight: '600',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s',
                    padding: '16px 24px',
                    fontSize: '1rem',
                    width: '100%'
                  }}
                  onMouseOver={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(168, 85, 247, 0.3)';
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span>⏳</span>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>📤</span>
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: 'center' }}>
          <Link 
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              color: '#cbd5e1',
              fontWeight: '500',
              borderRadius: '50px',
              border: '1px solid rgba(203, 213, 225, 0.2)',
              padding: '12px 24px',
              textDecoration: 'none',
              transition: 'all 0.3s',
              fontSize: '1rem'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(203, 213, 225, 0.1)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#cbd5e1';
            }}
          >
            <span>🏠</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Contact;