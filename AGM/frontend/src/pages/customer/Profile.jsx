import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Save, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        pincode: user.pincode || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      setSaving(true);
      await updateProfile({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim()
      });
      setSuccessMsg('Profile and shipping details updated successfully!');
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="section-py">
      <div className="container" style={{ maxWidth: '750px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f3814', marginBottom: '0.5rem' }}>
            Profile & Shipping Settings
          </h1>
          <p style={{ color: '#64748b' }}>
            Manage your personal credentials, contact details, and primary farmgate delivery address.
          </p>
        </div>

        {/* Profile Card */}
        <div className="card" style={{ padding: '2.5rem' }}>
          {/* Header Strip with Role */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid #e2e8f0',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#e8f5e9',
                color: '#2e7d32',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '1.4rem'
              }}>
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f3814' }}>{user?.name}</h2>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{user?.email}</div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span className={`badge badge-role-${user?.role?.toLowerCase()}`} style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}>
                {user?.role} ACCOUNT
              </span>
            </div>
          </div>

          {successMsg && (
            <div style={{
              background: '#dcfce7',
              border: '1px solid #86efac',
              borderRadius: '10px',
              padding: '0.85rem 1rem',
              color: '#15803d',
              fontWeight: '600',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <CheckCircle2 size={18} /> {successMsg}
            </div>
          )}

          {errorMsg && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: '10px',
              padding: '0.85rem 1rem',
              color: '#b91c1c',
              fontWeight: '600',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <AlertCircle size={18} /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address (Read-only)</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    disabled
                    value={formData.email}
                    className="form-input"
                    style={{ paddingLeft: '2.5rem', backgroundColor: '#f8fafc', cursor: 'not-allowed', color: '#64748b' }}
                  />
                  <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Contact Phone Number *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0f3814', marginTop: '1.75rem', marginBottom: '1rem' }}>
              Primary Farmgate Shipping Address
            </h3>

            <div className="form-group">
              <label className="form-label">Address Line / Landmark / Village *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  placeholder="Plot 10, Green Field Estate..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <MapPin size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">City / Taluka *</label>
                <input
                  type="text"
                  required
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
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Postal Pincode *</label>
                <input
                  type="text"
                  required
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary btn-lg"
              style={{ marginTop: '1rem' }}
            >
              <Save size={18} /> {saving ? 'Saving Updates...' : 'Save Profile Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
