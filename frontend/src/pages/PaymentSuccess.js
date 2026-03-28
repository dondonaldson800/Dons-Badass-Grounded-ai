/**
 * PAYMENT SUCCESS PAGE
 * Polls payment status and shows confirmation
 */

import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('checking');
  const [paymentInfo, setPaymentInfo] = useState(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      pollPaymentStatus(sessionId, 0);
    } else {
      setStatus('error');
    }
  }, [sessionId]);

  const pollPaymentStatus = async (sessionId, attempts) => {
    const maxAttempts = 5;
    const pollInterval = 2000; // 2 seconds

    if (attempts >= maxAttempts) {
      setStatus('timeout');
      return;
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/api/payments/checkout/status/${sessionId}`);
      
      if (response.data.payment_status === 'paid') {
        setStatus('success');
        setPaymentInfo(response.data);
        return;
      } else if (response.data.status === 'expired') {
        setStatus('expired');
        return;
      }

      // Continue polling
      setTimeout(() => pollPaymentStatus(sessionId, attempts + 1), pollInterval);
    } catch (error) {
      console.error('Error checking payment:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-6">
      <div className="max-w-md w-full text-center">
        {status === 'checking' && (
          <div>
            <div className="text-6xl mb-4 animate-pulse">⏳</div>
            <h1 className="text-2xl font-bold mb-2">Processing Payment...</h1>
            <p className="text-gray-400">Please wait while we confirm your payment</p>
          </div>
        )}

        {status === 'success' && paymentInfo && (
          <div>
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
            <div className="bg-green-900/30 border border-green-500 rounded-xl p-6 mb-6">
              <div className="text-lg mb-2">Thank you for your purchase!</div>
              <div className="text-gray-300">
                Package: <span className="font-bold">{paymentInfo.metadata.package_name}</span>
              </div>
              <div className="text-gray-300">
                Amount: <span className="font-bold">${paymentInfo.amount_total / 100} {paymentInfo.currency.toUpperCase()}</span>
              </div>
              {paymentInfo.metadata.credits && (
                <div className="text-green-400 mt-2 font-bold">
                  ✨ {paymentInfo.metadata.credits} credits added to your account!
                </div>
              )}
            </div>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-bold transition-all"
            >
              🏰 Return to Empire Dashboard
            </button>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold mb-2">Payment Error</h1>
            <p className="text-gray-400 mb-6">There was an error processing your payment. Please try again or contact support.</p>
            <button
              onClick={() => navigate('/pricing')}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-bold transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {status === 'timeout' && (
          <div>
            <div className="text-6xl mb-4">⏱️</div>
            <h1 className="text-2xl font-bold mb-2">Payment Pending</h1>
            <p className="text-gray-400 mb-6">Your payment is being processed. Check your email for confirmation.</p>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-bold transition-all"
            >
              Return to Dashboard
            </button>
          </div>
        )}

        {status === 'expired' && (
          <div>
            <div className="text-6xl mb-4">⏰</div>
            <h1 className="text-2xl font-bold mb-2">Session Expired</h1>
            <p className="text-gray-400 mb-6">Your payment session has expired. Please try again.</p>
            <button
              onClick={() => navigate('/pricing')}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-bold transition-all"
            >
              Return to Pricing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;