import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ChevronDown, MessageCircle, Phone, HelpCircle, Sparkles, Info } from 'lucide-react';
import './Faq.css';

const FAQ_DATA = [
  {
    id: 'faq-1',
    category: 'Products',
    question: 'What product categories does THE FLOWER KRAFT offer?',
    answer:
      'We offer an extensive range of celebration and gifting offerings including Fresh Flowers, Hand-tied Bouquets, Box & Urn Arrangements, Venue & Stage Flower Decorations, Organic Balloon Decorations, Gourmet Celebration Cakes, Curated Luxury Hampers, Living Indoor Plants, and Celebration Gifts & More.',
  },
  {
    id: 'faq-2',
    category: 'Orders',
    question: 'How do I place an order with THE FLOWER KRAFT?',
    answer:
      'During this initial launch phase, you can browse our curated collections directly on this site and connect with our concierge team via WhatsApp or telephone (+91 9059041818). Once the complete e-commerce checkout is activated, you will also be able to pay and order seamlessly online.',
  },
  {
    id: 'faq-3',
    category: 'Delivery',
    question: 'Do you deliver across India?',
    answer:
      'Delivery capabilities depend on the specific product category. While select non-perishable gift hampers, curated keepsakes, and specialty gifts may be eligible for courier shipping across India, perishable items like freshly baked gourmet cakes and fresh floral bouquets are subject to local delivery zones. Exact delivery radii and shipping timelines will be finalized prior to full store launch.',
  },
  {
    id: 'faq-4',
    category: 'Customization',
    question: 'Can I customize my floral bouquet, gift hamper, or balloon styling?',
    answer:
      'Yes, bespoke creations are our signature specialty. We gladly accommodate specific bloom preferences, customized colour palettes, personalized greeting cards, custom cake flavours, and thematic balloon decor for private milestones. Simply message our WhatsApp concierge with your vision.',
  },
  {
    id: 'faq-5',
    category: 'Cakes',
    question: 'How fresh are the cakes, and when should I order them?',
    answer:
      'All celebration cakes are handcrafted to order using premium artisanal ingredients such as pure Belgian chocolate and dairy butter. To ensure optimal texture and taste, orders should typically be placed in advance. Specific ordering cut-off times and flavour menus will be confirmed with our team.',
  },
  {
    id: 'faq-6',
    category: 'Payments',
    question: 'What payment methods will be accepted?',
    answer:
      'During the current prototype period, payments for customized orders can be coordinated directly with our concierge team via UPI, bank transfer, or standard digital methods. Integrated payment gateway options including major credit/debit cards and net banking will be available in the upcoming production rollout.',
  },
  {
    id: 'faq-7',
    category: 'Policies',
    question: 'What is your cancellation and refund policy?',
    answer:
      'Because fresh floral stems and custom confections are prepared specifically for each celebration, cancellation requests and adjustments are handled on a case-by-case basis depending on how far the arrangement has progressed into preparation. Finalized terms and conditions will be published upon full launch.',
  },
  {
    id: 'faq-8',
    category: 'Support',
    question: 'How can I reach customer support for urgent requests?',
    answer:
      'For immediate assistance, please call us directly on 9059041818 or message our dedicated WhatsApp concierge at +91 9059041818. Our support hours are Monday through Sunday, 9:00 AM to 9:00 PM IST.',
  },
];

export default function Faq() {
  const { navigateTo } = useTheme();
  // Open first item by default
  const [openItems, setOpenItems] = useState({ 'faq-1': true });

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="faq-page">
      {/* FAQ Hero */}
      <section className="faq-hero">
        <div className="container">
          <div className="faq-hero-content">
            <span className="section-eyebrow">Assistance & Guidelines</span>
            <h1 className="faq-hero-title">Frequently Asked Questions</h1>
            <p className="faq-hero-subtitle">
              Find answers to general questions about our floral artistry, celebration cakes, custom orders,
              and concierge services.
            </p>
          </div>
        </div>
      </section>

      {/* General Disclaimer Notice */}
      <div className="container">
        <div className="faq-disclaimer-card" role="note">
          <Info size={18} className="faq-disclaimer-icon" />
          <div className="faq-disclaimer-text">
            <strong>Prototype Clarification:</strong> The answers below reflect provisional placeholder
            policies for preview purposes. Specific delivery coverage, same-day delivery slots, exact
            payment gateways, and cancellation terms will be finalized upon store launch.
          </div>
        </div>
      </div>

      {/* Accordion List Section */}
      <section className="section-padding faq-main-section" style={{ paddingTop: '1.5rem' }}>
        <div className="container container-narrow">
          <div className="accordion-stack">
            {FAQ_DATA.map((item, index) => {
              const isOpen = Boolean(openItems[item.id]);
              return (
                <div
                  key={item.id}
                  className={`accordion-card card ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="accordion-trigger"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <span className="accordion-question-wrap">
                      <span className="accordion-num">0{index + 1}</span>
                      <span className="accordion-question">{item.question}</span>
                    </span>
                    <span className={`accordion-icon-wrap ${isOpen ? 'rotate' : ''}`}>
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${item.id}`}
                      className="accordion-body"
                      role="region"
                    >
                      <p className="accordion-answer">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Support Callout */}
          <div className="faq-contact-callout card">
            <div className="callout-content">
              <h3 className="callout-title">Still Have Questions?</h3>
              <p className="callout-desc">
                Our floral and celebration concierges are always ready to help you curate the perfect gift.
              </p>
            </div>
            <div className="callout-buttons">
              <a
                href="https://wa.me/919059041818"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <MessageCircle size={16} /> WhatsApp (+91 9059041818)
              </a>
              <a href="tel:+919059041818" className="btn btn-secondary">
                <Phone size={16} /> Call 9059041818
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
