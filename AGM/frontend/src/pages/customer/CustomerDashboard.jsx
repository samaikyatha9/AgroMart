import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  Heart, 
  User, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Truck,
  Sprout,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { orderService } from '../../services/orderService';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const { cartItemsCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerOrders = async () => {
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
    fetchCustomerOrders();
  }, []);

  const activeOrders = orders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED');
  const deliveredOrders = orders.filter(o => o.status === 'DELIVERED');

  return (
    <div className="section-py">
      <div className="container">
        {/* Welcome Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1b5e20, #0f3814)',
          borderRadius: '24px',
          padding: '2.5rem',
          color: '#ffffff',
          marginBottom: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#bbf7d0', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              <Sprout size={16} /> AgroMart Farmer Profile
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '0.5rem' }}>
              Namaste, {user?.name || 'Farmer'}!
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
              Welcome to your digital agricultural dashboard. Track your orders, farm deliveries, and saved items.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/products" className="btn btn-gold">
              Shop Supplies <ArrowRight size={16} />
            </Link>
            <Link to="/profile" className="btn btn-secondary" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff', borderColor: 'transparent' }}>
              Profile Settings
            </Link>
          </div>
        </div>

        {/* Quick Metrics Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div>
              <div className="stat-number">{orders.length}</div>
              <div className="stat-label">Total Orders Placed</div>
            </div>
            <div className="stat-icon" style={{ background: '#e8f5e9', color: '#2e7d32' }}>
              <Package size={26} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-number">{activeOrders.length}</div>
              <div className="stat-label">Active / In Transit</div>
            </div>
            <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
              <Truck size={26} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-number">{cartItemsCount}</div>
              <div className="stat-label">Items in Cart</div>
            </div>
            <div className="stat-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
              <ShoppingCart size={26} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-number">{wishlistCount}</div>
              <div className="stat-label">Saved to Wishlist</div>
            </div>
            <div className="stat-icon" style={{ background: '#fce7f3', color: '#db2777' }}>
              <Heart size={26} />
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f3814' }}>
                Recent Farm Orders
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                View your latest orders and track farmgate delivery status
              </p>
            </div>
            <Link to="/orders" className="btn btn-outline btn-sm">
              View All Orders <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>Loading orders...</div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <Package size={42} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.5rem' }}>No orders placed yet</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Explore our catalog of certified seeds, organic fertilizers, and tools.
              </p>
              <Link to="/products" className="btn btn-primary btn-sm">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(order => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: '700', color: '#0f3814' }}>#AGM-{order.id}</td>
                      <td style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td>{order.items?.length || 0} product(s)</td>
                      <td style={{ fontWeight: '700', color: '#1b5e20' }}>₹{Number(order.totalAmount).toFixed(2)}</td>
                      <td>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          {order.paymentMethod === 'CASH_ON_DELIVERY' ? 'Cash on Delivery' : order.paymentMethod}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-status-${order.status.toLowerCase()}`}>
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td>
                        <Link to={`/orders/${order.id}`} className="btn btn-outline btn-sm">
                          Track Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Seasonal Advisory Card */}
        <div style={{
          background: '#f8faf7',
          border: '1px solid #dcfce7',
          borderRadius: '20px',
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#2e7d32', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              <Calendar size={16} /> Seasonal Sowing & Agronomy Advice
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f3814', marginBottom: '0.75rem' }}>
              Pre-Season Sowing Checklist
            </h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Ensure your seed drill calibration is accurate and perform seed treatment with bio-fungicide 24 hours prior to sowing to prevent seedling damping-off.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-start' }}>
            <Link to="/products?category=1" className="btn btn-secondary btn-sm">
              Explore Hybrid Seeds
            </Link>
            <Link to="/products?category=2" className="btn btn-primary btn-sm">
              Organic Fertilizers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
