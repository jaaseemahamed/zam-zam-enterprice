//src/components/About.tsx 
import { useState, useEffect } from 'react';

// Define types
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  isNew: boolean;
  colors: string[];
  sizes: string[];
}

interface OrderForm {
  name: string;
  phone: string;
  address: string;
  size: string;
  color: string;
  quantity: number;
}

export default function HomePage() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    name: '',
    phone: '',
    address: '',
    size: '',
    color: '',
    quantity: 1
  });

  // Telegram Bot Configuration - REPLACE THESE WITH YOUR ACTUAL VALUES
   const TELEGRAM_BOT_TOKEN = "8298136298:AAHfZQ715gzQ016w9kimtTp3rMfGOClOFOI"; 
    const TELEGRAM_CHAT_ID = "1350433378";
  

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const featuredProducts: Product[] = [
    { 
      id: 1, 
      name: "Air Max Revolution", 
      price: 129.99, 
      originalPrice: 159.99, 
      image: " https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=600&fit=crop&crop=center", 
      category: "Sneakers", 
      rating: 4.8, 
      isNew: true,
      colors: ['#000', '#fff', '#ff6b6b'],
      sizes: ['7', '8', '9', '10', '11', '12']
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
      colors: ['#8B4513', '#000', '#D2691E'],
      sizes: ['7', '8', '9', '10', '11', '12']
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
      colors: ['#4ECDC4', '#45B7D1', '#96CEB4'],
      sizes: ['7', '8', '9', '10', '11', '12']
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
      colors: ['#000', '#8B4513', '#2C3E50'],
      sizes: ['7', '8', '9', '10', '11', '12']
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

  const handleBuyNow = (product: Product) => {
    setSelectedProduct(product);
    setOrderForm({
      name: '',
      phone: '',
      address: '',
      size: '',
      color: '',
      quantity: 1
    });
    setShowOrderForm(true);
  };

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

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct) return;

    if (!orderForm.name || !orderForm.phone || !orderForm.address || !orderForm.size) {
      alert('Please fill in all required fields.');
      return;
    }
   
    const orderMessage = `
🛍️ *New Order from ZAM ZAM ENTERPRISES*

👤 *Customer:* ${orderForm.name}
📞 *Phone:* ${orderForm.phone}
📍 *Address:* ${orderForm.address}

👟 *Product:* ${selectedProduct.name}
💰 *Price:* $${selectedProduct.price}
📏 *Size:* US ${orderForm.size}
🎨 *Color:* ${orderForm.color || 'Not specified'}
📦 *Quantity:* ${orderForm.quantity}
💵 *Total:* $${(selectedProduct.price * orderForm.quantity).toFixed(2)}

*Category:* ${selectedProduct.category}
*Rating:* ${selectedProduct.rating}⭐
    ` .trim();

    
    try {
      const result = await sendToTelegram(orderMessage);
      
      if (result.ok) {
        alert('Order submitted successfully! We will contact you soon.');
        setShowOrderForm(false);
        setSelectedProduct(null);
        setOrderForm({
          name: '',
          phone: '',
          address: '',
          size: '',
          color: '',
          quantity: 1
        });
      } else {
        throw new Error(`Telegram API Error: ${result.description || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error sending order:', error);
      alert('Error submitting order. Please check your internet connection and try again.');
    }
  };


  return (
    <div className="main-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          scroll-behavior: smooth;
        }

        :global(html), :global(body) {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .main-container {
          background-color: #000;
          color: #fff;
          width: 100vw;
          overflow-x: hidden;
        }

        .nav {
          position: fixed;
          top: ${isMobile ? '16px' : '24px'};
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          padding: ${isMobile ? '12px 20px' : '16px 32px'};
          display: flex;
          align-items: center;
          justify-content: ${isMobile ? 'space-between' : 'flex-start'};
          gap: ${isMobile ? '0' : '32px'};
          width: ${isMobile ? '91.666667%' : 'auto'};
          max-width: ${isMobile ? '384px' : 'none'};
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-logo-icon {
          font-size: ${isMobile ? '20px' : '24px'};
        }

        .nav-logo-text {
          font-size: ${isMobile ? '18px' : '20px'};
          font-weight: bold;
          background: linear-gradient(to right, #fff, #d1d5db);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .nav-links {
          display: ${isMobile ? 'none' : 'flex'};
          align-items: center;
          gap: 24px;
          font-size: 14px;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: color 0.3s;
        }

        .nav-link:hover {
          color: #fff;
        }

        .mobile-menu {
          display: ${isMobile ? 'flex' : 'none'};
          width: 24px;
          height: 24px;
          flex-direction: column;
          justify-content: space-around;
          cursor: pointer;
        }

        .mobile-menu-bar {
          width: 100%;
          height: 2px;
          background: #fff;
          border-radius: 1px;
        }

        .hero {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          transition: all 1s ease-in-out;
          background: ${heroSlides[currentSlide].gradient};
          width: 100%;
          height: 100%;
        }

        .hero-bg-elements {
          position: absolute;
          inset: 0;
          opacity: 0.2;
          transition: transform 75ms ease-out;
          transform: translateY(${scrollY * 0.3}px);
          width: 100%;
          height: 100%;
        }

        .bg-element-1 {
          position: absolute;
          top: ${isMobile ? '40px' : '80px'};
          left: ${isMobile ? '20px' : '40px'};
          width: ${isMobile ? '192px' : '384px'};
          height: ${isMobile ? '192px' : '384px'};
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          filter: ${isMobile ? 'blur(32px)' : 'blur(48px)'};
          animation: pulse 4s infinite;
        }

        .bg-element-2 {
          position: absolute;
          bottom: ${isMobile ? '40px' : '80px'};
          right: ${isMobile ? '20px' : '40px'};
          width: ${isMobile ? '144px' : '256px'};
          height: ${isMobile ? '144px' : '256px'};
          background: rgba(168, 85, 247, 0.1);
          border-radius: 50%;
          filter: ${isMobile ? 'blur(24px)' : 'blur(32px)'};
          animation: pulse 4s infinite 1s;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.1; }
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 ${isMobile ? '16px' : '32px'};
          max-width: 1024px;
          margin: 0 auto;
          width: 100%;
        }

        .hero-badge {
          margin-bottom: 24px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(16px);
          border-radius: 50px;
          padding: ${isMobile ? '6px 12px' : '8px 16px'};
          font-size: ${isMobile ? '12px' : '14px'};
        }

        .hero-title {
          font-weight: bold;
          margin-bottom: 24px;
          background: linear-gradient(to right, #fff, #d1d5db, #9ca3af);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          line-height: 1.1;
          font-size: ${isMobile ? '36px' : isTablet ? '72px' : '96px'};
        }

        .hero-description {
          color: #d1d5db;
          margin-bottom: 48px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
          font-size: ${isMobile ? '18px' : isTablet ? '20px' : '24px'};
          max-width: ${isMobile ? '100%' : '512px'};
          padding: ${isMobile ? '0 8px' : '0'};
        }

        .hero-buttons {
          display: flex;
          flex-direction: ${isMobile ? 'column' : 'row'};
          align-items: center;
          justify-content: center;
          gap: ${isMobile ? '16px' : '24px'};
          width: 100%;
        }

        .btn-primary {
          background: #fff;
          color: #000;
          font-weight: 600;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s;
          padding: ${isMobile ? '12px 24px' : '16px 32px'};
          font-size: ${isMobile ? '16px' : '18px'};
          width: ${isMobile ? '100%' : 'auto'};
        }

        .btn-primary:hover {
          background: #f3f4f6;
          transform: scale(1.05);
        }

        .btn-secondary {
          background: transparent;
          color: #fff;
          font-weight: 600;
          border-radius: 50px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          backdrop-filter: blur(16px);
          transition: all 0.3s;
          padding: ${isMobile ? '12px 24px' : '16px 32px'};
          font-size: ${isMobile ? '16px' : '18px'};
          width: ${isMobile ? '100%' : 'auto'};
        }

        .btn-secondary:hover {
          background: #fff;
          color: #000;
        }

        .scroll-indicator {
          display: ${isMobile ? 'none' : 'block'};
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
        }

        .scroll-line {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, transparent, #fff);
          margin: 0 auto 8px;
        }

        .scroll-text {
          font-size: 12px;
          color: #9ca3af;
          letter-spacing: 0.1em;
        }

        .featured-section {
          background: linear-gradient(to bottom, #000, #111827, #000);
          padding: ${isMobile ? '64px 16px' : isTablet ? '80px 24px' : '96px 16px'};
          width: 100vw;
        }

        .featured-container {
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
        }

        .featured-header {
          text-align: center;
          margin-bottom: ${isMobile ? '48px' : '64px'};
        }

        .featured-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2));
          border-radius: 50px;
          margin-bottom: 24px;
          padding: ${isMobile ? '6px 16px' : '8px 24px'};
        }

        .featured-badge-icon {
          color: #d8b4fe;
        }

        .featured-badge-text {
          color: #e9d5ff;
          font-size: ${isMobile ? '12px' : '14px'};
        }

        .featured-title {
          font-weight: bold;
          margin-bottom: 24px;
          background: linear-gradient(to right, #fff, #d1d5db, #9ca3af);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-size: ${isMobile ? '32px' : isTablet ? '40px' : '48px'};
        }

        .featured-description {
          color: #9ca3af;
          margin: 0 auto;
          font-size: ${isMobile ? '16px' : '20px'};
          max-width: ${isMobile ? '100%' : '512px'};
          padding: ${isMobile ? '0 16px' : '0'};
        }

        .products-grid {
          display: grid;
          gap: 24px;
          max-width: 1280px;
          margin: 0 auto;
          grid-template-columns: ${isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'};
          width: 100%;
        }

        .product-card {
          position: relative;
          background: linear-gradient(135deg, rgba(55, 65, 81, 0.5), rgba(0, 0, 0, 0.5));
          backdrop-filter: blur(16px);
          border: 1px solid rgba(75, 85, 99, 0.5);
          border-radius: 24px;
          cursor: pointer;
          transition: all 0.5s;
          padding: ${isMobile ? '16px' : '24px'};
          width: 100%;
        }

        .product-card:hover {
          border-color: rgba(168, 85, 247, 0.3);
          transform: ${isMobile ? 'none' : 'scale(1.05)'};
          box-shadow: ${isMobile ? 'none' : '0 25px 50px -12px rgba(168, 85, 247, 0.2)'};
        }

        .product-badge {
          position: absolute;
          z-index: 20;
          background: linear-gradient(to right, #a855f7, #ec4899);
          color: #fff;
          border-radius: 50px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
          top: ${isMobile ? '16px' : '24px'};
          left: ${isMobile ? '16px' : '24px'};
          padding: ${isMobile ? '4px 12px' : '4px 12px'};
          font-size: ${isMobile ? '12px' : '12px'};
        }

        .wishlist-btn {
          position: absolute;
          z-index: 20;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(16px);
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.3s;
          top: ${isMobile ? '16px' : '24px'};
          right: ${isMobile ? '16px' : '24px'};
          width: ${isMobile ? '32px' : '40px'};
          height: ${isMobile ? '32px' : '40px'};
          font-size: ${isMobile ? '14px' : '18px'};
        }

        .product-image-container {
          position: relative;
          margin-bottom: 24px;
          overflow: hidden;
          border-radius: 16px;
          width: 100%;
        }

        .product-image {
          width: 100%;
          height: ${isMobile ? '192px' : '256px'};
          object-fit: cover;
          transition: transform 0.7s;
        }

        .product-image:hover {
          transform: ${isMobile ? 'none' : 'scale(1.1)'};
        }

        .product-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
          transition: opacity 0.3s;
          opacity: 0;
        }

        .product-card:hover .product-overlay {
          opacity: 1;
        }

        .quick-actions {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          transition: all 0.3s;
          opacity: 0;
        }

        .product-card:hover .quick-actions {
          opacity: 1;
        }

        .quick-view-btn {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(16px);
          color: #fff;
          font-weight: 500;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.3s;
          padding: ${isMobile ? '6px 12px' : '8px 16px'};
          font-size: ${isMobile ? '12px' : '14px'};
        }

        .add-to-cart-btn {
          background: #a855f7;
          color: #fff;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          padding: ${isMobile ? '6px' : '8px'};
          font-size: ${isMobile ? '14px' : '16px'};
        }

        .product-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .product-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .product-category {
          color: #d8b4fe;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: ${isMobile ? '12px' : '12px'};
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .rating-star {
          color: #fbbf24;
        }

        .rating-score {
          color: #d1d5db;
          font-size: ${isMobile ? '12px' : '14px'};
        }

        .product-name {
          font-weight: bold;
          transition: color 0.3s;
          font-size: ${isMobile ? '18px' : '20px'};
          color: #fff;
        }

        .product-card:hover .product-name {
          color: #e9d5ff;
        }

        .product-pricing {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: ${isMobile ? 'wrap' : 'nowrap'};
        }

        .current-price {
          font-weight: bold;
          color: #fff;
          font-size: ${isMobile ? '20px' : '24px'};
        }

        .original-price {
          color: #6b7280;
          text-decoration: line-through;
          font-size: ${isMobile ? '16px' : '18px'};
        }

        .savings-badge {
          background: rgba(34, 197, 94, 0.2);
          color: #4ade80;
          border-radius: 4px;
          padding: 4px 8px;
          font-weight: 500;
          font-size: ${isMobile ? '12px' : '12px'};
        }

        .product-colors {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .colors-label {
          color: #9ca3af;
          font-size: ${isMobile ? '12px' : '14px'};
        }

        .color-options {
          display: flex;
          gap: 4px;
        }

        .color-option {
          width: ${isMobile ? '16px' : '20px'};
          height: ${isMobile ? '16px' : '20px'};
          border-radius: 50%;
          border: 2px solid #4b5563;
          cursor: pointer;
          transition: all 0.3s;
        }

        .color-option:hover {
          border-color: #fff;
        }

        .buy-now-btn {
          background: linear-gradient(135deg, #a855f7, #ec4899);
          color: #fff;
          font-weight: 600;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s;
          padding: ${isMobile ? '12px 16px' : '14px 20px'};
          font-size: ${isMobile ? '14px' : '16px'};
          width: 100%;
        }

        .buy-now-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 25px rgba(168, 85, 247, 0.3);
        }

        .features-section {
          background: linear-gradient(to right, rgba(88, 28, 135, 0.2), transparent, rgba(30, 58, 138, 0.2));
          padding: ${isMobile ? '64px 16px' : isTablet ? '80px 24px' : '96px 16px'};
          width: 100vw;
        }

        .features-container {
          max-width: 1024px;
          margin: 0 auto;
          text-align: center;
        }

        .features-title {
          font-weight: bold;
          color: #fff;
          margin-bottom: 32px;
          font-size: ${isMobile ? '24px' : '32px'};
        }

        .features-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: ${isMobile ? '1fr' : isTablet ? '1fr' : 'repeat(3, 1fr)'};
        }

        .feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .feature-icon {
          background: linear-gradient(135deg, #a855f7, #ec4899);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${isMobile ? '48px' : '64px'};
          height: ${isMobile ? '48px' : '64px'};
          font-size: ${isMobile ? '24px' : '32px'};
        }


        .feature-icon.blue {
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
        }

        .feature-icon.green {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .feature-title {
          font-weight: 600;
          color: #fff;
          font-size: ${isMobile ? '18px' : '20px'};
        }

        .feature-description {
          color: #9ca3af;
          text-align: center;
          max-width: 320px;
          font-size: ${isMobile ? '14px' : '16px'};
          line-height: 1.6;
        }

        .footer {
  background: #111827;
  padding: ${isMobile ? '48px 16px 24px' : '64px 16px 32px'};
  border-top: 1px solid rgba(75, 85, 99, 0.3);
  width: 100%;               /* ← CHANGED from 100vw */
  box-sizing: border-box;    /* ← ADDED */
}

        .footer-container {
          max-width: 1024px;
          margin: 0 auto;
          text-align: center;
        }

        .footer-logo {
          font-size: ${isMobile ? '24px' : '28px'};
          font-weight: bold;
          margin-bottom: 16px;
          background: linear-gradient(to right, #fff, #d1d5db);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .footer-tagline {
          color: #9ca3af;
          margin-bottom: 32px;
          font-size: ${isMobile ? '14px' : '16px'};
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: ${isMobile ? '16px' : '32px'};
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .footer-link {
          color: #d1d5db;
          text-decoration: none;
          font-size: ${isMobile ? '14px' : '16px'};
          transition: color 0.3s;
        }

        .footer-link:hover {
          color: #a855f7;
        }

        .footer-divider {
          height: 1px;
          background: rgba(75, 85, 99, 0.3);
          margin: 24px 0;
        }

        .footer-bottom {
          color: #6b7280;
          font-size: ${isMobile ? '12px' : '14px'};
        }

        .order-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .order-form {
          background: linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(0, 0, 0, 0.95));
          backdrop-filter: blur(24px);
          border: 1px solid rgba(75, 85, 99, 0.3);
          border-radius: 24px;
          padding: ${isMobile ? '24px' : '32px'};
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .form-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .form-title {
          font-size: ${isMobile ? '20px' : '24px'};
          font-weight: bold;
          color: #fff;
          margin-bottom: 8px;
        }

        .form-subtitle {
          color: #9ca3af;
          font-size: ${isMobile ? '14px' : '16px'};
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          color: #d1d5db;
          font-weight: 500;
          margin-bottom: 8px;
          font-size: ${isMobile ? '14px' : '16px'};
        }

        .form-input, .form-select, .form-textarea {
          width: 100%;
          background: rgba(55, 65, 81, 0.5);
          border: 1px solid rgba(75, 85, 99, 0.5);
          border-radius: 12px;
          color: #fff;
          font-size: ${isMobile ? '14px' : '16px'};
          transition: all 0.3s;
          padding: ${isMobile ? '12px 16px' : '14px 18px'};
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: #a855f7;
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
        }

        .form-input::placeholder {
          color: #6b7280;
        }

        .form-select option {
          background: #1f2937;
          color: #fff;
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(55, 65, 81, 0.5);
          border-radius: 12px;
          padding: 4px;
          width: fit-content;
        }

        .quantity-btn {
          background: #a855f7;
          color: #fff;
          border: none;
          border-radius: 8px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
          transition: all 0.3s;
        }

        .quantity-btn:hover {
          background: #9333ea;
        }

        .quantity-btn:disabled {
          background: #6b7280;
          cursor: not-allowed;
        }

        .quantity-display {
          color: #fff;
          font-weight: 600;
          min-width: 40px;
          text-align: center;
          font-size: 16px;
        }

        .form-buttons {
          display: flex;
          gap: 16px;
          margin-top: 32px;
          flex-direction: ${isMobile ? 'column' : 'row'};
        }

        .submit-btn {
          background: linear-gradient(135deg, #a855f7, #ec4899);
          color: #fff;
          font-weight: 600;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s;
          padding: ${isMobile ? '12px 16px' : '14px 20px'};
          font-size: ${isMobile ? '14px' : '16px'};
          flex: 1;
        }

        .submit-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 25px rgba(168, 85, 247, 0.3);
        }

        .cancel-btn {
          background: transparent;
          color: #9ca3af;
          font-weight: 600;
          border-radius: 12px;
          border: 1px solid rgba(75, 85, 99, 0.5);
          cursor: pointer;
          transition: all 0.3s;
          padding: ${isMobile ? '12px 16px' : '14px 20px'};
          font-size: ${isMobile ? '14px' : '16px'};
          flex: 1;
        }

        .cancel-btn:hover {
          background: rgba(55, 65, 81, 0.5);
          color: #fff;
        }

        .product-summary {
          background: rgba(55, 65, 81, 0.3);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .summary-product {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .summary-image {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          object-fit: cover;
        }

        .summary-info h4 {
          color: #fff;
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 4px;
        }

        .summary-info p {
          color: #9ca3af;
          font-size: 14px;
          margin: 0;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid rgba(75, 85, 99, 0.3);
        }

        .total-label {
          color: #d1d5db;
          font-weight: 500;
        }

        .total-amount {
          color: #fff;
          font-weight: bold;
          font-size: 20px;
        }
      `}</style>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-logo">
          <span className="nav-logo-icon">👟</span>
          <span className="nav-logo-text">ZAM ZAM ENTERPRISES</span>
        </div>
        
        {!isMobile ? (
          <div className="nav-links">
            <a href="#" className="nav-link">Collections</a>
            <a href="#" className="nav-link">About</a>
            <a href="#" className="nav-link">Contact</a>
          </div>
        ) : (
          <div className="mobile-menu">
            <span className="mobile-menu-bar"></span>
            <span className="mobile-menu-bar"></span>
            <span className="mobile-menu-bar"></span>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg" />
        
        {/* Animated Background Elements */}
        <div className="hero-bg-elements">
          <div className="bg-element-1" />
          <div className="bg-element-2" />
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span>✨</span>
            <span>{heroSlides[currentSlide].subtitle}</span>
          </div>
          
          <h1 className="hero-title">
            {heroSlides[currentSlide].title}
          </h1>
          
          <p className="hero-description">
            {heroSlides[currentSlide].description}
          </p>
          
          <div className="hero-buttons">
            <button className="btn-primary">
              <span>Explore Collection</span>
              <span>→</span>
            </button>
            <button className="btn-secondary">
              Watch Story
            </button>
          </div>
        </div>

        {!isMobile && (
          <div className="scroll-indicator">
            <div className="scroll-line" />
            <p className="scroll-text">SCROLL</p>
          </div>
        )}
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="featured-container">
          <div className="featured-header">
            <div className="featured-badge">
              <span className="featured-badge-icon">⭐</span>
              <span className="featured-badge-text">Featured Collection</span>
            </div>
            
            <h2 className="featured-title">
              Signature Pieces
            </h2>
            
            <p className="featured-description">
              Meticulously crafted footwear that embodies luxury, comfort, and timeless style
            </p>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onMouseEnter={() => !isMobile && setHoveredProduct(product.id)}
                onMouseLeave={() => !isMobile && setHoveredProduct(null)}
                onClick={() => isMobile && setHoveredProduct(hoveredProduct === product.id ? null : product.id)}
              >
                {/* Product Badge */}
                {product.isNew && (
                  <div className="product-badge">
                    <span>🔥</span>
                    <span>New</span>
                  </div>
                )}

                {/* Wishlist Button */}
                <button className="wishlist-btn">
                  ♡
                </button>

                {/* Product Image */}
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-overlay" />
                  
                  {/* Quick Actions */}
                  <div className="quick-actions">
                    <button className="quick-view-btn">
                      <span>👁</span>
                      <span>Quick View</span>
                    </button>
                    <button className="add-to-cart-btn">
                      🛍
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="product-info">
                  <div className="product-meta">
                    <span className="product-category">
                      {product.category}
                    </span>
                    <div className="product-rating">
                      <span className="rating-star">⭐</span>
                      <span className="rating-score">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="product-name">
                    {product.name}
                  </h3>
                  
                  <div className="product-pricing">
                    <span className="current-price">
                      ${product.price}
                    </span>
                    <span className="original-price">
                      ${product.originalPrice}
                    </span>
                    <span className="savings-badge">
                      Save ${(product.originalPrice - product.price).toFixed(0)}
                    </span>
                  </div>

                  {/* Color Options */}
                  <div className="product-colors">
                    <span className="colors-label">Colors:</span>
                    <div className="color-options">
                      {product.colors.map((color, i) => (
                        <div 
                          key={i} 
                          className="color-option"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Buy Now Button */}
                  <button 
                    className="buy-now-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuyNow(product);
                    }}
                  >
                    <span>🛒</span>
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h3 className="features-title">
            Why Choose ZAM ZAM ENTERPRISES
          </h3>
          
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                🚀
              </div>
              <h4 className="feature-title">
                Fast Delivery
              </h4>
              <p className="feature-description">
                Get your premium footwear delivered within 24-48 hours with our express shipping service.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon blue">
                🛡️
              </div>
              <h4 className="feature-title">
                Quality Guarantee
              </h4>
              <p className="feature-description">
                All our products come with a 30-day quality guarantee and hassle-free returns.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon green">
                💎
              </div>
              <h4 className="feature-title">
                Premium Materials
              </h4>
              <p className="feature-description">
                Crafted using only the finest materials for durability, comfort, and style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">ZAM ZAM ENTERPRISES</div>
          <p className="footer-tagline">
            Your trusted partner in premium footwear since 2020
          </p>
          <div className="footer-links">
            <a href="#privacy" className="footer-link">Privacy Policy</a>
            <a href="#terms" className="footer-link">Terms of Service</a>
            <a href="#shipping" className="footer-link">Shipping Info</a>
            <a href="#support" className="footer-link">Customer Support</a>
          </div>
          <div className="footer-divider"></div>
          <p className="footer-bottom">
            © 2024 ZAM ZAM Enterprises. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Order Form Modal */}
      {showOrderForm && selectedProduct && (
        <div className="order-modal">
          <form className="order-form" onSubmit={handleOrderSubmit}>
            <div className="form-header">
              <h3 className="form-title">Complete Your Order</h3>
              <p className="form-subtitle">Just a few details to get your luxury footwear delivered</p>
            </div>

            {/* Product Summary */}
            <div className="product-summary">
              <div className="summary-product">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="summary-image"
                />
                <div className="summary-info">
                  <h4>{selectedProduct.name}</h4>
                  <p>{selectedProduct.category} • ⭐ {selectedProduct.rating}</p>
                </div>
              </div>
              <div className="summary-total">
                <span className="total-label">Total:</span>
                <span className="total-amount">
                  ${(selectedProduct.price * orderForm.quantity).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-input"
                value={orderForm.name}
                onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                className="form-input"
                value={orderForm.phone}
                onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                required
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Delivery Address *</label>
              <textarea
                className="form-textarea"
                value={orderForm.address}
                onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                required
                placeholder="Enter your complete delivery address..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Size *</label>
              <select
                className="form-select"
                value={orderForm.size}
                onChange={(e) => setOrderForm({...orderForm, size: e.target.value})}
                required
              >
                <option value="">Select Size</option>
                {selectedProduct.sizes.map((size: string) => (
                  <option key={size} value={size}>US {size}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Color</label>
              <select
                className="form-select"
                value={orderForm.color}
                onChange={(e) => setOrderForm({...orderForm, color: e.target.value})}
              >
                <option value="">Select Color</option>
                {selectedProduct.colors.map((color, index) => (
                  <option key={index} value={color}>
                    {color === '#000' ? 'Black' : 
                     color === '#fff' ? 'White' : 
                     color === '#ff6b6b' ? 'Red' :
                     color === '#8B4513' ? 'Brown' :
                     color === '#D2691E' ? 'Light Brown' :
                     color === '#4ECDC4' ? 'Turquoise' :
                     color === '#45B7D1' ? 'Blue' :
                     color === '#96CEB4' ? 'Mint' :
                     color === '#2C3E50' ? 'Dark Blue' :
                     'Custom Color'}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Quantity</label>
              <div className="quantity-controls">
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() => setOrderForm({...orderForm, quantity: Math.max(1, orderForm.quantity - 1)})}
                  disabled={orderForm.quantity <= 1}
                >
                  −
                </button>
                <span className="quantity-display">{orderForm.quantity}</span>
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() => setOrderForm({...orderForm, quantity: orderForm.quantity + 1})}
                >
                  +
                </button>
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-btn">
                <span>📦</span>
                <span>Place Order</span>
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setShowOrderForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}