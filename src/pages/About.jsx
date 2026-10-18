import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Heart, Feather, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import './About.css';

export default function About() {
  const { navigateTo } = useTheme();

  return (
    <div className="about-page">
      {/* 1. Editorial Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <span className="section-eyebrow">Our Philosophy & Brand Story</span>
            <h1 className="about-hero-title">The Art of Thoughtful Gifting</h1>
            <p className="about-hero-subtitle">
              At <strong>TheFlowerKart</strong>, we believe flowers and thoughtful gifts are more than
              items—they are heartfelt messengers of love, gratitude, and celebration.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Brand Introduction & Meaningful Moments */}
      <section className="section-padding about-narrative-section">
        <div className="container">
          <div className="narrative-grid">
            <div className="narrative-text-block">
              <span className="section-eyebrow" style={{ justifyContent: 'flex-start' }}>
                Welcome to TheFlowerKart
              </span>
              <h2 className="narrative-title">Crafting Memories That Bloom Forever</h2>
              <div className="narrative-paragraphs">
                <p>
                  Gifting is one of humanity’s most sincere traditions. Whether welcoming a newborn,
                  celebrating a milestone anniversary, cheering up a dear friend, or honoring a wedding
                  vow, the gesture speaks when words alone cannot.
                </p>
                <p>
                  <strong>TheFlowerKart</strong> was conceptualized with a passion for elevated floral
                  styling and holistic gifting. We look at every bouquet, cake, hamper, and balloon
                  installation as a bespoke work of art tailored to evoke genuine emotion.
                </p>
                <p>
                  By thoughtfully uniting farm-fresh botanical blooms with artisanal confections and
                  impeccably packaged keepsakes, we make celebrating life’s milestones effortless,
                  luxurious, and deeply personal.
                </p>
              </div>

              <div className="narrative-actions">
                <button
                  type="button"
                  onClick={() => navigateTo('shop')}
                  className="btn btn-primary"
                >
                  Explore Our Creations <ArrowRight size={16} />
                </button>
                <a
                  href="https://wa.me/919059041818"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <MessageCircle size={16} /> Speak With Our Florist
                </a>
              </div>
            </div>

            <div className="narrative-visual-block">
              <div className="narrative-image-frame">
                <img
                  src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80"
                  alt="Floral Arrangement Studio"
                  className="narrative-main-img"
                />
                <div className="narrative-accent-card">
                  <span className="accent-quote-mark">“</span>
                  <p className="accent-quote-text">
                    Where floral elegance meets heartfelt celebration.
                  </p>
                  <span className="accent-quote-author">— TheFlowerKart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Editorial Image Gallery Section */}
      <section className="section-padding about-gallery-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Visual Editorial</span>
            <h2 className="section-title">Inspirations from Our Atelier</h2>
            <p className="section-subtitle">
              A visual glimpse into the textures, colors, and compositions that inspire our daily floral and celebration arrangements.
            </p>
          </div>

          <div className="editorial-gallery-grid">
            <div className="gallery-item item-large">
              <img
                src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Hatbox Blooms"
                className="gallery-img"
                loading="lazy"
              />
              <div className="gallery-caption">
                <h4>Signature Hatbox Arrangements</h4>
                <p>Hand-arranged luxury blooms in custom keepsake boxes</p>
              </div>
            </div>

            <div className="gallery-item">
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80"
                alt="Artisan Celebration Cake"
                className="gallery-img"
                loading="lazy"
              />
              <div className="gallery-caption">
                <h4>Artisanal Gourmet Cakes</h4>
                <p>Freshly baked confections pairing chocolate, berries & gold</p>
              </div>
            </div>

            <div className="gallery-item">
              <img
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=700&q=80"
                alt="Curated Luxury Hamper"
                className="gallery-img"
                loading="lazy"
              />
              <div className="gallery-caption">
                <h4>Grand Celebratory Hampers</h4>
                <p>Curated luxury sets pairing treats, botanicals and keepsakes</p>
              </div>
            </div>

            <div className="gallery-item item-wide">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
                alt="Event Floral Styling"
                className="gallery-img"
                loading="lazy"
              />
              <div className="gallery-caption">
                <h4>Celebration & Event Decor</h4>
                <p>Custom floral arches and atmospheric styling for life’s grandest moments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Brand Pillars */}
      <section className="section-padding about-pillars-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Our Guiding Pillars</span>
            <h2 className="section-title">The Values That Shape Every Creation</h2>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card card">
              <div className="pillar-icon">
                <Sparkles size={24} />
              </div>
              <h3 className="pillar-title">Botanical Artistry</h3>
              <p className="pillar-desc">
                We believe flowers are nature's finest sculptures. Every stem is treated with reverence, balanced for texture, hue, and longevity.
              </p>
            </div>

            <div className="pillar-card card">
              <div className="pillar-icon">
                <ShieldCheck size={24} />
              </div>
              <h3 className="pillar-title">Uncompromising Freshness</h3>
              <p className="pillar-desc">
                From morning farm collections to carefully controlled hydration, we prioritize bloom freshness and vibrant presentation.
              </p>
            </div>

            <div className="pillar-card card">
              <div className="pillar-icon">
                <Heart size={24} />
              </div>
              <h3 className="pillar-title">Heartfelt Warmth</h3>
              <p className="pillar-desc">
                Every gifting interaction is treated with deep empathy. We take pride in assisting patrons to craft personal, touching memories.
              </p>
            </div>

            <div className="pillar-card card">
              <div className="pillar-icon">
                <Feather size={24} />
              </div>
              <h3 className="pillar-title">Refined Packaging</h3>
              <p className="pillar-desc">
                Presentation elevates emotion. We utilize fine ribbons, eco-luxe wraps, and bespoke boxes that make unboxing an unforgettable ritual.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
