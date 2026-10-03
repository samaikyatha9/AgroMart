import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Plus, Edit, Trash2, ArrowLeft, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { categoryService } from '../../services/categoryService';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', image: '' });
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '', image: '' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || '',
      description: category.description || '',
      image: category.image || ''
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingCategory) {
        const updated = await categoryService.updateCategory(editingCategory.id, formData);
        setCategories(categories.map(c => c.id === editingCategory.id ? updated : c));
        setActionMessage(`Category "${formData.name}" updated successfully.`);
      } else {
        const created = await categoryService.createCategory(formData);
        setCategories([...categories, created]);
        setActionMessage(`Category "${formData.name}" created successfully.`);
      }
      handleCloseModal();
      setTimeout(() => setActionMessage(null), 4000);
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete category "${name}"? Existing products in this category will need reassignment.`)) {
      return;
    }

    try {
      await categoryService.deleteCategory(id);
      setCategories(categories.filter(c => c.id !== id));
      setActionMessage(`Category "${name}" deleted.`);
      setTimeout(() => setActionMessage(null), 4000);
    } catch (err) {
      setActionMessage(`Error: ${err.message}`);
    }
  };

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
              Manage Agricultural Categories
            </h1>
            <p style={{ color: '#64748b' }}>
              Organize seeds, fertilizers, implements, and irrigation groupings across the platform.
            </p>
          </div>

          <button onClick={handleOpenAddModal} className="btn btn-primary">
            <Plus size={16} /> Add New Category
          </button>
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

        {/* Categories Table */}
        <div className="card" style={{ padding: '1.5rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading categories...</div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Product Count</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(cat => (
                    <tr key={cat.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <img
                            src={cat.image || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2252a?auto=format&fit=crop&w=120&q=80'}
                            alt={cat.name}
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '10px' }}
                          />
                          <div style={{ fontWeight: '700', color: '#0f3814', fontSize: '1rem' }}>
                            {cat.name}
                          </div>
                        </div>
                      </td>
                      <td style={{ color: '#475569', fontSize: '0.875rem', maxWidth: '350px' }}>
                        {cat.description}
                      </td>
                      <td style={{ fontWeight: '700' }}>
                        {cat.productCount ?? 0} listed
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleOpenEditModal(cat)}
                            className="btn btn-outline btn-sm"
                            title="Edit category"
                          >
                            <Edit size={14} /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(cat.id, cat.name)}
                            className="btn btn-danger btn-sm"
                            title="Delete category"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal for Add / Edit Category */}
        {isModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div className="card" style={{ maxWidth: '500px', width: '100%', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f3814' }}>
                  {editingCategory ? 'Edit Category' : 'Create New Category'}
                </h3>
                <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Category Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bio-Pesticides"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Banner Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe products grouped under this category..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button type="button" onClick={handleCloseModal} className="btn btn-outline">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn btn-primary">
                    {saving ? 'Saving...' : editingCategory ? 'Save Changes' : 'Create Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCategories;
