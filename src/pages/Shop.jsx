import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { PRODUCTS } from '../data/products';
import {
  Search,
  SlidersHorizontal,
  ShoppingBag,
  Star,
  MessageCircle,
  Sparkles,
  Check,
  Eye,
} from 'lucide-react';
import './Shop.css';

const CATEGORIES_LIST = [
  'All',
  'Fresh Flowers',
  'Bouquets',
  'Arrangements',
  'Flower Decorations',
  'Balloon Decorations',
  'Cakes',
  'Hampers',
  'Plants',
  'Gifts & More',
];

export default function Shop() {
  const {
    shopCategoryFilter,
    setShopCategoryFilter,
    addToCart,
    openProductDetails,
  } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const matchesCategory =
        shopCategoryFilter === 'All' || product.category === shopCategoryFilter;

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.shortDesc.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [shopCategoryFilter, searchQuery, sortBy]);

  return (
    <div className="shop-page">
      {/* Shop Header Banner */}
      <section className="shop-hero">
        <div className="container">
          <div className="shop-hero-content">
            <span className="section-eyebrow">The Complete Collection</span>
            <h1 className="shop-title">Shop All Products & Celebrations</h1>
            <p className="shop-subtitle">
              Browse our extensive catalogue of 50 handcrafted offerings across fresh floral blooms,
              artisan cakes, balloon decorations, and curated luxury gift hampers.
            </p>
          </div>
        </div>
      </section>

      {/* Controls: Search, Category Filter Chips, Sorting */}
      <section className="shop-controls-section">
        <div className="container">
          <div className="controls-row">
            {/* Search Box */}
            <div className="search-box-wrap">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search roses, cakes, hampers, balloons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                aria-label="Search catalog"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="clear-search-btn"
                  aria-label="Clear search query"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div className="sort-box-wrap">
              <label htmlFor="shop-sort" className="sort-label">
                <SlidersHorizontal size={15} />
                <span>Sort by:</span>
              </label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Category Filter Chips Bar */}
          <div className="category-chips-track" role="tablist" aria-label="Filter products by category">
            {CATEGORIES_LIST.map((cat) => {
              const isSelected = shopCategoryFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setShopCategoryFilter(cat)}
                  className={`category-chip-btn ${isSelected ? 'is-selected' : ''}`}
                >
                  {cat}
                  {isSelected && <Check size={12} strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="shop-grid-section section-padding" style={{ paddingTop: '1.5rem' }}>
        <div className="container">
          {/* Results count & active category indicator */}
          <div className="grid-meta-bar">
            <span className="results-count">
              Showing <strong>{filteredProducts.length}</strong> creations
              {shopCategoryFilter !== 'All' && <span> in <em>"{shopCategoryFilter}"</em></span>}
            </span>

            {shopCategoryFilter !== 'All' && (
              <button
                type="button"
                onClick={() => setShopCategoryFilter('All')}
                className="reset-filter-btn"
              >
                Show All Categories
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-results-card card">
              <Sparkles size={40} className="no-results-icon" />
              <h3>No creations matched your search</h3>
              <p>Try searching for a different keyword or reset to "All" categories.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setShopCategoryFilter('All');
                }}
                className="btn btn-primary"
                style={{ marginTop: '1.25rem' }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <article key={product.id} className="product-card card">
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
                      <Eye size={14} /> View Details
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

                    <div className="product-card-footer-actions">
                      <a
                        href={`https://wa.me/919059041818?text=Hello%20TheFlowerKart,%20I%20would%20like%20to%20enquire%20about%20ordering%20"${encodeURIComponent(
                          product.name
                        )}"%20priced%20at%20Rs.%20${product.price}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wa-inquiry-link"
                      >
                        <MessageCircle size={13} />
                        <span>Order on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
