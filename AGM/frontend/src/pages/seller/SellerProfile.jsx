import React, { useState, useEffect } from 'react';
import { Store, ShieldCheck, MapPin, Phone, Mail, Save, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SellerProfile = () => {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
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
      setSuccessMsg('Seller business details updated successfully!');
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update business profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="section-py">
      <div className="container" style={{ maxWidth: '750px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/seller" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#2e7d32', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            <ArrowLeft size={16} /> Back to Seller Dashboard
          </Link>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f3814' }}>
            Agri-Merchant Store Profile
          </h1>
          <p style={{ color: '#64748b' }}>
            Manage your verified seller business information and fulfillment hub dispatch address.
          </p>
        </div>

        <div className="card" style={{ padding: '2.5rem' }}>
          {/* Seller Verified Badge Banner */}
          <div style={{
            background: '#fef3c7',
            border: '1px solid #fde68a',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck size={28} color="#d97706" />
              <div>
                <div style={{ fontWeight: '800', color: '#92400e', fontSize: '1rem' }}>
                  Verified AgroMart Merchant
                </div>
                <div style={{ fontSize: '0.8rem', color: '#b45309' }}>
                  License & Mandi Registration Verified
                </div>
              </div>
            </div>
            <span className="badge badge-role-seller">SELLER PORTAL</span>
          </div>

          {successMsg && (
            <div style={{
              background: '#dcfce7',
              border: '1px solid #86efac',
              borderRadius: '10px',
              padding: '0.85rem 1rem',
              color: '#15803d',
              fontWeight: '600',
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
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <AlertCircle size={18} /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Store / Enterprise Name *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Store size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Seller Account Email (Read-only)</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="form-input"
                    style={{ paddingLeft: '2.5rem', backgroundColor: '#f8fafc', cursor: 'not-allowed' }}
                  />
                  <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Business Phone Number *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0f3814', marginTop: '1.5rem', marginBottom: '1rem' }}>
              Warehouse & Dispatch Address
            </h3>

            <div className="form-group">
              <label className="form-label">Mandi Yard / Warehouse Address *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
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
                <label className="form-label">City *</label>
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
                <label className="form-label">Pincode *</label>
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
              <Save size={18} /> {saving ? 'Saving...' : 'Save Store Details'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
