import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, isLoading } = useCart();
  const navigate = useNavigate();

  const items = cart?.items || [];
  const subtotal = Number(cart?.subtotal || 0);
  const deliveryCharge = Number(cart?.deliveryCharge || 0);
  const totalAmount = Number(cart?.totalAmount || 0);

  const freeDeliveryThreshold = 1000;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryPercentage = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  if (isLoading) {
    return (
      <div className="section-py" style={{ textAlign: 'center', minHeight: '60vh' }}>
        <div style={{ color: '#2e7d32', fontWeight: '600', fontSize: '1.2rem' }}>Loading your cart...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="section-py" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '540px', textAlign: 'center' }}>
          <div className="card" style={{ padding: '3.5rem 2rem', boxShadow: 'var(--shadow-md)' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: '#e8f5e9',
              color: '#2e7d32',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <ShoppingCart size={36} />
            </div>

            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f3814', marginBottom: '0.5rem' }}>
              Your Cart is Empty
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Looks like you haven't added any seeds, fertilizers, or tools to your cart yet.
            </p>

            <Link to="/products" className="btn btn-primary btn-lg">
              <ArrowLeft size={16} /> Explore Agricultural Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-py">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f3814', marginBottom: '0.35rem' }}>
              Shopping Cart
            </h1>
            <p style={{ color: '#64748b' }}>
              Review your agricultural items, update quantities, and proceed to checkout.
            </p>
          </div>
          <button
            onClick={clearCart}
            className="btn btn-outline btn-sm"
            style={{ color: '#dc2626', borderColor: '#fca5a5' }}
          >
            <Trash2 size={14} /> Clear All Items
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '700', color: '#0f3814' }}>
              <Truck size={18} color="#2e7d32" />
              {amountNeededForFreeDelivery === 0 ? (
                <span style={{ color: '#15803d' }}>You have qualified for FREE Farmgate Delivery! 🎉</span>
              ) : (
                <span>Add ₹{amountNeededForFreeDelivery.toFixed(2)} more of supplies for FREE delivery!</span>
              )}
            </div>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Free above ₹1,000</span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${freeDeliveryPercentage}%`,
                height: '100%',
                backgroundColor: freeDeliveryPercentage === 100 ? '#16a34a' : '#f59e0b',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Cart Content Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: '2.5rem',
          alignItems: 'start'
        }} className="cart-layout-grid">
          {/* Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {items.map(item => (
              <div
                key={item.id}
                className="card"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
              >
                {/* Product Thumbnail */}
                <Link to={`/products/${item.productId}`}>
                  <img
                    src={item.productImage || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2252a?auto=format&fit=crop&w=200&q=80'}
                    alt={item.productName}
                    style={{
                      width: '90px',
                      height: '90px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0'
                    }}
                  />
                </Link>

                {/* Details */}
                <div style={{ flex: '1', minWidth: '200px' }}>
                  <Link to={`/products/${item.productId}`}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f3814', marginBottom: '0.25rem' }}>
                      {item.productName}
                    </h3>
                  </Link>

                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>
                    Unit Price: <strong style={{ color: '#1e293b' }}>₹{Number(item.price).toFixed(2)}</strong>
                    {item.productUnit && ` / ${item.productUnit}`}
                  </div>

                  {/* Quantity modifier */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      backgroundColor: '#ffffff'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          padding: '0.35rem 0.6rem',
                          cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                          color: item.quantity <= 1 ? '#cbd5e1' : '#1e293b'
                        }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ padding: '0 0.6rem', fontWeight: '700', fontSize: '0.9rem' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.availableStock && item.quantity >= item.availableStock}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          padding: '0.35rem 0.6rem',
                          cursor: (item.availableStock && item.quantity >= item.availableStock) ? 'not-allowed' : 'pointer',
                          color: (item.availableStock && item.quantity >= item.availableStock) ? '#cbd5e1' : '#1e293b'
                        }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="btn btn-outline btn-sm"
                      style={{ padding: '0.35rem 0.6rem', color: '#dc2626', border: 'none' }}
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div style={{ textAlign: 'right', minWidth: '100px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Subtotal</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1b5e20' }}>
                    ₹{(Number(item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Card */}
          <div className="card" style={{ padding: '2rem', position: 'sticky', top: '90px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f3814', marginBottom: '1.5rem' }}>
              Order Summary
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: '0.95rem' }}>
                <span>Subtotal ({cart.totalItems} items)</span>
                <span style={{ fontWeight: '700', color: '#1e293b' }}>₹{subtotal.toFixed(2)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: '0.95rem' }}>
                <span>Rural Delivery Charge</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <strong style={{ color: '#15803d' }}>FREE</strong>
                  ) : (
                    <strong style={{ color: '#1e293b' }}>₹{deliveryCharge.toFixed(2)}</strong>
                  )}
                </span>
              </div>

              <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '0.5rem 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '800', color: '#0f3814' }}>
                <span>Grand Total</span>
                <span style={{ color: '#1b5e20' }}>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <Link
              to="/products"
              className="btn btn-outline"
              style={{ width: '100%', fontSize: '0.9rem' }}
            >
              Continue Shopping
            </Link>

            <div style={{
              marginTop: '1.75rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              fontSize: '0.8rem',
              color: '#64748b'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} color="#2e7d32" /> 100% Genuine product warranty
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={16} color="#2e7d32" /> Cash on Delivery available at checkout
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .cart-layout-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Cart;
