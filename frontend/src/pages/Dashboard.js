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
  const [question, setQuestion] = useState('');
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [recentQA, setRecentQA] = useState([]);
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatingImage, setGeneratingImage] = useState(false);
  const [lastGeneratedImage, setLastGeneratedImage] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [statsRes, appsRes, qaRes] = await Promise.all([
        axios.get(`${API}/stats`),
        axios.get(`${API}/apps`),
        axios.get(`${API}/qa/list`)
      ]);
      setStats(statsRes.data);
      setApps(appsRes.data);
      setRecentQA(qaRes.data.slice(0, 3)); // Get last 3 Q&As
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  };

  const askQuestion = async () => {
    if (!question.trim() || loadingAnswer) return;

    setLoadingAnswer(true);
    try {
      const response = await axios.post(`${API}/qa/ask`, {
        question: question,
        app_id: null,
        category: null
      });

      setRecentQA([response.data, ...recentQA].slice(0, 3));
      setQuestion('');
    } catch (error) {
      console.error('Error asking question:', error);
      alert('Failed to get answer. Please try again.');
    } finally {
      setLoadingAnswer(false);
    }
  };

  const generateImage = async () => {
    if (!imagePrompt.trim() || generatingImage) return;

    setGeneratingImage(true);
    try {
      const response = await axios.post(`${API}/generate-image`, {
        prompt: imagePrompt
      });

      setLastGeneratedImage({
        image_data: response.data.image_data,
        prompt: imagePrompt
      });
      setImagePrompt('');
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setGeneratingImage(false);
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

  // Separate featured and regular apps
  const featuredApps = filteredApps.filter(app => app.is_featured);
  const regularApps = filteredApps.filter(app => !app.is_featured);

  const appIcons = ['📱', '💻', '👨‍⚖️', '🏛️', '💰', '🏮', '🎮', '🎨', '📚', '⚽', '🎵', '🍽️'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section - D's Empire */}
      <div className="bg-gradient-to-r from-black via-blue-950 to-black border-2 border-blue-500 rounded-3xl p-8 mb-8 text-center shadow-2xl shadow-blue-500/20">
        <div className="flex items-center justify-center mb-4">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center text-6xl font-bold shadow-2xl shadow-blue-500/50 border-2 border-yellow-400">
            <span className="bg-gradient-to-b from-yellow-300 to-yellow-500 bg-clip-text text-transparent">D</span>
          </div>
        </div>
        <h1 className="text-6xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          D's Empire
        </h1>
        <p className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
          For Delivery Domain
        </p>
        <div className="mt-6 flex items-center justify-center space-x-3">
          <span className="px-5 py-2 bg-blue-500/20 text-blue-400 border border-blue-500 rounded-full text-sm font-bold shadow-lg shadow-blue-500/20">
            ✅ Live & Active
          </span>
          <span className="px-5 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500 rounded-full text-sm font-bold shadow-lg shadow-yellow-500/20">
            ⭐ Premium
          </span>
        </div>
      </div>

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

      {/* AI Interaction Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Q&A Widget */}
        <div className="bg-gradient-to-br from-blue-950 to-black border-2 border-blue-500 rounded-2xl p-6 shadow-xl shadow-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-blue-400">❓ Ask a Question</h2>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500">Q&A</span>
          </div>
          
          {/* Question Input */}
          <div className="mb-4">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What would you like to know?"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 resize-none"
              rows="3"
              disabled={loadingAnswer}
              data-testid="quick-qa-input"
            />
            <button
              onClick={askQuestion}
              disabled={!question.trim() || loadingAnswer}
              className="w-full mt-3 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-blue-400"
              data-testid="quick-qa-submit"
            >
              {loadingAnswer ? '⏳ Getting Answer...' : '🔍 Get Answer'}
            </button>
          </div>

          {/* Recent Q&A */}
          {recentQA.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs text-gray-400 font-semibold">Recent:</p>
              {recentQA.slice(0, 1).map((qa, idx) => (
                <div key={qa.id || idx} className="bg-gray-800/50 rounded-lg p-3 text-xs">
                  <div className="font-bold text-blue-400 mb-1 line-clamp-1">Q: {qa.question}</div>
                  <div className="text-gray-300 line-clamp-2">A: {qa.answer}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500 text-xs">
              Ask your first question!
            </div>
          )}
        </div>

        {/* Chat with AI Widget */}
        <div className="bg-gradient-to-br from-blue-950 to-black border-2 border-cyan-500 rounded-2xl p-6 shadow-xl shadow-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-cyan-400">💬 Chat with AI</h2>
            <span className="text-xs bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500">Live</span>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-300">
              Have conversations with Empire AI about medical, legal, business topics!
            </p>
            
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-2">Try asking:</div>
              <div className="space-y-1 text-xs text-gray-300">
                <div>💡 "Symptoms of flu?"</div>
                <div>💡 "Legal requirements for LLC?"</div>
                <div>💡 "How to market my app?"</div>
              </div>
            </div>

            <a 
              href="/chat"
              className="block w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold text-center hover:shadow-lg hover:shadow-cyan-500/50 transition-all border border-cyan-400"
              data-testid="open-chat-button"
            >
              🚀 Start Chatting
            </a>

            <div className="text-center text-xs text-gray-500">
              Unlimited • No restrictions
            </div>
          </div>
        </div>

        {/* Image Generator Widget */}
        <div className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 border-2 border-orange-500/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">🎨 Create Image</h2>
            <span className="text-xs bg-orange-900 text-orange-400 px-3 py-1 rounded-full">AI Art</span>
          </div>
          
          <div className="mb-4">
            <textarea
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              placeholder="Describe your image...
Example: Futuristic delivery truck"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 resize-none"
              rows="3"
              disabled={generatingImage}
              data-testid="image-prompt-input"
            />
            <button
              onClick={generateImage}
              disabled={!imagePrompt.trim() || generatingImage}
              className="w-full mt-3 py-3 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="generate-image-button"
            >
              {generatingImage ? '⏳ Creating...' : '✨ Generate Image'}
            </button>
          </div>

          {lastGeneratedImage ? (
            <div className="bg-gray-800/50 rounded-lg p-2">
              <img 
                src={`data:image/png;base64,${lastGeneratedImage.image_data}`}
                alt="Generated"
                className="w-full h-24 object-cover rounded-lg mb-2"
              />
              <p className="text-xs text-gray-400 line-clamp-1">{lastGeneratedImage.prompt}</p>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500 text-xs">
              Generate your first image!
            </div>
          )}
        </div>
      </div>

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

      {/* Featured Apps Section */}
      {featuredApps.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold">🌟 Featured Apps</h2>
            <span className="ml-3 text-sm bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full font-semibold">
              Core Business
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredApps.map((app) => (
              <div key={app.id} className="card-hover bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-2 border-purple-500/50 rounded-xl p-6" data-testid={`app-card-${app.id}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-3xl">
                      {app.icon || '📱'}
                    </div>
                    <div className="absolute -top-2 -right-2 text-xl">🌟</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => toggleFavorite(app.id, e)}
                      className={`text-2xl transition-all hover:scale-110 ${
                        app.is_favorited ? 'filter-none' : 'grayscale opacity-40 hover:opacity-100'
                      }`}
                      data-testid={`favorite-app-${app.id}`}
                      title={app.is_favorited ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      ⭐
                    </button>
                    <button
                      onClick={() => deleteApp(app.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      data-testid={`delete-app-${app.id}`}
                    >
                      ❌
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 truncate">{app.name}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{app.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-purple-900 text-purple-400 px-3 py-1 rounded-full font-semibold">{app.category}</span>
                  <span className="text-sm font-bold text-green-400" data-testid={`app-revenue-${app.id}`}>${app.revenue.toFixed(2)}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-purple-800/50">
                  <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                    app.status === 'active' ? 'bg-green-900 text-green-400' : 'bg-gray-800 text-gray-400'
                  }`}>
                    {app.status === 'active' ? '✅ Active' : '⏸️ Paused'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Apps Section */}
      {regularApps.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">📱 Other Apps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {regularApps.map((app) => (
              <div key={app.id} className="card-hover bg-gray-900 border border-gray-800 rounded-xl p-6" data-testid={`app-card-${app.id}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-3xl">
                    {app.icon || '📱'}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => toggleFavorite(app.id, e)}
                      className={`text-2xl transition-all hover:scale-110 ${
                        app.is_favorited ? 'filter-none' : 'grayscale opacity-40 hover:opacity-100'
                      }`}
                      data-testid={`favorite-app-${app.id}`}
                      title={app.is_favorited ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      ⭐
                    </button>
                    <button
                      onClick={() => deleteApp(app.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      data-testid={`delete-app-${app.id}`}
                    >
                      ❌
                    </button>
                  </div>
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
          </div>
        </div>
      )}

      {/* Empty States */}
      <div>
        {filteredApps.length === 0 && filterView === 'favorites' && (
          <div className="col-span-full text-center py-20" data-testid="empty-favorites-state">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-xl font-bold mb-2">No Favorite Apps Yet</h3>
            <p className="text-gray-400 mb-6">Star your favorite apps to see them here</p>
            <button
              onClick={() => setFilterView('all')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              View All Apps
            </button>
          </div>
        )}

        {filteredApps.length === 0 && filterView === 'all' && apps.length === 0 && (
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