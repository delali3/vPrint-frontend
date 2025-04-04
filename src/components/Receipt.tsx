// components/Receipt.tsx
import React, { useRef } from 'react';
import { ReceiptData } from '../utils/receiptGenerator';

interface ReceiptProps {
  data: ReceiptData;
  onClose: () => void;
  onPrint: () => void;
}

const Receipt: React.FC<ReceiptProps> = ({ data, onClose, onPrint }) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-full overflow-y-auto">
        {/* Receipt Header with controls - will be hidden during print */}
        <div className="bg-purple-600 p-4 text-white flex justify-between items-center sticky top-0 no-print">
          <h2 className="text-xl font-bold">Order Receipt</h2>
          <div className="flex space-x-2">
            <button
              onClick={onPrint}
              className="bg-white text-purple-600 px-3 py-1 rounded font-medium text-sm hover:bg-purple-100 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button>
            <button
              onClick={onClose}
              className="bg-white text-purple-600 px-3 py-1 rounded font-medium text-sm hover:bg-purple-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
        
        {/* Printable Receipt Content */}
        <div ref={receiptRef} className="p-6 text-gray-800 receipt-content">
          <div className="text-center mb-6 receipt-header">
            <h1 className="text-2xl font-bold text-purple-600">Print Shop Receipt</h1>
            <p className="text-gray-500">Thank you for your order!</p>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Order Number:</span>
              <span className="font-mono">{data.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Date:</span>
              <span>{data.orderDate}</span>
            </div>
          </div>
          
          {/* Customer Information */}
          {data.userInfo && (
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-3">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <div className="font-semibold">Name:</div>
                  <div>{data.userInfo.name}</div>
                </div>
                <div>
                  <div className="font-semibold">Email:</div>
                  <div>{data.userInfo.email}</div>
                </div>
                <div>
                  <div className="font-semibold">Phone:</div>
                  <div>{data.userInfo.phone}</div>
                </div>
                <div>
                  <div className="font-semibold">Course/Program:</div>
                  <div>{data.userInfo.course}</div>
                </div>
                <div>
                  <div className="font-semibold">Class/Year:</div>
                  <div>{data.userInfo.class}</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-3">Order Details</h2>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2">Item</th>
                  <th className="text-left p-2">Details</th>
                  <th className="text-right p-2">Price (GHC)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-2">Document</td>
                  <td className="p-2">
                    {data.fileName} <br />
                    <span className="text-gray-500 text-sm">
                      {data.pageCount} pages, {data.printColor}
                    </span>
                  </td>
                  <td className="p-2 text-right">{data.baseCost.toFixed(2)}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-2">Binding</td>
                  <td className="p-2">{data.binding}</td>
                  <td className="p-2 text-right">{data.bindingCost.toFixed(2)}</td>
                </tr>
                {data.campusDelivery && (
                  <tr className="border-b border-gray-200">
                    <td className="p-2">Delivery</td>
                    <td className="p-2">Campus Delivery</td>
                    <td className="p-2 text-right">{data.deliveryCost.toFixed(2)}</td>
                  </tr>
                )}
                <tr className="font-bold bg-gray-50">
                  <td className="p-2" colSpan={2}>Total</td>
                  <td className="p-2 text-right">GHC {data.totalPrice.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Payment Information */}
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-3">Payment Information</h2>
            <p>Payment will be collected upon delivery or pickup.</p>
          </div>
          
          {/* Delivery/Pickup Information */}
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-3">
              {data.campusDelivery ? 'Delivery Information' : 'Pickup Information'}
            </h2>
            <p>
              {data.campusDelivery 
                ? "Your order will be delivered to your campus location within 24 hours." 
                : "Your order will be available for pickup at our print center within 24 hours."}
            </p>
            <p className="mt-2">
              You will receive an email notification when your order is ready.
            </p>
          </div>
          
          {/* Footer */}
          <div className="text-center mt-10 pt-4 border-t border-gray-200 text-gray-500 text-sm receipt-footer">
            <p>For any questions about your order, please contact us at support@printshop.com</p>
            <p className="mt-1">Print Shop &copy; {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;