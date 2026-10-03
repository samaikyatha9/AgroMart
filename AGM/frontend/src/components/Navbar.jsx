import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Sprout, 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  LogOut, 
  Package, 
  LayoutDashboard, 
  Store, 
  Shield, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, isSeller, logout } = useAuth();
  const { cartItemsCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchKeyword.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={() => setIsMobileMenuOpen(false)}>
          <div style={{
            background: 'linear-gradient(135deg, #2e7d32, #1b5e20)',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 2px 6px rgba(46, 125, 50, 0.3)'
          }}>
            <Sprout size={24} />
          </div>
          <div>
            <span>AGRO</span>MART
          </div>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="navbar-search" style={{ display: 'none', margin: '0 1rem' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type="text"
              placeholder="Search seeds, fertilizers, farming equipment..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '2.5rem',
                borderRadius: '9999px',
                backgroundColor: '#f1f5f9',
                border: '1px solid #e2e8f0',
                fontSize: '0.9rem'
              }}
            />
            <Search
              size={18}
              color="#64748b"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
            />
          </div>
        </form>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex' }}>
          <ul className="nav-links" style={{ display: 'flex' }}>
            <li>
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/categories" className={`nav-link ${isActive('/categories') ? 'active' : ''}`}>
                Categories
              </Link>
            </li>
            <li>
              <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Action Badges & User Menu */}
        <div className="navbar-actions">
          {/* Wishlist */}
          <Link to="/wishlist" className="action-badge-btn" title="Wishlist">
            <Heart size={20} />
            {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="action-badge-btn" title="Shopping Cart">
            <ShoppingCart size={20} />
            {cartItemsCount > 0 && <span className="badge-count">{cartItemsCount}</span>}
          </Link>

          {/* User Authentication Menu */}
          {isAuthenticated ? (
            <div className="user-menu">
              <button
                className="user-menu-btn"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-expanded={isUserMenuOpen}
              >
                <User size={16} />
                <span>{user?.name?.split(' ')[0] || 'User'}</span>
                <ChevronDown size={14} />
              </button>

              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <div style={{ padding: '0.6rem 1rem', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{user.email}</div>
                    <span className={`badge badge-role-${user.role.toLowerCase()}`} style={{ marginTop: '0.35rem', display: 'inline-block' }}>
                      {user.role}
                    </span>
                  </div>

                  {/* Customer Links */}
                  <Link
                    to="/dashboard"
                    className="dropdown-item"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <LayoutDashboard size={16} /> Customer Dashboard
                  </Link>
                  <Link
                    to="/orders"
                    className="dropdown-item"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Package size={16} /> My Orders
                  </Link>
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <User size={16} /> Profile Settings
                  </Link>

                  {/* Seller Links */}
                  {isSeller && (
                    <>
                      <div className="dropdown-divider"></div>
                      <Link
                        to="/seller"
                        className="dropdown-item"
                        style={{ color: '#854d0e', fontWeight: '600' }}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Store size={16} /> Seller Dashboard
                      </Link>
                    </>
                  )}

                  {/* Admin Links */}
                  {isAdmin && (
                    <>
                      <div className="dropdown-divider"></div>
                      <Link
                        to="/admin"
                        className="dropdown-item"
                        style={{ color: '#6b21a8', fontWeight: '600' }}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Shield size={16} /> Admin Panel
                      </Link>
                    </>
                  )}

                  <div className="dropdown-divider"></div>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item"
                    style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', color: '#dc2626' }}
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link to="/login" className="btn btn-outline btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn btn-outline btn-icon"
            style={{ display: 'none' }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .navbar-search {
            display: block !important;
          }
        }
        @media (max-width: 992px) {
          .nav-links {
            display: none !important;
          }
          .navbar-actions .btn-icon {
            display: inline-flex !important;
          }
        }
      `}</style>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <form onSubmit={handleSearch} style={{ marginBottom: '0.5rem' }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="form-input"
            />
          </form>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Home</Link>
          <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Products</Link>
          <Link to="/categories" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Categories</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">About</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Contact</Link>
          {isAuthenticated && (
            <>
              <hr style={{ borderColor: '#f1f5f9' }} />
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Dashboard</Link>
              <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">My Orders</Link>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">My Profile</Link>
              {isSeller && <Link to="/seller" onClick={() => setIsMobileMenuOpen(false)} className="nav-link" style={{ color: '#854d0e', fontWeight: 'bold' }}>Seller Dashboard</Link>}
              {isAdmin && <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="nav-link" style={{ color: '#6b21a8', fontWeight: 'bold' }}>Admin Dashboard</Link>}
              <button onClick={handleLogout} className="btn btn-danger btn-sm" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>Logout</button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
