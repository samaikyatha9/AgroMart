import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Store, 
  Package, 
  AlertTriangle, 
  ShoppingCart, 
  TrendingUp, 
  Plus, 
  ArrowRight,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { sellerService } from '../../services/sellerService';

const SellerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        setLoading(true);
        const [dashStats, orders] = await Promise.all([
          sellerService.getDashboard(),
          sellerService.getOrders()
        ]);
        setStats(dashStats);
        setRecentOrders(orders);
      } catch (err) {
        console.error('Failed to load seller dashboard', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSellerData();
  }, []);

  return (
    <div className="section-py">
      <div className="container">
        {/* Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #78350f, #451a03)',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fef3c7', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              <Store size={16} /> Verified Agri-Merchant Portal
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '0.5rem' }}>
              Seller Dashboard
            </h1>
            <p style={{ color: '#fed7aa', fontSize: '0.95rem' }}>
              Manage your agricultural products, restock low inventory, and fulfill farmer orders.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/seller/products/new" className="btn btn-gold">
              <Plus size={16} /> Add New Product
            </Link>
            <Link to="/seller/products" className="btn btn-secondary" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff', borderColor: 'transparent' }}>
              Manage Inventory
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div>
              <div className="stat-number">{stats?.totalProducts ?? 0}</div>
              <div className="stat-label">Total Listed Products</div>
            </div>
            <div className="stat-icon" style={{ background: '#e8f5e9', color: '#2e7d32' }}>
              <Package size={26} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-number" style={{ color: stats?.lowStockProducts > 0 ? '#b91c1c' : '#1e293b' }}>
                {stats?.lowStockProducts ?? 0}
              </div>
              <div className="stat-label">Low Stock Alerts (&lt; 5 units)</div>
            </div>
            <div className="stat-icon" style={{ background: '#fee2e2', color: '#dc2626' }}>
              <AlertTriangle size={26} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-number">{stats?.totalOrders ?? 0}</div>
              <div className="stat-label">Total Orders Received</div>
            </div>
            <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
              <ShoppingCart size={26} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-number" style={{ color: '#15803d' }}>
                ₹{Number(stats?.totalSales ?? 0).toFixed(2)}
              </div>
              <div className="stat-label">Gross Merchant Revenue</div>
            </div>
            <div className="stat-icon" style={{ background: '#dcfce7', color: '#16a34a' }}>
              <TrendingUp size={26} />
            </div>
          </div>
        </div>

        {/* Recent Orders for this Seller */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f3814' }}>
                Orders Containing Your Products
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Fulfill and update dispatch status for rural deliveries
              </p>
            </div>
            <Link to="/seller/orders" className="btn btn-outline btn-sm">
              View All Orders <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>Loading seller orders...</div>
          ) : recentOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
              <ShoppingCart size={40} color="#94a3b8" style={{ margin: '0 auto 0.75rem' }} />
              <div>No orders received for your products yet.</div>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Destination</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.slice(0, 5).map(order => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: '700', color: '#0f3814' }}>#AGM-{order.id}</td>
                      <td>{order.userName || 'Customer'}</td>
                      <td style={{ maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {order.shippingAddress}
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
                        <Link to="/seller/orders" className="btn btn-outline btn-sm">
                          Manage
                        </Link>
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

export default SellerDashboard;
