/**
 * PRICING PAGE - D's Empire Subscription & Credits
 * Stripe-powered payment system
 */

import { useState, useEffect } from 'react';
import { useEmpireTheme } from '../themes/ThemeContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Pricing = () => {
  const { theme } = useEmpireTheme();
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('subscriptions');

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/payments/plans`);
      setPlans(response.data);
    } catch (error) {
      console.error('Error loading plans:', error);
    }
  };

  const handlePurchase = async (packageType, packageId) => {
    setLoading(true);
    try {
      const originUrl = window.location.origin;
      
      const response = await axios.post(`${BACKEND_URL}/api/payments/checkout/session`, {
        package_type: packageType,
        package_id: packageId,
        origin_url: originUrl,
        user_email: null, // Add user email if auth is enabled
        payment_methods: ['card'] // Add 'crypto' for crypto payments
      });

      // Redirect to Stripe checkout
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!plans) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.background }}>
        <div className="text-2xl">Loading plans...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 pb-24" style={{ backgroundColor: theme.background, color: theme.text }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            💎 Power Up Your Empire
          </h1>
          <p className="text-xl text-gray-400">Choose the plan that's right for you</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl bg-gray-800 p-1">
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                activeTab === 'subscriptions'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📅 Subscriptions
            </button>
            <button
              onClick={() => setActiveTab('credits')}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                activeTab === 'credits'
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              💰 Credit Packs
            </button>
          </div>
        </div>

        {/* Subscription Plans */}
        {activeTab === 'subscriptions' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {Object.entries(plans.subscriptions).map(([key, plan]) => (
              <div
                key={key}
                className={`rounded-2xl p-8 border-2 transition-all hover:scale-105 ${
                  key === 'pro'
                    ? 'border-blue-500 bg-gradient-to-br from-blue-950 to-black'
                    : 'border-gray-700 bg-gray-900'
                }`}
              >
                {key === 'pro' && (
                  <div className="mb-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ⭐ MOST POPULAR
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePurchase('subscription', key)}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${
                    key === 'pro'
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  } disabled:opacity-50`}
                >
                  {loading ? '⏳ Processing...' : '🚀 Get Started'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Credit Packages */}
        {activeTab === 'credits' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {Object.entries(plans.credits).map(([key, pack]) => (
              <div
                key={key}
                className="rounded-2xl p-8 border-2 border-purple-500 bg-gradient-to-br from-purple-950 to-black transition-all hover:scale-105"
              >
                <h3 className="text-2xl font-bold mb-2">{pack.name}</h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold">${pack.price}</span>
                </div>
                <div className="text-purple-400 mb-6">
                  {pack.credits} credits • ${(pack.price / pack.credits).toFixed(2)}/credit
                </div>

                <div className="mb-8 p-4 bg-purple-900/30 rounded-xl">
                  <div className="text-sm text-gray-300">
                    <div className="mb-2">✨ Use credits for:</div>
                    <div className="space-y-1 text-xs">
                      <div>• AI chat messages</div>
                      <div>• Image generation</div>
                      <div>• Voice synthesis</div>
                      <div>• Premium features</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handlePurchase('credits', key)}
                  disabled={loading}
                  className="w-full py-4 bg-purple-500 hover:bg-purple-600 rounded-xl font-bold transition-all text-white disabled:opacity-50"
                >
                  {loading ? '⏳ Processing...' : '💳 Buy Credits'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Features Comparison */}
        <div className="mt-16 p-8 bg-gray-900 rounded-2xl border border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-center">🎯 All Plans Include:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">💬</div>
              <div className="font-bold">4 AI Assistants</div>
              <div className="text-sm text-gray-400">General, Law, Health, Giving</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎨</div>
              <div className="font-bold">Dynamic Themes</div>
              <div className="text-sm text-gray-400">Custom color schemes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🔊</div>
              <div className="font-bold">Voice Features</div>
              <div className="text-sm text-gray-400">Text-to-speech AI</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📱</div>
              <div className="font-bold">Mobile Ready</div>
              <div className="text-sm text-gray-400">Works everywhere</div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>💳 Secure payment powered by Stripe</p>
          <p>🔒 Cancel anytime • No hidden fees • 30-day money-back guarantee</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
