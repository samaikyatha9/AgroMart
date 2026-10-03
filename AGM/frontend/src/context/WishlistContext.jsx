import React, { createContext, useContext, useState, useEffect } from 'react';
import { wishlistService } from '../services/wishlistService';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWishlist = async () => {
    if (!isAuthenticated) {
      setWishlist([]);
      return;
    }
    try {
      setIsLoading(true);
      const data = await wishlistService.getWishlist();
      setWishlist(data);
    } catch (err) {
      console.error('Failed to load wishlist', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isAuthenticated]);

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.productId === productId);
  };

  const toggleWishlist = async (productId) => {
    if (!isAuthenticated) {
      return { success: false, requireAuth: true, message: 'Please login to use wishlist' };
    }
    try {
      if (isInWishlist(productId)) {
        const updated = await wishlistService.removeFromWishlist(productId);
        setWishlist(updated);
        return { success: true, added: false, message: 'Removed from wishlist' };
      } else {
        const updated = await wishlistService.addToWishlist(productId);
        setWishlist(updated);
        return { success: true, added: true, message: 'Added to wishlist' };
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const updated = await wishlistService.removeFromWishlist(productId);
      setWishlist(updated);
    } catch (err) {
      console.error('Failed to remove from wishlist', err);
    }
  };

  const value = {
    wishlist,
    wishlistCount: wishlist.length,
    isLoading,
    isInWishlist,
    toggleWishlist,
    removeFromWishlist,
    refreshWishlist: fetchWishlist
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
