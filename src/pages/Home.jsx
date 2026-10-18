import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import {
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Star,
  Award,
  Gift,
  Cake,
  MessageCircle,
  Phone,
  Eye,
  CheckCircle,
  Truck,
  Heart,
} from 'lucide-react';
import logoImg from '../assets/logo.png';
import './Home.css';

export default function Home() {
  const { navigateTo, addToCart, openProductDetails } = useTheme();

  // 8 bestselling products for Home showcase
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 8);

  return (
    <div className="home-page">
      {/* =========================================================================
          1. TYPOGRAPHY-FOCUSED HERO (STRICTLY NO MAIN/HERO/BANNER IMAGES)
          Crafted with pure typography, CSS gradients, and floating floral shapes.
         ========================================================================= */}
      <section className="typography-hero-section" aria-label="Welcome to TheFlowerKraft">
        {/* Ambient CSS Radial Mesh & Gradients */}
        <div className="hero-mesh-background" aria-hidden="true" />

        {/* Gentle CSS Floating Floral & Geometric Elements */}
        <div className="floating-petals-container" aria-hidden="true">
          <div className="css-petal petal-1" />
          <div className="css-petal petal-2" />
          <div className="css-petal petal-3" />
          <div className="css-petal petal-4" />
          <div className="css-petal petal-5" />
          <div className="css-decorative-ring ring-1" />
          <div className="css-decorative-ring ring-2" />
        </div>

        <div className="container hero-typography-container">
          {/* Brand Emblem & Tagline Badge */}
          <div className="hero-brand-emblem-badge">
            <img
              src={logoImg}
              alt="TheFlowerKraft logo"
              className="hero-emblem-img"
              width="50"
              height="50"
            />
            <span className="hero-badge-text">TheFlowerKraft • Luxury Floral & Gifting Atelier</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-main-title">
            Make Every <span className="hero-italic-accent">Moment Bloom.</span>
          </h1>

          {/* Supporting Headline */}
          <p className="hero-lead-text">
            Flowers, cakes, and thoughtful gifts for life's most beautiful moments.
          </p>

          <p className="hero-sub-text">
            From hand-tied fragrant rose bouquets and artisanal gourmet celebration cakes to
            whimsical balloon styling and curated celebratory hampers, we craft emotional artistry
            for every milestone.
          </p>

          {/* Dual Action Buttons */}
          <div className="hero-button-group">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('product-categories-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else navigateTo('shop');
              }}
              className="btn btn-primary btn-lg hero-cta-btn"
            >
              <span>Explore Collection</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              onClick={() => navigateTo('shop')}
              className="btn btn-secondary btn-lg hero-secondary-btn"
            >
              <ShoppingBag size={18} />
              <span>Shop Now</span>
            </button>
          </div>

          {/* Key Value Metrics Bar */}
          <div className="hero-highlights-strip">
            <div className="highlight-pill">
              <Sparkles size={14} className="highlight-icon" />
              <span>Farm-Fresh Stems Daily</span>
            </div>
            <div className="highlight-pill">
              <Gift size={14} className="highlight-icon" />
              <span>Signature Luxury Packaging</span>
            </div>
            <div className="highlight-pill">
              <Truck size={14} className="highlight-icon" />
              <span>Pan-India Delivery Options</span>
            </div>
            <div className="highlight-pill">
              <MessageCircle size={14} className="highlight-icon" />
              <span>Concierge on 9059041818</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. ALL NINE PRODUCT CATEGORIES (Directly below hero, with elegant imagery)
         ========================================================================= */}
      <section
        id="product-categories-section"
        className="section-padding home-categories-section"
        aria-label="Product Categories"
      >
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Curated Offerings</span>
            <h2 className="section-title">Explore All 9 Product Categories</h2>
            <p className="section-subtitle">
              Every category is thoughtfully curated. Select any collection below to browse available designs.
            </p>
          </div>

          <div className="nine-categories-grid">
            {CATEGORIES.map((cat, idx) => (
              <article
                key={cat.id}
                className="category-showcase-card card"
                onClick={() => navigateTo('shop', cat.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigateTo('shop', cat.name);
                }}
                aria-label={`View ${cat.name} category in Shop`}
              >
                <div className="category-img-wrapper">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="category-showcase-img"
                    loading="lazy"
                  />
                  <div className="category-img-overlay" />
                  <span className="category-index-badge">0{idx + 1}</span>
                  <span className="category-count-chip">{cat.itemCount}</span>
                </div>

                <div className="category-card-details">
                  <h3 className="category-card-heading">{cat.name}</h3>
                  <p className="category-card-tagline">{cat.tagline}</p>
                  <span className="category-action-link">
                    <span>Explore Collection</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. BESTSELLING PRODUCTS SHOWCASE (~8 Products)
         ========================================================================= */}
      <section className="section-padding home-bestsellers-section" aria-label="Bestselling Products">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Customer Favorites</span>
            <h2 className="section-title">Bestselling Blooms & Celebration Delights</h2>
            <p className="section-subtitle">
              Hand-selected favourites loved by patrons for birthdays, romantic anniversaries, and joyful gestures.
            </p>
          </div>

          <div className="products-grid">
            {bestsellers.map((product) => (
              <div key={product.id} className="product-card card">
                <div
                  className="product-image-container"
                  onClick={() => openProductDetails(product)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') openProductDetails(product);
                  }}
                  title={`View details for ${product.name}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                  />
                  <span className="product-tag-badge">{product.tag}</span>
                  <span className="product-category-chip">{product.category}</span>
                  <button
                    type="button"
                    className="quick-view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openProductDetails(product);
                    }}
                    title="Quick Details"
                  >
                    <Eye size={14} /> Quick View
                  </button>
                </div>

                <div className="product-body">
                  <div className="product-rating">
                    <Star size={13} fill="var(--accent)" color="var(--accent)" />
                    <span className="rating-val">{product.rating}</span>
                    <span className="rating-count">({product.reviewsCount} reviews)</span>
                  </div>

                  <h3
                    className="product-title"
                    onClick={() => openProductDetails(product)}
                    style={{ cursor: 'pointer' }}
                  >
                    {product.name}
                  </h3>
                  <p className="product-desc">{product.shortDesc}</p>

                  <div className="product-price-row">
                    <div className="price-stack">
                      <span className="currency-label">INR Price</span>
                      <span className="price-amount">₹{product.price.toLocaleString('en-IN')}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(product, 1)}
                      className="btn btn-primary btn-sm add-cart-btn"
                      title="Add to Shopping Cart"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingBag size={14} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bestsellers-cta-wrap" style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              type="button"
              onClick={() => navigateTo('shop')}
              className="btn btn-primary btn-lg"
            >
              Browse Full Catalogue (50+ Curations) <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. BIRTHDAY & ANNIVERSARY CELEBRATION BANNER
         ========================================================================= */}
      <section className="celebration-banner-section">
        <div className="container">
          <div className="celebration-banner-card">
            <div className="celebration-content">
              <span className="celebration-eyebrow">✨ Milestone Celebrations</span>
              <h2 className="celebration-title">
                Birthdays & Anniversaries Deserve Nothing Less Than Extraordinary.
              </h2>
              <p className="celebration-text">
                Surprise your loved ones with a bespoke package pairing fresh Dutch roses, artisanal
                Belgian truffle cake, organic balloon styling, and handwritten gold-foil greeting cards.
              </p>
              <div className="celebration-actions">
                <button
                  type="button"
                  onClick={() => navigateTo('shop', 'Bouquets')}
                  className="btn btn-accent btn-lg"
                >
                  Curate Your Celebration
                </button>
                <a
                  href="https://wa.me/919059041818?text=Hello%20TheFlowerKart,%20I%20would%20like%20to%20plan%20a%20birthday/anniversary%20celebration."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-white btn-lg"
                >
                  <MessageCircle size={18} /> WhatsApp Concierge
                </a>
              </div>
            </div>

            <div className="celebration-visual">
              <img
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80"
                alt="Romantic Celebration Flowers"
                className="celebration-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. WHY CHOOSE THEFLOWERKART
         ========================================================================= */}
      <section className="section-padding why-choose-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">The Difference</span>
            <h2 className="section-title">Why Connoisseurs Choose TheFlowerKart</h2>
            <p className="section-subtitle">
              Every creation is imbued with artistry, quality, and a profound commitment to making your celebrations memorable.
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card card">
              <div className="benefit-icon-wrap">
                <Award size={26} />
              </div>
              <h3 className="benefit-title">Handcrafted by Master Florists</h3>
              <p className="benefit-text">
                Each bouquet and centerpiece is thoughtfully curated stem-by-stem using farm-fresh, premium quality blooms.
              </p>
            </div>

            <div className="benefit-card card">
              <div className="benefit-icon-wrap">
                <Gift size={26} />
              </div>
              <h3 className="benefit-title">Signature Luxury Packaging</h3>
              <p className="benefit-text">
                Wrapped in imported waterproof floral papers, silk ribbons, and premium embossed keepsake boxes.
              </p>
            </div>

            <div className="benefit-card card">
              <div className="benefit-icon-wrap">
                <Cake size={26} />
              </div>
              <h3 className="benefit-title">Complete Celebration Bundles</h3>
              <p className="benefit-text">
                One-stop gifting: pairing fresh blooms with freshly baked artisan cakes, balloons, and customized gift hampers.
              </p>
            </div>

            <div className="benefit-card card">
              <div className="benefit-icon-wrap">
                <MessageCircle size={26} />
              </div>
              <h3 className="benefit-title">Dedicated WhatsApp Concierge</h3>
              <p className="benefit-text">
                Direct personalized recommendations, bespoke arrangements, and immediate assistance on +91 9059041818.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CUSTOMER REVIEWS SECTION
         ========================================================================= */}
      <section className="section-padding testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Client Love</span>
            <h2 className="section-title">Words From Our Patrons</h2>
            <p className="section-subtitle">
              Read sample reviews illustrating the heartfelt experiences of our gifting clients.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="var(--accent)" color="var(--accent)" />
                ))}
              </div>
              <p className="testimonial-quote">
                “The rose and lily arrangement was breathtaking. The presentation box was so luxurious and the flowers stayed fresh for over a week! Highly recommended.”
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">AS</div>
                <div>
                  <h4 className="author-name">Ananya S.</h4>
                  <span className="author-location">Hyderabad • Anniversary Bouquet</span>
                </div>
              </div>
              <span className="testimonial-disclaimer">Verified Customer Review</span>
            </div>

            <div className="testimonial-card card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="var(--accent)" color="var(--accent)" />
                ))}
              </div>
              <p className="testimonial-quote">
                “Ordered a customized floral hamper with a Belgian chocolate cake for my mother’s 60th birthday. Truly world-class quality and exquisite packaging.”
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">RM</div>
                <div>
                  <h4 className="author-name">Rahul M.</h4>
                  <span className="author-location">Bangalore • Birthday Hamper & Cake</span>
                </div>
              </div>
              <span className="testimonial-disclaimer">Verified Customer Review</span>
            </div>

            <div className="testimonial-card card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="var(--accent)" color="var(--accent)" />
                ))}
              </div>
              <p className="testimonial-quote">
                “From the organic balloon styling to the fresh flower decor, TheFlowerKart made our private dinner celebration unforgettable. Incredible aesthetic eye!”
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">PV</div>
                <div>
                  <h4 className="author-name">Priya & Vikram</h4>
                  <span className="author-location">Mumbai • Celebration Styling</span>
                </div>
              </div>
              <span className="testimonial-disclaimer">Verified Customer Review</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. WHATSAPP & PHONE CONCIERGE BANNER
         ========================================================================= */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-box">
            <div className="cta-banner-content">
              <span className="section-eyebrow" style={{ color: 'var(--accent)' }}>
                Bespoke Orders & Urgent Enquiries
              </span>
              <h2 className="cta-banner-title">Need a Tailored Floral Creation Today?</h2>
              <p className="cta-banner-desc">
                Have a specific flower preference, custom cake flavour, or intimate celebration decor in mind?
                Reach our concierge directly on WhatsApp or telephone for immediate assistance.
              </p>
              <div className="cta-buttons-row">
                <a
                  href="https://wa.me/919059041818?text=Hello%20TheFlowerKart,%20I%20would%20like%20to%20order%20a%20customized%20arrangement."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  <MessageCircle size={18} />
                  <span>Chat on WhatsApp (+91 9059041818)</span>
                </a>

                <a href="tel:+919059041818" className="btn btn-secondary btn-lg">
                  <Phone size={18} />
                  <span>Call 9059041818</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
