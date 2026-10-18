import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  ShieldCheck,
  CreditCard,
  MessageCircle,
  Truck,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  Printer,
  Copy,
  Sparkles,
} from 'lucide-react';
import './Checkout.css';

export default function Checkout() {
  const {
    cart,
    cartTotal,
    cartSubtotal,
    deliveryCharge,
    clearCart,
    navigateTo,
    showToast,
    lastCompletedOrder,
    setLastCompletedOrder,
  } = useTheme();

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    city: '',
    state: 'Telangana',
    pincode: '',
    deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    deliverySlot: 'Evening (5:00 PM - 9:00 PM)',
    recipientName: '',
    giftMessage: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [razorpayStep, setRazorpayStep] = useState('select'); // 'select' | 'processing' | 'success'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInitiateOrder = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      showToast('Please fill in all required delivery details');
      return;
    }

    if (paymentMethod === 'razorpay') {
      setShowRazorpayModal(true);
      setRazorpayStep('select');
    } else {
      // Direct WhatsApp Order
      finalizeOrder('WhatsApp Direct Payment (UPI/QR)');
    }
  };

  const handleSimulateRazorpaySuccess = () => {
    setRazorpayStep('processing');
    setTimeout(() => {
      setRazorpayStep('success');
      setTimeout(() => {
        setShowRazorpayModal(false);
        finalizeOrder('Razorpay (Verified Transaction - ID: pay_' + Math.random().toString(36).substring(2, 10) + ')');
      }, 1200);
    }, 1500);
  };

  const finalizeOrder = (paymentNote) => {
    const orderId = `TFK-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      orderId,
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryCharge,
      total: cartTotal,
      customer: { ...formData },
      paymentStatus: 'PAID & VERIFIED',
      paymentMethod: paymentNote,
    };

    setLastCompletedOrder(newOrder);
    clearCart();
    showToast(`Order ${orderId} confirmed successfully!`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If order was placed, display confirmed receipt
  if (lastCompletedOrder) {
    const order = lastCompletedOrder;
    const whatsappOrderSummary = `*NEW ORDER CONFIRMED - THEFLOWERKART*%0A` +
      `*Order ID:* ${order.orderId}%0A` +
      `*Customer:* ${order.customer.fullName} (${order.customer.phone})%0A` +
      `*Delivery Address:* ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}%0A` +
      `*Delivery Date:* ${order.customer.deliveryDate} (${order.customer.deliverySlot})%0A` +
      `*Total Amount:* Rs. ${order.total}%0A` +
      `*Payment:* ${order.paymentMethod}%0A` +
      `*Items:*%0A` +
      order.items.map((it) => `- ${it.quantity}x ${it.name} (Rs. ${it.price * it.quantity})`).join('%0A');

    return (
      <div className="checkout-page section-padding">
        <div className="container container-narrow">
          <div className="order-confirmed-card card">
            <div className="confirmed-icon-circle">
              <CheckCircle size={44} />
            </div>

            <span className="order-confirmed-badge">Order Placed Successfully</span>
            <h1 className="confirmed-title">Thank You for Celebrating With Us!</h1>
            <p className="confirmed-sub">
              Your order has been received and verified. An order summary notification is ready for delivery dispatch.
            </p>

            {/* Order Reference Box */}
            <div className="order-ref-box">
              <span className="order-ref-label">Official Order Reference:</span>
              <div className="order-ref-code">{order.orderId}</div>
              <span className="order-date-text">Verified on {order.date}</span>
            </div>

            {/* WhatsApp Dispatch to Business Owner */}
            <div className="owner-notification-box">
              <h4>Owner Order Notification Dispatch</h4>
              <p>
                Since no custom admin panel is used, click below to notify the business concierge directly on WhatsApp with all itemized order details:
              </p>
              <a
                href={`https://wa.me/919059041818?text=${whatsappOrderSummary}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg wa-dispatch-btn"
              >
                <MessageCircle size={18} />
                <span>Send Order Notification to Concierge (+91 9059041818)</span>
              </a>
            </div>

            {/* Order Summary Details */}
            <div className="receipt-items-table">
              <h4 className="receipt-heading">Order Breakdown</h4>
              {order.items.map((item, idx) => (
                <div key={idx} className="receipt-row">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="receipt-row summary-sub">
                <span>Delivery Charges</span>
                <span>{order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}</span>
              </div>
              <div className="receipt-row total-highlight">
                <strong>Total Paid</strong>
                <strong>₹{order.total.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* Delivery Address Details */}
            <div className="receipt-delivery-info">
              <h4>Delivery Destination</h4>
              <p>
                <strong>Recipient:</strong> {order.customer.fullName} • {order.customer.phone}
              </p>
              <p>
                <strong>Address:</strong> {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
              </p>
              <p>
                <strong>Scheduled Slot:</strong> {order.customer.deliveryDate} ({order.customer.deliverySlot})
              </p>
              {order.customer.giftMessage && (
                <p className="gift-message-preview">
                  <strong>Gift Note:</strong> "{order.customer.giftMessage}"
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="receipt-actions">
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-secondary"
              >
                <Printer size={16} /> Print Receipt
              </button>
              <button
                type="button"
                onClick={() => {
                  setLastCompletedOrder(null);
                  navigateTo('shop');
                }}
                className="btn btn-primary"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and no completed order
  if (cart.length === 0) {
    return (
      <div className="checkout-page section-padding">
        <div className="container container-narrow">
          <div className="order-confirmed-card card" style={{ textAlign: 'center' }}>
            <h2>No Items in Checkout</h2>
            <p>Your shopping cart is currently empty. Please add creations from our catalog first.</p>
            <button
              type="button"
              onClick={() => navigateTo('shop')}
              className="btn btn-primary"
              style={{ marginTop: '1.5rem' }}
            >
              Explore Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page section-padding">
      <div className="container">
        <div className="checkout-header-row">
          <button
            type="button"
            onClick={() => navigateTo('cart')}
            className="back-to-cart-btn"
          >
            <ArrowLeft size={16} /> Return to Cart
          </button>
          <h1 className="checkout-page-title">Secure Checkout & Delivery Details</h1>
        </div>

        <form onSubmit={handleInitiateOrder} className="checkout-layout-grid">
          {/* Left Column: Customer & Delivery Details */}
          <div className="checkout-forms-column">
            {/* Step 1: Customer Details */}
            <div className="checkout-card card">
              <div className="step-header">
                <span className="step-number">1</span>
                <div>
                  <h3 className="step-title">Customer Contact Details</h3>
                  <p className="step-subtitle">Where we will send your order confirmation</p>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="e.g. Deepika Rao"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone / WhatsApp Number <span className="req">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="e.g. 9059041818"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label htmlFor="email" className="form-label">
                  Email Address (For Order Receipts) <span className="req">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="e.g. deepika@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            {/* Step 2: Delivery Destination */}
            <div className="checkout-card card">
              <div className="step-header">
                <span className="step-number">2</span>
                <div>
                  <h3 className="step-title">Delivery Address</h3>
                  <p className="step-subtitle">Exact address for bouquet/cake hand delivery</p>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Street Address / Flat / Building <span className="req">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="2"
                  required
                  placeholder="e.g. Flat 402, Lotus Residency, Road No. 12, Banjara Hills"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-input form-textarea"
                />
              </div>

              <div className="form-grid-3" style={{ marginTop: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="city" className="form-label">
                    City <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    placeholder="e.g. Hyderabad"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state" className="form-label">
                    State <span className="req">*</span>
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="form-input form-select"
                  >
                    <option value="Telangana">Telangana</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Other">Other State</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="pincode" className="form-label">
                    Pincode <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    required
                    placeholder="e.g. 500034"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-grid-2" style={{ marginTop: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="deliveryDate" className="form-label">
                    Preferred Delivery Date <span className="req">*</span>
                  </label>
                  <input
                    type="date"
                    id="deliveryDate"
                    name="deliveryDate"
                    required
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="deliverySlot" className="form-label">
                    Delivery Time Slot
                  </label>
                  <select
                    id="deliverySlot"
                    name="deliverySlot"
                    value={formData.deliverySlot}
                    onChange={handleInputChange}
                    className="form-input form-select"
                  >
                    <option value="Morning (9:00 AM - 1:00 PM)">Morning (9:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                    <option value="Evening (5:00 PM - 9:00 PM)">Evening (5:00 PM - 9:00 PM)</option>
                    <option value="Midnight Surprise (11:30 PM - 12:15 AM)">Midnight Surprise (11:30 PM - 12:15 AM)</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label htmlFor="giftMessage" className="form-label">
                  Complimentary Gift Card Message
                </label>
                <textarea
                  id="giftMessage"
                  name="giftMessage"
                  rows="2"
                  placeholder="e.g. Happy 30th Birthday to my favorite person! Wishing you endless joy."
                  value={formData.giftMessage}
                  onChange={handleInputChange}
                  className="form-input form-textarea"
                />
              </div>
            </div>

            {/* Step 3: Payment Method Selection */}
            <div className="checkout-card card">
              <div className="step-header">
                <span className="step-number">3</span>
                <div>
                  <h3 className="step-title">Select Payment Method</h3>
                  <p className="step-subtitle">Verified & encrypted transaction processing</p>
                </div>
              </div>

              <div className="payment-options-stack">
                {/* Razorpay Option */}
                <label className={`payment-method-card ${paymentMethod === 'razorpay' ? 'is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentOption"
                    value="razorpay"
                    checked={paymentMethod === 'razorpay'}
                    onChange={() => setPaymentMethod('razorpay')}
                  />
                  <div className="method-details">
                    <div className="method-title-row">
                      <strong>Online Payment (UPI, Cards, NetBanking, Wallets)</strong>
                      <span className="gateway-badge">Razorpay Secured</span>
                    </div>
                    <p className="method-desc">
                      Fast & secure checkout via Google Pay, PhonePe, Paytm, Credit/Debit cards and NetBanking.
                    </p>
                  </div>
                </label>

                {/* Direct WhatsApp Concierge Payment Option */}
                <label className={`payment-method-card ${paymentMethod === 'whatsapp' ? 'is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentOption"
                    value="whatsapp"
                    checked={paymentMethod === 'whatsapp'}
                    onChange={() => setPaymentMethod('whatsapp')}
                  />
                  <div className="method-details">
                    <div className="method-title-row">
                      <strong>WhatsApp Concierge Order & Payment</strong>
                      <span className="gateway-badge" style={{ backgroundColor: '#25D366', color: '#FFFFFF' }}>
                        WhatsApp Direct
                      </span>
                    </div>
                    <p className="method-desc">
                      Send your order directly to our concierge team on +91 9059041818 to finalize custom details and pay via UPI QR code.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="checkout-summary-column">
            <div className="checkout-summary-card card">
              <h3 className="summary-title">Order Overview ({cart.length} items)</h3>

              <div className="checkout-items-preview">
                {cart.map((item) => (
                  <div key={item.id} className="checkout-item-mini">
                    <img src={item.image} alt={item.name} className="mini-thumb" />
                    <div className="mini-info">
                      <strong className="mini-name">{item.name}</strong>
                      <span className="mini-qty">Qty: {item.quantity}</span>
                    </div>
                    <div className="mini-price">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-breakdown">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="summary-line">
                  <span>Delivery Charges</span>
                  <span>{deliveryCharge === 0 ? <strong className="free-text">FREE</strong> : `₹${deliveryCharge}`}</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-total-line">
                  <div>
                    <strong className="total-label">Final Payable</strong>
                    <span className="total-taxes-note">(All taxes included)</span>
                  </div>
                  <strong className="total-amount">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg place-order-btn"
              >
                <span>Pay & Confirm Order (₹{cartTotal.toLocaleString('en-IN')})</span>
                <ArrowRight size={18} />
              </button>

              <div className="security-assurances">
                <div className="assurance-item">
                  <ShieldCheck size={16} /> 256-Bit SSL Encrypted
                </div>
                <div className="assurance-item">
                  <CheckCircle size={16} /> Verified Order Reference
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Razorpay Gateway Simulation Modal */}
        {showRazorpayModal && (
          <div className="razorpay-modal-overlay">
            <div className="razorpay-modal card">
              <div className="razorpay-modal-header">
                <div className="rp-brand">
                  <strong>Razorpay</strong>
                  <span>Trusted Payment Gateway</span>
                </div>
                <div className="rp-amount">₹{cartTotal.toLocaleString('en-IN')}</div>
              </div>

              <div className="razorpay-modal-body">
                {razorpayStep === 'select' && (
                  <div>
                    <p className="rp-prompt">Select Payment Mode for TheFlowerKart:</p>
                    <div className="rp-methods-list">
                      <button
                        type="button"
                        onClick={handleSimulateRazorpaySuccess}
                        className="rp-method-btn"
                      >
                        <span>⚡ UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                        <ArrowRight size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={handleSimulateRazorpaySuccess}
                        className="rp-method-btn"
                      >
                        <span>💳 Credit / Debit Card (Visa, Mastercard, RuPay)</span>
                        <ArrowRight size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={handleSimulateRazorpaySuccess}
                        className="rp-method-btn"
                      >
                        <span>🏦 NetBanking (HDFC, ICICI, SBI, Axis)</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowRazorpayModal(false)}
                      className="rp-cancel-btn"
                    >
                      Cancel Payment
                    </button>
                  </div>
                )}

                {razorpayStep === 'processing' && (
                  <div className="rp-processing-state">
                    <div className="rp-spinner" />
                    <h4>Verifying with Bank Gateway...</h4>
                    <p>Securing authenticated transaction token</p>
                  </div>
                )}

                {razorpayStep === 'success' && (
                  <div className="rp-success-state">
                    <CheckCircle size={48} className="rp-success-icon" />
                    <h4>Payment Verified & Approved!</h4>
                    <p>Generating official order receipt...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
