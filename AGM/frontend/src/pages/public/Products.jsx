import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import ProductCard from '../../components/ProductCard';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search states
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [keyword, setKeyword] = useState(initialSearch);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    categoryService.getAllCategories().then(setCategories).catch(console.error);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let data;
      if (keyword.trim()) {
        data = await productService.searchProducts(keyword.trim());
      } else if (selectedCategory || minPrice !== '' || maxPrice !== '') {
        data = await productService.filterProducts({
          categoryId: selectedCategory || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined
        });
      } else {
        data = await productService.getAllProducts(sortBy);
      }

      // Client-side sort if search/filter was applied
      let sorted = [...data];
      if (sortBy === 'price_asc') {
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
      } else if (sortBy === 'price_desc') {
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
      } else if (sortBy === 'newest') {
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      if (inStockOnly) {
        sorted = sorted.filter(p => p.stock > 0);
      }

      setProducts(sorted);
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Sync with URL query parameters
    const cat = searchParams.get('category');
    const srch = searchParams.get('search');
    if (cat !== null) setSelectedCategory(cat);
    if (srch !== null) setKeyword(srch);
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy, inStockOnly]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(prev => {
      if (keyword) prev.set('search', keyword);
      else prev.delete('search');
      return prev;
    });
    fetchProducts();
  };

  const handleResetFilters = () => {
    setSelectedCategory('');
    setKeyword('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('newest');
    setInStockOnly(false);
    setSearchParams({});
  };

  return (
    <div className="section-py">
      <div className="container">
        {/* Header Breadcrumb & Title */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f3814', marginBottom: '0.5rem' }}>
            Agricultural Marketplace
          </h1>
          <p style={{ color: '#64748b' }}>
            Explore verified seeds, nutrients, farming implements, and crop protection items.
          </p>
        </div>

        {/* Search & Mobile Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          background: '#ffffff',
          padding: '1rem 1.25rem',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', flex: '1', minWidth: '260px' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type="text"
                placeholder="Search by title, crop, brand or category..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
              <Search size={18} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
            <button type="submit" className="btn btn-primary btn-sm">Search</button>
          </form>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#64748b' }}>Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '0.5rem 1.75rem 0.5rem 0.75rem', fontSize: '0.875rem' }}
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Main Content Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '2rem',
          alignItems: 'start'
        }} className="products-layout-grid">
          {/* Filter Sidebar */}
          <aside className="card" style={{ padding: '1.5rem', position: 'sticky', top: '90px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f3814', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <SlidersHorizontal size={18} /> Filters
              </h3>
              <button
                onClick={handleResetFilters}
                className="btn btn-outline btn-sm"
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                title="Reset all filters"
              >
                <RefreshCw size={12} /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Category</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <button
                  onClick={() => setSelectedCategory('')}
                  style={{
                    textAlign: 'left',
                    background: selectedCategory === '' ? '#e8f5e9' : 'transparent',
                    color: selectedCategory === '' ? '#1b5e20' : '#475569',
                    fontWeight: selectedCategory === '' ? '700' : '500',
                    border: 'none',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(String(cat.id))}
                    style={{
                      textAlign: 'left',
                      background: selectedCategory === String(cat.id) ? '#e8f5e9' : 'transparent',
                      color: selectedCategory === String(cat.id) ? '#1b5e20' : '#475569',
                      fontWeight: selectedCategory === String(cat.id) ? '700' : '500',
                      border: 'none',
                      padding: '0.4rem 0.6rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Price Range (₹)</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="form-input"
                  style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
                />
                <span style={{ color: '#94a3b8' }}>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="form-input"
                  style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>
              <button onClick={fetchProducts} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                Apply Price Filter
              </button>
            </div>

            {/* Stock Filter */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  style={{ accentColor: '#2e7d32', width: '16px', height: '16px' }}
                />
                In Stock Only
              </label>
            </div>
          </aside>

          {/* Product Grid */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                Showing <strong style={{ color: '#0f3814' }}>{products.length}</strong> products
              </div>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                Loading catalog...
              </div>
            ) : products.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <div style={{ color: '#94a3b8', marginBottom: '1rem' }}>
                  <Search size={48} style={{ margin: '0 auto' }} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>No products found</h3>
                <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
                  Try changing your search query or reset your category and price filters.
                </p>
                <button onClick={handleResetFilters} className="btn btn-primary btn-sm">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1.5rem'
              }}>
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .products-layout-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Products;
