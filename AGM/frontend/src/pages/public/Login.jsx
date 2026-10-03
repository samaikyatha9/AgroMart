import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, LogIn, Shield, Store, User, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await login(email.trim(), password);

      // Redirect based on role or intended route
      if (from) {
        navigate(from, { replace: true });
      } else if (data.user.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else if (data.user.role === 'SELLER') {
        navigate('/seller', { replace: true });
      } else {
        navigate('/products', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError(null);
  };

  return (
    <div className="section-py" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <div className="card" style={{ padding: '2.5rem 2rem', boxShadow: 'var(--shadow-lg)' }}>
          {/* Brand Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #2e7d32, #1b5e20)',
              width: '54px',
              height: '54px',
              borderRadius: '14px',
              color: '#ffffff',
              marginBottom: '1rem',
              boxShadow: '0 4px 10px rgba(46, 125, 50, 0.3)'
            }}>
              <Sprout size={32} />
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f3814', marginBottom: '0.35rem' }}>
              Welcome to AgroMart
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
              Sign in to manage your orders, cart, and account
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: '10px',
              padding: '0.85rem 1rem',
              color: '#b91c1c',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem',
              fontWeight: '500'
            }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ marginBottom: '1.75rem' }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {loading ? 'Authenticating...' : (
                <>
                  <LogIn size={18} /> Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo Quick Accounts */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.75rem'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.65rem', textAlign: 'center' }}>
              Quick Fill Demo Accounts
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handleQuickLogin('customer@agromart.com', 'customer123')}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.75rem', padding: '0.4rem' }}
              >
                <User size={13} color="#0284c7" /> Customer
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('seller@agromart.com', 'seller123')}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.75rem', padding: '0.4rem' }}
              >
                <Store size={13} color="#d97706" /> Seller
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@agromart.com', 'admin123')}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.75rem', padding: '0.4rem' }}
              >
                <Shield size={13} color="#9333ea" /> Admin
              </button>
            </div>
          </div>

          {/* Registration link */}
          <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#64748b' }}>
            Don't have an AgroMart account?{' '}
            <Link to="/register" style={{ color: '#2e7d32', fontWeight: '700' }}>
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
