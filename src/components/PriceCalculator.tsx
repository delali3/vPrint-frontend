// components/PriceCalculator.tsx
import React, { useState, useEffect } from 'react';

interface PriceCalculatorProps {
  className?: string;
}

// Price configuration
const PRICES = {
  printing: {
    monochrome: 1, // GHC 1 per page
    colored: 2,    // GHC 2 per page
  },
  binding: {
    none: 0,
    comb: 5,
    slide: 7,
    tape: 3,
  },
  delivery: 2,     // GHC 2 for campus delivery
};

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ className = '' }) => {
  // Form state
  const [pageCount, setPageCount] = useState<number>(1);
  const [printType, setPrintType] = useState<'monochrome' | 'colored'>('monochrome');
  const [binding, setBinding] = useState<'none' | 'comb' | 'slide' | 'tape'>('none');
  const [delivery, setDelivery] = useState<boolean>(false);
  
  // Results state
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [calculating, setCalculating] = useState<boolean>(false);

  // Calculate the price based on form inputs
  const calculatePrice = () => {
    setCalculating(true);
    
    // Simulate a brief calculation time for UX
    setTimeout(() => {
      const printingCost = pageCount * PRICES.printing[printType];
      const bindingCost = PRICES.binding[binding];
      const deliveryCost = delivery ? PRICES.delivery : 0;
      
      const total = printingCost + bindingCost + deliveryCost;
      setTotalPrice(total);
      setShowResults(true);
      setCalculating(false);
    }, 600);
  };

  // Auto-recalculate whenever form values change
  useEffect(() => {
    if (showResults) {
      calculatePrice();
    }
  }, [pageCount, printType, binding, delivery]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculatePrice();
  };

  return (
    <div className={`p-6 bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg relative overflow-hidden ${className}`}>
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
      
      <div className="relative">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Estimate Your Cost
        </h3>
        <p className="text-gray-300 mb-6">
          Use our quick calculator to estimate the cost of your print job based on your specific requirements.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Number of Pages</label>
            <div className="relative">
              <input 
                type="number" 
                min="1" 
                value={pageCount}
                onChange={(e) => setPageCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">Enter the total number of pages to print</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Print Type</label>
            <div className="grid grid-cols-2 gap-3">
              <label className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer hover:bg-gray-700 transition-colors ${printType === 'monochrome' ? 'border-purple-500 bg-gray-700' : 'border-gray-600'}`}>
                <input
                  type="radio"
                  name="printType"
                  value="monochrome"
                  checked={printType === 'monochrome'}
                  onChange={() => setPrintType('monochrome')}
                  className="sr-only"
                />
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="block text-sm font-medium text-gray-200">Monochrome</span>
                  <span className="block text-xs text-gray-400 mt-1">GHC 1 per page</span>
                </div>
              </label>
              
              <label className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer hover:bg-gray-700 transition-colors ${printType === 'colored' ? 'border-purple-500 bg-gray-700' : 'border-gray-600'}`}>
                <input
                  type="radio"
                  name="printType"
                  value="colored"
                  checked={printType === 'colored'}
                  onChange={() => setPrintType('colored')}
                  className="sr-only"
                />
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-purple-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <span className="block text-sm font-medium text-gray-200">Colored</span>
                  <span className="block text-xs text-gray-400 mt-1">GHC 2 per page</span>
                </div>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Binding Method</label>
            <div className="relative">
              <select 
                value={binding}
                onChange={(e) => setBinding(e.target.value as any)}
                className="w-full pl-10 pr-10 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none transition-all duration-200"
              >
                <option value="none">No Binding (Free)</option>
                <option value="comb">Comb Binding (GHC 5)</option>
                <option value="slide">Slide Binding (GHC 7)</option>
                <option value="tape">Tape Binding (GHC 3)</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Delivery Option</label>
            <label className="flex items-center p-3 bg-gray-900 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
              <input
                type="checkbox"
                checked={delivery}
                onChange={(e) => setDelivery(e.target.checked)}
                className="h-4 w-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
              />
              <div className="ml-3">
                <span className="block text-sm font-medium text-gray-200">Campus Delivery</span>
                <span className="block text-xs text-gray-400 mt-1">GHC 2 fee for delivery to any campus location</span>
              </div>
            </label>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button 
            type="submit" 
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center"
            disabled={calculating}
          >
            {calculating ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calculating...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Calculate Cost
              </>
            )}
          </button>
          
          {showResults && (
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 flex items-center justify-between w-full sm:w-auto">
              <div className="text-gray-400 mr-4">Total Cost:</div>
              <div className="text-2xl font-bold text-white">GHC {totalPrice.toFixed(2)}</div>
            </div>
          )}
        </div>
      </form>
      
      {/* Cost breakdown - shown when results are displayed */}
      {showResults && (
        <div className="mt-6 bg-gray-900 bg-opacity-70 rounded-lg p-4 border border-gray-700">
          <h4 className="text-white font-medium mb-3">Cost Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Printing ({pageCount} pages, {printType})</span>
              <span className="text-white">GHC {(pageCount * PRICES.printing[printType]).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Binding ({binding === 'none' ? 'none' : `${binding} binding`})</span>
              <span className="text-white">GHC {PRICES.binding[binding].toFixed(2)}</span>
            </div>
            {delivery && (
              <div className="flex justify-between">
                <span className="text-gray-400">Campus Delivery</span>
                <span className="text-white">GHC {PRICES.delivery.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between font-medium">
              <span className="text-purple-400">Total</span>
              <span className="text-purple-400">GHC {totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceCalculator;