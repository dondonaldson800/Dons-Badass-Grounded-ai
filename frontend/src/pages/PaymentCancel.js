/**
 * PAYMENT CANCEL PAGE
 */

import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-6">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
        <p className="text-gray-400 mb-8">
          Your payment was cancelled. No charges have been made.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => navigate('/pricing')}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-bold transition-all"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold transition-all"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;