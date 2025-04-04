// components/HomePage.tsx
import React, { useState } from 'react';
import PrintingForm from './PrintingForm';
import OrderSummary from './OrderSummary';
import { PrintOrder } from '../types';

const HomePage: React.FC = () => {
  const [currentOrder, setCurrentOrder] = useState<PrintOrder | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  
  const handleOrderSubmit = (order: PrintOrder) => {
    setCurrentOrder(order);
  };
  
  const handleOrderConfirm = () => {
    setOrderConfirmed(true);
    // In a real app, you would submit the order to a backend service here
  };
  
  const handleOrderCancel = () => {
    setCurrentOrder(null);
  };
  
  const handleNewOrder = () => {
    setCurrentOrder(null);
    setOrderConfirmed(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {!currentOrder && !orderConfirmed && (
          <>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-4">vPrint</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Upload your documents and get them printed quickly and affordably.
                We offer various binding options and campus delivery.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  ),
                  title: "Upload Your PDF",
                  description: "Simply upload your document and we'll automatically count the pages."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  ),
                  title: "Choose Options",
                  description: "Select color or monochrome printing, binding method, and delivery option."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ),
                  title: "Get Your Prints",
                  description: "Confirm your order and receive your prints with fast delivery on campus."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
                  <div className="text-purple-500 mb-4 inline-block">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <PrintingForm onOrderSubmit={handleOrderSubmit} />
          </>
        )}
        
        {currentOrder && !orderConfirmed && (
          <OrderSummary
            order={currentOrder}
            onConfirm={handleOrderConfirm}
            onCancel={handleOrderCancel} 
            isProcessing={false}            
          />
        )}
        
        {orderConfirmed && (
          <div className="text-center bg-gray-800 p-8 rounded-lg shadow-md">
            <div className="inline-block p-3 bg-green-500 text-white rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h2>
            <p className="text-gray-400 mb-6">
              Thank you for your order. Your document is now in the printing queue.
              {currentOrder?.campusDelivery
                ? " We'll deliver it to your campus location within 24 hours."
                : " You can pick it up from our print center within 24 hours."}
            </p>
            <p className="text-gray-300 font-medium mb-6">
              Your order number: #PS{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
            </p>
            <button
              onClick={handleNewOrder}
              className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Place Another Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;