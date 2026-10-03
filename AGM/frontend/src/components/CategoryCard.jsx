import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/products?category=${category.id}`} className="card card-interactive" style={{ display: 'block', position: 'relative' }}>
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img
          src={category.image || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2252a?auto=format&fit=crop&w=600&q=80'}
          alt={category.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          className="category-img"
        />
        {/* Dark subtle gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15, 56, 20, 0.85) 0%, rgba(15, 56, 20, 0.2) 60%, transparent 100%)'
        }} />

        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1.25rem',
          right: '1.25rem',
          color: '#ffffff'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.2rem' }}>
            {category.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#cbd5e1' }}>
            <span>{category.productCount !== undefined ? `${category.productCount} Products` : 'Explore Category'}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#4caf50', fontWeight: '700' }}>
              Explore <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
