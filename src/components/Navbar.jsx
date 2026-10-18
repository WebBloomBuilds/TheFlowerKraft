import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Phone, MessageCircle, ShoppingBag, Menu, X, Search } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { currentPage, navigateTo, cartItemCount } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'categories', label: 'Categories' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId) => {
    if (pageId === 'categories') {
      if (currentPage === 'home') {
        const el = document.getElementById('product-categories-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setMobileMenuOpen(false);
          return;
        }
      }
      navigateTo('shop');
    } else {
      navigateTo(pageId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      {/* Top Utility Announcement Bar */}
      <div className="top-announcement-bar">
        <div className="container announcement-inner">
          <div className="announcement-left">
            <span className="announcement-pill">Luxury Florals & Celebrations</span>
            <span className="announcement-text">
              Free Express Delivery on Orders Above ₹1,999 • Handcrafted Daily
            </span>
          </div>

          <div className="announcement-right">
            <a
              href="tel:+919059041818"
              className="top-contact-link"
              title="Call TheFlowerKart Concierge"
            >
              <Phone size={13} />
              <span>9059041818</span>
            </a>

            <span className="divider-dot" aria-hidden="true">•</span>

            <a
              href="https://wa.me/919059041818?text=Hello%20TheFlowerKart,%20I%20would%20like%20to%20enquire%20about%20flowers%20and%20gifting."
              target="_blank"
              rel="noopener noreferrer"
              className="top-contact-link top-wa-link"
              title="WhatsApp Concierge"
            >
              <MessageCircle size={13} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="main-nav" aria-label="Main Navigation">
        <div className="container main-nav-inner">
          {/* Brand Logo & Title */}
          <button
            type="button"
            className="brand-logo-wrap"
            onClick={() => handleNavClick('home')}
            aria-label="TheFlowerKart - Return to Homepage"
          >
            {/* The uploaded logo is preserved exactly as provided */}
            <img
              src="/logo.png"
              alt="TheFlowerKart Floral Gift Emblem"
              className="brand-logo-img"
              width="58"
              height="58"
            />
            <div className="brand-text-block">
              <span className="brand-title">TheFlowerKart</span>
              <span className="brand-tagline">FLOWERS • CAKES • GIFTS • CELEBRATIONS</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <ul className="desktop-nav-menu">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <li key={link.id} className="nav-item">
                  <button
                    type="button"
                    className={`nav-link-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(link.id)}
                  >
                    {link.label}
                    {isActive && <span className="active-dot" aria-hidden="true" />}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Quick Action Icons */}
          <div className="nav-actions">
            <button
              type="button"
              className="action-icon-btn"
              onClick={() => handleNavClick('shop')}
              title="Search Catalog"
              aria-label="Search Catalog"
            >
              <Search size={19} />
            </button>

            {/* Live Shopping Cart Icon with Badge */}
            <button
              type="button"
              className="action-icon-btn cart-btn"
              onClick={() => navigateTo('cart')}
              title="Shopping Cart"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag size={19} />
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="drawer-logo-wrap">
                <img src="/logo.png" alt="TheFlowerKart" className="drawer-logo" />
                <span className="drawer-brand-name">TheFlowerKart</span>
              </div>
              <button
                type="button"
                className="close-drawer-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <ul className="mobile-nav-list">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <li key={link.id}>
                    <button
                      type="button"
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => handleNavClick(link.id)}
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
              <li>
                <button
                  type="button"
                  className={`mobile-nav-link ${currentPage === 'cart' ? 'active' : ''}`}
                  onClick={() => {
                    navigateTo('cart');
                    setMobileMenuOpen(false);
                  }}
                >
                  Shopping Cart ({cartItemCount})
                </button>
              </li>
            </ul>

            <div className="mobile-drawer-footer">
              <a
                href="tel:+919059041818"
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', marginBottom: '0.75rem' }}
              >
                <Phone size={15} /> Call 9059041818
              </a>
              <a
                href="https://wa.me/919059041818"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
                style={{ width: '100%' }}
              >
                <MessageCircle size={15} /> WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
