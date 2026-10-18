import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  AlertCircle,
  Sparkles,
  Info,
} from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const { showToast } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    occasion: 'Birthday',
    message: '',
  });

  const [formFeedback, setFormFeedback] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Compliance: Do not display a fake success message for an unsent enquiry.
    // Clearly inform user that this is a frontend prototype not connected to a backend.
    setFormFeedback({
      type: 'info',
      message:
        'Demo Mode Notice: Form submission is currently inactive in this design prototype and was NOT sent to a backend server. To place an enquiry or order immediately, please contact us directly via WhatsApp or Phone at +91 9059041818.',
    });
  };

  return (
    <div className="contact-page">
      {/* Contact Hero */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <span className="section-eyebrow">Concierge & Enquiries</span>
            <h1 className="contact-hero-title">Get in Touch With Us</h1>
            <p className="contact-hero-subtitle">
              Have questions about an upcoming birthday, wedding arrangement, custom gift hamper, or flower order?
              We are delighted to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section-padding contact-main-section">
        <div className="container">
          <div className="contact-grid">
            {/* Direct Connect Cards (Phone & WhatsApp) */}
            <div className="contact-info-column">
              <span className="section-eyebrow" style={{ justifyContent: 'flex-start' }}>
                Instant Assistance
              </span>
              <h2 className="contact-column-title">Direct Communication Channels</h2>
              <p className="contact-column-desc">
                For the fastest response regarding custom bouquet orders, cake availability, or same-day
                enquiries, reach out directly through our verified channels:
              </p>

              {/* Primary Direct Channels */}
              <div className="contact-cards-stack">
                {/* Telephone Card */}
                <a
                  href="tel:+919059041818"
                  className="direct-channel-card card"
                  title="Call +91 9059041818"
                >
                  <div className="channel-icon-wrap phone-icon">
                    <Phone size={24} />
                  </div>
                  <div className="channel-content">
                    <span className="channel-label">Telephone Concierge</span>
                    <strong className="channel-value">9059041818</strong>
                    <span className="channel-action">Tap to call directly (+91 9059041818)</span>
                  </div>
                </a>

                {/* WhatsApp Card */}
                <a
                  href="https://wa.me/919059041818?text=Hello%20TheFlowerKart,%20I%20would%20like%20to%20enquire%20about%20flowers%20and%20gifting."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="direct-channel-card card wa-card"
                  title="WhatsApp +91 9059041818"
                >
                  <div className="channel-icon-wrap wa-icon">
                    <MessageCircle size={24} />
                  </div>
                  <div className="channel-content">
                    <span className="channel-label">Official WhatsApp</span>
                    <strong className="channel-value">+91 9059041818</strong>
                    <span className="channel-action">Chat instantly for catalogues & custom orders</span>
                  </div>
                </a>
              </div>

              {/* Operating Hours & Concierge Details */}
              <div className="concierge-meta-box card">
                <div className="meta-item">
                  <Clock size={18} className="meta-icon" />
                  <div>
                    <strong>Concierge Support Hours</strong>
                    <p>Monday to Sunday: 9:00 AM – 9:00 PM IST</p>
                  </div>
                </div>

                <div className="meta-item" style={{ marginTop: '1rem' }}>
                  <Sparkles size={18} className="meta-icon" />
                  <div>
                    <strong>Custom Orders & Event Consultations</strong>
                    <p>Available on prior appointment & WhatsApp discussion</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="contact-form-column">
              <div className="contact-form-card card">
                <div className="form-card-header">
                  <h3 className="form-card-title">Send an Enquiry</h3>
                  <p className="form-card-subtitle">
                    Fill in your event details and celebration requirements below.
                  </p>
                </div>

                {/* Demo Backend Note */}
                <div className="form-demo-disclaimer" role="note">
                  <Info size={16} className="disclaimer-icon" />
                  <span>
                    <strong>Prototype Notice:</strong> This contact form is currently front-end only and
                    not yet connected to a database backend. Form submissions will not be delivered over email.
                  </span>
                </div>

                {formFeedback && (
                  <div className="form-feedback-banner" role="alert">
                    <AlertCircle size={18} className="feedback-icon" />
                    <p className="feedback-text">{formFeedback.message}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="enquiry-form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Full Name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email Address <span className="req">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="e.g. radhika@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="occasion" className="form-label">
                      Occasion / Category of Interest
                    </label>
                    <select
                      id="occasion"
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      className="form-input form-select"
                    >
                      <option value="Birthday">Birthday Special</option>
                      <option value="Anniversary">Anniversary Celebration</option>
                      <option value="Bouquets">Hand-tied Bouquets</option>
                      <option value="Cakes">Artisanal Cakes</option>
                      <option value="Hampers">Luxury Hampers</option>
                      <option value="Balloons">Balloon Decoration</option>
                      <option value="StageDecor">Flower Decoration & Stage Styling</option>
                      <option value="Other">Other Enquiry</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Your Message or Custom Requests <span className="req">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      placeholder="Tell us about the colors, preferred flowers, cake flavour, delivery date or specific details..."
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input form-textarea"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg submit-form-btn">
                    <Send size={16} />
                    <span>Submit Enquiry (Demo Mode)</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
