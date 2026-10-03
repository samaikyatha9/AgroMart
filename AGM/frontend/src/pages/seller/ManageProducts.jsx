import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { sellerService } from '../../services/sellerService';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionMessage, setActionMessage] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await sellerService.getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load seller products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from your store catalog?`)) {
      return;
    }

    try {
      await sellerService.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
      setActionMessage(`Product "${name}" deleted successfully.`);
      setTimeout(() => setActionMessage(null), 4000);
    } catch (err) {
      setActionMessage(`Error: ${err.message}`);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.categoryName && p.categoryName.toLowerCase().includes(search.toLowerCase())) ||
    (p.brand && p.brand.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="section-py">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <Link to="/seller" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#2e7d32', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <ArrowLeft size={16} /> Back to Seller Dashboard
            </Link>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f3814' }}>
              Manage Products & Inventory
            </h1>
            <p style={{ color: '#64748b' }}>
              Add, update prices, manage stock quantities, and remove catalog items.
            </p>
          </div>

          <Link to="/seller/products/new" className="btn btn-primary">
            <Plus size={16} /> Add New Product
          </Link>
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

        {/* Search Input */}
        <div className="card" style={{ padding: '1rem 1.5rem', marginBottom: '2rem' }}>
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <input
              type="text"
              placeholder="Search your products by name, brand, category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
            />
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        {/* Products Table */}
        <div className="card" style={{ padding: '1.5rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
              No products found. Click "Add New Product" to list your first item.
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => {
                    const isOutOfStock = product.stock <= 0;
                    const isLowStock = product.stock > 0 && product.stock <= 5;

                    return (
                      <tr key={product.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            <img
                              src={product.imageUrl || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2252a?auto=format&fit=crop&w=120&q=80'}
                              alt={product.name}
                              style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                            <div>
                              <div style={{ fontWeight: '700', color: '#0f3814' }}>{product.name}</div>
                              {product.brand && (
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Brand: {product.brand}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>{product.categoryName || 'General'}</td>
                        <td style={{ fontWeight: '700', color: '#1b5e20' }}>
                          ₹{Number(product.price).toFixed(2)}
                          {product.unit && <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '400' }}> / {product.unit}</span>}
                        </td>
                        <td style={{ fontWeight: '700' }}>
                          {product.stock} units
                        </td>
                        <td>
                          {isOutOfStock ? (
                            <span className="badge badge-out-of-stock">Out of Stock</span>
                          ) : isLowStock ? (
                            <span className="badge badge-low-stock">Low Stock</span>
                          ) : (
                            <span className="badge badge-in-stock">Available</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                            <Link
                              to={`/seller/products/${product.id}/edit`}
                              className="btn btn-outline btn-sm"
                              title="Edit product"
                            >
                              <Edit size={14} /> Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(product.id, product.name)}
                              className="btn btn-danger btn-sm"
                              title="Delete product"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
