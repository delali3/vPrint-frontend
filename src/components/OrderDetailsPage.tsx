// components/OrderDetailsPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrder } from '../services/api';
import Button from './ui/Button';
import { generateReceiptData } from '../utils/receiptGenerator';
import Receipt from './Receipt';

const OrderDetailsPage: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
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

  // Format binding type for display
  const formatBinding = (binding: string): string => {
    if (binding === 'none') return 'No Binding';
    return binding.charAt(0).toUpperCase() + binding.slice(1) + ' Binding';
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Handle receipt actions
  const handleViewReceipt = () => {
    if (!order) return;
    setShowReceipt(true);
  };
  
  // Handle copying the ticket number
  const handleCopyTicket = () => {
    if (!order) return;
    
    navigator.clipboard.writeText(order.order_number.toString())
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy ticket number: ', err);
      });
  };
  
  // Handle printing the receipt
  const handlePrintReceipt = () => {
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
            <span className="text-white">Order Details</span>
          </nav>
          
          {isLoading ? (
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
              <svg className="animate-spin h-10 w-10 mx-auto text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-300 mt-4">Loading order details...</p>
            </div>
          ) : error ? (
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
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
          ) : order ? (
            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-white">Order #{order.order_number}</h1>
                    <button 
                      onClick={handleCopyTicket}
                      className="ml-3 p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                      title="Copy ticket number"
                    >
                      {copySuccess ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      )}
                    </button>
                    {copySuccess && (
                      <span className="ml-2 text-sm text-green-500">Copied!</span>
                    )}
                  </div>
                  <div className="px-3 py-1 rounded-full text-sm font-medium capitalize" 
                    style={{
                      backgroundColor: order.order_status === 'pending' ? '#9333ea33' : 
                                      order.order_status === 'processing' ? '#3b82f633' : 
                                      order.order_status === 'ready' ? '#22c55e33' : 
                                      order.order_status === 'delivered' ? '#14b8a633' : 
                                      order.order_status === 'completed' ? '#14b8a633' : '#6b72803',
                      color: order.order_status === 'pending' ? '#9333ea' : 
                            order.order_status === 'processing' ? '#3b82f6' : 
                            order.order_status === 'ready' ? '#22c55e' : 
                            order.order_status === 'delivered' ? '#14b8a6' : 
                            order.order_status === 'completed' ? '#14b8a6' : '#6b7280'
                    }}>
                    {order.order_status}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Order Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Order Date:</span>
                        <span className="text-white">{formatDate(order.created_at)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Document:</span>
                        <span className="text-white">{order.file_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pages:</span>
                        <span className="text-white">{order.page_count} pages</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Print Color:</span>
                        <span className="text-white capitalize">{order.print_color}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Binding:</span>
                        <span className="text-white">{formatBinding(order.binding)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Delivery:</span>
                        <span className="text-white">{order.campus_delivery ? 'Campus Delivery' : 'Pickup'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Payment Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Payment Status:</span>
                        <span className="text-white capitalize">{order.payment?.status || 'pending'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Payment Method:</span>
                        <span className="text-white capitalize">{order.payment?.method || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Payment Date:</span>
                        <span className="text-white">{order.payment?.date ? formatDate(order.payment.date) : 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Reference:</span>
                        <span className="text-white">{order.payment?.reference || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Amount:</span>
                        <span className="text-xl font-semibold text-purple-500">
                          GHC {typeof order.total_price === 'number' 
                            ? order.total_price.toFixed(2) 
                            : parseFloat(order.total_price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-white mb-3">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white">{order.userInfo?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-white">{order.userInfo?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Phone:</span>
                      <span className="text-white">{order.userInfo?.phone}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Course:</span>
                      <span className="text-white">{order.userInfo?.course}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Class:</span>
                      <span className="text-white">{order.userInfo?.class}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Actions */}
              <div className="flex flex-col md:flex-row gap-3 justify-center">
                <Button onClick={handleViewReceipt}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Receipt
                </Button>
                
                <Link to="/track-order">
                  <Button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Track Another Order
                  </Button>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      
      {/* Receipt Modal */}
      {showReceipt && order && (
        <Receipt 
          data={generateReceiptData({
            ...order,
            fileName: order.file_name,
            printColor: order.print_color,
            campusDelivery: order.campus_delivery,
            userInfo: order.userInfo,
            totalPrice: typeof order.total_price === 'number' 
              ? order.total_price 
              : parseFloat(order.total_price)
          }, order.order_number)} 
          onClose={() => setShowReceipt(false)} 
          onPrint={handlePrintReceipt}
        />
      )}
    </div>
  );
};

export default OrderDetailsPage;