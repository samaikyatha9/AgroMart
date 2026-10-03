import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  CreditCard, 
  Calendar, 
  XCircle, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { orderService } from '../../services/orderService';
import OrderTimeline from '../../components/OrderTimeline';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getOrderById(id);
      setOrder(data);
    } catch (err) {
      setError(err.message || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order? Stock will be restored.')) {
      return;
    }

    try {
      setCancelling(true);
      const updated = await orderService.cancelOrder(id);
      setOrder(updated);
      setActionMessage('Order cancelled successfully. Stock has been restored.');
      setTimeout(() => setActionMessage(null), 5000);
    } catch (err) {
      setActionMessage(`Error: ${err.message}`);
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="section-py" style={{ textAlign: 'center', minHeight: '60vh' }}>
        <div style={{ color: '#2e7d32', fontWeight: '600', fontSize: '1.2rem' }}>Loading order details...</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="section-py" style={{ textAlign: 'center', minHeight: '60vh' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem 2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f3814', marginBottom: '1rem' }}>
            Order Not Found
          </h2>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            {error || "The requested order doesn't exist or is not associated with your account."}
          </p>
          <Link to="/orders" className="btn btn-primary">
            <ArrowLeft size={16} /> Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  const isEligibleForCancellation = ['PENDING', 'CONFIRMED'].includes(order.status);

  return (
    <div className="section-py">
      <div className="container">
        {/* Navigation & Header */}
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#2e7d32', fontWeight: '600', fontSize: '0.9rem', marginBottom: '1rem' }}>
            <ArrowLeft size={16} /> Back to All Orders
          </Link>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f3814', marginBottom: '0.35rem' }}>
                Order #AGM-{order.id}
              </h1>
              <div style={{ fontSize: '0.875rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={15} />
                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className={`badge badge-status-${order.status.toLowerCase()}`} style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
                {order.status.replace(/_/g, ' ')}
              </span>

              {isEligibleForCancellation && (
                <button
                  onClick={handleCancelOrder}
                  disabled={cancelling}
                  className="btn btn-danger btn-sm"
                >
                  <XCircle size={15} /> {cancelling ? 'Cancelling...' : 'Cancel Order'}
                </button>
              )}
            </div>
          </div>
        </div>

        {actionMessage && (
          <div style={{
            background: actionMessage.startsWith('Error') ? '#fee2e2' : '#dcfce7',
            border: actionMessage.startsWith('Error') ? '1px solid #fca5a5' : '1px solid #86efac',
            borderRadius: '10px',
            padding: '1rem',
            color: actionMessage.startsWith('Error') ? '#dc2626' : '#15803d',
            fontWeight: '600',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {actionMessage.startsWith('Error') ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Timeline Component */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f3814', marginBottom: '1.5rem' }}>
            Fulfillment & Delivery Progress
          </h2>
          <OrderTimeline status={order.status} />
        </div>

        {/* Two-Column Details Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr',
          gap: '2rem',
          alignItems: 'start'
        }} className="order-details-grid">
          {/* Order Items Table */}
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f3814', marginBottom: '1.25rem' }}>
              Purchased Agricultural Supplies
            </h2>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th style={{ textAlign: 'right' }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img
                            src={item.productImage || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2252a?auto=format&fit=crop&w=120&q=80'}
                            alt={item.productName}
                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                          />
                          <div>
                            <div style={{ fontWeight: '700', color: '#0f3814' }}>{item.productName}</div>
                            {item.productUnit && (
                              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Unit: {item.productUnit}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td style={{ fontWeight: '600' }}>₹{Number(item.price).toFixed(2)}</td>
                      <td style={{ fontWeight: '700' }}>{item.quantity}</td>
                      <td style={{ textAlign: 'right', fontWeight: '800', color: '#1b5e20' }}>
                        ₹{(Number(item.price) * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Price Calculations */}
            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              maxWidth: '300px',
              marginLeft: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b' }}>
                <span>Items Subtotal:</span>
                <span style={{ fontWeight: '700', color: '#1e293b' }}>
                  ₹{Number(order.totalAmount).toFixed(2)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b' }}>
                <span>Delivery:</span>
                <span style={{ color: '#15803d', fontWeight: '700' }}>Included</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '800', color: '#0f3814', marginTop: '0.25rem' }}>
                <span>Grand Total:</span>
                <span style={{ color: '#1b5e20' }}>₹{Number(order.totalAmount).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Summary Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Delivery Destination */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#0f3814', fontWeight: '800', fontSize: '1.1rem' }}>
                <MapPin size={20} color="#2e7d32" /> Farmgate Shipping Address
              </div>
              <p style={{ fontSize: '0.925rem', color: '#475569', lineHeight: '1.6' }}>
                {order.shippingAddress}
              </p>
            </div>

            {/* Payment Method */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#0f3814', fontWeight: '800', fontSize: '1.1rem' }}>
                <CreditCard size={20} color="#2e7d32" /> Payment Details
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Mode:</span>
                  <strong style={{ color: '#1e293b' }}>
                    {order.paymentMethod === 'CASH_ON_DELIVERY' ? 'Cash on Delivery' : order.paymentMethod}
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Status:</span>
                  <span className={`badge badge-status-${order.status === 'DELIVERED' ? 'delivered' : 'pending'}`}>
                    {order.status === 'DELIVERED' ? 'PAID' : 'DUE ON DELIVERY'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .order-details-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default OrderDetails;
