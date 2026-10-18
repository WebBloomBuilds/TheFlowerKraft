import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { PRODUCTS } from '../data/products';
import {
  Star,
  ShoppingBag,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Check,
  Heart,
  Share2,
} from 'lucide-react';
import './ProductDetail.css';

export default function ProductDetail() {
  const { selectedProduct, navigateTo, addToCart, openProductDetails } = useTheme();
  const [quantity, setQuantity] = useState(1);

  // If no product is currently selected, fallback to the first product
  const product = selectedProduct || PRODUCTS[0];

  // Related products from the same category (or other bestsellers)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigateTo('checkout');
  };

  return (
    <div className="product-detail-page section-padding">
      <div className="container">
        {/* Breadcrumb / Back button */}
        <div className="detail-breadcrumb">
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="back-nav-btn"
          >
            <ArrowLeft size={16} />
            <span>Back to Collection</span>
          </button>
          <span className="crumb-sep">/</span>
          <span className="crumb-cat">{product.category}</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">{product.name}</span>
        </div>

        {/* Main Product Layout */}
        <div className="product-detail-grid">
          {/* Left Column: Image Showcase */}
          <div className="detail-gallery-col">
            <div className="detail-main-image-wrap card">
              <img
                src={product.image}
                alt={product.name}
                className="detail-main-img"
              />
              <span className="detail-tag-badge">{product.tag || 'Handcrafted'}</span>
            </div>
            <div className="gallery-trust-pills">
              <span className="trust-pill">
                <Sparkles size={14} /> Freshly Sourced
              </span>
              <span className="trust-pill">
                <Truck size={14} /> Safe Transit
              </span>
              <span className="trust-pill">
                <ShieldCheck size={14} /> 100% Quality Guaranteed
              </span>
            </div>
          </div>

          {/* Right Column: Information & Purchase Options */}
          <div className="detail-info-col">
            <div className="detail-category-label">{product.category}</div>
            <h1 className="detail-title">{product.name}</h1>

            <div className="detail-rating-row">
              <div className="detail-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="var(--accent)" color="var(--accent)" />
                ))}
              </div>
              <span className="detail-rating-score">{product.rating}</span>
              <span className="detail-review-count">({product.reviewsCount} verified reviews)</span>
              <span className="in-stock-badge">In Stock • Fresh Today</span>
            </div>

            <div className="detail-price-box">
              <span className="detail-inr-label">INR Price</span>
              <div className="detail-price-amount">₹{product.price.toLocaleString('en-IN')}</div>
              <span className="tax-inclusive-tag">Inclusive of all taxes & luxury ribbon wrap</span>
            </div>

            <div className="detail-description-block">
              <h4 className="desc-heading">About This Creation:</h4>
              <p className="desc-content">{product.shortDesc}</p>
              <p className="desc-extra">
                Carefully arranged with farm-fresh blooms and premium embellishments by TheFlowerKart's
                master artisans. Comes packaged in our signature luxury presentation wrap.
              </p>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="purchase-controls-box">
              <div className="quantity-picker-wrap">
                <span className="quantity-label">Quantity:</span>
                <div className="qty-controls">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="qty-btn"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="qty-val">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="qty-btn"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons-stack">
                <button
                  type="button"
                  onClick={() => addToCart(product, quantity)}
                  className="btn btn-primary btn-lg add-to-cart-large"
                >
                  <ShoppingBag size={18} />
                  <span>Add to Cart (₹{(product.price * quantity).toLocaleString('en-IN')})</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="btn btn-accent btn-lg buy-now-btn"
                >
                  <span>Buy Now • Instant Checkout</span>
                </button>
              </div>

              {/* Direct WhatsApp Ordering */}
              <div className="wa-direct-order-wrap">
                <a
                  href={`https://wa.me/919059041818?text=Hello%20TheFlowerKart,%20I%20would%20like%20to%20order%20${quantity}x%20"${encodeURIComponent(
                    product.name
                  )}"%20priced%20at%20Rs.%20${(product.price * quantity).toLocaleString('en-IN')}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary wa-order-button"
                >
                  <MessageCircle size={16} />
                  <span>Order Directly on WhatsApp Concierge</span>
                </a>
              </div>
            </div>

            {/* Inclusions & Delivery Info */}
            <div className="detail-meta-accordions">
              <div className="meta-accordion-item">
                <strong>✨ What's Included:</strong>
                <p>1x Handcrafted {product.name}, custom gift card with personal message, signature silk ribbon, and flower food packet.</p>
              </div>
              <div className="meta-accordion-item">
                <strong>🚚 Delivery Coverage:</strong>
                <p>Standard and same-day delivery slots available in supported metropolitan regions. Courier shipment available for non-perishable hampers.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h3 className="related-section-title">You May Also Cherish</h3>
            <div className="products-grid">
              {relatedProducts.map((rel) => (
                <div key={rel.id} className="product-card card">
                  <div
                    className="product-image-container"
                    onClick={() => openProductDetails(rel)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={rel.image} alt={rel.name} className="product-image" />
                    <span className="product-tag-badge">{rel.tag}</span>
                  </div>
                  <div className="product-body">
                    <h3
                      className="product-title"
                      onClick={() => openProductDetails(rel)}
                      style={{ cursor: 'pointer' }}
                    >
                      {rel.name}
                    </h3>
                    <p className="product-desc">{rel.shortDesc}</p>
                    <div className="product-price-row">
                      <span className="price-amount">₹{rel.price.toLocaleString('en-IN')}</span>
                      <button
                        type="button"
                        onClick={() => addToCart(rel, 1)}
                        className="btn btn-primary btn-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
