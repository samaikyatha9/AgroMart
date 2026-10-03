import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, ArrowLeft, CheckCircle2, XCircle, AlertCircle, Shield } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';

const ManageUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [actionMessage, setActionMessage] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to load users', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (user) => {
    if (user.id === currentUser?.id) {
      alert('You cannot disable your own admin account.');
      return;
    }

    try {
      const updated = await adminService.toggleUserStatus(user.id);
      setUsers(users.map(u => u.id === user.id ? updated : u));
      setActionMessage(`User "${user.name}" status changed to ${updated.enabled ? 'Enabled' : 'Disabled'}.`);
      setTimeout(() => setActionMessage(null), 4000);
    } catch (err) {
      setActionMessage(`Error: ${err.message}`);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                          u.email.toLowerCase().includes(search.toLowerCase()) ||
                          (u.city && u.city.toLowerCase().includes(search.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  return (
    <div className="section-py">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#2e7d32', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <ArrowLeft size={16} /> Back to Admin Dashboard
            </Link>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f3814' }}>
              User Directory & Permissions
            </h1>
            <p style={{ color: '#64748b' }}>
              Manage customer accounts, verify seller credentials, and enforce platform access controls.
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

        {/* Filter and Search Bar */}
        <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ position: 'relative', minWidth: '300px' }}>
            <input
              type="text"
              placeholder="Search user by name, email, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
            />
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#64748b' }}>Filter Role:</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '0.4rem 1.75rem 0.4rem 0.75rem' }}
            >
              <option value="ALL">All Roles</option>
              <option value="CUSTOMER">Customer</option>
              <option value="SELLER">Seller</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="card" style={{ padding: '1.5rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>No users match the search criteria.</div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name & Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(u => (
                    <tr key={u.id}>
                      <td style={{ fontWeight: '700' }}>#{u.id}</td>
                      <td>
                        <div style={{ fontWeight: '700', color: '#0f3814' }}>{u.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{u.email}</div>
                      </td>
                      <td>{u.phone || '—'}</td>
                      <td>
                        <span className={`badge badge-role-${u.role.toLowerCase()}`}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>
                        {u.city ? `${u.city}, ${u.state || ''}` : '—'}
                      </td>
                      <td>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontWeight: '600',
                          fontSize: '0.825rem',
                          color: u.enabled ? '#15803d' : '#dc2626'
                        }}>
                          {u.enabled ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                          {u.enabled ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleToggleStatus(u)}
                          disabled={u.id === currentUser?.id}
                          className={`btn btn-sm ${u.enabled ? 'btn-danger' : 'btn-primary'}`}
                          title={u.enabled ? 'Disable user access' : 'Enable user access'}
                        >
                          {u.enabled ? 'Disable' : 'Enable'}
                        </button>
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

export default ManageUsers;
