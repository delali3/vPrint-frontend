// components/PrintingPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PrintingForm from './PrintingForm';
import UserInfoForm from './UserInfoForm';
import OrderSummary from './OrderSummary';
import PaystackPayment from './PaystackPayment';
import Receipt from './Receipt';
import { PrintOrder, UserInfo, BackendPrintOrder } from '../types';
import { usePrinting } from '../context/PrintingContext';
import { generateReceiptData, downloadReceipt, ReceiptData } from '../utils/receiptGenerator';
import { submitOrder } from '../services/api';

type OrderStep = 'uploa d' | 'user-info' | 'review' | 'payment' | 'confirmation';

const PrintingPage: React.FC = () => {
  const { currentOrder, setCurrentOrder, addToOrderHistory } = usePrinting();
  const [currentStep, setCurrentStep] = useState<OrderStep>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [paymentReference, setPaymentReference] = useState<string>('');
  const [paymentUrl, setPaymentUrl] = useState<string>('');
  const [isDownloadingReceipt, setIsDownloadingReceipt] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [tempOrderData, setTempOrderData] = useState<PrintOrder | null>(null);
  
  // Handle when the form is submitted with a completed order
  const handleOrderSubmit = (order: PrintOrder) => {
    setTempOrderData(order);
    setCurrentStep('user-info');
  };
  
  // Handle when user info is submitted
  const handleUserInfoSubmit = (userInfo: UserInfo) => {
    if (!tempOrderData) return;
    
    // Combine the print order with user info
    const completeOrder = {
      ...tempOrderData,
      userInfo
    };
    
    setCurrentOrder(completeOrder);
    setCurrentStep('review');
  };
  
  // Handle order confirmation
  const handleOrderConfirm = async () => {
    if (!currentOrder) return;
    
    setIsProcessing(true);
    
    try {
      // Prepare order data for backend
      const backendOrder: BackendPrintOrder = {
        fileId: currentOrder.fileId || '',
        fileName: currentOrder.fileName,
        pageCount: currentOrder.pageCount,
        colorPages: currentOrder.colorPages,
        monochromePages: currentOrder.monochromePages,
        printColor: currentOrder.printColor,
        binding: currentOrder.binding,
        campusDelivery: currentOrder.campusDelivery,
        totalPrice: currentOrder.totalPrice,
        userInfo: currentOrder.userInfo!
      };
      
      // Submit order to backend
      const result = await submitOrder(backendOrder);
      
      // Set order number and payment information from backend response
      setOrderNumber(result.orderNumber);
      setPaymentReference(result.paymentReference);
      setPaymentUrl(result.paymentUrl);
      
      // Add to order history
      addToOrderHistory(currentOrder);
      
      // Move to payment step
      setCurrentStep('payment');
    } catch (error) {
      console.error('Error submitting order:', error);
      // You might want to show an error message here
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handle payment start
  const handlePaymentStart = () => {
    // Nothing to do here - payment continues in new window
  };
  
  // Handle payment cancel
  const handlePaymentCancel = () => {
    // Go back to review step
    setCurrentStep('review');
  };
  
  // Handle going back to user info step
  const handleBackToUserInfo = () => {
    setCurrentStep('user-info');
  };
  
  // Handle starting a new order
  const handleNewOrder = () => {
    setCurrentOrder(null);
    setTempOrderData(null);
    setCurrentStep('upload');
  };

  // Handle receipt actions
  const handleViewReceipt = () => {
    if (!currentOrder) return;
    
    const data = generateReceiptData(currentOrder, orderNumber);
    setReceiptData(data);
    setShowReceipt(true);
  };
  
  // Handle receipt download
  const handleSaveReceipt = async () => {
    if (!currentOrder) return;
    
    setIsDownloadingReceipt(true);
    try {
      const data = generateReceiptData(currentOrder, orderNumber);
      await downloadReceipt(data);
    } catch (error) {
      console.error('Failed to download receipt:', error);
      // You might want to show a toast notification here
    } finally {
      setIsDownloadingReceipt(false);
    }
  };
  
  // Handle printing the receipt
  const handlePrintReceipt = () => {
    // Focus the receipt content for printing
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="py-12 bg-gray-900 relative min-h-screen">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-800 rounded-full opacity-5 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb navigation */}
          <nav className="flex mb-8 text-sm">
            <Link to="/" className="text-gray-400 hover:text-purple-400 transition-colors">Home</Link>
            <span className="mx-2 text-gray-600">/</span>
            <span className="text-white">Print Document</span>
          </nav>
          
          {/* Step indicator */}
          <div className="mb-10">
            <div className="flex justify-between items-center max-w-xl mx-auto mb-4">
              <div className={`flex flex-col items-center ${currentStep === 'upload' ? 'text-purple-500' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 ${currentStep === 'upload' ? 'border-purple-500 bg-purple-500/10' : currentStep === 'user-info' || currentStep === 'review' || currentStep === 'payment' || currentStep === 'confirmation' ? 'border-green-500 bg-green-500/10' : 'border-gray-600'}`}>
                  {currentStep === 'upload' ? (
                    <span className="font-bold">1</span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-xs">Upload & Options</span>
              </div>
              
              <div className="flex-1 h-0.5 mx-2 bg-gray-700"></div>
              
              <div className={`flex flex-col items-center ${currentStep === 'user-info' ? 'text-purple-500' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 ${currentStep === 'user-info' ? 'border-purple-500 bg-purple-500/10' : currentStep === 'review' || currentStep === 'payment' || currentStep === 'confirmation' ? 'border-green-500 bg-green-500/10' : 'border-gray-600'}`}>
                  {currentStep === 'user-info' ? (
                    <span className="font-bold">2</span>
                  ) : currentStep === 'review' || currentStep === 'payment' || currentStep === 'confirmation' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="font-bold">2</span>
                  )}
                </div>
                <span className="text-xs">Your Information</span>
              </div>
              
              <div className="flex-1 h-0.5 mx-2 bg-gray-700"></div>
              
              <div className={`flex flex-col items-center ${currentStep === 'review' ? 'text-purple-500' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 ${currentStep === 'review' ? 'border-purple-500 bg-purple-500/10' : currentStep === 'payment' || currentStep === 'confirmation' ? 'border-green-500 bg-green-500/10' : 'border-gray-600'}`}>
                  {currentStep === 'review' ? (
                    <span className="font-bold">3</span>
                  ) : currentStep === 'payment' || currentStep === 'confirmation' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="font-bold">3</span>
                  )}
                </div>
                <span className="text-xs">Review Order</span>
              </div>
              
              <div className="flex-1 h-0.5 mx-2 bg-gray-700"></div>
              
              <div className={`flex flex-col items-center ${currentStep === 'payment' ? 'text-purple-500' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 ${currentStep === 'payment' ? 'border-purple-500 bg-purple-500/10' : currentStep === 'confirmation' ? 'border-green-500 bg-green-500/10' : 'border-gray-600'}`}>
                  {currentStep === 'payment' ? (
                    <span className="font-bold">4</span>
                  ) : currentStep === 'confirmation' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="font-bold">4</span>
                  )}
                </div>
                <span className="text-xs">Payment</span>
              </div>
              
              <div className="flex-1 h-0.5 mx-2 bg-gray-700"></div>
              
              <div className={`flex flex-col items-center ${currentStep === 'confirmation' ? 'text-purple-500' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 ${currentStep === 'confirmation' ? 'border-purple-500 bg-purple-500/10' : 'border-gray-600'}`}>
                  <span className="font-bold">5</span>
                </div>
                <span className="text-xs">Confirmation</span>
              </div>
            </div>
          </div>

          {/* Upload and Options */}
          {currentStep === 'upload' && (
            <>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">Print Your Document</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Upload your PDF, select your options, and we'll handle the rest.
                </p>
              </div>
              
              <PrintingForm onOrderSubmit={handleOrderSubmit} />
              
              {/* Additional information */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-white font-medium">Quick Turnaround</h3>
                  </div>
                  <p className="text-gray-400 text-sm">Most orders are completed within 24 hours of submission.</p>
                </div>
                
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h3 className="text-white font-medium">Quality Guaranteed</h3>
                  </div>
                  <p className="text-gray-400 text-sm">We use high-quality paper and printing equipment for professional results.</p>
                </div>
                
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-white font-medium">Multiple Options</h3>
                  </div>
                  <p className="text-gray-400 text-sm">Choose from various binding methods and delivery options.</p>
                </div>
              </div>
            </>
          )}
          
          {/* User Information Step */}
          {currentStep === 'user-info' && (
            <>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">Your Information</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Please provide your details so we can process your order and contact you when it's ready.
                </p>
              </div>
              
              <UserInfoForm 
                onSubmit={handleUserInfoSubmit} 
                initialData={currentOrder?.userInfo}
              />
              
              <div className="mt-4 text-center">
                <button
                  onClick={() => setCurrentStep('upload')}
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  &larr; Back to document options
                </button>
              </div>
            </>
          )}
          
          {/* Order Summary */}
          {currentStep === 'review' && currentOrder && (
            <>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">Review Your Order</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Please review your order details before confirming.
                </p>
              </div>
              
              <OrderSummary
                order={currentOrder}
                onConfirm={handleOrderConfirm}
                onCancel={handleBackToUserInfo}
                isProcessing={isProcessing}
              />
            </>
          )}
          
          {/* Payment Step */}
          {currentStep === 'payment' && currentOrder && (
            <>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">Payment</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Please complete the payment to proceed with your order.
                </p>
              </div>
              
              <PaystackPayment
                paymentUrl={paymentUrl}
                orderNumber={orderNumber}
                paymentReference={paymentReference}
                onPaymentStart={handlePaymentStart}
                onPaymentCancel={handlePaymentCancel}
              />
            </>
          )}
          
          {/* Order Confirmation */}
          {currentStep === 'confirmation' && currentOrder && (
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 text-center max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 opacity-25 blur-xl rounded-full"></div>
                <div className="relative inline-block p-4 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full mb-6 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">Order Confirmed!</h2>
              
              <div className="mb-6 bg-gray-900 bg-opacity-50 p-4 rounded-lg inline-block">
                <div className="text-gray-400 text-sm mb-1">Your Order Number</div>
                <div className="text-xl font-mono font-bold text-purple-400">{orderNumber}</div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Thank you, <span className="text-purple-400 font-semibold">{currentOrder.userInfo?.name}</span>, for your order. Your document is now in the printing queue.
                {currentOrder.campusDelivery
                  ? " We'll deliver it to your campus location within 24 hours."
                  : " You can pick it up from our print center within 24 hours."}
              </p>
              
              {/* Receipt Actions */}
              <div className="mb-6 flex flex-col md:flex-row gap-3 justify-center">
                <button 
                  onClick={handleViewReceipt}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Receipt
                </button>
                
                <button 
                  onClick={handleSaveReceipt}
                  disabled={isDownloadingReceipt}
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center"
                >
                  {isDownloadingReceipt ? (
                    <span className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Receipt
                    </span>
                  )}
                </button>
              </div>
              
              <div className="bg-gray-900 bg-opacity-50 p-4 rounded-lg mb-8">
                <h3 className="text-white font-medium mb-2">What happens next?</h3>
                <ol className="text-left text-gray-400 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-purple-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                    <span>Your document will be processed by our printing team.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                    <span>You'll receive a notification at <span className="text-purple-400">{currentOrder.userInfo?.email}</span> when your order is ready.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                    <span>{currentOrder.campusDelivery 
                      ? "Your prints will be delivered to your campus location." 
                      : "You can pick up your prints from our service center."}</span>
                  </li>
                </ol>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={handleNewOrder}
                  className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Place Another Order
                </button>
                
                <Link to="/" className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-medium transition-colors hover:border-purple-500 hover:text-purple-400">
                  Return to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Receipt Modal */}
      {showReceipt && receiptData && (
        <Receipt 
          data={receiptData} 
          onClose={() => setShowReceipt(false)} 
          onPrint={handlePrintReceipt}
        />
      )}
    </div>
  );
};

export default PrintingPage;