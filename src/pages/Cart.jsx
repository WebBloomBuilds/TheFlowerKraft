import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowLeft,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import './Cart.css';

export default function Cart() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartItemCount,
    cartSubtotal,
    deliveryCharge,
    cartTotal,
    navigateTo,
    showToast,
  } = useTheme();

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'BLOOM10' || code === 'FESTIVE') {
      const discount = Math.round(cartSubtotal * 0.1);
      setDiscountAmount(discount);
      setCouponApplied(true);
      showToast(`Coupon "${code}" applied! You saved ₹${discount}`);
    } else {
      showToast('Invalid coupon. Try code "BLOOM10" for 10% off');
    }
  };

  const finalPayable = Math.max(0, cartTotal - discountAmount);

  if (cart.length === 0) {
    return (
      <div className="cart-page section-padding">
        <div className="container container-narrow">
          <div className="empty-cart-card card">
            <div className="empty-cart-icon-wrap">
              <ShoppingBag size={48} />
            </div>
            <h2 className="empty-cart-title">Your Shopping Cart is Empty</h2>
            <p className="empty-cart-desc">
              Discover our signature floral bouquets, artisan celebration cakes, and curated gifting hampers.
            </p>
            <button
              type="button"
              onClick={() => navigateTo('shop')}
              className="btn btn-primary btn-lg"
            >
              <span>Explore Collection</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page section-padding">
      <div className="container">
        {/* Cart Page Header */}
        <div className="cart-header-row">
          <div>
            <span className="section-eyebrow" style={{ justifyContent: 'flex-start' }}>
              Your Celebration Bag
            </span>
            <h1 className="cart-page-title">Shopping Cart ({cartItemCount} items)</h1>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="continue-shopping-link"
          >
            <ArrowLeft size={16} /> Continue Shopping
          </button>
        </div>

        <div className="cart-layout-grid">
          {/* Left Column: Cart Items List */}
          <div className="cart-items-column">
            <div className="cart-items-card card">
              <div className="cart-table-header">
                <span className="col-product">Creation</span>
                <span className="col-price">Price</span>
                <span className="col-qty">Quantity</span>
                <span className="col-total">Subtotal</span>
                <span className="col-action"></span>
              </div>

              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    <div className="cart-item-meta">
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                      <div>
                        <span className="cart-item-cat">{item.category}</span>
                        <h4 className="cart-item-name">{item.name}</h4>
                        <span className="cart-item-unit-price-mobile">
                          ₹{item.price.toLocaleString('en-IN')} each
                        </span>
                      </div>
                    </div>

                    <div className="cart-item-price">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>

                    <div className="cart-item-qty">
                      <div className="qty-controls">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="qty-btn"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="qty-btn"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-subtotal">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>

                    <div className="cart-item-remove">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="remove-btn"
                        title="Remove from Cart"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-table-footer">
                <button
                  type="button"
                  onClick={clearCart}
                  className="clear-cart-btn"
                >
                  Clear Entire Cart
                </button>
                <span className="delivery-threshold-note">
                  {cartSubtotal >= 1999 ? (
                    <span className="free-shipping-tag">
                      <CheckCircle2 size={14} /> Congratulations! You unlocked Free Delivery.
                    </span>
                  ) : (
                    <span>Add ₹{(1999 - cartSubtotal).toLocaleString('en-IN')} more to unlock Free Delivery!</span>
                  )}
                </span>
              </div>
            </div>

            {/* Trust Assurance Card */}
            <div className="cart-trust-banner card">
              <div className="trust-item">
                <Truck size={20} className="trust-icon" />
                <div>
                  <strong>Pan-India Delivery Options</strong>
                  <p>Hand-delivered flowers & cakes locally; specialty courier for hampers</p>
                </div>
              </div>
              <div className="trust-item">
                <ShieldCheck size={20} className="trust-icon" />
                <div>
                  <strong>100% Secure Checkout</strong>
                  <p>Encrypted payment processing & verified order references</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="cart-summary-column">
            <div className="order-summary-card card">
              <h3 className="summary-title">Order Summary</h3>

              {/* Coupon Input */}
              <form onSubmit={handleApplyCoupon} className="coupon-form">
                <div className="coupon-input-wrap">
                  <Tag size={16} className="coupon-icon" />
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. BLOOM10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="coupon-input"
                  />
                </div>
                <button type="submit" className="btn btn-secondary btn-sm apply-coupon-btn">
                  Apply
                </button>
              </form>

              {couponApplied && (
                <div className="coupon-active-badge">
                  <CheckCircle2 size={14} /> Code BLOOM10 applied (10% off)
                </div>
              )}

              {/* Cost Calculations */}
              <div className="summary-breakdown">
                <div className="summary-line">
                  <span>Cart Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="summary-line discount-line">
                    <span>Celebration Discount</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="summary-line">
                  <span>Delivery Charges</span>
                  <span>
                    {deliveryCharge === 0 ? (
                      <strong className="free-text">FREE</strong>
                    ) : (
                      `₹${deliveryCharge}`
                    )}
                  </span>
                </div>

                <div className="summary-divider" />

                <div className="summary-total-line">
                  <div>
                    <strong className="total-label">Final Payable</strong>
                    <span className="total-taxes-note">(Incl. of all taxes)</span>
                  </div>
                  <strong className="total-amount">
                    ₹{finalPayable.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                type="button"
                onClick={() => navigateTo('checkout')}
                className="btn btn-primary btn-lg proceed-checkout-btn"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>

              <p className="summary-guarantee-note">
                ✨ Safe & encrypted checkout via Indian Payment Gateways & WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
