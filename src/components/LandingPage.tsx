// components/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import FaqSection from './FaqSection';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        {/* Background animated elements */}
        <div className="absolute -top-24 right-0 w-64 h-64 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-800 rounded-full opacity-10 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <div className="inline-block px-3 py-1 bg-purple-900 bg-opacity-30 rounded-full mb-4 border border-purple-500">
                <span className="text-purple-400 text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Trusted by 5000+ students
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Fast & Affordable <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Campus Printing</span> Service
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Upload your documents, customize your printing options, and get your prints delivered on campus. Simple, affordable, and fast.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/print">
                  <button className="group relative bg-gradient-to-r from-purple-500 to-purple-700 text-white text-lg px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center">
                      Start Printing Now
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </button>
                </Link>

                <a href="#pricing">
                  <button className="bg-transparent border-2 border-purple-500 text-purple-400 hover:text-purple-300 hover:border-purple-400 text-lg px-8 py-3 rounded-lg font-medium transition-all duration-300">
                    View Pricing
                  </button>
                </a>
              </div>

              <div className="flex items-center mt-8 space-x-4">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-gray-900" src="./assets/43108683.jpg" alt="User" />
                  <img className="w-8 h-8 rounded-full border-2 border-gray-900" src="./assets/43108683.jpg" alt="User" />
                  <img className="w-8 h-8 rounded-full border-2 border-gray-900" src="./assets/43108683.jpg" alt="User" />
                </div>
                <div className="text-sm text-gray-400">
                  <span className="text-purple-400 font-medium">4.9/5</span> from 500+ reviews
                </div>
              </div>
            </div>

            <div className="md:w-1/2 mt-12 md:mt-0">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-purple-500 rounded-lg opacity-20 animate-pulse"></div>
                <div className="absolute -left-8 bottom-12 w-12 h-12 bg-purple-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Card with 3D effect */}
                <div className="bg-purple-600 bg-opacity-20 absolute -inset-4 rounded-xl transform rotate-2 shadow-lg"></div>
                <div className="relative z-10 bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-2xl border border-gray-700 backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.02]">
                  {/* App header */}
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      vPrint
                    </div>
                  </div>

                  {/* App content with animation */}
                  <div className="space-y-4">
                    {/* Step 1 */}
                    <div className="flex space-x-4 items-center animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white shadow-md">1</div>
                      <div className="flex-1 p-3 bg-gray-700 rounded-lg group hover:bg-gray-600 transition-all duration-300">
                        <div className="h-2 w-3/4 bg-gray-600 group-hover:bg-gray-500 rounded transition-all duration-300"></div>
                        <div className="mt-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Upload Document</div>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex space-x-4 items-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white shadow-md">2</div>
                      <div className="flex-1 p-3 bg-gray-700 rounded-lg group hover:bg-gray-600 transition-all duration-300">
                        <div className="h-2 w-2/3 bg-gray-600 group-hover:bg-gray-500 rounded mb-2 transition-all duration-300"></div>
                        <div className="h-2 w-1/2 bg-gray-600 group-hover:bg-gray-500 rounded transition-all duration-300"></div>
                        <div className="mt-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Choose Options</div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex space-x-4 items-center animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white shadow-md">3</div>
                      <div className="flex-1 p-3 bg-gray-700 rounded-lg group hover:bg-gray-600 transition-all duration-300">
                        <div className="h-2 w-3/5 bg-gray-600 group-hover:bg-gray-500 rounded mb-2 transition-all duration-300"></div>
                        <div className="h-2 w-4/5 bg-gray-600 group-hover:bg-gray-500 rounded transition-all duration-300"></div>
                        <div className="mt-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Confirm Order</div>
                      </div>
                    </div>

                    {/* Complete Order Button */}
                    <div className="flex items-center justify-center p-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg mt-6 shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer animate-fadeIn" style={{ animationDelay: '0.7s' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white font-medium">Complete Order</span>
                    </div>
                  </div>

                  {/* Status bar */}
                  <div className="mt-6 flex justify-between items-center text-xs text-gray-400">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      Secure Payment
                    </div>
                    <div>Processing...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Improved How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>

        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative">
            <span className="inline-block px-4 py-1 bg-purple-900 bg-opacity-30 rounded-full mb-4 text-purple-400 text-sm font-medium">
              Simple Three-Step Process
            </span>
            <br />
            <h2 className="text-4xl font-bold text-white mb-4 relative inline-block">
              How It Works
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-6">
              Our service makes document printing simple and hassle-free in just three easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connection lines between steps */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-purple-500 to-purple-600 z-0"></div>
            <div className="hidden md:block absolute top-24 left-2/4 right-1/4 h-0.5 bg-gradient-to-r from-purple-600 to-purple-500 z-0"></div>

            {/* Step 1 */}
            <div className="relative group">
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-xl transition-all duration-300 hover:shadow-purple-900/20 hover:border-purple-500/50 hover:-translate-y-1 h-full flex flex-col items-center relative z-10">
                {/* Step number */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center shadow-lg shadow-purple-600/30">1</div>

                {/* Icon container */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-full border border-purple-500/30 shadow-xl group-hover:bg-gray-800 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 text-center">Upload Your Document</h3>
                <p className="text-gray-300 text-center mb-4">Upload your PDF file. Our system will automatically count the pages and prepare it for printing.</p>

                {/* Feature badges */}
                <div className="mt-auto flex flex-wrap justify-center gap-2 pt-4">
                  <span className="text-xs px-2 py-1 bg-purple-900/30 text-purple-400 rounded-full">Drag & Drop</span>
                  <span className="text-xs px-2 py-1 bg-purple-900/30 text-purple-400 rounded-full">PDF Format</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-xl transition-all duration-300 hover:shadow-purple-900/20 hover:border-purple-500/50 hover:-translate-y-1 h-full flex flex-col items-center relative z-10">
                {/* Step number */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center shadow-lg shadow-purple-600/30">2</div>

                {/* Icon container */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-full border border-purple-500/30 shadow-xl group-hover:bg-gray-800 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 text-center">Choose Your Options</h3>
                <p className="text-gray-300 text-center mb-4">Select color or black & white printing, binding method, and whether you need campus delivery.</p>

                {/* Feature badges */}
                <div className="mt-auto flex flex-wrap justify-center gap-2 pt-4">
                  <span className="text-xs px-2 py-1 bg-purple-900/30 text-purple-400 rounded-full">Color Options</span>
                  <span className="text-xs px-2 py-1 bg-purple-900/30 text-purple-400 rounded-full">4 Binding Types</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-xl transition-all duration-300 hover:shadow-purple-900/20 hover:border-purple-500/50 hover:-translate-y-1 h-full flex flex-col items-center relative z-10">
                {/* Step number */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center shadow-lg shadow-purple-600/30">3</div>

                {/* Icon container */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-full border border-purple-500/30 shadow-xl group-hover:bg-gray-800 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 text-center">Complete Your Order</h3>
                <p className="text-gray-300 text-center mb-4">Review your order, make payment, and get your prints delivered or pick them up at our center.</p>

                {/* Feature badges */}
                <div className="mt-auto flex flex-wrap justify-center gap-2 pt-4">
                  <span className="text-xs px-2 py-1 bg-purple-900/30 text-purple-400 rounded-full">Secure Payment</span>
                  <span className="text-xs px-2 py-1 bg-purple-900/30 text-purple-400 rounded-full">Campus Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-16 text-center">
            <a href="/print" className="inline-flex items-center bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 group">
              <span>Start Printing Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section id="pricing" className="py-20 relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 z-0"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-purple-900 bg-opacity-30 rounded-full mb-4 text-purple-400 text-sm font-medium">
              Transparent Pricing
            </span>
            <br />
            <h2 className="text-4xl font-bold text-white mb-4 relative inline-block">
              Simple Pricing
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-6">
              Affordable rates for all your printing needs with no hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Page Printing Card */}
            <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700 transition-all duration-300 hover:shadow-purple-900/20 hover:border-purple-500/30 group">
              <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 border-b border-gray-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <div className="flex items-center">
                  <div className="p-2 bg-purple-900 bg-opacity-30 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-1M8 7h8" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Page Printing</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-700 group/item transition-all duration-300 hover:border-purple-500/30">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
                    <span className="text-gray-300">Monochrome (Black & White)</span>
                  </div>
                  <span className="text-white font-bold bg-purple-900 bg-opacity-20 px-3 py-1 rounded-full">GHC 1 <span className="text-sm font-normal text-purple-300">/ page</span></span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-700 group/item transition-all duration-300 hover:border-purple-500/30">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-gray-300">Colored</span>
                  </div>
                  <span className="text-white font-bold bg-purple-900 bg-opacity-20 px-3 py-1 rounded-full">GHC 2 <span className="text-sm font-normal text-purple-300">/ page</span></span>
                </div>

                <div className="pt-4 bg-gray-900 bg-opacity-30 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Price is per page side. Double-sided printing is calculated as two pages.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Services Card */}
            <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700 transition-all duration-300 hover:shadow-purple-900/20 hover:border-purple-500/30 group">
              <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 border-b border-gray-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <div className="flex items-center">
                  <div className="p-2 bg-purple-900 bg-opacity-30 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Additional Services</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-700 group/item transition-all duration-300 hover:border-purple-500/30">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-600 rounded-full mr-3"></div>
                    <span className="text-gray-300">No Binding</span>
                  </div>
                  <span className="text-green-400 font-bold bg-green-900 bg-opacity-20 px-3 py-1 rounded-full">Free</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-700 group/item transition-all duration-300 hover:border-purple-500/30">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-300">Comb Binding</span>
                  </div>
                  <span className="text-white font-bold bg-purple-900 bg-opacity-20 px-3 py-1 rounded-full">GHC 5</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-700 group/item transition-all duration-300 hover:border-purple-500/30">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                    <span className="text-gray-300">Slide Binding</span>
                  </div>
                  <span className="text-white font-bold bg-purple-900 bg-opacity-20 px-3 py-1 rounded-full">GHC 7</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-700 group/item transition-all duration-300 hover:border-purple-500/30">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full mr-3"></div>
                    <span className="text-gray-300">Tape Binding</span>
                  </div>
                  <span className="text-white font-bold bg-purple-900 bg-opacity-20 px-3 py-1 rounded-full">GHC 3</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-700 group/item transition-all duration-300 hover:border-purple-500/30">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-gray-300">Campus Delivery</span>
                  </div>
                  <span className="text-white font-bold bg-purple-900 bg-opacity-20 px-3 py-1 rounded-full">GHC 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
        <div className="absolute top-40 right-0 w-96 h-96 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-800 rounded-full opacity-5 blur-3xl"></div>

        {/* Quote symbols for decoration */}
        <div className="absolute top-20 left-10 text-8xl text-purple-500 opacity-10 font-serif">"</div>
        <div className="absolute bottom-20 right-10 text-8xl text-purple-500 opacity-10 font-serif transform rotate-180">"</div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-purple-900 bg-opacity-30 rounded-full mb-4 text-purple-400 text-sm font-medium">
              Student Testimonials
            </span>
            <br />
            <h2 className="text-4xl font-bold text-white mb-4 relative inline-block">
              What Students Say
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-6">
              Join hundreds of satisfied students who use our service everyday.
            </p>
          </div>

          {/* Testimonial cards with enhanced styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Kofi Mensah",
                role: "Computer Science Student",
                rating: 5,
                quote: "The vPrint saved me so much time before my presentation. The delivery option is amazing!",
                highlight: "Fast delivery"
              },
              {
                name: "Ama Owusu",
                role: "Business Administration Student",
                rating: 5,
                quote: "I needed my thesis printed and bound on short notice. The service was fast, affordable, and the quality was excellent.",
                highlight: "Quality binding"
              },
              {
                name: "Kwame Asante",
                role: "Engineering Student",
                rating: 4,
                quote: "Using this service is so much easier than going to the library. I love the binding options and the fast turnaround time.",
                highlight: "Convenient options"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700 transition-all duration-300 hover:shadow-purple-900/20 hover:border-purple-500/30 hover:-translate-y-1 relative group"
              >
                {/* Quotation mark */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center transform -rotate-12 opacity-80 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-lg font-serif">"</span>
                </div>

                {/* Feature tag */}
                <div className="absolute top-4 right-4">
                  <span className="inline-block px-3 py-1 bg-purple-900 bg-opacity-40 rounded-full text-purple-300 text-xs font-medium">
                    {testimonial.highlight}
                  </span>
                </div>

                {/* Star rating */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 font-light text-lg mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center mt-auto pt-4 border-t border-gray-700">
                  {/* Avatar with gradient border */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 blur-sm opacity-75"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white font-bold text-xl ring-2 ring-purple-600/50">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>

                  <div className="ml-4">
                    <h4 className="text-white font-medium">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial metrics */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                metric: "4.9/5",
                description: "Average Rating",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                )
              },
              {
                metric: "500+",
                description: "Happy Students",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )
              },
              {
                metric: "98%",
                description: "Satisfaction Rate",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-900 bg-opacity-60 rounded-xl p-6 flex flex-col items-center text-center border border-gray-800">
                <div className="p-3 bg-purple-900 bg-opacity-30 rounded-full mb-4 text-purple-400">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{item.metric}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <p className="text-gray-300 mb-6">Experience the service that students are raving about.</p>
            <a href="/print" className="inline-flex items-center bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 group">
              <span>Join Satisfied Students</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />

      {/* CTA Section */}
      {/* Enhanced Call to Action Section */}
<section className="py-24 relative overflow-hidden">
  {/* Background with gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-gray-900/90 z-0"></div>
  
  {/* Decorative elements */}
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
  <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
  <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-800 rounded-full opacity-10 blur-3xl"></div>
  
  {/* Floating shapes */}
  <div className="absolute top-10 left-1/4 w-8 h-8 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
  <div className="absolute bottom-10 right-1/3 w-6 h-6 bg-purple-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
  <div className="absolute top-1/2 right-1/4 w-10 h-10 bg-purple-600 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
  
  <div className="container mx-auto px-4 text-center relative z-10">
    <div className="max-w-3xl mx-auto bg-gray-900/70 backdrop-blur-sm p-10 rounded-2xl border border-purple-500/20 shadow-xl">
      <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
        Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">transform</span> your documents into print?
      </h2>
      
      <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Upload your document now and get high-quality prints delivered to you on campus within 24 hours.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/print">
          <button className="group relative bg-gradient-to-r from-purple-500 to-purple-700 text-white text-lg px-10 py-4 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Start Printing Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </Link>
        
        <a href="#pricing" className="text-lg px-10 py-4 border-2 border-purple-500 text-purple-400 hover:text-purple-300 hover:border-purple-400 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
          View Pricing
        </a>
      </div>
      
      <div className="mt-8 flex items-center justify-center space-x-6">
        <div className="flex items-center text-gray-400 hover:text-purple-400 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>100% Secure</span>
        </div>
        
        <div className="flex items-center text-gray-400 hover:text-purple-400 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>24hr Delivery</span>
        </div>
        
        <div className="flex items-center text-gray-400 hover:text-purple-400 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span>High Quality</span>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default LandingPage;