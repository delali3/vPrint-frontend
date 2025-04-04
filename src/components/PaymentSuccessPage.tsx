// components/PaymentSuccessPage.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { getOrder } from '../services/api';
import Button from './ui/Button';

const PaymentSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const orderNumber = searchParams.get('orderNumber');
  
  useEffect(() => {
    if (orderNumber) {
      fetchOrderDetails();
    } else {
      setIsLoading(false);
      setError('No order number provided');
    }
  }, [orderNumber]);
  
  const fetchOrderDetails = async () => {
    try {
      setIsLoading(true);
      const result = await getOrder(orderNumber!);
      
      if (result.success) {
        setOrder(result.order);
      } else {
        setError(result.error || 'Failed to retrieve order details');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError('Error retrieving order details. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleViewOrder = () => {
    navigate(`/order/${orderNumber}`);
  };
  
  return (
    <div className="py-12 bg-gray-900 relative min-h-screen">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-800 rounded-full opacity-5 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb navigation */}
          <nav className="flex mb-8 text-sm">
            <Link to="/" className="text-gray-400 hover:text-purple-400 transition-colors">Home</Link>
            <span className="mx-2 text-gray-600">/</span>
            <span className="text-white">Payment Success</span>
          </nav>
          
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 text-center">
            {isLoading ? (
              <div className="py-8">
                <svg className="animate-spin h-10 w-10 mx-auto text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-300 mt-4">Loading order details...</p>
              </div>
            ) : error ? (
              <div className="py-8">
                <div className="w-16 h-16 mx-auto bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
                <p className="text-gray-300 mb-6">{error}</p>
                <Link to="/" className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Return to Home
                </Link>
              </div>
            ) : (
              <>
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 opacity-25 blur-xl rounded-full"></div>
                  <div className="relative inline-block p-4 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full mb-6 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4">Payment Successful!</h2>
                
                <div className="mb-6 bg-gray-900 bg-opacity-50 p-4 rounded-lg inline-block">
                  <div className="text-gray-400 text-sm mb-1">Your Order Number</div>
                  <div className="text-xl font-mono font-bold text-purple-400">{orderNumber}</div>
                </div>
                
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Your payment has been processed successfully. Your order is now being prepared.
                  {order?.campusDelivery
                    ? " We'll deliver it to your campus location within 24 hours."
                    : " You can pick it up from our print center within 24 hours."}
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  {order && (
                    <Button onClick={handleViewOrder}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Order Details
                    </Button>
                  )}
                  
                  <Link to="/" className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-medium transition-colors hover:border-purple-500 hover:text-purple-400 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Return to Home
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;