import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const RevenueAnalytics = () => {
  const [apps, setApps] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [masterKey, setMasterKey] = useState('');
  const [showApiDocs, setShowApiDocs] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [appsRes, revenueRes, keyRes] = await Promise.all([
        axios.get(`${API}/apps`),
        axios.get(`${API}/revenue/total`),
        axios.get(`${API}/master-key`)
      ]);
      setApps(appsRes.data);
      setTotalRevenue(revenueRes.data.total_revenue);
      setMasterKey(keyRes.data.master_key);
    } catch (error) {
      console.error('Error loading revenue data:', error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" data-testid="revenue-analytics-page">
      <h1 className="text-3xl font-bold mb-8">💰 Revenue Analytics</h1>

      {/* Total Revenue Card */}
      <div className="bg-gradient-to-br from-green-900/30 to-green-600/30 border-2 border-green-500/50 rounded-2xl p-8 mb-8" data-testid="total-revenue-card">
        <div className="text-green-400 text-sm mb-2">💵 Total Empire Revenue</div>
        <div className="text-5xl font-bold text-white mb-4">${totalRevenue.toFixed(2)}</div>
        <p className="text-green-300 text-sm">Across {apps.length} apps</p>
      </div>

      {/* Revenue by App */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Revenue by App</h2>
        <div className="space-y-4">
          {apps.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors"
              data-testid={`revenue-app-${app.id}`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-2xl">
                  {app.icon || '📱'}
                </div>
                <div>
                  <h3 className="font-bold">{app.name}</h3>
                  <p className="text-sm text-gray-400">{app.category}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400" data-testid={`app-revenue-${app.id}`}>
                  ${app.revenue.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">
                  {apps.length > 0 ? ((app.revenue / totalRevenue * 100) || 0).toFixed(1) : 0}% of total
                </div>
              </div>
            </div>
          ))}

          {apps.length === 0 && (
            <div className="text-center py-12 text-gray-400" data-testid="no-apps-message">
              No apps yet. Create an app to start tracking revenue!
            </div>
          )}
        </div>
      </div>

      {/* API Integration Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">🔑 External App Integration</h2>
          <button
            onClick={() => setShowApiDocs(!showApiDocs)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            data-testid="toggle-api-docs-button"
          >
            {showApiDocs ? 'Hide' : 'Show'} API Docs
          </button>
        </div>

        {/* Master API Key */}
        <div className="bg-gray-800 rounded-xl p-4 mb-6">
          <label className="text-sm text-gray-400 mb-2 block">Your Master API Key</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={masterKey}
              readOnly
              className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 font-mono text-sm"
              data-testid="master-api-key"
            />
            <button
              onClick={() => copyToClipboard(masterKey)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              data-testid="copy-api-key-button"
            >
              📋 Copy
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">⚠️ Keep this key secret! Use it to sync revenue from your external apps.</p>
        </div>

        {/* API Documentation */}
        {showApiDocs && (
          <div className="bg-gray-800 rounded-xl p-6 space-y-6 animate-fadeIn" data-testid="api-documentation">
            <div>
              <h3 className="text-lg font-bold mb-3">Revenue Sync API</h3>
              <p className="text-sm text-gray-400 mb-4">
                Use this endpoint to sync revenue from your external apps to the Empire dashboard.
              </p>

              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2">POST {BACKEND_URL}/api/revenue/sync</div>
                <div className="text-gray-400">Content-Type: application/json</div>
              </div>

              <h4 className="text-sm font-bold mt-4 mb-2">Request Body:</h4>
              <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-xs" data-testid="api-request-example">
{`{
  "app_id": "your-app-id",
  "amount": 10.50,
  "api_key": "${masterKey}"
}`}
              </pre>

              <h4 className="text-sm font-bold mt-4 mb-2">Example (JavaScript):</h4>
              <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-xs" data-testid="api-example-code">
{`// Sync revenue when user makes a purchase
fetch('${BACKEND_URL}/api/revenue/sync', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    app_id: 'your-app-id',
    amount: 10.50,
    api_key: '${masterKey}'
  })
});
`}
              </pre>

              <h4 className="text-sm font-bold mt-4 mb-2">Example (Python):</h4>
              <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-xs">
{`import requests

response = requests.post(
    '${BACKEND_URL}/api/revenue/sync',
    json={
        'app_id': 'your-app-id',
        'amount': 10.50,
        'api_key': '${masterKey}'
    }
)
`}
              </pre>

              <h4 className="text-sm font-bold mt-4 mb-2">Response:</h4>
              <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-xs">
{`{
  "message": "Revenue synced successfully",
  "amount": 10.50
}`}
              </pre>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <h3 className="text-lg font-bold mb-2">💡 Pro Tips</h3>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>Call this API every time a user makes a purchase in your external app</li>
                <li>The amount will automatically add to the app's revenue on the dashboard</li>
                <li>Make sure to use the correct app_id from your dashboard</li>
                <li>Keep your master API key secure - never expose it in client-side code</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueAnalytics;