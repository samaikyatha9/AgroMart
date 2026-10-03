import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, UserPlus, User, Store, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'CUSTOMER',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      const registerPayload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phone: formData.phone.trim(),
        role: formData.role,
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim()
      };

      const data = await register(registerPayload);

      if (data.user.role === 'SELLER') {
        navigate('/seller', { replace: true });
      } else {
        navigate('/products', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-py" style={{ minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
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
              Join the AgroMart Network
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
              Create an account as an agricultural customer or verified seller
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

          <form onSubmit={handleSubmit}>
            {/* Account Role Selector */}
            <div className="form-group">
              <label className="form-label">I want to register as a:</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'CUSTOMER' })}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    border: formData.role === 'CUSTOMER' ? '2px solid #2e7d32' : '1px solid #cbd5e1',
                    background: formData.role === 'CUSTOMER' ? '#f1f8e9' : '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <User size={24} color={formData.role === 'CUSTOMER' ? '#2e7d32' : '#64748b'} />
                  <span style={{ fontWeight: '700', fontSize: '0.95rem', color: formData.role === 'CUSTOMER' ? '#1b5e20' : '#1e293b' }}>
                    Customer / Farmer
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Browse & purchase supplies</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'SELLER' })}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    border: formData.role === 'SELLER' ? '2px solid #d97706' : '1px solid #cbd5e1',
                    background: formData.role === 'SELLER' ? '#fef3c7' : '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Store size={24} color={formData.role === 'SELLER' ? '#d97706' : '#64748b'} />
                  <span style={{ fontWeight: '700', fontSize: '0.95rem', color: formData.role === 'SELLER' ? '#92400e' : '#1e293b' }}>
                    Seller / Agri-Dealer
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Sell & manage products</span>
                </button>
              </div>
            </div>

            {/* Basic Info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Full Name / Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Password * (min 6 chars)</label>
                <input
                  type="password"
                  required
                  placeholder="Choose password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="form-input"
              />
            </div>

            {/* Shipping / Farm Location Details */}
            <div className="form-group">
              <label className="form-label">Address / Village / Land Plot *</label>
              <input
                type="text"
                required
                placeholder="Plot 14, Near Post Office, Village..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="form-input"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">City / Taluka *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">State *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maharashtra"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Pincode *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 411001"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              {loading ? 'Registering Account...' : (
                <>
                  <UserPlus size={18} /> Create {formData.role === 'SELLER' ? 'Seller' : 'Customer'} Account
                </>
              )}
            </button>
          </form>

          <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#64748b', marginTop: '1.5rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#2e7d32', fontWeight: '700' }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
