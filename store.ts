
import { useState, useEffect, useCallback } from 'react';
import { CartItem, Order, Address } from './types';
import { supabase } from './supabaseClient';

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

  const createOrder = async (address: Address, paymentMethod: string = 'UPI/Card'): Promise<Order> => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const newOrder: Order = {
      id: `F6-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toISOString(),
      items: [...cart],
      total,
      address,
      status: 'Paid',
      payment_method: paymentMethod
    };
    setOrders(prev => [...prev, newOrder]);
    clearCart();

    // Insert into Supabase
    try {
      // STEP 1 — UPSERT CUSTOMER
      const { data: customerData, error: customerError } = 
        await supabase
          .from('customers')
          .upsert(
            {
              contact: address.phone,
              full_name: address.fullName,
              email: address.email,
              street: address.street,
              city: address.city,
              state: address.state,
              zip: address.zip
            },
            { onConflict: 'contact' }
          )
          .select('customer_id')
          .single();

      if (customerError) {
        console.error('Customer upsert failed:', customerError);
      }

      const customerId = customerData?.customer_id;

      // STEP 2 — INSERT ORDER
      await supabase.from('orders').insert({
        order_id: newOrder.id,
        date: newOrder.date,
        full_name: address.fullName,
        email: address.email,
        phone: address.phone,
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
        items: JSON.stringify(cart),
        total,
        status: 'Paid',
        payment_method: paymentMethod,
        customer_id: customerId ?? null
      });

      // STEP 3 — INSERT ORDER ITEMS
      const orderItemsPayload = cart.map(item => ({
        order_id: newOrder.id,
        product_id: item.id,
        name: item.name,
        category: item.category,
        size: item.selectedSize,
        colour: item.selectedColor,
        price: item.price,
        quantity: item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsPayload);

      if (itemsError) {
        console.error('Order items insert failed:', itemsError);
      }
    } catch (error) {
      console.error('Failed to save order to Supabase:', error);
    }

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
