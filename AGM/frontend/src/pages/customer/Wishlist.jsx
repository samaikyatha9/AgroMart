import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowLeft, Star, Check } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, isLoading } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleMoveToCart = async (productId) => {
    const result = await addToCart(productId, 1);
    if (result.success) {
      await removeFromWishlist(productId);
    }
  };

  if (isLoading) {
    return (
      <div className="section-py" style={{ textAlign: 'center', minHeight: '60vh' }}>
        <div style={{ color: '#2e7d32', fontWeight: '600', fontSize: '1.2rem' }}>Loading wishlist...</div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="section-py" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '520px', textAlign: 'center' }}>
          <div className="card" style={{ padding: '3.5rem 2rem', boxShadow: 'var(--shadow-md)' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: '#fce7f3',
              color: '#db2777',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <Heart size={36} />
            </div>

            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f3814', marginBottom: '0.5rem' }}>
              Your Wishlist is Empty
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Save certified seeds, seasonal fertilizers, and farming gear to revisit and order later.
            </p>

            <Link to="/products" className="btn btn-primary btn-lg">
              <ArrowLeft size={16} /> Explore Agricultural Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-py">
      <div className="container">
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f3814', marginBottom: '0.35rem' }}>
            My Agricultural Wishlist
          </h1>
          <p style={{ color: '#64748b' }}>
            Saved seeds, fertilizers, and equipment for your upcoming farming cycles.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.75rem'
        }}>
          {wishlist.map(item => {
            const isOutOfStock = !item.stock || item.stock <= 0;

            return (
              <div key={item.id} className="card product-card">
                <div className="product-image-container">
                  <Link to={`/products/${item.productId}`}>
                    <img
                      src={item.productImage || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2252a?auto=format&fit=crop&w=600&q=80'}
                      alt={item.productName}
                      className="product-image"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(item.productId)}
                    className="wishlist-btn-badge"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={16} color="#dc2626" />
                  </button>
                </div>

                <div className="product-card-body">
                  <span className="product-category-chip">
                    {item.categoryName || 'Agricultural Supply'}
                  </span>

                  <Link to={`/products/${item.productId}`}>
                    <h3 className="product-title" title={item.productName}>
                      {item.productName}
                    </h3>
                  </Link>

                  <div className="product-price-row">
                    <span className="product-price">₹{Number(item.price).toFixed(2)}</span>
                    {item.unit && <span className="product-unit">/ {item.unit}</span>}
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    {isOutOfStock ? (
                      <span className="badge badge-out-of-stock">Out of Stock</span>
                    ) : (
                      <span className="badge badge-in-stock">Available</span>
                    )}
                  </div>

                  <div className="product-actions">
                    <button
                      onClick={() => handleMoveToCart(item.productId)}
                      disabled={isOutOfStock}
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%' }}
                    >
                      <ShoppingCart size={15} /> Move to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.productId)}
                      className="btn btn-outline btn-sm"
                      title="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
