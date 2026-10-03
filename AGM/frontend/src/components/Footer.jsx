import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Value Proposition Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          paddingBottom: '3.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '3.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(76, 175, 80, 0.15)', padding: '0.75rem', borderRadius: '12px', color: '#4caf50' }}>
              <ShieldCheck size={28} />
            </div>
            <div>
              <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '0.95rem' }}>100% Certified Quality</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Tested seeds & verified agri inputs</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '0.75rem', borderRadius: '12px', color: '#f59e0b' }}>
              <Truck size={28} />
            </div>
            <div>
              <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '0.95rem' }}>Farmgate Delivery</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Fast & secure delivery to all villages</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '0.75rem', borderRadius: '12px', color: '#38bdf8' }}>
              <RefreshCw size={28} />
            </div>
            <div>
              <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '0.95rem' }}>Easy Returns</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Hassle-free replacement policy</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(168, 85, 247, 0.15)', padding: '0.75rem', borderRadius: '12px', color: '#c084fc' }}>
              <Award size={28} />
            </div>
            <div>
              <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '0.95rem' }}>Expert Advisory</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Dedicated agronomy guidance</div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <div className="brand-logo" style={{ color: '#ffffff', marginBottom: '1rem' }}>
              <div style={{
                background: '#2e7d32',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <Sprout size={22} />
              </div>
              <div><span style={{ color: '#f59e0b' }}>AGRO</span>MART</div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem', maxWidth: '320px' }}>
              "Your Digital Marketplace for Agriculture" — Empowering farmers and growers across the nation with transparent pricing, genuine supplies, and seamless doorstep delivery.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="#4caf50" /> Kisan Helpline: 1800-AGRO-MART (Mon-Sat, 7am - 8pm)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={16} color="#4caf50" /> support@agromart.com
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <MapPin size={16} color="#4caf50" /> Agri Tech Innovation Park, Sector 18, Gurugram
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="footer-heading">Shop Categories</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=1" className="footer-link">Hybrid Crop Seeds</Link></li>
              <li><Link to="/products?category=2" className="footer-link">Organic Fertilizers</Link></li>
              <li><Link to="/products?category=3" className="footer-link">Crop Protection</Link></li>
              <li><Link to="/products?category=4" className="footer-link">Farming Hand Tools</Link></li>
              <li><Link to="/products?category=5" className="footer-link">Drip Irrigation Kits</Link></li>
              <li><Link to="/products?category=6" className="footer-link">Urban Gardening Mix</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/products" className="footer-link">All Products</Link></li>
              <li><Link to="/categories" className="footer-link">Category Directory</Link></li>
              <li><Link to="/about" className="footer-link">About AgroMart</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Support</Link></li>
              <li><Link to="/orders" className="footer-link">Track Your Order</Link></li>
              <li><Link to="/register" className="footer-link">Join as a Seller</Link></li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h4 className="footer-heading">Customer Policies</h4>
            <ul className="footer-links">
              <li><a href="#terms" className="footer-link">Terms & Conditions</a></li>
              <li><a href="#privacy" className="footer-link">Privacy Policy</a></li>
              <li><a href="#shipping" className="footer-link">Shipping Policy</a></li>
              <li><a href="#refund" className="footer-link">Return & Refund Policy</a></li>
              <li><a href="#faq" className="footer-link">Farmer FAQs</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} AGROMART. All rights reserved. Dedicated to the hardworking farmers of India.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Cash on Delivery</span>
            <span>UPI & NetBanking Ready</span>
            <span>SSL Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
