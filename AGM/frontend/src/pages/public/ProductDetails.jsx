import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ShoppingCart, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Star, 
  Check, 
  ArrowLeft,
  Store,
  ChevronRight,
  Package,
  Minus,
  Plus
} from 'lucide-react';
import { productService } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import ProductCard from '../../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addedMessage, setAddedMessage] = useState(null);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);
        setError(null);
        setQuantity(1);
        const data = await productService.getProductById(id);
        setProduct(data);

        // Fetch related products in the same category
        if (data.categoryId) {
          try {
            const related = await productService.getProductsByCategory(data.categoryId);
            setRelatedProducts(related.filter(p => p.id !== Number(id)).slice(0, 4));
          } catch (relErr) {
            console.error('Failed to load related products', relErr);
          }
        }
      } catch (err) {
        setError(err.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndRelated();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="container section-py" style={{ textAlign: 'center', minHeight: '60vh' }}>
        <div style={{ color: '#2e7d32', fontWeight: '600', fontSize: '1.2rem' }}>Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container section-py" style={{ textAlign: 'center', minHeight: '60vh' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem 2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f3814', marginBottom: '1rem' }}>
            Product Not Found
          </h2>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            {error || "The agricultural product you're looking for doesn't exist or has been removed."}
          </p>
          <Link to="/products" className="btn btn-primary">
            <ArrowLeft size={16} /> Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const isOutOfStock = !product.stock || product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const handleQuantityChange = (delta) => {
    setQuantity(prev => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (product.stock && next > product.stock) return product.stock;
      return next;
    });
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (isOutOfStock) return;

    setIsAdding(true);
    const result = await addToCart(product.id, quantity);
    setIsAdding(false);

    if (result.success) {
      setAddedMessage(`Added ${quantity} item(s) to your cart!`);
      setTimeout(() => setAddedMessage(null), 3000);
    } else {
      setAddedMessage(`Error: ${result.message}`);
      setTimeout(() => setAddedMessage(null), 4000);
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (isOutOfStock) return;

    const result = await addToCart(product.id, quantity);
    if (result.success) {
      navigate('/checkout');
    } else {
      setAddedMessage(`Error: ${result.message}`);
      setTimeout(() => setAddedMessage(null), 4000);
    }
  };

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    await toggleWishlist(product.id);
  };

  return (
    <div className="section-py">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#2e7d32', fontWeight: '500' }}>Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" style={{ color: '#2e7d32', fontWeight: '500' }}>Products</Link>
          <ChevronRight size={14} />
          {product.categoryName && (
            <>
              <Link to={`/products?category=${product.categoryId}`} style={{ color: '#2e7d32', fontWeight: '500' }}>
                {product.categoryName}
              </Link>
              <ChevronRight size={14} />
            </>
          )}
          <span style={{ color: '#0f3814', fontWeight: '600' }}>{product.name}</span>
        </nav>

        {/* Product Main Display */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
          marginBottom: '4rem'
        }}>
          {/* Image Container */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <img
              src={product.imageUrl || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2252a?auto=format&fit=crop&w=800&q=80'}
              alt={product.name}
              style={{
                width: '100%',
                height: '420px',
                objectFit: 'cover',
                borderRadius: '12px'
              }}
            />
            <button
              onClick={handleToggleWishlist}
              className="wishlist-btn-badge"
              style={{ top: '24px', right: '24px', width: '44px', height: '44px' }}
              title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart
                size={22}
                color={inWishlist ? '#dc2626' : '#64748b'}
                fill={inWishlist ? '#dc2626' : 'none'}
              />
            </button>
          </div>

          {/* Details & Actions Container */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span className="product-category-chip" style={{ fontSize: '0.85rem' }}>
                {product.categoryName || 'Agricultural Supply'}
              </span>
              {isOutOfStock ? (
                <span className="badge badge-out-of-stock">Out of Stock</span>
              ) : isLowStock ? (
                <span className="badge badge-low-stock">Only {product.stock} Left</span>
              ) : (
                <span className="badge badge-in-stock">In Stock ({product.stock} Available)</span>
              )}
            </div>

            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f3814', lineHeight: '1.2', marginBottom: '0.75rem' }}>
              {product.name}
            </h1>

            {/* Rating and Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#d97706', fontWeight: '700', fontSize: '0.9rem' }}>
                <Star size={18} fill="#f59e0b" color="#f59e0b" />
                <span>4.8</span>
                <span style={{ color: '#94a3b8', fontWeight: '400' }}>(124 farmer reviews)</span>
              </div>
              {product.brand && (
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                  Brand: <strong style={{ color: '#0f3814' }}>{product.brand}</strong>
                </div>
              )}
              {product.sellerName && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.9rem', color: '#64748b' }}>
                  <Store size={15} color="#2e7d32" />
                  <span>Seller: <strong>{product.sellerName}</strong></span>
                </div>
              )}
            </div>

            {/* Price Row */}
            <div style={{
              background: '#f8faf7',
              padding: '1.25rem 1.5rem',
              borderRadius: '16px',
              border: '1px solid #dcfce7',
              marginBottom: '1.75rem',
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.75rem'
            }}>
              <span style={{ fontSize: '2.25rem', fontWeight: '800', color: '#1b5e20' }}>
                ₹{Number(product.price).toFixed(2)}
              </span>
              {product.unit && (
                <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: '500' }}>
                  / {product.unit} (Inclusive of all agri-taxes)
                </span>
              )}
            </div>

            {/* Description Preview */}
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.7', marginBottom: '2rem' }}>
              {product.description}
            </p>

            {/* Quantity Selector & Action Buttons */}
            {!isOutOfStock && (
              <div style={{ marginBottom: '2rem' }}>
                <label className="form-label" style={{ marginBottom: '0.6rem' }}>Select Quantity</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid #cbd5e1',
                    borderRadius: '10px',
                    backgroundColor: '#ffffff',
                    overflow: 'hidden'
                  }}>
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '0.6rem 0.9rem',
                        cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                        color: quantity <= 1 ? '#cbd5e1' : '#1e293b'
                      }}
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val >= 1 && val <= product.stock) {
                          setQuantity(val);
                        }
                      }}
                      style={{
                        width: '50px',
                        textAlign: 'center',
                        border: 'none',
                        fontWeight: '700',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '0.6rem 0.9rem',
                        cursor: quantity >= product.stock ? 'not-allowed' : 'pointer',
                        color: quantity >= product.stock ? '#cbd5e1' : '#1e293b'
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Total: <strong style={{ color: '#0f3814' }}>₹{(Number(product.price) * quantity).toFixed(2)}</strong>
                  </span>
                </div>
              </div>
            )}

            {addedMessage && (
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                marginBottom: '1.25rem',
                backgroundColor: addedMessage.startsWith('Error') ? '#fee2e2' : '#dcfce7',
                color: addedMessage.startsWith('Error') ? '#dc2626' : '#15803d',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                {addedMessage}
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAdding}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                <ShoppingCart size={18} /> {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock || isAdding}
                className="btn btn-gold btn-lg"
                style={{ width: '100%' }}
              >
                Buy Now
              </button>
            </div>

            {/* Trust Assurances */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              padding: '1.25rem',
              borderRadius: '16px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ textAlign: 'center' }}>
                <ShieldCheck size={22} color="#2e7d32" style={{ margin: '0 auto 0.35rem' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0f3814' }}>100% Genuine</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Certified Source</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Truck size={22} color="#f59e0b" style={{ margin: '0 auto 0.35rem' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0f3814' }}>Farm Dispatch</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Express Delivery</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <RefreshCw size={22} color="#0284c7" style={{ margin: '0 auto 0.35rem' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0f3814' }}>Replacement</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>If Damaged</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Specifications Table */}
        <div className="card" style={{ padding: '2rem', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#0f3814', marginBottom: '1.5rem' }}>
            Product Specifications
          </h2>
          <div className="table-container">
            <table className="data-table">
              <tbody>
                <tr>
                  <th style={{ width: '30%' }}>Product Name</th>
                  <td>{product.name}</td>
                </tr>
                <tr>
                  <th>Category</th>
                  <td>{product.categoryName}</td>
                </tr>
                <tr>
                  <th>Brand / Producer</th>
                  <td>{product.brand || 'Verified Agri-Brand'}</td>
                </tr>
                <tr>
                  <th>Packaging Unit</th>
                  <td>{product.unit || 'Per Unit'}</td>
                </tr>
                <tr>
                  <th>Available Stock</th>
                  <td>{product.stock} units</td>
                </tr>
                <tr>
                  <th>Fulfillment Type</th>
                  <td>Direct Seller Dispatch (AgroMart Verified)</td>
                </tr>
                <tr>
                  <th>Full Description</th>
                  <td>{product.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 className="title-section">Related Agricultural Products</h2>
              <Link to={`/products?category=${product.categoryId}`} className="btn btn-outline btn-sm">
                View All in {product.categoryName}
              </Link>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}>
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
