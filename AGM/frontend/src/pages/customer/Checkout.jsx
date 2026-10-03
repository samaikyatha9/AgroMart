import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Banknote, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  Lock
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';

const Checkout = () => {
  const { cart, refreshCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingData, setShippingData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('CASH_ON_DELIVERY');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setShippingData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        pincode: user.pincode || ''
      });
    }
  }, [user]);

  const items = cart?.items || [];
  const subtotal = Number(cart?.subtotal || 0);
  const deliveryCharge = Number(cart?.deliveryCharge || 0);
  const totalAmount = Number(cart?.totalAmount || 0);

  if (items.length === 0) {
    return (
      <div className="section-py" style={{ textAlign: 'center', minHeight: '60vh' }}>
        <div className="card" style={{ maxWidth: '480px', margin: '0 auto', padding: '3rem 2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f3814', marginBottom: '1rem' }}>
            No Items to Checkout
          </h2>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            Your cart is empty. Add products before proceeding to checkout.
          </p>
          <Link to="/products" className="btn btn-primary">
            <ArrowLeft size={16} /> Browse Agricultural Catalog
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError(null);

    const fullShippingAddress = `${shippingData.address}, ${shippingData.city}, ${shippingData.state} - ${shippingData.pincode} (Contact: ${shippingData.name}, Ph: ${shippingData.phone})`;

    try {
      setLoading(true);
      const orderPayload = {
        shippingAddress: fullShippingAddress,
        paymentMethod: paymentMethod
      };

      const createdOrder = await orderService.createOrder(orderPayload);
      await refreshCart();
      navigate(`/order-confirmation/${createdOrder.id}`);
    } catch (err) {
      setError(err.message || 'Failed to place order. Please check available stock.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-py">
      <div className="container">
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f3814', marginBottom: '0.35rem' }}>
            Farmgate Checkout
          </h1>
          <p style={{ color: '#64748b' }}>
            Confirm delivery details and choose your preferred payment method.
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #fca5a5',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            color: '#b91c1c',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '2rem',
            fontWeight: '600'
          }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: '2.5rem',
            alignItems: 'start'
          }} className="checkout-layout-grid">
            {/* Left Column: Delivery & Payment Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Shipping Address Card */}
              <div className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                  <MapPin size={22} color="#2e7d32" />
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f3814' }}>
                    1. Shipping & Farmgate Location
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Recipient Name *</label>
                    <input
                      type="text"
                      required
                      value={shippingData.name}
                      onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={shippingData.phone}
                      onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Village / Farm Plot Address / Landmark *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Plot No 42, Near Primary School, Mandi Road"
                    value={shippingData.address}
                    onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">City / Taluka *</label>
                    <input
                      type="text"
                      required
                      value={shippingData.city}
                      onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <input
                      type="text"
                      required
                      value={shippingData.state}
                      onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={shippingData.pincode}
                      onChange={(e) => setShippingData({ ...shippingData, pincode: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                  <Banknote size={22} color="#2e7d32" />
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f3814' }}>
                    2. Payment Method
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* COD Option */}
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: paymentMethod === 'CASH_ON_DELIVERY' ? '2px solid #2e7d32' : '1px solid #e2e8f0',
                    background: paymentMethod === 'CASH_ON_DELIVERY' ? '#f1f8e9' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="CASH_ON_DELIVERY"
                      checked={paymentMethod === 'CASH_ON_DELIVERY'}
                      onChange={() => setPaymentMethod('CASH_ON_DELIVERY')}
                      style={{ accentColor: '#2e7d32', marginTop: '4px' }}
                    />
                    <div>
                      <div style={{ fontWeight: '700', color: '#0f3814', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Cash on Delivery (COD)
                        <span className="badge badge-in-stock" style={{ fontSize: '0.7rem' }}>Recommended</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                        Pay cash directly to the dispatch agent upon receiving products at your farm or doorstep.
                      </div>
                    </div>
                  </label>

                  {/* Online Payment Option */}
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: paymentMethod === 'ONLINE_PAYMENT' ? '2px solid #2e7d32' : '1px solid #e2e8f0',
                    background: paymentMethod === 'ONLINE_PAYMENT' ? '#f1f8e9' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="ONLINE_PAYMENT"
                      checked={paymentMethod === 'ONLINE_PAYMENT'}
                      onChange={() => setPaymentMethod('ONLINE_PAYMENT')}
                      style={{ accentColor: '#2e7d32', marginTop: '4px' }}
                    />
                    <div>
                      <div style={{ fontWeight: '700', color: '#0f3814', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CreditCard size={18} /> Online Payment (UPI / NetBanking / Cards)
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                        Instant digital settlement placeholder. Generates direct transaction ID.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Review Sidebar */}
            <div className="card" style={{ padding: '2rem', position: 'sticky', top: '90px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f3814', marginBottom: '1.25rem' }}>
                Review Order Items
              </h2>

              <div style={{
                maxHeight: '260px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                marginBottom: '1.5rem',
                paddingRight: '0.5rem'
              }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                    <div style={{ flex: 1, paddingRight: '0.5rem' }}>
                      <div style={{ fontWeight: '600', color: '#1e293b' }}>{item.productName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        Qty: {item.quantity} × ₹{Number(item.price).toFixed(2)}
                      </div>
                    </div>
                    <div style={{ fontWeight: '700', color: '#0f3814' }}>
                      ₹{(Number(item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ height: '1px', backgroundColor: '#e2e8f0', marginBottom: '1.25rem' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: '700', color: '#1e293b' }}>₹{subtotal.toFixed(2)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Rural Delivery</span>
                  <span>
                    {deliveryCharge === 0 ? (
                      <strong style={{ color: '#15803d' }}>FREE</strong>
                    ) : (
                      <strong style={{ color: '#1e293b' }}>₹{deliveryCharge.toFixed(2)}</strong>
                    )}
                  </span>
                </div>

                <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '0.25rem 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: '800', color: '#0f3814' }}>
                  <span>Grand Total</span>
                  <span style={{ color: '#1b5e20' }}>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginBottom: '1rem' }}
              >
                {loading ? 'Processing Order...' : (
                  <>
                    <Lock size={18} /> Confirm & Place Order
                  </>
                )}
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={16} color="#2e7d32" />
                <span>Zero payment risk with Cash on Delivery</span>
              </div>
            </div>
          </div>
        </form>

        <style>{`
          @media (max-width: 860px) {
            .checkout-layout-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Checkout;
