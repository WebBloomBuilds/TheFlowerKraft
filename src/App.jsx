import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ThemeSelector from './components/ThemeSelector';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// The 7 Required Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';

import { MessageCircle, CheckCircle2 } from 'lucide-react';
import './App.css';

function MainApp() {
  const { currentPage, toastMessage } = useTheme();

  // Router for the 7 pages: Homepage + exactly 6 additional pages
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop />;
      case 'product-detail':
        return <ProductDetail />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="site-wrapper">
      {/* 1. Temporary 7-Colour Theme Selector Bar */}
      <ThemeSelector />

      {/* 2. Main Navigation Header */}
      <Navbar />

      {/* 3. Active Page Content */}
      <main id="main-content" className="site-main" tabIndex={-1}>
        {renderPage()}
      </main>

      {/* 4. Luxury Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action Button */}
      <aside aria-label="Quick WhatsApp Concierge">
        <a
          href="https://wa.me/919059041818?text=Hello%20TheFlowerKart,%20I%20would%20like%20to%20enquire%20about%20flowers%20and%20gifting."
          target="_blank"
          rel="noopener noreferrer"
          className="floating-wa-btn"
          title="Direct WhatsApp Concierge (+91 9059041818)"
          aria-label="Direct WhatsApp Concierge"
        >
          <MessageCircle size={24} />
          <span className="floating-wa-label">WhatsApp Us</span>
        </a>
      </aside>

      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="demo-toast" role="status" aria-live="polite">
          <CheckCircle2 size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
