import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { sellerService } from '../../services/sellerService';
import { orderService } from '../../services/orderService';

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState(null);

  const fetchSellerOrders = async () => {
    try {
      setLoading(true);
      const data = await sellerService.getOrders();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load seller orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      setActionMessage(`Order #AGM-${orderId} status updated to ${newStatus}.`);
      setTimeout(() => setActionMessage(null), 4000);
    } catch (err) {
      setActionMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="section-py">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <Link to="/seller" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#2e7d32', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <ArrowLeft size={16} /> Back to Seller Dashboard
            </Link>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f3814' }}>
              Seller Orders & Fulfillment
            </h1>
            <p style={{ color: '#64748b' }}>
              Track customer purchases containing your items and update delivery stages.
            </p>
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

        <div className="card" style={{ padding: '1.5rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading orders...</div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
              <Package size={42} color="#94a3b8" style={{ margin: '0 auto 0.75rem' }} />
              <div>No orders received for your store products yet.</div>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer & Destination</th>
                    <th>Ordered Items</th>
                    <th>Total</th>
                    <th>Current Status</th>
                    <th>Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>
                        <div style={{ fontWeight: '800', color: '#0f3814' }}>#AGM-{order.id}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: '700', color: '#1e293b' }}>{order.userName || 'Farmer Customer'}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', maxWidth: '240px', lineHeight: '1.4' }}>
                          {order.shippingAddress}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          {order.items?.map(item => (
                            <div key={item.id} style={{ fontSize: '0.85rem' }}>
                              <strong>{item.quantity}x</strong> {item.productName}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td style={{ fontWeight: '700', color: '#1b5e20' }}>
                        ₹{Number(order.totalAmount).toFixed(2)}
                      </td>
                      <td>
                        <span className={`badge badge-status-${order.status.toLowerCase()}`}>
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="form-select"
                          style={{ fontSize: '0.825rem', padding: '0.4rem 1.5rem 0.4rem 0.6rem', width: 'auto' }}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="PACKED">PACKED</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerOrders;
