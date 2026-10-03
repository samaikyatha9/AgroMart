import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState({ items: [], subtotal: 0, deliveryCharge: 0, totalAmount: 0, totalItems: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [cartError, setCartError] = useState(null);

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCart({ items: [], subtotal: 0, deliveryCharge: 0, totalAmount: 0, totalItems: 0 });
      return;
    }
    try {
      setIsLoading(true);
      const data = await cartService.getCart();
      setCart(data);
      setCartError(null);
    } catch (err) {
      console.error('Failed to load cart', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      setCartError(null);
      const data = await cartService.addToCart(productId, quantity);
      setCart(data);
      return { success: true, message: 'Added to cart successfully!' };
    } catch (err) {
      setCartError(err.message);
      return { success: false, message: err.message };
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      setCartError(null);
      const data = await cartService.updateItemQuantity(itemId, quantity);
      setCart(data);
      return { success: true };
    } catch (err) {
      setCartError(err.message);
      return { success: false, message: err.message };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      setCartError(null);
      const data = await cartService.removeItem(itemId);
      setCart(data);
      return { success: true };
    } catch (err) {
      setCartError(err.message);
      return { success: false, message: err.message };
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCart({ items: [], subtotal: 0, deliveryCharge: 0, totalAmount: 0, totalItems: 0 });
    } catch (err) {
      console.error('Failed to clear cart', err);
    }
  };

  const value = {
    cart,
    cartItemsCount: cart.totalItems || 0,
    subtotal: cart.subtotal || 0,
    deliveryCharge: cart.deliveryCharge || 0,
    totalAmount: cart.totalAmount || 0,
    items: cart.items || [],
    isLoading,
    cartError,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart: fetchCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
