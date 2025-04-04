// context/PrintingContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { PrintOrder } from '../types';

interface PrintingContextType {
  // Current order being processed
  currentOrder: PrintOrder | null;
  setCurrentOrder: (order: PrintOrder | null) => void;
  
  // Order history
  orderHistory: PrintOrder[];
  addToOrderHistory: (order: PrintOrder) => void;
  
  // Recent uploads
  recentUploads: File[];
  addToRecentUploads: (file: File) => void;
  
  // Clear context data
  clearContext: () => void;
}

const PrintingContext = createContext<PrintingContextType | undefined>(undefined);

interface PrintingProviderProps {
  children: ReactNode;
}

export const PrintingProvider: React.FC<PrintingProviderProps> = ({ children }) => {
  // State for the current order
  const [currentOrder, setCurrentOrder] = useState<PrintOrder | null>(null);
  
  // State for order history (persistent in a real app)
  const [orderHistory, setOrderHistory] = useState<PrintOrder[]>([]);
  
  // State for recent uploads
  const [recentUploads, setRecentUploads] = useState<File[]>([]);
  
  // Add an order to the history
  const addToOrderHistory = (order: PrintOrder) => {
    setOrderHistory(prev => [order, ...prev]);
  };
  
  // Add a file to recent uploads (keep only last 5)
  const addToRecentUploads = (file: File) => {
    setRecentUploads(prev => {
      // Check if file already exists
      const exists = prev.some(f => f.name === file.name && f.size === file.size);
      if (exists) return prev;
      
      // Add to beginning, keep only last 5
      const newUploads = [file, ...prev].slice(0, 5);
      return newUploads;
    });
  };
  
  // Clear all context data
  const clearContext = () => {
    setCurrentOrder(null);
    setOrderHistory([]);
    setRecentUploads([]);
  };
  
  const contextValue: PrintingContextType = {
    currentOrder,
    setCurrentOrder,
    orderHistory,
    addToOrderHistory,
    recentUploads,
    addToRecentUploads,
    clearContext
  };
  
  return (
    <PrintingContext.Provider value={contextValue}>
      {children}
    </PrintingContext.Provider>
  );
};

// Custom hook to use the printing context
export const usePrinting = (): PrintingContextType => {
  const context = useContext(PrintingContext);
  if (context === undefined) {
    throw new Error('usePrinting must be used within a PrintingProvider');
  }
  return context;
};