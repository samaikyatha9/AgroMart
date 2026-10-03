import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, PlusCircle, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { sellerService } from '../../services/sellerService';
import { categoryService } from '../../services/categoryService';

const AddProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    categoryId: '',
    brand: '',
    unit: '1 kg'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    categoryService.getAllCategories().then(data => {
      setCategories(data);
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, categoryId: data[0].id }));
      }
    }).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (Number(formData.price) <= 0) {
      setError('Price must be greater than zero.');
      return;
    }

    if (Number(formData.stock) < 0) {
      setError('Stock cannot be negative.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        imageUrl: formData.imageUrl.trim() || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2252a?auto=format&fit=crop&w=600&q=80',
        categoryId: parseInt(formData.categoryId),
        brand: formData.brand.trim(),
        unit: formData.unit.trim()
      };

      await sellerService.addProduct(payload);
      navigate('/seller/products');
    } catch (err) {
      setError(err.message || 'Failed to add product. Please check fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-py">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/seller/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#2e7d32', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            <ArrowLeft size={16} /> Back to Products
          </Link>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f3814' }}>
            Add New Agricultural Product
          </h1>
          <p style={{ color: '#64748b' }}>
            List certified seeds, fertilizers, farming equipment or tools in the AgroMart marketplace.
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #fca5a5',
            borderRadius: '10px',
            padding: '1rem',
            color: '#b91c1c',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            fontWeight: '600'
          }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div className="card" style={{ padding: '2.5rem' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Certified Hybrid Mustard Seeds (Pusa Bold)"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="form-select"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Brand / Manufacturer *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KrishiGold, Seminis, Bayer"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Price (₹) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="e.g. 450.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Packaging Unit *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10 kg Bag, 1 Liter Bottle, 1 Piece"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Initial Stock Quantity *</label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="e.g. 100"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="form-input"
              />
              <span className="form-hint">
                Provide a valid web image URL showcasing the product packaging or crop sample.
              </span>
            </div>

            {formData.imageUrl && (
              <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '0.5rem' }}>Image Preview:</span>
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  onError={(e) => { e.target.style.display = 'none'; }}
                  style={{ maxHeight: '180px', borderRadius: '12px', border: '1px solid #cbd5e1' }}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Detailed Product Description & Usage Guidelines *</label>
              <textarea
                required
                rows={5}
                placeholder="Specify seed germination rate, soil requirements, recommended dosage, active ingredients..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-textarea"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              <Save size={18} /> {loading ? 'Saving Product...' : 'Publish Product to Marketplace'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
