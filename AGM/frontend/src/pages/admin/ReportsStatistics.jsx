import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Users, 
  ShoppingCart, 
  ArrowLeft, 
  Award,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { adminService } from '../../services/adminService';

const ReportsStatistics = () => {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const [dashStats, allOrders] = await Promise.all([
          adminService.getDashboard(),
          adminService.getOrders()
        ]);
        setStats(dashStats);
        setOrders(allOrders);
      } catch (err) {
        console.error('Failed to load reports', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const totalRevenue = Number(stats?.totalRevenue || 0);
  const totalOrders = Number(stats?.totalOrders || 0);
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00';
  const deliveredCount = Number(stats?.deliveredOrders || 0);
  const completionRate = totalOrders > 0 ? Math.round((deliveredCount / totalOrders) * 100) : 0;

  return (
    <div className="section-py">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#2e7d32', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <ArrowLeft size={16} /> Back to Admin Dashboard
            </Link>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f3814' }}>
              Marketplace Analytics & Reports
            </h1>
            <p style={{ color: '#64748b' }}>
              Performance metrics, revenue generation, and rural agricultural distribution health.
            </p>
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="stats-grid">
          <div className="stat-card">
            <div>
              <div className="stat-number" style={{ color: '#15803d' }}>₹{totalRevenue.toFixed(2)}</div>
              <div className="stat-label">Gross Merchandise Value (GMV)</div>
            </div>
            <div className="stat-icon" style={{ background: '#dcfce7', color: '#15803d' }}>
              <DollarSign size={26} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-number">₹{avgOrderValue}</div>
              <div className="stat-label">Average Order Value (AOV)</div>
            </div>
            <div className="stat-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
              <TrendingUp size={26} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-number">{completionRate}%</div>
              <div className="stat-label">Fulfillment Completion Rate</div>
            </div>
            <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
              <CheckCircle2 size={26} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-number">{stats?.totalCustomers ?? 0}</div>
              <div className="stat-label">Active Purchasing Farmers</div>
            </div>
            <div className="stat-icon" style={{ background: '#f3e8ff', color: '#9333ea' }}>
              <Users size={26} />
            </div>
          </div>
        </div>

        {/* Visual Charts & Breakdowns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem'
        }}>
          {/* User Distribution Card */}
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f3814', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20} color="#2e7d32" /> User Base Distribution
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: '600' }}>
                  <span>Farmers & Customers</span>
                  <span>{stats?.totalCustomers ?? 0}</span>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${stats?.totalUsers ? ((stats.totalCustomers / stats.totalUsers) * 100) : 0}%`,
                    height: '100%',
                    backgroundColor: '#0284c7'
                  }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: '600' }}>
                  <span>Agri-Sellers & Merchants</span>
                  <span>{stats?.totalSellers ?? 0}</span>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${stats?.totalUsers ? ((stats.totalSellers / stats.totalUsers) * 100) : 0}%`,
                    height: '100%',
                    backgroundColor: '#d97706'
                  }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: '600' }}>
                  <span>Platform Admins</span>
                  <span>1</span>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '10%', height: '100%', backgroundColor: '#9333ea' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Order Lifecycle Distribution Card */}
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f3814', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShoppingCart size={20} color="#2e7d32" /> Order Lifecycle Breakdown
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: '600' }}>
                  <span>Delivered & Completed</span>
                  <span style={{ color: '#15803d' }}>{stats?.deliveredOrders ?? 0}</span>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${totalOrders ? ((deliveredCount / totalOrders) * 100) : 0}%`,
                    height: '100%',
                    backgroundColor: '#16a34a'
                  }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: '600' }}>
                  <span>Pending / In-Transit Dispatch</span>
                  <span style={{ color: '#d97706' }}>{stats?.pendingOrders ?? 0}</span>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${totalOrders ? ((stats.pendingOrders / totalOrders) * 100) : 0}%`,
                    height: '100%',
                    backgroundColor: '#f59e0b'
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsStatistics;
