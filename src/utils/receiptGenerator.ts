// utils/receiptGenerator.ts
import { PrintOrder, UserInfo } from '../types';

export interface ReceiptData {
  orderNumber: string;
  orderDate: string;
  fileName: string;
  pageCount: number;
  printColor: string;
  binding: string;
  campusDelivery: boolean;
  baseCost: number;
  bindingCost: number;
  deliveryCost: number;
  totalPrice: number;
  userInfo?: UserInfo; // Add user information
}

/**
 * Generates receipt data from an order
 */
export const generateReceiptData = (
  order: PrintOrder,
  orderNumber: string
): ReceiptData => {
  // Format binding type for display
  const formatBinding = (binding: string): string => {
    if (binding === 'none') return 'No Binding';
    return binding.charAt(0).toUpperCase() + binding.slice(1) + ' Binding';
  };

  // Format current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = currentDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Calculate costs based on order
  const baseCost = order.printColor === 'monochrome' 
    ? order.pageCount * 1 
    : order.pageCount * 2;

  const bindingCostMap = {
    'none': 0,
    'comb': 5,
    'slide': 7,
    'tape': 3
  };
  
  const bindingCost = bindingCostMap[order.binding as keyof typeof bindingCostMap] || 0;
  const deliveryCost = order.campusDelivery ? 2 : 0;

  return {
    orderNumber,
    orderDate: `${formattedDate} at ${formattedTime}`,
    fileName: order.fileName || "Unknown Document",
    pageCount: order.pageCount,
    printColor: order.printColor === 'monochrome' ? 'Monochrome' : 'Colored',
    binding: formatBinding(order.binding),
    campusDelivery: order.campusDelivery,
    baseCost,
    bindingCost,
    deliveryCost,
    totalPrice: order.totalPrice,
    userInfo: order.userInfo // Include user info in receipt data
  };
};

/**
 * Generates a downloadable PDF receipt for the given order
 */
export const generateReceiptPDF = async (
  receiptData: ReceiptData
): Promise<Blob> => {
  // This is a placeholder implementation
  // In a real application, you would use a library like jsPDF to generate a proper PDF
  
  const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Print Shop Receipt - ${receiptData.orderNumber}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          line-height: 1.5;
          margin: 0;
          padding: 20px;
        }
        .receipt {
          max-width: 800px;
          margin: 0 auto;
          border: 1px solid #ddd;
          padding: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #6b46c1;
        }
        .header h1 {
          color: #6b46c1;
          margin: 0;
          font-size: 24px;
        }
        .order-info {
          margin-bottom: 20px;
        }
        .order-info div {
          margin-bottom: 5px;
        }
        .details table {
          width: 100%;
          border-collapse: collapse;
        }
        .details th, .details td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        .details th {
          background-color: #f9f9f9;
        }
        .total {
          text-align: right;
          margin-top: 20px;
          font-weight: bold;
          font-size: 18px;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 14px;
          color: #777;
        }
        .section {
          margin-bottom: 20px;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
          color: #6b46c1;
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <h1>Print Shop Receipt</h1>
          <p>Thank you for your order!</p>
        </div>
        
        <div class="order-info">
          <div><strong>Order Number:</strong> ${receiptData.orderNumber}</div>
          <div><strong>Date:</strong> ${receiptData.orderDate}</div>
        </div>

        ${receiptData.userInfo ? `
        <div class="section">
          <div class="section-title">Customer Information</div>
          <table class="details">
            <tr>
              <td><strong>Name:</strong></td>
              <td>${receiptData.userInfo.name}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>${receiptData.userInfo.email}</td>
            </tr>
            <tr>
              <td><strong>Phone:</strong></td>
              <td>${receiptData.userInfo.phone}</td>
            </tr>
            <tr>
              <td><strong>Course/Program:</strong></td>
              <td>${receiptData.userInfo.course}</td>
            </tr>
            <tr>
              <td><strong>Class/Year:</strong></td>
              <td>${receiptData.userInfo.class}</td>
            </tr>
          </table>
        </div>
        ` : ''}
        
        <div class="section">
          <div class="section-title">Order Details</div>
          <table class="details">
            <tr>
              <th>Item</th>
              <th>Details</th>
              <th>Price (GHC)</th>
            </tr>
            <tr>
              <td>Document</td>
              <td>${receiptData.fileName} (${receiptData.pageCount} pages, ${receiptData.printColor})</td>
              <td>${receiptData.baseCost.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Binding</td>
              <td>${receiptData.binding}</td>
              <td>${receiptData.bindingCost.toFixed(2)}</td>
            </tr>
            ${receiptData.campusDelivery ? `
            <tr>
              <td>Delivery</td>
              <td>Campus Delivery</td>
              <td>${receiptData.deliveryCost.toFixed(2)}</td>
            </tr>` : ''}
          </table>
          
          <div class="total">
            Total: GHC ${receiptData.totalPrice.toFixed(2)}
          </div>
        </div>
        
        <div class="footer">
          <p>For any questions about your order, please contact us at support@printshop.com</p>
          <p>Print Shop &copy; ${new Date().getFullYear()}</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  // Convert HTML to Blob
  const blob = new Blob([receiptHTML], { type: 'text/html' });
  return blob;
};

/**
 * Downloads the receipt as an HTML file that looks like a receipt
 */
export const downloadReceipt = async (receiptData: ReceiptData): Promise<void> => {
  try {
    const receiptBlob = await generateReceiptPDF(receiptData);
    const url = URL.createObjectURL(receiptBlob);
    
    // Create a download link and trigger it
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `receipt-${receiptData.orderNumber}.html`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Revoke the object URL to free up memory
    setTimeout(() => URL.revokeObjectURL(url), 100);
  } catch (error) {
    console.error('Error generating receipt:', error);
    throw error;
  }
};