import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // implement newsletter signup logic
      // For example, calling your API endpoint
      
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="bg-gray-50 w-full py-8 px-16 md:flex items-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          GET UPDATES
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          Subscribe to receive the latest announcements and news
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto ">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 text-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg "
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>

        {status === 'success' && (
          <p className="mt-4 text-green-600 text-center">
            Thank you for subscribing!
          </p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-600 text-center">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </section>
  );
};

export default Newsletter;
