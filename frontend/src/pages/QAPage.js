import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const QAPage = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [qaList, setQaList] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [qaRes, appsRes] = await Promise.all([
        axios.get(`${API}/qa/list`),
        axios.get(`${API}/apps`)
      ]);
      setQaList(qaRes.data);
      setApps(appsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const askQuestion = async () => {
    if (!question.trim() || loading) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API}/qa/ask`, {
        question: question,
        app_id: selectedApp,
        category: selectedApp ? apps.find(a => a.id === selectedApp)?.category : null
      });

      setQaList([response.data, ...qaList]);
      setQuestion('');
    } catch (error) {
      console.error('Error asking question:', error);
      alert('Failed to get answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteQA = async (qaId) => {
    if (window.confirm('Delete this Q&A?')) {
      try {
        await axios.delete(`${API}/qa/${qaId}`);
        setQaList(qaList.filter(qa => qa.id !== qaId));
      } catch (error) {
        console.error('Error deleting Q&A:', error);
      }
    }
  };

  const exampleQuestions = [
    'What marketing strategies work best for mobile apps?',
    'How do I increase user retention in my app?',
    'What are the best revenue models for SaaS products?',
    'How can I optimize my app for the app store?'
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" data-testid="qa-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">❓ Questions & Answers</h1>
        <p className="text-gray-400">Ask questions and get AI-powered answers saved for your reference</p>
      </div>

      {/* Ask Question Form */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">Ask a Question</h3>
        
        {/* App Selector */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Related to App (Optional)</label>
          <select
            value={selectedApp || ''}
            onChange={(e) => setSelectedApp(e.target.value || null)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
            data-testid="app-selector"
          >
            <option value="">General Question</option>
            {apps.map((app) => (
              <option key={app.id} value={app.id}>
                {app.icon} {app.name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What would you like to know?"
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 resize-none mb-4"
          rows="3"
          disabled={loading}
          data-testid="question-input"
        />

        {/* Example Questions */}
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-2">Example questions:</p>
          <div className="flex flex-wrap gap-2">
            {exampleQuestions.map((example, idx) => (
              <button
                key={idx}
                onClick={() => setQuestion(example)}
                className="text-xs px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                data-testid={`example-question-${idx}`}
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={askQuestion}
          disabled={!question.trim() || loading}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="ask-question-button"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <div className="spinner mr-3" style={{width: '20px', height: '20px', borderWidth: '2px'}}></div>
              Getting Answer...
            </span>
          ) : (
            '🔍 Ask Question'
          )}
        </button>
      </div>

      {/* Q&A List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">📚 Saved Q&A ({qaList.length})</h2>
        
        {qaList.length === 0 ? (
          <div className="text-center py-20 bg-gray-900 border border-gray-800 rounded-2xl" data-testid="empty-qa-state">
            <div className="text-6xl mb-4">❓</div>
            <h3 className="text-xl font-bold mb-2">No Questions Yet</h3>
            <p className="text-gray-400">Ask your first question to get started</p>
          </div>
        ) : (
          qaList.map((qa) => (
            <div key={qa.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 animate-fadeIn" data-testid={`qa-item-${qa.id}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {qa.app_id && (
                    <div className="mb-2">
                      <span className="text-xs bg-purple-900 text-purple-400 px-3 py-1 rounded-full">
                        {apps.find(a => a.id === qa.app_id)?.icon} {apps.find(a => a.id === qa.app_id)?.name}
                      </span>
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-purple-400 mb-2">Q: {qa.question}</h3>
                </div>
                <button
                  onClick={() => deleteQA(qa.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors ml-4"
                  data-testid={`delete-qa-${qa.id}`}
                >
                  🗑️
                </button>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-2">Answer:</p>
                <p className="text-white whitespace-pre-wrap">{qa.answer}</p>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {new Date(qa.created_at).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QAPage;
