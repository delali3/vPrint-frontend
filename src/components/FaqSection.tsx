{/* Enhanced FAQ Section with Accordion */}
import { useState } from 'react';

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How long does it take to get my prints?",
      answer: "Most standard orders are ready within 24 hours. If you choose campus delivery, it will be delivered within 24 hours of completion. For rush orders, please contact us directly.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      question: "What file formats do you accept?",
      answer: "Currently, we only accept PDF files to ensure print quality and proper formatting. Make sure your document is properly formatted before uploading.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      question: "How do I pay for my order?",
      answer: "We accept mobile money (MTN, Vodafone, AirtelTigo), credit/debit cards, and campus cash cards. Payment is made securely at checkout.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      question: "Can I track my order?",
      answer: "Yes, after placing your order, you'll receive an order number and can track the status through your account or by entering the order number on our tracking page.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      question: "What if I'm not satisfied with my prints?",
      answer: "We have a satisfaction guarantee. If you're not happy with the quality of your prints, please contact us within 24 hours of receiving your order, and we'll make it right.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      question: "Do you offer discounts for bulk orders?",
      answer: "Yes, we offer discounts for bulk orders starting from 100 pages. The discount increases with the volume of your order. Contact us for specific pricing for your bulk printing needs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      )
    }
  ];

  return (
    <section id="faq" className="py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 z-0"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-purple-900 bg-opacity-30 rounded-full mb-4 text-purple-400 text-sm font-medium">
            Got Questions?
          </span>
          <br />
          <h2 className="text-4xl font-bold text-white mb-4 relative inline-block">
            Frequently Asked Questions
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-6">
            Find answers to common questions about our printing service.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 ${
                activeIndex === index 
                  ? 'border-purple-500/50 shadow-purple-900/20' 
                  : 'hover:border-gray-600'
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 transition-colors duration-300 ${
                    activeIndex === index ? 'bg-purple-600/20 text-purple-400' : 'bg-gray-700 text-gray-400'
                  }`}>
                    {faq.icon}
                  </div>
                  <h4 className="text-white font-bold text-lg pr-8">{faq.question}</h4>
                </div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${activeIndex === index ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`transition-all duration-300 overflow-hidden ${
                  activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4 pt-2 border-t border-gray-700">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 bg-gray-800 bg-opacity-50 max-w-2xl mx-auto p-6 rounded-xl border border-gray-700">
          <h4 className="text-white font-bold text-lg mb-3">Still have questions?</h4>
          <p className="text-gray-300 mb-6">
            Our support team is here to help with any other questions you might have.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;