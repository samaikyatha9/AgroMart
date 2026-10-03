import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sprout, 
  ShieldCheck, 
  Truck, 
  Users, 
  TrendingUp, 
  Target, 
  Award, 
  ArrowRight,
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';

const About = () => {
  return (
    <div className="section-py">
      <div className="container">
        {/* Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#e8f5e9',
            color: '#1b5e20',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            <Sprout size={16} /> Empowering Indian Agriculture
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#0f3814', lineHeight: '1.15', marginBottom: '1.25rem' }}>
            Transforming Farming Through Digital Access & Trust
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#64748b', lineHeight: '1.6' }}>
            <strong>AGROMART</strong> is a digital marketplace bridging the gap between progressive farmers, certified agri-manufacturers, and trusted rural suppliers.
          </p>
        </div>

        {/* Visual Storytelling */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '5rem'
        }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f3814', marginBottom: '1rem', lineHeight: '1.25' }}>
              "Your Digital Marketplace for Agriculture"
            </h2>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
              For decades, agricultural producers and farmers have struggled with fragmented supply chains, counterfeit pesticides, unpredictable pricing, and costly intermediaries.
            </p>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.75rem' }}>
              AgroMart was built to solve this challenge. By connecting agricultural seed breeders, organic fertilizer producers, and equipment makers directly to growers, we provide access to certified, genuine agricultural supplies with complete transparency and door-to-farmgate delivery.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '600', color: '#1b5e20' }}>
                <CheckCircle2 size={20} color="#2e7d32" /> 100% Genuine, tested, and lab-certified inputs
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '600', color: '#1b5e20' }}>
                <CheckCircle2 size={20} color="#2e7d32" /> Fair pricing directly benefiting both sellers and growers
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '600', color: '#1b5e20' }}>
                <CheckCircle2 size={20} color="#2e7d32" /> Doorstep delivery covering 15,000+ rural pin codes
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '600', color: '#1b5e20' }}>
                <CheckCircle2 size={20} color="#2e7d32" /> Dedicated agronomy guidance and crop advisory
              </div>
            </div>
          </div>

          <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
            <img
              src="https://images.unsplash.com/photo-1592417817098-8f3d6eb2252a?auto=format&fit=crop&w=800&q=80"
              alt="Harvest and field agriculture"
              style={{ width: '100%', height: '420px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Impact Numbers */}
        <div style={{
          background: 'linear-gradient(135deg, #1b5e20, #0f3814)',
          borderRadius: '24px',
          padding: '3.5rem 2rem',
          color: '#ffffff',
          marginBottom: '5rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2.5rem' }}>
            AgroMart In Numbers
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem'
          }}>
            <div>
              <div style={{ fontSize: '2.75rem', fontWeight: '800', color: '#f59e0b', marginBottom: '0.25rem' }}>
                50,000+
              </div>
              <div style={{ fontSize: '1rem', color: '#cbd5e1' }}>Registered Farmers</div>
            </div>

            <div>
              <div style={{ fontSize: '2.75rem', fontWeight: '800', color: '#f59e0b', marginBottom: '0.25rem' }}>
                1,200+
              </div>
              <div style={{ fontSize: '1rem', color: '#cbd5e1' }}>Verified Sellers & Brands</div>
            </div>

            <div>
              <div style={{ fontSize: '2.75rem', fontWeight: '800', color: '#f59e0b', marginBottom: '0.25rem' }}>
                15,000+
              </div>
              <div style={{ fontSize: '1rem', color: '#cbd5e1' }}>Pin Codes Delivered</div>
            </div>

            <div>
              <div style={{ fontSize: '2.75rem', fontWeight: '800', color: '#f59e0b', marginBottom: '0.25rem' }}>
                100%
              </div>
              <div style={{ fontSize: '1rem', color: '#cbd5e1' }}>Verified Products</div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="title-section">Our Core Values</h2>
            <p className="subtitle-section" style={{ margin: '0 auto' }}>
              Built from ground-level farmer feedback, our guiding principles keep growers at the heart of everything we build.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem'
          }}>
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ background: 'rgba(46, 125, 50, 0.1)', width: '56px', height: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2e7d32', marginBottom: '1.25rem' }}>
                <Target size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#0f3814' }}>
                Farmer-First Mission
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Every tool, category, and feature is designed to reduce the input costs of farming and maximize seasonal harvest profitability.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', width: '56px', height: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', marginBottom: '1.25rem' }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#0f3814' }}>
                Rigorous Quality Verification
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Sellers must submit manufacturing licenses, seed certification documents, and adhere to strict zero-counterfeit standards.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ background: 'rgba(2, 132, 199, 0.1)', width: '56px', height: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7', marginBottom: '1.25rem' }}>
                <Truck size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#0f3814' }}>
                Last-Mile Rural Logistics
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
                We partner with specialized rural dispatch couriers who navigate village terrain to deliver bulk sacks and fragile items directly to farm gates.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ background: 'rgba(147, 51, 234, 0.1)', width: '56px', height: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea', marginBottom: '1.25rem' }}>
                <HeartHandshake size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#0f3814' }}>
                Direct Agri-Merchant Collaboration
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
                We empower local Krishi Kendras and licensed distributors to establish digital storefronts and expand customer reach without technical barriers.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div style={{
          background: '#f1f8e9',
          border: '1px solid #dcfce7',
          borderRadius: '24px',
          padding: '3rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f3814', marginBottom: '0.75rem' }}>
            Join the AgroMart Agriculture Network
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#475569', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Whether you are sourcing certified hybrid seeds for the upcoming season or looking to sell quality agricultural tools, start with AgroMart today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-primary btn-lg">
              Explore Products <ArrowRight size={18} />
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg">
              Register as Seller
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
