import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [apps, setApps] = useState([]);
  const [showAddApp, setShowAddApp] = useState(false);
  const [filterView, setFilterView] = useState('all'); // 'all' or 'favorites'
  const [newApp, setNewApp] = useState({ name: '', description: '', category: 'Business', icon: '📱' });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [statsRes, appsRes] = await Promise.all([
        axios.get(`${API}/stats`),
        axios.get(`${API}/apps`)
      ]);
      setStats(statsRes.data);
      setApps(appsRes.data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  };

  const createApp = async () => {
    try {
      await axios.post(`${API}/apps`, newApp);
      setShowAddApp(false);
      setNewApp({ name: '', description: '', category: 'Business', icon: '📱' });
      loadDashboard();
    } catch (error) {
      console.error('Error creating app:', error);
    }
  };

  const deleteApp = async (appId) => {
    if (window.confirm('Are you sure you want to delete this app?')) {
      try {
        await axios.delete(`${API}/apps/${appId}`);
        loadDashboard();
      } catch (error) {
        console.error('Error deleting app:', error);
      }
    }
  };

  const toggleFavorite = async (appId, e) => {
    e.stopPropagation();
    try {
      await axios.post(`${API}/apps/${appId}/favorite`);
      loadDashboard();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const filteredApps = filterView === 'favorites' 
    ? apps.filter(app => app.is_favorited) 
    : apps;

  const appIcons = ['📱', '💻', '👨‍⚖️', '🏛️', '💰', '🏮', '🎮', '🎨', '📚', '⚽', '🎵', '🍽️'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="stat-card rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">🎯 Total Apps</div>
            <div className="text-3xl font-bold">{stats.total_apps}</div>
          </div>
          <div className="stat-card rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">✅ Active Apps</div>
            <div className="text-3xl font-bold text-green-400">{stats.active_apps}</div>
          </div>
          <div className="stat-card rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">⭐ My Favorites</div>
            <div className="text-3xl font-bold text-yellow-400">{stats.favorited_apps}</div>
          </div>
          <div className="stat-card rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">💵 Total Revenue</div>
            <div className="text-3xl font-bold text-green-400">${stats.total_revenue.toFixed(2)}</div>
          </div>
          <div className="stat-card rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">🖼️ Images Generated</div>
            <div className="text-3xl font-bold text-purple-400">{stats.total_images_generated}</div>
          </div>
          <div className="stat-card rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">💬 Total Chats</div>
            <div className="text-3xl font-bold text-blue-400">{stats.total_chats}</div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilterView('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filterView === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                : 'bg-gray-800 hover:bg-gray-750'
            }`}
            data-testid="all-apps-filter"
          >
            📱 All Apps ({apps.length})
          </button>
          <button
            onClick={() => setFilterView('favorites')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filterView === 'favorites'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                : 'bg-gray-800 hover:bg-gray-750'
            }`}
            data-testid="favorites-filter"
          >
            ⭐ My Favorites ({apps.filter(a => a.is_favorited).length})
          </button>
        </div>
        <button
          onClick={() => setShowAddApp(!showAddApp)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg transition-all"
          data-testid="add-app-button"
        >
          + Add New App
        </button>
      </div>

      {/* Add App Form */}
      {showAddApp && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6 animate-fadeIn" data-testid="add-app-form">
          <h3 className="text-xl font-bold mb-4">Create New App</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">App Name</label>
              <input
                type="text"
                value={newApp.name}
                onChange={(e) => setNewApp({...newApp, name: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                placeholder="My Awesome App"
                data-testid="app-name-input"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Category</label>
              <select
                value={newApp.category}
                onChange={(e) => setNewApp({...newApp, category: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                data-testid="app-category-select"
              >
                <option>Business</option>
                <option>Health</option>
                <option>Finance</option>
                <option>Education</option>
                <option>Entertainment</option>
                <option>Legal</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Description</label>
            <textarea
              value={newApp.description}
              onChange={(e) => setNewApp({...newApp, description: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              rows="3"
              placeholder="Describe your app..."
              data-testid="app-description-input"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Choose Icon</label>
            <div className="flex flex-wrap gap-2">
              {appIcons.map((icon) => (
                <button
                  key={icon}
                  onClick={() => setNewApp({...newApp, icon})}
                  className={`w-12 h-12 text-2xl rounded-lg ${
                    newApp.icon === icon ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
                  } transition-colors`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={createApp}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg transition-all"
              data-testid="create-app-button"
            >
              Create App
            </button>
            <button
              onClick={() => setShowAddApp(false)}
              className="px-6 py-2 bg-gray-800 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {apps.map((app) => (
          <div key={app.id} className="card-hover bg-gray-900 border border-gray-800 rounded-xl p-6" data-testid={`app-card-${app.id}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-3xl">
                {app.icon || '📱'}
              </div>
              <button
                onClick={() => deleteApp(app.id)}
                className="text-gray-500 hover:text-red-500 transition-colors"
                data-testid={`delete-app-${app.id}`}
              >
                ❌
              </button>
            </div>
            <h3 className="text-lg font-bold mb-2 truncate">{app.name}</h3>
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{app.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-gray-800 px-3 py-1 rounded-full">{app.category}</span>
              <span className="text-sm font-bold text-green-400" data-testid={`app-revenue-${app.id}`}>${app.revenue.toFixed(2)}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                app.status === 'active' ? 'bg-green-900 text-green-400' : 'bg-gray-800 text-gray-400'
              }`}>
                {app.status === 'active' ? '✅ Active' : '⏸️ Paused'}
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {apps.length === 0 && (
          <div className="col-span-full text-center py-20" data-testid="empty-apps-state">
            <div className="text-6xl mb-4">🏰</div>
            <h3 className="text-xl font-bold mb-2">Start Building Your Empire</h3>
            <p className="text-gray-400 mb-6">Create your first app to get started</p>
            <button
              onClick={() => setShowAddApp(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              + Add Your First App
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;