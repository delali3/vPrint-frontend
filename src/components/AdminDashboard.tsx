// components/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Order, OrderFilters, OrderSorting, OrdersResponse } from '../types';

// API base URL - adjust based on your environment
const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AdminDashboard: React.FC = () => {
  // State for orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for selected order details
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [, setViewingPdf] = useState<boolean>(false);
  
  // State for filters
  const [filters, setFilters] = useState<OrderFilters>({
    status: 'all',
    dateRange: 'all',
    search: '',
  });
  
  // State for sorting
  const [sorting, setSorting] = useState<OrderSorting>({
    field: 'created_at',
    direction: 'desc',
  });

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get<OrdersResponse>(`${API_BASE_URL}/admin/orders`);
      setOrders(response.data.orders);
      applyFilters(response.data.orders);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch orders. Please try again later.');
      setLoading(false);
      console.error('Error fetching orders:', err);
    }
  };

  // Fetch order details
  const fetchOrderDetails = async (orderNumber: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/${orderNumber}`);
      setSelectedOrder(response.data.order);
    } catch (err) {
      console.error('Error fetching order details:', err);
      setError('Failed to fetch order details.');
    }
  };

  // Update order status
  const updateOrderStatus = async (orderNumber: string, newStatus: string) => {
    try {
      await axios.put(`${API_BASE_URL}/admin/orders/${orderNumber}/status`, {
        status: newStatus
      });
      
      // Update the order in the local state
      const updatedOrders = orders.map(order => 
        order.order_number === orderNumber ? { ...order, order_status: newStatus as Order['order_status'] } : order
      );
      setOrders(updatedOrders);
      applyFilters(updatedOrders);
      
      // Update selected order if it's the current one
      if (selectedOrder && selectedOrder.order_number === orderNumber) {
        setSelectedOrder({
          ...selectedOrder,
          order_status: newStatus as Order['order_status']
        });
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      setError('Failed to update order status.');
    }
  };

  // Apply filters and sorting to orders
  const applyFilters = (orderData: Order[] = orders) => {
    let result = [...orderData];
    
    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter(order => order.order_status === filters.status);
    }
    
    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      result = result.filter(order => {
        const orderDate = new Date(order.created_at);
        
        switch (filters.dateRange) {
          case 'today':
            return orderDate >= today;
          case 'yesterday':
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            return orderDate >= yesterday && orderDate < today;
          case 'thisWeek':
            const lastWeek = new Date(today);
            lastWeek.setDate(today.getDate() - 7);
            return orderDate >= lastWeek;
          case 'thisMonth':
            const lastMonth = new Date(today);
            lastMonth.setMonth(today.getMonth() - 1);
            return orderDate >= lastMonth;
          default:
            return true;
        }
      });
    }
    
    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(order => 
        order.order_number.toLowerCase().includes(searchTerm) ||
        order.file_name.toLowerCase().includes(searchTerm) ||
        (order.userInfo && order.userInfo.name.toLowerCase().includes(searchTerm)) ||
        (order.userInfo && order.userInfo.email.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let valA: any = a[sorting.field as keyof Order];
      let valB: any = b[sorting.field as keyof Order];
      
      // Handle nested fields
      if (sorting.field.includes('.')) {
        const [parent, child] = sorting.field.split('.');
        valA = a[parent as keyof Order] ? (a[parent as keyof Order] as any)[child] : null;
        valB = b[parent as keyof Order] ? (b[parent as keyof Order] as any)[child] : null;
      }
      
      // Handle dates
      if (sorting.field === 'created_at' || sorting.field === 'updated_at' || sorting.field === 'payment.date') {
        valA = new Date(valA || 0).getTime();
        valB = new Date(valB || 0).getTime();
      }
      
      // Handle numeric values
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sorting.direction === 'asc' ? valA - valB : valB - valA;
      }
      
      // Handle string values
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sorting.direction === 'asc' 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      }
      
      // Default comparison
      return sorting.direction === 'asc' ? (valA > valB ? 1 : -1) : (valB > valA ? 1 : -1);
    });
    
    setFilteredOrders(result);
  };

  // Handle filter changes
  const handleFilterChange = (name: keyof OrderFilters, value: string) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Handle sort changes
  const handleSortChange = (field: string) => {
    setSorting({
      field,
      direction: sorting.field === field && sorting.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  // View PDF for a specific order
  const viewPdf = (fileId: string) => {
    setViewingPdf(true);
    // You can open in a new tab or use an iframe
    window.open(`${API_BASE_URL}/pdf-preview/${fileId}`, '_blank');
  };

  // Print document for a specific order
  const printDocument = (fileId: string) => {
    // Create a hidden iframe to trigger the print
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = `${API_BASE_URL}/pdf-preview/${fileId}`;
    
    iframe.onload = () => {
      try {
        iframe.contentWindow?.print();
      } catch (err) {
        console.error('Error printing document:', err);
        alert('There was an error printing the document. Please try again.');
      }
      
      // Remove the iframe after printing
      setTimeout(() => {
        iframe.remove();
      }, 1000);
    };
    
    document.body.appendChild(iframe);
  };

  // Format date for display
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Effect to load orders when component mounts
  useEffect(() => {
    fetchOrders();
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchOrders, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Effect to apply filters when filters or sorting changes
  useEffect(() => {
    applyFilters();
  }, [filters, sorting]);

  // Status color mapping
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Header */}
      <header className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Print Shop Admin Dashboard</h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="bg-red-800 text-white p-4 rounded-lg mb-6">
              {error}
              <button 
                className="ml-2 text-white underline" 
                onClick={() => setError(null)}
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Filter Controls */}
          <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Status Filter */}
                <div>
                  <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-400 mb-1">
                    Order Status
                  </label>
                  <select
                    id="statusFilter"
                    className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 w-full sm:w-auto"
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Date Range Filter */}
                <div>
                  <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-400 mb-1">
                    Date Range
                  </label>
                  <select
                    id="dateFilter"
                    className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 w-full sm:w-auto"
                    value={filters.dateRange}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="thisWeek">Last 7 Days</option>
                    <option value="thisMonth">Last 30 Days</option>
                  </select>
                </div>
              </div>

              {/* Search */}
              <div className="flex-grow max-w-md">
                <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 w-full"
                  placeholder="Search by order #, name, email..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">No orders found matching the current filters.</p>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSortChange('order_number')}
                      >
                        Order #
                        {sorting.field === 'order_number' && (
                          <span className="ml-1">
                            {sorting.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSortChange('created_at')}
                      >
                        Date
                        {sorting.field === 'created_at' && (
                          <span className="ml-1">
                            {sorting.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSortChange('userInfo.name')}
                      >
                        Customer
                        {sorting.field === 'userInfo.name' && (
                          <span className="ml-1">
                            {sorting.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSortChange('file_name')}
                      >
                        Document
                        {sorting.field === 'file_name' && (
                          <span className="ml-1">
                            {sorting.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSortChange('total_price')}
                      >
                        Total
                        {sorting.field === 'total_price' && (
                          <span className="ml-1">
                            {sorting.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSortChange('payment.status')}
                      >
                        Payment
                        {sorting.field === 'payment.status' && (
                          <span className="ml-1">
                            {sorting.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSortChange('order_status')}
                      >
                        Status
                        {sorting.field === 'order_status' && (
                          <span className="ml-1">
                            {sorting.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {filteredOrders.map((order) => (
                      <tr key={order.order_number} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{order.order_number}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{formatDate(order.created_at)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{order.userInfo?.name}</div>
                          <div className="text-xs text-gray-400">{order.userInfo?.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300 truncate max-w-xs">{order.file_name}</div>
                          <div className="text-xs text-gray-400">{order.page_count} pages</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-purple-400">GHC {Number(order.total_price).toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${order.payment?.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            order.payment?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                            {order.payment?.status || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.order_status)} bg-opacity-20 text-white`}>
                            {order.order_status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => fetchOrderDetails(order.order_number)}
                            className="text-purple-400 hover:text-purple-300 mr-3"
                          >
                            View
                          </button>
                          <button
                            onClick={() => viewPdf(order.file_id)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Open PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-700 p-6">
              <h2 className="text-xl font-bold text-white">
                Order Details - #{selectedOrder.order_number}
              </h2>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              {/* Order Info */}
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Order Information</h3>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-gray-400">Status:</div>
                      <div className="text-white">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedOrder.order_status)} bg-opacity-20`}>
                          {selectedOrder.order_status}
                        </span>
                      </div>
                      
                      <div className="text-gray-400">Created:</div>
                      <div className="text-white">{formatDate(selectedOrder.created_at)}</div>
                      
                      <div className="text-gray-400">Last Updated:</div>
                      <div className="text-white">{formatDate(selectedOrder.updated_at)}</div>
                      
                      <div className="text-gray-400">Total Amount:</div>
                      <div className="text-purple-400 font-medium">GHC {Number(selectedOrder.total_price).toFixed(2)}</div>
                      
                      <div className="text-gray-400">Payment Status:</div>
                      <div className="text-white">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${selectedOrder.payment?.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          selectedOrder.payment?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                          {selectedOrder.payment?.status || 'Unknown'}
                        </span>
                      </div>
                      
                      <div className="text-gray-400">Payment Method:</div>
                      <div className="text-white">{selectedOrder.payment?.method || 'N/A'}</div>
                      
                      <div className="text-gray-400">Payment Date:</div>
                      <div className="text-white">{formatDate(selectedOrder.payment?.date)}</div>
                      
                      <div className="text-gray-400">Delivery:</div>
                      <div className="text-white">
                        {selectedOrder.campus_delivery ? 'Campus Delivery' : 'Self Pickup'}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Customer Information</h3>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-gray-400">Name:</div>
                      <div className="text-white">{selectedOrder.userInfo?.name}</div>
                      
                      <div className="text-gray-400">Email:</div>
                      <div className="text-white">{selectedOrder.userInfo?.email}</div>
                      
                      <div className="text-gray-400">Phone:</div>
                      <div className="text-white">{selectedOrder.userInfo?.phone}</div>
                      
                      <div className="text-gray-400">Course:</div>
                      <div className="text-white">{selectedOrder.userInfo?.course}</div>
                      
                      <div className="text-gray-400">Class:</div>
                      <div className="text-white">{selectedOrder.userInfo?.class}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Details */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-3">Document Details</h3>
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0 bg-purple-500 bg-opacity-10 p-2 rounded-lg mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">{selectedOrder.file_name}</p>
                      <div className="flex text-sm text-gray-400 mt-1">
                        <span className="mr-3">File ID: {selectedOrder.file_id}</span>
                        <span className="text-green-400">{selectedOrder.page_count} pages</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-600 rounded p-3">
                      <div className="text-sm text-gray-300 mb-1">Print Color:</div>
                      <div className="text-white font-medium">
                        {selectedOrder.print_color === 'colored' ? 'Full Color' : 'Black & White'}
                      </div>
                    </div>
                    
                    <div className="bg-gray-600 rounded p-3">
                      <div className="text-sm text-gray-300 mb-1">Binding Method:</div>
                      <div className="text-white font-medium capitalize">
                        {selectedOrder.binding === 'none' ? 'No Binding' : selectedOrder.binding}
                      </div>
                    </div>
                    
                    <div className="bg-gray-600 rounded p-3">
                      <div className="text-sm text-gray-300 mb-1">Color Pages:</div>
                      <div className="text-white font-medium">
                        {selectedOrder.color_pages} pages
                      </div>
                    </div>
                    
                    <div className="bg-gray-600 rounded p-3">
                      <div className="text-sm text-gray-300 mb-1">Monochrome Pages:</div>
                      <div className="text-white font-medium">
                        {selectedOrder.monochrome_pages} pages
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => viewPdf(selectedOrder.file_id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View PDF
                    </button>
                    
                    <button
                      onClick={() => printDocument(selectedOrder.file_id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      Print Document
                    </button>
                  </div>
                </div>
              </div>

              {/* Update Status */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-3">Update Order Status</h3>
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.order_number, 'pending')}
                      className={`px-3 py-2 rounded text-sm font-medium 
                        ${selectedOrder.order_status === 'pending' 
                          ? 'bg-yellow-600 text-white' 
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
                    >
                      Pending
                    </button>
                    
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.order_number, 'processing')}
                      className={`px-3 py-2 rounded text-sm font-medium 
                        ${selectedOrder.order_status === 'processing' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
                    >
                      Processing
                    </button>
                    
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.order_number, 'completed')}
                      className={`px-3 py-2 rounded text-sm font-medium 
                        ${selectedOrder.order_status === 'completed' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
                    >
                      Completed
                    </button>
                    
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.order_number, 'failed')}
                      className={`px-3 py-2 rounded text-sm font-medium 
                        ${selectedOrder.order_status === 'failed' 
                          ? 'bg-red-600 text-white' 
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
                    >
                      Failed
                    </button>
                    
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.order_number, 'cancelled')}
                      className={`px-3 py-2 rounded text-sm font-medium 
                        ${selectedOrder.order_status === 'cancelled' 
                          ? 'bg-gray-800 text-white' 
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
                    >
                      Cancelled
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 border border-gray-600 rounded text-gray-400 hover:border-gray-500 hover:text-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;