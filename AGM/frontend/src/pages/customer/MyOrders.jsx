import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, ArrowRight, ArrowLeft, Calendar, ShieldCheck } from 'lucide-react';
import { orderService } from '../../services/orderService';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error('Failed to load customer orders', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'ACTIVE') {
      return !['DELIVERED', 'CANCELLED'].includes(order.status);
    }
    return order.status === statusFilter;
  });

  return (
    <div className="section-py">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f3814', marginBottom: '0.35rem' }}>
              My Orders
            </h1>
            <p style={{ color: '#64748b' }}>
              Track past and active agricultural deliveries to your farm.
            </p>
          </div>

          <Link to="/products" className="btn btn-outline btn-sm">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '0.5rem',
          overflowX: 'auto'
        }}>
          {[
            { id: 'ALL', label: 'All Orders' },
            { id: 'ACTIVE', label: 'Active In-Transit' },
            { id: 'DELIVERED', label: 'Delivered' },
            { id: 'CANCELLED', label: 'Cancelled' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              style={{
                background: statusFilter === tab.id ? '#e8f5e9' : 'transparent',
                color: statusFilter === tab.id ? '#1b5e20' : '#64748b',
                fontWeight: statusFilter === tab.id ? '700' : '500',
                border: 'none',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
            Loading your orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <Package size={48} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f3814', marginBottom: '0.5rem' }}>
              No orders found
            </h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              {statusFilter === 'ALL'
                ? "You haven't placed any orders with AgroMart yet."
                : `No orders found matching status "${statusFilter}".`}
            </p>
            <Link to="/products" className="btn btn-primary btn-sm">
              Browse Supplies
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filteredOrders.map(order => (
              <div key={order.id} className="card" style={{ padding: '1.75rem' }}>
                {/* Header bar of order card */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #f1f5f9',
                  marginBottom: '1.25rem',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f3814' }}>
                      Order #AGM-{order.id}
                    </div>
                    <div style={{ fontSize: '0.825rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
                      <Calendar size={14} />
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className={`badge badge-status-${order.status.toLowerCase()}`}>
                      {order.status.replace(/_/g, ' ')}
                    </span>
                    <Link to={`/orders/${order.id}`} className="btn btn-primary btn-sm">
                      View Order & Track <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Items preview */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {order.items?.map(item => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img
                          src={item.productImage || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2252a?auto=format&fit=crop&w=120&q=80'}
                          alt={item.productName}
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <div>
                          <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>
                            {item.productName}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                            Qty: {item.quantity} × ₹{Number(item.price).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order summary right side */}
                  <div style={{
                    background: '#f8fafc',
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                    fontSize: '0.875rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                      <span>Payment Method:</span>
                      <strong style={{ color: '#1e293b' }}>
                        {order.paymentMethod === 'CASH_ON_DELIVERY' ? 'Cash on Delivery' : order.paymentMethod}
                      </strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                      <span>Total Amount:</span>
                      <strong style={{ color: '#1b5e20', fontSize: '1.05rem' }}>
                        ₹{Number(order.totalAmount).toFixed(2)}
                      </strong>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
                      Delivery to: {order.shippingAddress}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
