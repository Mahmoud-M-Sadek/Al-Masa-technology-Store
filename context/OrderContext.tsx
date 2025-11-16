
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Order, CartItem, CustomerInfo } from '../types';

interface OrderContextType {
  orders: Order[];
  addOrder: (cartItems: CartItem[], customerInfo: CustomerInfo, total: number) => void;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const localData = localStorage.getItem('orders');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse orders from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (cartItems: CartItem[], customerInfo: CustomerInfo, total: number) => {
    const newOrder: Order = {
      id: Date.now(),
      customer: customerInfo,
      items: cartItems,
      total,
      date: new Date().toISOString(),
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
  };


  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
