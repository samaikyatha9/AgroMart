import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sprout, 
  ShieldCheck, 
  Truck, 
  Leaf, 
  DollarSign, 
  CheckCircle, 
  Award,
  Sparkles,
  Search
} from 'lucide-react';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import ProductCard from '../../components/ProductCard';
import CategoryCard from '../../components/CategoryCard';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        const [cats, prods] = await Promise.all([
          categoryService.getAllCategories(),
          productService.getAllProducts('newest')
        ]);
        setCategories(cats);
        setFeaturedProducts(prods.slice(0, 4));
        // Best sellers: sort by stock or price slice
        setBestSellers(prods.slice(4, 8));
      } catch (err) {
        console.error('Error loading homepage data', err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1b5e20 0%, #0f3814 100%)',
        color: '#ffffff',
        padding: '5rem 0 6rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background shape */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76, 175, 80, 0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                padding: '0.4rem 0.9rem',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#bbf7d0',
                marginBottom: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}>
                <Sparkles size={16} color="#f59e0b" /> India's Trusted Agricultural Supply Hub
              </div>

              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: '800',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
                color: '#ffffff'
              }}>
                Grow Better.<br />
                <span style={{ color: '#f59e0b' }}>Shop Smarter.</span>
              </h1>

              <p style={{
                fontSize: '1.2rem',
                color: '#e2e8f0',
                lineHeight: '1.6',
                marginBottom: '2.25rem',
                maxWidth: '540px'
              }}>
                "Your Digital Marketplace for Agriculture" — Everything you need for modern farming, all in one place. Certified hybrid seeds, pure organic fertilizers, irrigation tech & farming tools.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/products" className="btn btn-gold btn-lg">
                  Shop Now <ArrowRight size={18} />
                </Link>
                <Link to="/categories" className="btn btn-secondary btn-lg" style={{ backgroundColor: 'transparent', color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}>
                  Explore Categories
                </Link>
              </div>

              {/* Quick stats strip */}
              <div style={{
                display: 'flex',
                gap: '2.5rem',
                marginTop: '3rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)'
              }}>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#ffffff' }}>100%</div>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Certified Seeds</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#ffffff' }}>50,000+</div>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Active Farmers</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#ffffff' }}>48 Hrs</div>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Rural Dispatch</div>
                </div>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div style={{ display: 'none' }} className="hero-card-col">
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
                border: '4px solid rgba(255, 255, 255, 0.15)',
                position: 'relative'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
                  alt="Modern Agriculture"
                  style={{ width: '100%', height: '420px', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  padding: '1.25rem',
                  borderRadius: '16px',
                  color: '#0f3814',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <Leaf size={18} color="#2e7d32" />
                    <span style={{ fontWeight: '800', fontSize: '0.95rem' }}>Direct Farm-to-Gate Guarantee</span>
                  </div>
                  <div style={{ fontSize: '0.825rem', color: '#475569' }}>
                    Verified suppliers from across India delivering certified quality.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 900px) {
            .hero-card-col {
              display: block !important;
            }
          }
        `}</style>
      </section>

      {/* Popular Categories */}
      <section className="section-py">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <h2 className="title-section">Popular Categories</h2>
              <p className="subtitle-section">
                Browse our wide selection of certified agricultural inputs and machinery.
              </p>
            </div>
            <Link to="/categories" className="btn btn-outline btn-sm">
              All Categories <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}>
            {categories.slice(0, 4).map(cat => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-py" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <div style={{ color: '#2e7d32', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Handpicked by Agronomists
              </div>
              <h2 className="title-section">Featured Agricultural Products</h2>
            </div>
            <Link to="/products" className="btn btn-outline btn-sm">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading products...</div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.75rem'
            }}>
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Best Sellers Section */}
      {bestSellers.length > 0 && (
        <section className="section-py">
          <div className="container">
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ color: '#d97706', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Top Rated by Farmers
              </div>
              <h2 className="title-section">Best Sellers in Agriculture</h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.75rem'
            }}>
              {bestSellers.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose AgroMart */}
      <section className="section-py" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="title-section">Why Choose AgroMart?</h2>
            <p className="subtitle-section" style={{ margin: '0 auto' }}>
              We bridge the gap between reputable agricultural manufacturers, verified local sellers, and hardworking farmers.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem'
          }}>
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(46, 125, 50, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2e7d32',
                margin: '0 auto 1.25rem'
              }}>
                <ShieldCheck size={32} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.75rem' }}>100% Genuine Supplies</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6' }}>
                Directly sourced from licensed seed breeders and authorized fertilizer manufacturers. Zero counterfeit risk.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f59e0b',
                margin: '0 auto 1.25rem'
              }}>
                <Truck size={32} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.75rem' }}>Doorstep Farm Delivery</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6' }}>
                Heavy agricultural inputs and delicate seeds dispatched safely right to your village and field gates.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(2, 132, 199, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0284c7',
                margin: '0 auto 1.25rem'
              }}>
                <DollarSign size={32} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.75rem' }}>Transparent Fair Pricing</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6' }}>
                Eliminating middlemen margins to give producers direct wholesale rates and farmers optimal harvest margins.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(147, 51, 234, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9333ea',
                margin: '0 auto 1.25rem'
              }}>
                <Award size={32} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.75rem' }}>Agronomy Support</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6' }}>
                Free crop advisory, dosage guidelines, pest diagnostics and weather updates for enrolled customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Benefits Callout */}
      <section className="section-py" style={{ background: '#f1f8e9' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ color: '#2e7d32', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                Farmer-Centric Benefits
              </div>
              <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#0f3814', lineHeight: '1.2', marginBottom: '1.25rem' }}>
                Modernizing Your Farming Journey Step-by-Step
              </h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
                Whether you run an extensive multi-acre farm or maintain a terrace kitchen garden, AgroMart equips you with certified solutions at the tap of a button.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '600', color: '#1b5e20' }}>
                  <CheckCircle size={20} color="#2e7d32" /> Free shipping on orders above ₹1,000
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '600', color: '#1b5e20' }}>
                  <CheckCircle size={20} color="#2e7d32" /> Cash on Delivery available across 15,000+ pin codes
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '600', color: '#1b5e20' }}>
                  <CheckCircle size={20} color="#2e7d32" /> Verified seller profiles with customer ratings
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '600', color: '#1b5e20' }}>
                  <CheckCircle size={20} color="#2e7d32" /> Easy order tracking with stage-by-stage status
                </div>
              </div>
            </div>

            <div style={{
              background: '#ffffff',
              padding: '2.5rem',
              borderRadius: '24px',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid #dcfce7'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f3814', marginBottom: '0.75rem' }}>
                Are you an Agri-merchant or Manufacturer?
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
                Expand your reach to thousands of progressive farmers. List your seeds, fertilizers, and tools on AgroMart today with zero onboarding friction.
              </p>
              <Link to="/register" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                Register as a Seller <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
        color: '#ffffff',
        padding: '4.5rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>
            Ready to Elevate Your Harvest?
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#dcfce7', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Explore verified hybrid varieties, natural pest repellents, and modern drip setups today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-gold btn-lg">
              Browse All Products
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-lg" style={{ backgroundColor: 'transparent', color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}>
              Call Kisan Advisory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
