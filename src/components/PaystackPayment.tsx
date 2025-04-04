// components/PaystackPayment.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';

interface PaystackPaymentProps {
  paymentUrl: string;
  orderNumber: string;
  paymentReference: string;
  onPaymentStart?: () => void;
  onPaymentCancel?: () => void;
}

const PaystackPayment: React.FC<PaystackPaymentProps> = ({
  paymentUrl,
  orderNumber,
  paymentReference,
  onPaymentStart,
  onPaymentCancel
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  // Function to open Paystack payment page
  const handleProceedToPayment = () => {
    if (onPaymentStart) {
      onPaymentStart();
    }
    
    // Open Paystack payment page in a new window/tab
    window.open(paymentUrl, '_blank');
    
    // Navigate to the payment status page to check the status
    navigate(`/payment-status?reference=${paymentReference}&orderNumber=${orderNumber}`);
  };

  const handleCancelPayment = () => {
    if (onPaymentCancel) {
      onPaymentCancel();
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white mb-4">Payment Required</h2>
      <p className="text-gray-300 mb-6">
        Your order has been created. Please proceed to payment to complete your order.
      </p>
      
      <div className="bg-gray-700 p-4 rounded-lg mb-6">
        <div className="flex justify-between py-2 border-b border-gray-600">
          <span className="text-gray-400">Order Number</span>
          <span className="text-white font-medium">{orderNumber}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-400">Payment Reference</span>
          <span className="text-white font-medium">{paymentReference}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <Button 
          onClick={handleProceedToPayment}
          fullWidth
          disabled={isVerifying}
        >
          <span className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Proceed to Payment
          </span>
        </Button>
        
        <Button 
          variant="outline"
          onClick={handleCancelPayment}
          fullWidth
          disabled={isVerifying}
        >
          Cancel Payment
        </Button>
      </div>
      
      <div className="mt-6 border-t border-gray-700 pt-4 text-center">
        <p className="text-gray-400 text-sm">
          Secure payment powered by Paystack. Your payment information is encrypted and secure.
        </p>
      </div>
    </div>
  );
};

export default PaystackPayment;