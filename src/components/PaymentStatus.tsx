// components/PaymentStatus.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getPaymentStatus } from '../services/api';
import Button from './ui/Button';

const PaymentStatus: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<'pending' | 'completed' | 'failed' | 'error'>('pending');
  const [message, setMessage] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  
  const reference = searchParams.get('reference') || '';
  const orderNumberParam = searchParams.get('orderNumber') || '';
  
  useEffect(() => {
    if (reference) {
      checkPaymentStatus();
    } else {
      setIsLoading(false);
      setStatus('error');
      setMessage('No payment reference provided');
    }
  }, [reference]);
  
  // Function to check payment status
  const checkPaymentStatus = async () => {
    try {
      setIsLoading(true);
      const result = await getPaymentStatus(reference);
      
      if (result.success) {
        setStatus(result.status as any);
        setMessage(result.message);
        setOrderNumber(result.orderNumber || orderNumberParam);
      } else {
        setStatus('error');
        setMessage(result.message || 'Failed to verify payment');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      setStatus('error');
      setMessage('Error checking payment status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to retry payment status check
  const handleRetryCheck = () => {
    checkPaymentStatus();
  };
  
  // Function to go to order confirmation
  const handleGoToConfirmation = () => {
    navigate(`/payment-success?orderNumber=${orderNumber}`);
  };
  
  // Function to go to home page
  const handleGoToHome = () => {
    navigate('/');
  };
  
  return (
    <div className="py-12 bg-gray-900 relative flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-white mb-4">Payment Status</h2>
        
        {isLoading ? (
          <div className="text-center py-8">
            <svg className="animate-spin h-8 w-8 mx-auto text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-300 mt-4">Checking payment status...</p>
          </div>
        ) : (
          <div>
            {status === 'completed' && (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-500 mb-2">Payment Successful</h3>
                <p className="text-gray-300 mb-6">{message}</p>
                <Button onClick={handleGoToConfirmation} fullWidth>
                  Continue to Order Confirmation
                </Button>
              </div>
            )}
            
            {status === 'pending' && (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-yellow-500 mb-2">Payment Pending</h3>
                <p className="text-gray-300 mb-6">
                  Your payment is still being processed. This might take a few minutes.
                </p>
                <div className="space-y-3">
                  <Button onClick={handleRetryCheck} fullWidth>
                    Check Again
                  </Button>
                  <Button onClick={handleGoToHome} variant="outline" fullWidth>
                    Return to Home
                  </Button>
                </div>
              </div>
            )}
            
            {status === 'failed' && (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-500 mb-2">Payment Failed</h3>
                <p className="text-gray-300 mb-6">
                  Your payment was not successful. Please try again or use a different payment method.
                </p>
                <Button onClick={handleGoToHome} fullWidth>
                  Return to Home
                </Button>
              </div>
            )}
            
            {status === 'error' && (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-500 mb-2">Error</h3>
                <p className="text-gray-300 mb-6">{message}</p>
                <Button onClick={handleGoToHome} fullWidth>
                  Return to Home
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;