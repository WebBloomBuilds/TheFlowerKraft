import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { CATEGORIES } from '../data/categories';
import { ArrowRight, Sparkles, Filter } from 'lucide-react';
import './Categories.css';

export default function Categories() {
  const { navigateTo } = useTheme();

  const handleCategorySelect = (categoryName) => {
    // Open Shop page with this category selected
    navigateTo('shop', categoryName);
  };

  return (
    <div className="categories-page">
      {/* Category Hero */}
      <section className="categories-hero">
        <div className="container">
          <div className="categories-hero-content">
            <span className="section-eyebrow">Our Signature Offerings</span>
            <h1 className="categories-hero-title">Product Categories</h1>
            <p className="categories-hero-subtitle">
              Explore our diverse range of fresh floral artistry, gourmet confectioneries, luxury hampers,
              and bespoke venue styling for every milestone. Tap any category to view available designs in our Shop.
            </p>
          </div>
        </div>
      </section>

      {/* Main Categories Grid */}
      <section className="section-padding categories-main-section">
        <div className="container">
          <div className="all-categories-grid">
            {CATEGORIES.map((cat, index) => (
              <article
                key={cat.id}
                className="category-card card"
                onClick={() => handleCategorySelect(cat.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCategorySelect(cat.name);
                }}
                aria-label={`View ${cat.name} in Shop`}
              >
                <div className="category-card-media">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="category-card-img"
                    loading="lazy"
                  />
                  <div className="category-card-gradient" />
                  <span className="category-card-num">0{index + 1}</span>
                  <span className="category-card-badge">{cat.itemCount}</span>
                </div>

                <div className="category-card-info">
                  <div className="category-card-header">
                    <h2 className="category-card-name">{cat.name}</h2>
                    <span className="category-card-tagline">{cat.tagline}</span>
                  </div>

                  <p className="category-card-description">{cat.description}</p>

                  <div className="category-card-action">
                    <span className="category-browse-cta">
                      <span>Browse {cat.name}</span>
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Quick Consultation Callout */}
          <div className="custom-styling-card card">
            <div className="custom-styling-content">
              <div className="custom-icon-badge">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="custom-title">Need a Tailored Celebration Combination?</h3>
                <p className="custom-desc">
                  Pair custom flower arrangements, balloon backdrops, and signature cakes for weddings,
                  private birthdays, or corporate events. We curate bespoke packages upon request.
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/919059041818?text=Hello%20The%20Flower%20Kraft,%20I%20would%20like%20to%20request%20a%20custom%20celebration%20package."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Enquire on WhatsApp (+91 9059041818)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
