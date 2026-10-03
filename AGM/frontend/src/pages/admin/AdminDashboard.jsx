import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  Store, 
  UserCheck, 
  Package, 
  ShoppingCart, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Layers,
  ArrowRight
} from 'lucide-react';
import { adminService } from '../../services/adminService';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const [dashStats, users, orders] = await Promise.all([
          adminService.getDashboard(),
          adminService.getUsers(),
          adminService.getOrders()
        ]);
        setStats(dashStats);
        setRecentUsers(users.slice(0, 5));
        setRecentOrders(orders.slice(0, 5));
      } catch (err) {
        console.error('Failed to load admin dashboard', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div className="section-py">
      <div className="container">
        {/* Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #581c87, #3b0764)',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e9d5ff', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              <Shield size={16} /> AgroMart Master Administration
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '0.5rem' }}>
              Platform Overview & Statistics
            </h1>
            <p style={{ color: '#d8b4fe', fontSize: '0.95rem' }}>
              Real-time platform metrics, user controls, marketplace catalog, and order fulfillment.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/admin/categories" className="btn btn-gold">
              <Layers size={16} /> Manage Categories
            </Link>
            <Link to="/admin/orders" className="btn btn-secondary" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff', borderColor: 'transparent' }}>
              All Orders
            </Link>
          </div>
        </div>

        {/* 8 Real Database Metric Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div>
              <div className="stat-number">{stats?.totalUsers ?? 0}</div>
              <div className="stat-label">Total Registered Users</div>
            </div>
            <div className="stat-icon" style={{ background: '#f3e8ff', color: '#7e22ce' }}>
              <Users size={26} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-number">{stats?.totalCustomers ?? 0}</div>
              <div className="stat-label">Total Farmers / Customers</div>
            </div>
            <div className="stat-icon" style={{ background: '#e0f2fe', color: '#0369a1' }}>
              <UserCheck size={26} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-number">{stats?.totalSellers ?? 0}</div>
              <div className="stat-label">Total Agri-Sellers</div>
            </div>
            <div className="stat-icon" style={{ background: '#fef3c7', color: '#b45309' }}>
              <Store size={26} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-number">{stats?.totalProducts ?? 0}</div>
              <div className="stat-label">Total Catalog Products</div>
            </div>
            <div className="stat-icon" style={{ background: '#e8f5e9', color: '#15803d' }}>
              <Package size={26} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-number">{stats?.totalOrders ?? 0}</div>
              <div className="stat-label">Total Orders</div>
            </div>
            <div className="stat-icon" style={{ background: '#ede9fe', color: '#6d28d9' }}>
              <ShoppingCart size={26} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-number" style={{ color: '#d97706' }}>{stats?.pendingOrders ?? 0}</div>
              <div className="stat-label">Pending Orders</div>
            </div>
            <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
              <Clock size={26} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-number" style={{ color: '#15803d' }}>{stats?.deliveredOrders ?? 0}</div>
              <div className="stat-label">Delivered Orders</div>
            </div>
            <div className="stat-icon" style={{ background: '#dcfce7', color: '#15803d' }}>
              <CheckCircle2 size={26} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-number" style={{ color: '#15803d' }}>
                ₹{Number(stats?.totalRevenue ?? 0).toFixed(2)}
              </div>
              <div className="stat-label">Gross Platform Revenue</div>
            </div>
            <div className="stat-icon" style={{ background: '#dcfce7', color: '#15803d' }}>
              <TrendingUp size={26} />
            </div>
          </div>
        </div>

        {/* Two-Column Management Grids */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'start'
        }} className="admin-tables-grid">
          {/* Recent Orders */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f3814' }}>
                Recent Platform Orders
              </h2>
              <Link to="/admin/orders" className="btn btn-outline btn-sm">
                View All <ArrowRight size={14} />
              </Link>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>Loading orders...</div>
            ) : recentOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No orders yet.</div>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id}>
                        <td style={{ fontWeight: '700' }}>#AGM-{order.id}</td>
                        <td>{order.userName || 'Customer'}</td>
                        <td style={{ fontWeight: '700', color: '#1b5e20' }}>₹{Number(order.totalAmount).toFixed(2)}</td>
                        <td>
                          <span className={`badge badge-status-${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent User Registrations */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f3814' }}>
                Recent Users
              </h2>
              <Link to="/admin/users" className="btn btn-outline btn-sm">
                Manage Users <ArrowRight size={14} />
              </Link>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>Loading users...</div>
            ) : recentUsers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No users yet.</div>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map(u => (
                      <tr key={u.id}>
                        <td>
                          <div style={{ fontWeight: '700', color: '#0f3814' }}>{u.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{u.email}</div>
                        </td>
                        <td>
                          <span className={`badge badge-role-${u.role.toLowerCase()}`}>
                            {u.role}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8rem', fontWeight: '600', color: u.enabled ? '#15803d' : '#dc2626' }}>
                            {u.enabled ? 'Active' : 'Disabled'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .admin-tables-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AdminDashboard;
