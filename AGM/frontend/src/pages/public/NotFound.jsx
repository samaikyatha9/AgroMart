import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Home, ShoppingBag } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="section-py" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '520px', textAlign: 'center' }}>
        <div className="card" style={{ padding: '3.5rem 2rem', boxShadow: 'var(--shadow-md)' }}>
          <div style={{
            fontSize: '5rem',
            fontWeight: '900',
            color: '#2e7d32',
            lineHeight: '1',
            marginBottom: '1rem',
            letterSpacing: '-0.05em'
          }}>
            404
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f3814', marginBottom: '0.75rem' }}>
            Field Not Found
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            The page or agricultural resource you're looking for doesn't exist or has moved to another plot.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary">
              <Home size={16} /> AgroMart Home
            </Link>
            <Link to="/products" className="btn btn-gold">
              <ShoppingBag size={16} /> Explore Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
