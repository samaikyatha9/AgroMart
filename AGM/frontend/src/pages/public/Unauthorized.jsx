import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Unauthorized = () => {
  const { user } = useAuth();

  return (
    <div className="section-py" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '520px', textAlign: 'center' }}>
        <div className="card" style={{ padding: '3rem 2rem', boxShadow: 'var(--shadow-md)' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#fee2e2',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <ShieldAlert size={36} />
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f3814', marginBottom: '0.75rem' }}>
            Access Restricted
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            You do not have the required role permissions to access this dashboard or resource.
            {user && (
              <span style={{ display: 'block', marginTop: '0.5rem', fontWeight: '600', color: '#1e293b' }}>
                Your current role is: <span className={`badge badge-role-${user.role.toLowerCase()}`}>{user.role}</span>
              </span>
            )}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary">
              <Home size={16} /> AgroMart Home
            </Link>
            <Link to="/products" className="btn btn-outline">
              <ArrowLeft size={16} /> Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
