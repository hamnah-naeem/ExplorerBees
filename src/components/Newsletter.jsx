import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-20 px-6 bg-white text-black border-t border-gray-200">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-6">
          Join Our <span className="text-yellow-600">Travel Community</span>
        </h3>
        
        {subscribed ? (
          <div className="animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg 
                className="w-8 h-8 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome Aboard!
            </h4>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Thank you for subscribing! You'll receive our exclusive travel guides and 
              insider tips straight to your inbox.
            </p>
            <button
              onClick={() => setSubscribed(false)}
              className="mt-6 px-6 py-2 text-sm font-medium text-yellow-600 hover:text-yellow-700 transition"
            >
              Subscribe another email
            </button>
          </div>
        ) : (
          <>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Get exclusive travel guides and inspiring stories delivered weekly.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-6 py-3 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 text-black"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`px-8 py-3 bg-yellow-600 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-yellow-500'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Subscribe Now'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default Newsletter;