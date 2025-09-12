import { useState, useEffect } from 'react';
  


function HomePage() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = [
    { 
      id: 1, 
      name: "Air Max Revolution", 
      price: 129.99, 
      originalPrice: 159.99, 
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&crop=center", 
      category: "Sneakers", 
      rating: 4.8, 
      isNew: true,
      colors: ['#000', '#fff', '#ff6b6b']
    },
    { 
      id: 2, 
      name: "Classic Leather Boot", 
      price: 189.99, 
      originalPrice: 229.99, 
      image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=600&fit=crop&crop=center", 
      category: "Boots", 
      rating: 4.6, 
      isNew: false,
      colors: ['#8B4513', '#000', '#D2691E']
    },
    { 
      id: 3, 
      name: "Running Pro Elite", 
      price: 149.99, 
      originalPrice: 179.99, 
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&crop=center", 
      category: "Sports", 
      rating: 4.9, 
      isNew: true,
      colors: ['#4ECDC4', '#45B7D1', '#96CEB4']
    },
    { 
      id: 4, 
      name: "Oxford Business", 
      price: 199.99, 
      originalPrice: 249.99, 
      image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=600&fit=crop&crop=center", 
      category: "Formal", 
      rating: 4.7, 
      isNew: false,
      colors: ['#000', '#8B4513', '#2C3E50']
    }
  ];

  const heroSlides = [
    {
      title: "Step Into Luxury",
      subtitle: "Premium Collection 2024",
      description: "Discover handcrafted footwear that defines elegance and comfort",
      gradient: "linear-gradient(135deg, #581c87, #1e3a8a, #312e81)"
    },
    {
      title: "Crafted Perfection",
      subtitle: "Artisan Series",
      description: "Where traditional craftsmanship meets contemporary design",
      gradient: "linear-gradient(135deg, #111827, #1f2937, #000000)"
    },
    {
      title: "Performance Redefined",
      subtitle: "Elite Athletic Line",
      description: "Engineering excellence for the modern athlete",
      gradient: "linear-gradient(135deg, #064e3b, #134e4a, #155e63)"
    }
  ];

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    minWidth: '100vw',
    backgroundColor: '#000',
    color: '#fff',
    overflow: 'hidden',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

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

  const heroStyle: React.CSSProperties = {
    position: 'relative',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  };

  const heroBackgroundStyle: React.CSSProperties = {
    position: 'absolute',
    inset: '0',
    background: heroSlides[currentSlide].gradient,
    transition: 'all 1s ease-in-out'
  };

  const heroContentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    padding: '0 16px',
    maxWidth: '896px',
    margin: '0 auto'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(3rem, 8vw, 6rem)',
    fontWeight: 'bold',
    marginBottom: '24px',
    background: 'linear-gradient(to right, #fff, #d1d5db, #9ca3af)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: '1.1'
  };

  const productsContainerStyle: React.CSSProperties = {
    padding: '96px 16px',
    background: 'linear-gradient(to bottom, #000, #111827, #000)'
  };

  const productGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '32px',
    maxWidth: '1280px',
    margin: '0 auto'
  };

  const productCardStyle: React.CSSProperties = {
    position: 'relative',
    background: 'linear-gradient(135deg, rgba(55, 65, 81, 0.5), rgba(0, 0, 0, 0.5))',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(75, 85, 99, 0.5)',
    borderRadius: '24px',
    padding: '24px',
    transition: 'all 0.5s ease',
    cursor: 'pointer'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    color: '#000',
    padding: '16px 32px',
    borderRadius: '50px',
    fontWeight: '600',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease'
  };

  const outlineButtonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    color: '#fff',
    padding: '16px 32px',
    borderRadius: '50px',
    fontWeight: '600',
    fontSize: '18px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.3s ease'
  };

  return (
    
    <div style={containerStyle}>
      {/* Floating Navigation */}
      <nav style={navStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>✨</span>
          <span style={{ 
            fontSize: '20px', 
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #fff, #d1d5db)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>LUXE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px' }}>
          <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}>Collections</a>
          <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}>About</a>
          <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}>Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={heroStyle}>
        <div style={heroBackgroundStyle} />
        <div style={{
          position: 'absolute',
          inset: '0',
          opacity: 0.2,
          transform: `translateY(${scrollY * 0.3}px)`,
          transition: 'transform 75ms ease-out'
        }}>
          <div style={{
            position: 'absolute',
            top: '80px',
            left: '40px',
            width: '384px',
            height: '384px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '50%',
            filter: 'blur(48px)',
            animation: 'pulse 2s infinite'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '80px',
            right: '40px',
            width: '256px',
            height: '256px',
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
            borderRadius: '50%',
            filter: 'blur(32px)',
            animation: 'pulse 2s infinite 1s'
          }} />
        </div>
        
        <div style={heroContentStyle}>
          <div style={{
            marginBottom: '24px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            borderRadius: '50px',
            padding: '8px 16px',
            fontSize: '14px'
          }}>
            <span>✨</span>
            <span>{heroSlides[currentSlide].subtitle}</span>
          </div>
          <h1 style={titleStyle}>
            {heroSlides[currentSlide].title}
          </h1>
          <p style={{
            fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
            color: '#d1d5db',
            marginBottom: '48px',
            maxWidth: '512px',
            margin: '0 auto 48px',
            lineHeight: '1.6'
          }}>
            {heroSlides[currentSlide].description}
          </p>
          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth < 640 ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px'
          }}>
            <button 
              style={buttonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span>Explore Collection</span>
              <span>→</span>
            </button>
            <button 
              style={outlineButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#fff';
              }}
            >
              Watch Story
            </button>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, transparent, #fff)',
            margin: '0 auto 8px'
          }} />
          <p style={{ fontSize: '12px', color: '#9ca3af', letterSpacing: '0.1em' }}>SCROLL</p>
        </div>
      </section>

      {/* Featured Products */}
      <section style={productsContainerStyle}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))',
              borderRadius: '50px',
              padding: '8px 24px',
              marginBottom: '24px'
            }}>
              <span style={{ color: '#c084fc' }}>⭐</span>
              <span style={{ fontSize: '14px', color: '#d8b4fe' }}>Featured Collection</span>
            </div>
            <h2 style={{
              fontSize: 'clamp(3rem, 6vw, 4rem)',
              fontWeight: 'bold',
              marginBottom: '24px',
              background: 'linear-gradient(to right, #fff, #d1d5db, #9ca3af)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Signature Pieces
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#9ca3af',
              maxWidth: '512px',
              margin: '0 auto'
            }}>
              Meticulously crafted footwear that embodies luxury, comfort, and timeless style
            </p>
          </div>

          <div style={productGridStyle}>
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  ...productCardStyle,
                  borderColor: hoveredProduct === product.id ? 'rgba(168, 85, 247, 0.3)' : 'rgba(75, 85, 99, 0.5)',
                  transform: hoveredProduct === product.id ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: hoveredProduct === product.id ? '0 25px 50px -12px rgba(168, 85, 247, 0.2)' : 'none'
                }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Badge */}
                {product.isNew && (
                  <div style={{
                    position: 'absolute',
                    top: '24px',
                    left: '24px',
                    zIndex: 20,
                    background: 'linear-gradient(to right, #a855f7, #ec4899)',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: '50px',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span>✨</span>
                    <span>New</span>
                  </div>
                )}

                {/* Wishlist Button */}
                <button style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  zIndex: 20,
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '50%',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255, 255, 255, 0.6)',
                  cursor: 'pointer',
                  fontSize: '18px',
                  transition: 'all 0.3s ease'
                }}>
                  ♡
                </button>

                {/* Product Image */}
                <div style={{
                  position: 'relative',
                  marginBottom: '24px',
                  overflow: 'hidden',
                  borderRadius: '16px'
                }}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '256px',
                      objectFit: 'cover',
                      transform: hoveredProduct === product.id ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.7s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: '0',
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)',
                    opacity: hoveredProduct === product.id ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                  }} />
                  
                  {/* Quick Actions */}
                  <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '8px',
                    opacity: hoveredProduct === product.id ? 1 : 0,
                    
                    transition: 'all 0.3s ease'
                  }}>
                    <button style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(8px)',
                      color: '#fff',
                      padding: '8px 16px',
                      borderRadius: '50px',
                      fontSize: '14px',
                      fontWeight: '500',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.3s ease'
                    }}>
                      <span>👁</span>
                      <span>Quick View</span>
                    </button>
                    <button style={{
                      backgroundColor: '#a855f7',
                      color: '#fff',
                      padding: '8px',
                      borderRadius: '50%',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                      transition: 'background-color 0.3s ease'
                    }}>
                      🛍
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ 
                      fontSize: '12px', 
                      color: '#c084fc', 
                      fontWeight: '600', 
                      letterSpacing: '0.05em', 
                      textTransform: 'uppercase' 
                    }}>
                      {product.category}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ color: '#fbbf24' }}>⭐</span>
                      <span style={{ fontSize: '14px', color: '#d1d5db' }}>{product.rating}</span>
                    </div>
                  </div>
                  
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: hoveredProduct === product.id ? '#d8b4fe' : '#fff',
                    transition: 'color 0.3s ease'
                  }}>
                    {product.name}
                  </h3>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>
                      ${product.price}
                    </span>
                    <span style={{ fontSize: '18px', color: '#6b7280', textDecoration: 'line-through' }}>
                      ${product.originalPrice}
                    </span>
                    <span style={{
                      backgroundColor: 'rgba(34, 197, 94, 0.2)',
                      color: '#4ade80',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      Save ${(product.originalPrice - product.price).toFixed(0)}
                    </span>
                  </div>

                  {/* Color Options */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>Colors:</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {product.colors.map((color, i) => (
                        <div 
                          key={i} 
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: '2px solid #4b5563',
                            backgroundColor: color,
                            cursor: 'pointer',
                            transition: 'border-color 0.3s ease'
                          }} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section style={{
        padding: '96px 16px',
        background: 'linear-gradient(to right, rgba(88, 28, 135, 0.2), transparent, rgba(30, 58, 138, 0.2))'
      }}>
        <div style={{ maxWidth: '896px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '48px', color: '#fff' }}>
           WE PROMISE
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontSize: '32px'
              }}>
                ✨
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#fff' }}>Premium Materials</h4>
              <p style={{ color: '#9ca3af' }}>Sourced from the finest leathers and sustainable materials worldwide</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontSize: '32px'
              }}>
                💎
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#fff' }}>Handcrafted Excellence</h4>
              <p style={{ color: '#9ca3af' }}>Every pair is meticulously crafted by master artisans</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontSize: '32px'
              }}>
                ⭐
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#fff' }}>Lifetime Warranty</h4>
              <p style={{ color: '#9ca3af' }}>We stand behind our craftsmanship with confidence</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      
      </div>
 
  );
}

export default HomePage;