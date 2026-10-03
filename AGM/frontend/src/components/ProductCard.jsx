import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const inWishlist = isInWishlist(product.id);
  const isOutOfStock = !product.stock || product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (isOutOfStock) return;

    setIsAdding(true);
    setErrorMsg(null);
    const result = await addToCart(product.id, 1);
    setIsAdding(false);

    if (result.success) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1800);
    } else {
      setErrorMsg(result.message);
      setTimeout(() => setErrorMsg(null), 3000);
    }
  };

  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    await toggleWishlist(product.id);
  };

  return (
    <div className="card card-interactive product-card">
      {/* Image & Wishlist Button */}
      <div className="product-image-container">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.imageUrl || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2252a?auto=format&fit=crop&w=600&q=80'}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
        </Link>
        <button
          onClick={handleToggleWishlist}
          className="wishlist-btn-badge"
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            size={18}
            color={inWishlist ? '#dc2626' : '#64748b'}
            fill={inWishlist ? '#dc2626' : 'none'}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="product-card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="product-category-chip">
            {product.categoryName || 'Agricultural Supply'}
          </span>
          {/* Rating Placeholder */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', color: '#d97706', fontWeight: '700' }}>
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <span>4.8</span>
          </div>
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 className="product-title" title={product.name}>
            {product.name}
          </h3>
        </Link>

        {product.brand && (
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '-0.25rem' }}>
            Brand: <span style={{ fontWeight: '600' }}>{product.brand}</span>
          </div>
        )}

        {/* Price & Unit */}
        <div className="product-price-row">
          <span className="product-price">₹{Number(product.price).toFixed(2)}</span>
          {product.unit && <span className="product-unit">/ {product.unit}</span>}
        </div>

        {/* Stock Status Badge */}
        <div style={{ marginBottom: '1rem' }}>
          {isOutOfStock ? (
            <span className="badge badge-out-of-stock">Out of Stock</span>
          ) : isLowStock ? (
            <span className="badge badge-low-stock">Only {product.stock} Left</span>
          ) : (
            <span className="badge badge-in-stock">In Stock ({product.stock})</span>
          )}
        </div>

        {errorMsg && (
          <div style={{ fontSize: '0.75rem', color: '#dc2626', marginBottom: '0.5rem', fontWeight: '600' }}>
            {errorMsg}
          </div>
        )}

        {/* Action Buttons */}
        <div className="product-actions">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAdding}
            className={`btn btn-sm ${justAdded ? 'btn-secondary' : 'btn-primary'}`}
            style={{
              width: '100%',
              backgroundColor: justAdded ? '#15803d' : undefined,
              color: justAdded ? '#ffffff' : undefined,
              opacity: isOutOfStock ? 0.6 : 1,
              cursor: isOutOfStock ? 'not-allowed' : 'pointer'
            }}
          >
            {justAdded ? (
              <>
                <Check size={16} /> Added!
              </>
            ) : (
              <>
                <ShoppingCart size={16} /> {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </>
            )}
          </button>

          <Link to={`/products/${product.id}`} className="btn btn-outline btn-sm" title="View Product Details">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
