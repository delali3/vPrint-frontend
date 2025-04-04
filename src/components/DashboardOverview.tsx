// components/DashboardOverview.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Order, OrderStats, StatsResponse, OrdersResponse, StatusCount, DailyCount } from '../types';

// API base URL - adjust based on your environment
const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const DashboardOverview: React.FC = () => {
  // State for dashboard data
  const [stats, setStats] = useState<OrderStats>({
    statusCounts: [],
    dailyCounts: [],
    totalRevenue: 0,
    todayOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch stats
      const statsResponse = await axios.get<StatsResponse>(`${API_BASE_URL}/admin/orders/stats`);
      setStats(statsResponse.data.stats);
      
      // Fetch recent orders
      const ordersResponse = await axios.get<OrdersResponse>(`${API_BASE_URL}/admin/orders?limit=5`);
      setRecentOrders(ordersResponse.data.orders.slice(0, 5));
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch dashboard data.');
      setLoading(false);
      console.error('Error fetching dashboard data:', err);
    }
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

  // Format date for chart display
  const formatChartDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return `GHC ${parseFloat(amount.toString()).toFixed(2)}`;
  };

  // Get status color
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

  // Effect to load dashboard data when component mounts
  useEffect(() => {
    fetchDashboardData();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Prepare chart data
  const chartData = stats.dailyCounts.map((item: DailyCount) => ({
    date: formatChartDate(item.date),
    orders: item.count
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Header */}
      <header className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
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

          {/* Quick Actions */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/admin/print-queue" className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg shadow-lg flex items-center">
                <svg className="h-8 w-8 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold">Print Queue</h3>
                  <p className="text-purple-200">Manage pending print jobs</p>
                </div>
              </Link>
              
              <Link to="/admin/orders" className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg shadow-lg flex items-center">
                <svg className="h-8 w-8 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold">All Orders</h3>
                  <p className="text-blue-200">View and manage orders</p>
                </div>
              </Link>
              
              <Link to="/admin/settings" className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg shadow-lg flex items-center">
                <svg className="h-8 w-8 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold">Settings</h3>
                  <p className="text-green-200">Configure system settings</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-200 text-sm">Today's Orders</p>
                    <p className="text-white text-2xl font-bold mt-1">
                      {loading ? '...' : stats.todayOrders}
                    </p>
                  </div>
                  <div className="rounded-full bg-purple-600 bg-opacity-30 p-3">
                    <svg className="h-6 w-6 text-purple-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">Pending Prints</p>
                    <p className="text-white text-2xl font-bold mt-1">
                      {loading ? '...' : stats.statusCounts.find(s => s.order_status === 'processing')?.count || 0}
                    </p>
                  </div>
                  <div className="rounded-full bg-blue-600 bg-opacity-30 p-3">
                    <svg className="h-6 w-6 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-200 text-sm">Completed Orders</p>
                    <p className="text-white text-2xl font-bold mt-1">
                      {loading ? '...' : stats.statusCounts.find(s => s.order_status === 'completed')?.count || 0}
                    </p>
                  </div>
                  <div className="rounded-full bg-green-600 bg-opacity-30 p-3">
                    <svg className="h-6 w-6 text-green-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-200 text-sm">Total Revenue</p>
                    <p className="text-white text-2xl font-bold mt-1">
                      {loading ? '...' : formatCurrency(stats.totalRevenue)}
                    </p>
                  </div>
                  <div className="rounded-full bg-yellow-600 bg-opacity-30 p-3">
                    <svg className="h-6 w-6 text-yellow-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Status Chart */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-bold text-white">Orders Last 7 Days</h2>
                </div>
                <div className="p-4 h-80">
                  {loading ? (
                    <div className="flex justify-center items-center h-full">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                    </div>
                  ) : chartData.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                      <p className="text-gray-400">No data available for the last 7 days</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: 'none', 
                            borderRadius: '0.375rem',
                            color: '#F9FAFB'
                          }}
                          itemStyle={{ color: '#8B5CF6' }}
                          labelStyle={{ color: '#F9FAFB' }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="orders" 
                          stroke="#8B5CF6" 
                          activeDot={{ r: 8 }} 
                          name="Orders"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>

            {/* Status Distribution */}
            <div>
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-bold text-white">Order Status</h2>
                </div>
                <div className="p-4">
                  {loading ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                    </div>
                  ) : stats.statusCounts.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-400">No status data available</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {stats.statusCounts.map((statusItem: StatusCount) => {
                        const totalCount = stats.statusCounts.reduce((sum, item) => sum + item.count, 0);
                        const percentage = totalCount > 0 ? (statusItem.count / totalCount) * 100 : 0;
                        
                        return (
                          <div key={statusItem.order_status}>
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center">
                                <span className={`w-3 h-3 rounded-full ${getStatusColor(statusItem.order_status)} mr-2`}></span>
                                <span className="text-gray-300 capitalize">{statusItem.order_status}</span>
                              </div>
                              <span className="text-white font-medium">{statusItem.count}</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className={`${getStatusColor(statusItem.order_status)} h-2 rounded-full`} 
                                style={{ width: `${Math.min(100, percentage)}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Recent Orders</h2>
              <Link to="/admin/orders" className="text-purple-400 hover:text-purple-300">
                View All Orders →
              </Link>
            </div>
            
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                  </div>
                ) : recentOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No recent orders found.</p>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Order #
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Customer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {recentOrders.map((order: Order) => (
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
                            <div className="text-sm font-medium text-purple-400">{formatCurrency(order.total_price)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.order_status)} bg-opacity-20 text-white`}>
                              {order.order_status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`/admin/orders/${order.order_number}`}
                              className="text-purple-400 hover:text-purple-300"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardOverview;