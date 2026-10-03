import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, MapPin, Truck, ArrowRight, Home } from 'lucide-react';
import { orderService } from '../../services/orderService';

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const data = await orderService.getOrderById(id);
        setOrder(data);
      } catch (err) {
        console.error('Failed to load order confirmation', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchOrderDetails();
  }, [id]);

  return (
    <div className="section-py" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        <div className="card" style={{ padding: '3.5rem 2.5rem', textAlign: 'center', boxShadow: 'var(--shadow-xl)' }}>
          {/* Animated/Green Success Check */}
          <div style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            background: '#dcfce7',
            color: '#15803d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.75rem',
            border: '4px solid #bbf7d0'
          }}>
            <CheckCircle2 size={52} />
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#0f3814', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Order Placed Successfully!
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            Thank you for choosing AgroMart. Your agricultural order has been confirmed and forwarded to the verified seller for dispatch.
          </p>

          {/* Order Snapshot Box */}
          <div style={{
            background: '#f8faf7',
            borderRadius: '16px',
            border: '1px solid #dcfce7',
            padding: '1.75rem',
            textAlign: 'left',
            marginBottom: '2.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Order Number</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f3814' }}>
                  #AGM-{id}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-status-confirmed" style={{ fontSize: '0.85rem' }}>
                  CONFIRMED
                </span>
              </div>
            </div>

            {order && (
              <>
                <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '1rem 0' }} />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', fontSize: '0.9rem' }}>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>Payment Mode:</span>
                    <strong style={{ color: '#1e293b' }}>
                      {order.paymentMethod === 'CASH_ON_DELIVERY' ? 'Cash on Delivery' : order.paymentMethod}
                    </strong>
                  </div>

                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>Total Amount:</span>
                    <strong style={{ color: '#1b5e20', fontSize: '1.1rem' }}>
                      ₹{Number(order.totalAmount).toFixed(2)}
                    </strong>
                  </div>

                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>Estimated Dispatch:</span>
                    <strong style={{ color: '#1e293b' }}>Within 24-48 Hours</strong>
                  </div>
                </div>

                {order.shippingAddress && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                      Farmgate Shipping Destination:
                    </span>
                    <div style={{ fontSize: '0.875rem', color: '#334155' }}>
                      {order.shippingAddress}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to={`/orders/${id}`} className="btn btn-primary btn-lg">
              <Truck size={18} /> Track Your Order
            </Link>
            <Link to="/products" className="btn btn-outline btn-lg">
              Continue Shopping <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
