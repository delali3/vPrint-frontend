// components/TrackOrderPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';

const TrackOrderPage: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!orderNumber.trim()) {
      setError('Please enter a ticket/order number');
      return;
    }
    
    // Clear any previous errors
    setError(null);
    
    // Show loading state
    setIsSubmitting(true);
    
    // Simulate a brief loading period before navigating
    setTimeout(() => {
      // Navigate to the order details page
      navigate(`/order/${orderNumber.trim()}`);
    }, 400);
  };
  
  return (
    <div className="py-12 bg-gray-900 relative min-h-screen">
      {/* Enhanced background elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-800 rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-purple-600 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Track Your Order</h1>
            <p className="text-gray-400 max-w-sm mx-auto">Enter your ticket number to view your order details and current status</p>
          </div>
          
          <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-300 mb-2">
                  Order/Ticket Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Enter your ticket number"
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  />
                  {orderNumber && (
                    <button
                      type="button"
                      onClick={() => setOrderNumber('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-400 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {error}
                  </p>
                )}
              </div>
              
              <div>
                <Button 
                  type="submit" 
                  className="w-full py-3 justify-center shadow-lg hover:shadow-purple-500/20 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Track Order
                    </>
                  )}
                </Button>
              </div>
            </form>
            
            <div className="mt-8 border-t border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Quick Guide
              </h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-start p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-purple-500 text-xs font-bold">1</span>
                  </div>
                  <span>Enter the ticket number you received after placing your order.</span>
                </li>
                <li className="flex items-start p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-purple-500 text-xs font-bold">2</span>
                  </div>
                  <span>You can find your ticket number in the confirmation email or SMS.</span>
                </li>
                <li className="flex items-start p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-purple-500 text-xs font-bold">3</span>
                  </div>
                  <span>If you need assistance, please contact our support team.</span>
                </li>
              </ul>
            </div>
            
            {/* Additional help section */}
            <div className="mt-6 bg-gray-700 bg-opacity-50 rounded-lg p-4 flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-gray-300">
                Lost your ticket number? Contact our support team at <span className="text-purple-400">support@printshop.com</span> with your name and approximate order date.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;