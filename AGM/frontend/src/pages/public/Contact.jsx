import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Headphones,
  Store,
  HelpCircle
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Farmer Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How does Cash on Delivery (COD) work on AgroMart?",
      answer: "Cash on Delivery is available across all 15,000+ eligible pin codes. You simply select 'Cash on Delivery' at checkout and hand the cash directly to the dispatch agent when your agricultural package reaches your farm or doorstep."
    },
    {
      question: "Are seed batches certified with guaranteed germination rates?",
      answer: "Yes. Every seed variety listed on AgroMart comes directly from authorized seed breeders and government-certified research institutes. All packages bear physical lot numbers and official germination test certifications (standard >85%)."
    },
    {
      question: "What is the typical delivery timeframe for rural farmgate dispatch?",
      answer: "Standard rural dispatch takes 2 to 4 business days. Seeds and fertilizers are dispatched from regional hubs closest to your district to ensure rapid transit."
    },
    {
      question: "How can agri-dealers or manufacturers register as sellers?",
      answer: "Click 'Register' in the top navigation bar, choose 'Seller / Agri-Merchant', and provide your business credentials. Once submitted, our supplier verification team will review your license and activate your dashboard within 24 hours."
    },
    {
      question: "What should I do if an agricultural implement arrives damaged?",
      answer: "If your parcel or equipment is damaged during transit, notify our Kisan Support line within 48 hours of delivery. We will initiate a direct replacement with zero return shipping charges."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Farmer Inquiry',
        message: ''
      });
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="section-py">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
          <h1 style={{ fontSize: '2.75rem', fontWeight: '800', color: '#0f3814', marginBottom: '1rem' }}>
            Kisan Support & Contact
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: '1.6' }}>
            Have questions about crop varieties, order status, bulk orders, or becoming a certified seller? Our dedicated agronomists and support team are here to assist.
          </p>
        </div>

        {/* Contact Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          marginBottom: '5rem',
          alignItems: 'start'
        }}>
          {/* Contact Details & Hubs */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f3814', marginBottom: '1.5rem' }}>
              Connect with Our Support Hub
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ background: '#e8f5e9', padding: '0.85rem', borderRadius: '12px', color: '#2e7d32' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>Toll-Free Kisan Helpline</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f3814' }}>1800-AGRO-MART</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Mon - Sat: 7:00 AM - 8:00 PM IST</div>
                </div>
              </div>

              <div className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ background: '#fef3c7', padding: '0.85rem', borderRadius: '12px', color: '#d97706' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>Email Support</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f3814' }}>support@agromart.com</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Queries resolved within 4 hours</div>
                </div>
              </div>

              <div className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ background: '#e0f2fe', padding: '0.85rem', borderRadius: '12px', color: '#0284c7' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>Central Fulfillment Mandi Hub</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f3814' }}>
                    Agri Innovation Park, Sector 18, Gurugram, Haryana - 122002
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Regional dispatch centers across 18 states</div>
                </div>
              </div>
            </div>

            {/* Seller inquiry badge */}
            <div style={{
              background: '#f1f8e9',
              border: '1px solid #dcfce7',
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <Store size={32} color="#2e7d32" />
              <div>
                <div style={{ fontWeight: '700', color: '#0f3814', fontSize: '0.95rem' }}>Want to list your products?</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Direct onboarding for certified fertilizer, seed & equipment makers.</div>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f3814', marginBottom: '0.5rem' }}>
              Send Us a Message
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.75rem' }}>
              Fill out the details below and our agronomist support desk will respond promptly.
            </p>

            {submitted && (
              <div style={{
                background: '#dcfce7',
                border: '1px solid #86efac',
                borderRadius: '10px',
                padding: '1rem',
                color: '#15803d',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                <CheckCircle2 size={20} /> Thank you! Your inquiry has been dispatched to our Kisan Advisory team.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="farmer@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Inquiry Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-select"
                >
                  <option value="General Farmer Inquiry">General Farmer Inquiry</option>
                  <option value="Seeds Germination & Variety Advice">Seeds Germination & Variety Advice</option>
                  <option value="Order Tracking & Rural Delivery">Order Tracking & Rural Delivery</option>
                  <option value="Bulk Order for Cooperative">Bulk Order for Cooperative</option>
                  <option value="Seller Onboarding & Listing">Seller Onboarding & Listing</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Please describe your query or requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                <Send size={18} /> Submit Inquiry
              </button>
            </form>
          </div>
        </div>

        {/* Farmer FAQs Accordion */}
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="title-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <HelpCircle size={28} color="#2e7d32" /> Frequently Asked Questions
            </h2>
            <p className="subtitle-section" style={{ margin: '0 auto' }}>
              Quick answers about shipping, COD, product genuineness, and seller verification.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="card"
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: isOpen ? '1px solid #2e7d32' : '1px solid #e2e8f0'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f3814' }}>
                      {faq.question}
                    </span>
                    {isOpen ? <ChevronUp size={20} color="#2e7d32" /> : <ChevronDown size={20} color="#64748b" />}
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 1.5rem 1.25rem', color: '#475569', fontSize: '0.925rem', lineHeight: '1.6' }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
