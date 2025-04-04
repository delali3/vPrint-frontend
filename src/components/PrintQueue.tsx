// components/PrintQueue.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Order, OrdersResponse } from '../types';

// API base URL - adjust based on your environment
const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const PrintQueue: React.FC = () => {
  // State for print jobs
  const [printJobs, setPrintJobs] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Order | null>(null);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  // Fetch pending print jobs
  const fetchPrintJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get<OrdersResponse>(`${API_BASE_URL}/admin/pending-prints`);
      setPrintJobs(response.data.orders);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch print jobs. Please try again.');
      setLoading(false);
      console.error('Error fetching print jobs:', err);
    }
  };

  // Update job status
  const updateJobStatus = async (orderNumber: string, newStatus: string) => {
    try {
      await axios.put(`${API_BASE_URL}/admin/orders/${orderNumber}/status`, {
        status: newStatus
      });
      
      // Update local state
      setPrintJobs(printJobs.filter(job => job.order_number !== orderNumber));
      setSelectedJob(null);
    } catch (err) {
      console.error('Error updating job status:', err);
      setError('Failed to update job status.');
    }
  };

  // Print document
  const printDocument = async (job: Order) => {
    setIsPrinting(true);
    try {
      // Create a hidden iframe to trigger the print
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = `${API_BASE_URL}/pdf-preview/${job.file_id}`;
      
      iframe.onload = () => {
        try {
          // Print the document
          iframe.contentWindow?.print();
          
          // Wait for a timeout before prompting to mark as completed
          // This doesn't guarantee the print is actually done, but provides a UX flow
          setTimeout(() => {
            if (window.confirm('Did the document print successfully? Click OK to mark as completed.')) {
              updateJobStatus(job.order_number, 'completed');
            }
            // Clean up iframe
            iframe.remove();
            setIsPrinting(false);
          }, 2000);
        } catch (err) {
          console.error('Error printing document:', err);
          alert('There was an error printing the document. Please try again.');
          iframe.remove();
          setIsPrinting(false);
        }
      };
      
      document.body.appendChild(iframe);
    } catch (err) {
      console.error('Error initiating print:', err);
      setError('Failed to print document.');
      setIsPrinting(false);
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

  // Effect to load print jobs when component mounts
  useEffect(() => {
    fetchPrintJobs();
    // Auto-refresh every minute
    const interval = setInterval(fetchPrintJobs, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Header */}
      <header className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Print Queue</h1>
          <button 
            onClick={fetchPrintJobs}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
            disabled={loading}
          >
            <svg className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} viewBox="0 0 24 24">
              <path 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                className={loading ? 'opacity-100' : 'opacity-0'}
              />
              <path 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                className={loading ? 'opacity-0' : 'opacity-100'}
              />
            </svg>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Print Jobs List */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-xl font-bold text-white">Pending Print Jobs</h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {printJobs.length} job{printJobs.length !== 1 ? 's' : ''} waiting to be printed
                  </p>
                </div>

                <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
                  {loading ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                    </div>
                  ) : printJobs.length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="h-16 w-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <p className="text-gray-400">No pending print jobs.</p>
                      <p className="text-gray-500 text-sm mt-2">All caught up! Check back later.</p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-700">
                      {printJobs.map((job) => (
                        <li 
                          key={job.order_number}
                          className={`hover:bg-gray-700 cursor-pointer ${selectedJob?.order_number === job.order_number ? 'bg-gray-700' : ''}`}
                          onClick={() => setSelectedJob(job)}
                        >
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-white">{job.userInfo.name}</p>
                                <p className="text-gray-400 text-sm">{job.order_number}</p>
                              </div>
                              <span className="bg-blue-500 bg-opacity-20 text-blue-400 text-xs px-2 py-1 rounded-md">
                                {job.order_status}
                              </span>
                            </div>
                            
                            <div className="mt-2">
                              <p className="text-gray-300 text-sm truncate">{job.file_name}</p>
                              <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                                <span>Submitted: {formatDate(job.created_at)}</span>
                                <span>{job.page_count} pages</span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Selected Job Details */}
            <div className="lg:col-span-2">
              {selectedJob ? (
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-700">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-bold text-white mb-2">{selectedJob.file_name}</h2>
                      <span className="bg-blue-500 bg-opacity-20 text-blue-400 text-xs px-2 py-1 rounded-md">
                        {selectedJob.order_status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">Order #{selectedJob.order_number}</p>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Document Details */}
                      <div>
                        <h3 className="text-lg font-medium text-white mb-3">Document Info</h3>
                        <div className="bg-gray-700 rounded-lg p-4">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="text-gray-400">Pages:</div>
                            <div className="text-white">{selectedJob.page_count}</div>
                            
                            <div className="text-gray-400">Color Pages:</div>
                            <div className="text-white">{selectedJob.color_pages}</div>
                            
                            <div className="text-gray-400">Monochrome Pages:</div>
                            <div className="text-white">{selectedJob.monochrome_pages}</div>
                            
                            <div className="text-gray-400">Print Color:</div>
                            <div className="text-white capitalize">
                              {selectedJob.print_color === 'colored' ? 'Full Color' : 'Black & White'}
                            </div>
                            
                            <div className="text-gray-400">Binding:</div>
                            <div className="text-white capitalize">
                              {selectedJob.binding === 'none' ? 'No Binding' : selectedJob.binding}
                            </div>
                            
                            <div className="text-gray-400">Delivery:</div>
                            <div className="text-white">
                              {selectedJob.campus_delivery ? 'Campus Delivery' : 'Self Pickup'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div>
                        <h3 className="text-lg font-medium text-white mb-3">Customer Info</h3>
                        <div className="bg-gray-700 rounded-lg p-4">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="text-gray-400">Name:</div>
                            <div className="text-white">{selectedJob.userInfo.name}</div>
                            
                            <div className="text-gray-400">Email:</div>
                            <div className="text-white">{selectedJob.userInfo.email}</div>
                            
                            <div className="text-gray-400">Phone:</div>
                            <div className="text-white">{selectedJob.userInfo.phone}</div>
                            
                            <div className="text-gray-400">Course:</div>
                            <div className="text-white">{selectedJob.userInfo.course}</div>
                            
                            <div className="text-gray-400">Class:</div>
                            <div className="text-white">{selectedJob.userInfo.class}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-white mb-3">Payment Info</h3>
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-gray-800 p-3 rounded-lg">
                            <div className="text-gray-400 text-xs mb-1">Amount</div>
                            <div className="text-purple-400 font-bold">GHC {Number(selectedJob.total_price).toFixed(2)}</div>
                          </div>
                          
                          <div className="bg-gray-800 p-3 rounded-lg">
                            <div className="text-gray-400 text-xs mb-1">Payment Status</div>
                            <div className="text-green-400 font-medium">{selectedJob.payment.status}</div>
                          </div>
                          
                          <div className="bg-gray-800 p-3 rounded-lg">
                            <div className="text-gray-400 text-xs mb-1">Payment Method</div>
                            <div className="text-white">{selectedJob.payment.method || 'N/A'}</div>
                          </div>
                          
                          <div className="bg-gray-800 p-3 rounded-lg">
                            <div className="text-gray-400 text-xs mb-1">Payment Date</div>
                            <div className="text-white">{formatDate(selectedJob.payment.date)}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => printDocument(selectedJob)}
                        disabled={isPrinting}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isPrinting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Printing...
                          </>
                        ) : (
                          <>
                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Print Document
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => window.open(`${API_BASE_URL}/pdf-preview/${selectedJob.file_id}`, '_blank')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded flex items-center"
                      >
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View PDF
                      </button>
                      
                      <button
                        onClick={() => {
                          if (window.confirm('Mark this job as completed without printing?')) {
                            updateJobStatus(selectedJob.order_number, 'completed');
                          }
                        }}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded flex items-center"
                      >
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Mark as Completed
                      </button>
                      
                      <button
                        onClick={() => {
                          if (window.confirm('Mark this job as failed? This will notify the customer.')) {
                            updateJobStatus(selectedJob.order_number, 'failed');
                          }
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded flex items-center"
                      >
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Mark as Failed
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-8 text-center">
                    <svg className="h-16 w-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    <h3 className="text-lg font-medium text-white mb-2">No Print Job Selected</h3>
                    <p className="text-gray-400">Select a job from the list to view details and print options.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrintQueue;