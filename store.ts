
import { useState, useEffect, useCallback } from 'react';
import { CartItem, Order, Address } from './types';

// Simple "Database" using LocalStorage
const STORAGE_KEYS = {
  CART: 'f6_cart',
  ORDERS: 'f6_orders',
};

export const useStore = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.selectedSize === item.selectedSize);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string, size: string) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.selectedSize === size)));
  };

  const updateQuantity = (id: string, size: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id && i.selectedSize === size) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const clearCart = () => setCart([]);

  const createOrder = (address: Address) => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const newOrder: Order = {
      id: `F6-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toISOString(),
      items: [...cart],
      total,
      address,
      status: 'Paid'
    };
    setOrders(prev => [...prev, newOrder]);
    clearCart();
    return newOrder;
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    orders,
    createOrder,
  };
};
