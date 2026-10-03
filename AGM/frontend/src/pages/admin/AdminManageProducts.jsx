import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, Trash2, ArrowLeft, AlertCircle, CheckCircle2, Store } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { productService } from '../../services/productService';

const AdminManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionMessage, setActionMessage] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await adminService.getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load admin products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently remove "${name}" from the AgroMart marketplace?`)) {
      return;
    }

    try {
      await productService.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
      setActionMessage(`Product "${name}" deleted successfully.`);
      setTimeout(() => setActionMessage(null), 4000);
    } catch (err) {
      setActionMessage(`Error: ${err.message}`);
    }
  };

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.sellerName && p.sellerName.toLowerCase().includes(search.toLowerCase())) ||
    (p.categoryName && p.categoryName.toLowerCase().includes(search.toLowerCase()))
  );

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
              Platform Product Catalog
            </h1>
            <p style={{ color: '#64748b' }}>
              Audit agricultural listings, monitor compliance, and moderate catalog items across all sellers.
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

        {/* Search */}
        <div className="card" style={{ padding: '1rem 1.5rem', marginBottom: '2rem' }}>
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <input
              type="text"
              placeholder="Search catalog by title, seller, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
            />
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        {/* Table */}
        <div className="card" style={{ padding: '1.5rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading products...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>No products found.</div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Seller</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img
                            src={p.imageUrl || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2252a?auto=format&fit=crop&w=120&q=80'}
                            alt={p.name}
                            style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '8px' }}
                          />
                          <div>
                            <div style={{ fontWeight: '700', color: '#0f3814' }}>{p.name}</div>
                            {p.brand && <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Brand: {p.brand}</div>}
                          </div>
                        </div>
                      </td>
                      <td>{p.categoryName || 'General'}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
                          <Store size={14} color="#d97706" />
                          <span>{p.sellerName || 'Merchant'}</span>
                        </div>
                      </td>
                      <td style={{ fontWeight: '700', color: '#1b5e20' }}>₹{Number(p.price).toFixed(2)}</td>
                      <td style={{ fontWeight: '700' }}>{p.stock}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="btn btn-danger btn-sm"
                          title="Remove product"
                        >
                          <Trash2 size={14} /> Remove
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

export default AdminManageProducts;
