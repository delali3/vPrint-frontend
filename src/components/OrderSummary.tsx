// components/OrderSummary.tsx
import React, { useMemo } from 'react';
import { PrintOrder } from '../types';
import Button from './ui/Button';
import { usePriceCalculator } from '../hooks/usePriceCalculator';

interface OrderSummaryProps {
  order: PrintOrder;
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  order, 
  onConfirm, 
  onCancel, 
  isProcessing 
}) => {
  // Format binding type for display
  const formatBinding = (binding: string): string => {
    if (binding === 'none') return 'No Binding';
    return binding.charAt(0).toUpperCase() + binding.slice(1) + ' Binding';
  };
  
  // Use the price calculator hook
  const { calculatePriceBreakdown } = usePriceCalculator();
  
  // Calculate the price breakdown
  const priceBreakdown = useMemo(() => {
    return calculatePriceBreakdown(
      order.pageCount,
      order.printColor,
      order.binding,
      order.campusDelivery
    );
  }, [order, calculatePriceBreakdown]);

  return (
    <div className="space-y-6">
      {/* Document Details */}
      <div className="bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-white mb-4">Order Details</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between py-2 border-b border-gray-700">
            <span className="text-gray-400">Document</span>
            <span className="text-white font-medium">{order.fileName}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-700">
            <span className="text-gray-400">Page Count</span>
            <span className="text-white font-medium">{order.pageCount} pages</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-700">
            <span className="text-gray-400">Print Color</span>
            <span className="text-white font-medium">
              {order.printColor === 'monochrome' ? 'Monochrome' : 'Colored'}
            </span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-700">
            <span className="text-gray-400">Binding Method</span>
            <span className="text-white font-medium">{formatBinding(order.binding)}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-700">
            <span className="text-gray-400">Campus Delivery</span>
            <span className="text-white font-medium">{order.campusDelivery ? 'Yes (GHC 2)' : 'No'}</span>
          </div>
        </div>
      </div>

      {/* User Information */}
      {order.userInfo && (
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-white mb-4">Your Information</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Name</span>
              <span className="text-white font-medium">{order.userInfo.name}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Phone</span>
              <span className="text-white font-medium">{order.userInfo.phone}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Email</span>
              <span className="text-white font-medium">{order.userInfo.email}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Course/Program</span>
              <span className="text-white font-medium">{order.userInfo.course}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Class/Year</span>
              <span className="text-white font-medium">{order.userInfo.class}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Price Breakdown */}
      <div className="bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-white mb-4">Price Breakdown</h2>
        
        <div className="space-y-4">
          {/* Price Breakdown */}
          <div className="pt-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Printing ({order.pageCount} pages × GHC {order.printColor === 'monochrome' ? '1.00' : '2.00'})</span>
                <span className="text-white">GHC {priceBreakdown.baseCost.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{formatBinding(order.binding)}</span>
                <span className="text-white">GHC {priceBreakdown.bindingCost.toFixed(2)}</span>
              </div>
              
              {order.campusDelivery && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Campus Delivery</span>
                  <span className="text-white">GHC {priceBreakdown.deliveryCost.toFixed(2)}</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-between py-2 text-lg border-t border-gray-700 pt-3">
              <span className="text-gray-400">Total Price</span>
              <span className="text-purple-500 font-bold">GHC {order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-3">
        <Button 
          type="button" 
          onClick={onConfirm} 
          fullWidth
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing Order...
            </span>
          ) : (
            'Confirm Order'
          )}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel} 
          fullWidth
          disabled={isProcessing}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;