import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const { navigateTo, currentTheme, themes } = useTheme();

  const activeThemeObj = themes.find((t) => t.id === currentTheme);

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-grid">
          {/* Col 1: Brand Info & Logo */}
          <div className="footer-col brand-col">
            <div className="footer-logo-wrap">
              <img
                src="/logo.png"
                alt="TheFlowerKart Logo"
                className="footer-logo"
                width="64"
                height="64"
              />
              <div>
                <span className="footer-brand-title">TheFlowerKart</span>
                <span className="footer-brand-sub">FLOWERS • CAKES • GIFTS • CELEBRATIONS</span>
              </div>
            </div>

            <p className="footer-desc">
              Curating exquisite floral arrangements, hand-tied bouquets, artisanal celebration cakes,
              and luxury gift hampers for life’s most cherished celebrations.
            </p>

            <div className="footer-direct-contact">
              <a href="tel:+919059041818" className="footer-contact-link">
                <Phone size={15} />
                <span>+91 9059041818</span>
              </a>
              <a
                href="https://wa.me/919059041818?text=Hello%20TheFlowerKart,%20I%20would%20like%20to%20enquire%20about%20flowers%20and%20gifting."
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-link"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-heading">E-Commerce Pages</h4>
            <ul className="footer-links-list">
              <li>
                <button type="button" onClick={() => navigateTo('home')} className="footer-link-btn">
                  Home
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('shop')} className="footer-link-btn">
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    navigateTo('home');
                    setTimeout(() => {
                      const el = document.getElementById('product-categories-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="footer-link-btn"
                >
                  All 9 Product Categories
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('cart')} className="footer-link-btn">
                  Shopping Cart
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('checkout')} className="footer-link-btn">
                  Checkout & Payment
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('about')} className="footer-link-btn">
                  About Our Brand
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('contact')} className="footer-link-btn">
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Categories */}
          <div className="footer-col">
            <h4 className="footer-heading">Signature Collections</h4>
            <ul className="footer-links-list">
              <li>
                <button type="button" onClick={() => navigateTo('shop', 'Fresh Flowers')} className="footer-link-btn">
                  Fresh Flowers
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('shop', 'Bouquets')} className="footer-link-btn">
                  Hand-tied Bouquets
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('shop', 'Arrangements')} className="footer-link-btn">
                  Flower Arrangements
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('shop', 'Flower Decorations')} className="footer-link-btn">
                  Flower Decorations
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('shop', 'Balloon Decorations')} className="footer-link-btn">
                  Balloon Decorations
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('shop', 'Cakes')} className="footer-link-btn">
                  Celebration Cakes
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('shop', 'Hampers')} className="footer-link-btn">
                  Luxury Hampers
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('shop', 'Plants')} className="footer-link-btn">
                  Indoor Plants
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('shop', 'Gifts & More')} className="footer-link-btn">
                  Gifts & More
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Demo Palette Status */}
          <div className="footer-col palette-col">
            <h4 className="footer-heading">Active Palette Preview</h4>
            <div className="active-palette-card">
              <span className="palette-card-label">Selected Colour Story:</span>
              <div className="palette-card-active-name">
                <span
                  className="palette-swatch-circle"
                  style={{ backgroundColor: activeThemeObj?.swatches[0] }}
                />
                <strong>{activeThemeObj?.name}</strong>
              </div>
              <p className="palette-card-sub">
                {activeThemeObj?.subtitle}
              </p>
              <div className="palette-demo-badge">
                7-Palette Client Preview System
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} <strong>TheFlowerKart</strong>. All rights reserved. Handcrafted Celebrations & Floral Studio.
          </p>
          <div className="footer-badges">
            <span className="footer-safety-badge">✨ Handcrafted Daily</span>
            <span className="footer-safety-badge">🌸 Farm-Fresh Stems</span>
            <span className="footer-safety-badge">🔒 Razorpay & WhatsApp Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
