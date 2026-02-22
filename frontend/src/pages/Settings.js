import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Settings = () => {
  const [masterKey, setMasterKey] = useState('');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [keyRes, statsRes] = await Promise.all([
        axios.get(`${API}/master-key`),
        axios.get(`${API}/stats`)
      ]);
      setMasterKey(keyRes.data.master_key);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" data-testid="settings-page">
      <h1 className="text-3xl font-bold mb-8">⚙️ Settings</h1>

      {/* Account Overview */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6">👤 Account Overview</h2>
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-xl p-4" data-testid="stat-total-apps">
              <div className="text-gray-400 text-sm mb-1">Total Apps</div>
              <div className="text-2xl font-bold">{stats.total_apps}</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4" data-testid="stat-active-apps">
              <div className="text-gray-400 text-sm mb-1">Active Apps</div>
              <div className="text-2xl font-bold text-green-400">{stats.active_apps}</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4" data-testid="stat-total-images">
              <div className="text-gray-400 text-sm mb-1">Images Generated</div>
              <div className="text-2xl font-bold text-purple-400">{stats.total_images_generated}</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4" data-testid="stat-total-chats">
              <div className="text-gray-400 text-sm mb-1">Total Chats</div>
              <div className="text-2xl font-bold text-blue-400">{stats.total_chats}</div>
            </div>
          </div>
        )}
      </div>

      {/* API Keys */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6">🔑 API Configuration</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Master API Key (for external apps)</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={masterKey}
                readOnly
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 font-mono text-sm"
                data-testid="settings-master-key"
              />
              <button
                onClick={() => copyToClipboard(masterKey)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                data-testid="copy-master-key-button"
              >
                📋 Copy
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Use this key to sync revenue from your external apps</p>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Sync API Endpoint</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={`${BACKEND_URL}/api/revenue/sync`}
                readOnly
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 font-mono text-sm"
                data-testid="sync-endpoint"
              />
              <button
                onClick={() => copyToClipboard(`${BACKEND_URL}/api/revenue/sync`)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                📋 Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Features */}
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-2xl p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">⭐ Premium Features</h2>
            <p className="text-gray-300">You have access to all premium features</p>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-sm font-bold">
            ACTIVE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">✅</div>
            <div>
              <div className="font-semibold">Unlimited Apps</div>
              <div className="text-sm text-gray-400">Manage unlimited apps in your empire</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">✅</div>
            <div>
              <div className="font-semibold">AI Chat Assistant</div>
              <div className="text-sm text-gray-400">Unlimited AI conversations</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">✅</div>
            <div>
              <div className="font-semibold">Image Generation</div>
              <div className="text-sm text-gray-400">Create stunning AI images</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">✅</div>
            <div>
              <div className="font-semibold">Revenue Tracking</div>
              <div className="text-sm text-gray-400">Track earnings across all apps</div>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">ℹ️ About Empire Dashboard</h2>
        <div className="space-y-2 text-sm text-gray-400">
          <p>Version: 1.0.0</p>
          <p>Built with FastAPI, React, MongoDB, and Gemini AI</p>
          <p className="pt-4 text-gray-500">
            Empire Dashboard helps you manage multiple apps, track revenue, and leverage AI for business growth.
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800">
          <h3 className="font-bold mb-3">🚀 Features:</h3>
          <ul className="space-y-2 text-sm text-gray-400 list-disc list-inside">
            <li>Multi-app management dashboard</li>
            <li>AI-powered chat assistant (medical, legal, business advice)</li>
            <li>AI image generation studio</li>
            <li>Revenue tracking and analytics</li>
            <li>External app integration via API</li>
            <li>Master API key for seamless syncing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
