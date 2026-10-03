import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowRight, BookOpen, CheckCircle, Sparkles } from 'lucide-react';
import { categoryService } from '../../services/categoryService';
import CategoryCard from '../../components/CategoryCard';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="section-py">
      <div className="container">
        {/* Banner Section */}
        <div style={{
          background: 'linear-gradient(135deg, #1b5e20, #0f3814)',
          borderRadius: '24px',
          padding: '3.5rem 2.5rem',
          color: '#ffffff',
          marginBottom: '3.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '650px', position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(255,255,255,0.15)',
              padding: '0.35rem 0.8rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#bbf7d0'
            }}>
              <Sparkles size={14} color="#f59e0b" /> Comprehensive Agricultural Directory
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '1rem' }}>
              Explore Agricultural Categories
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Find high-grade inputs categorized for every crop stage — from field preparation and sowing to crop protection and harvest machinery.
            </p>
            <Link to="/products" className="btn btn-gold">
              Browse All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Categories Grid */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 className="title-section">Product Categories</h2>
            <p className="subtitle-section">
              Select a category to view tested and verified products from licensed agricultural sellers.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
              Loading categories...
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {categories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>

        {/* Agricultural Best Practices Guide */}
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
          padding: '3rem 2.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#e8f5e9', padding: '0.6rem', borderRadius: '10px', color: '#2e7d32' }}>
              <BookOpen size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f3814' }}>
                Farmer Purchasing Guide & Best Practices
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                Quick recommendations from our agronomy advisory team
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1b5e20', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle size={18} color="#2e7d32" /> Certified Seeds Selection
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: '1.6' }}>
                Always select certified hybrid seeds labeled with official germination rates (&gt;85%) and physical purity. Match varieties to your local soil pH and irrigation availability.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1b5e20', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle size={18} color="#2e7d32" /> Balanced Fertilization
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: '1.6' }}>
                Combine traditional vermicompost and bio-fertilizers with soluble NPK blends to improve soil micro-flora while sustaining high seasonal yields.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1b5e20', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle size={18} color="#2e7d32" /> Water-Efficient Irrigation
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: '1.6' }}>
                Adopt inline drip tubing to curtail evaporation loss by up to 60%. Drip fertigation allows direct nutrient absorption with zero runoff.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
