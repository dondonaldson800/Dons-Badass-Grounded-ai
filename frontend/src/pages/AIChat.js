import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import EmpireRevenueController from '../controllers/EmpireRevenueController';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Initialize Empire Revenue Controller
const empireController = new EmpireRevenueController();

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(`session_${Date.now()}`);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadChatHistory();
    // Initialize Empire Revenue Engine
    empireController.initializeEmpire();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChatHistory = async () => {
    try {
      const response = await axios.get(`${API}/chat/history/${sessionId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageContent = input;
    setInput('');
    setLoading(true);

    try {
      // Execute through Empire Revenue Controller (Badass Workflow)
      const response = await empireController.runEmpireTask('chat', {
        type: 'chat',
        prompt: messageContent,
        sessionId: sessionId
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const examplePrompts = [
    '👨‍⚖️ What are the legal requirements for starting a business?',
    '🏛️ What are the symptoms of common cold vs flu?',
    '💰 How can I optimize my app revenue strategy?',
    '🚀 Give me marketing tips for a new mobile app'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 h-[calc(100vh-100px)]" data-testid="ai-chat-page">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-2xl">
              🤖
            </div>
            <div>
              <h2 className="text-2xl font-bold">Empire AI Assistant</h2>
              <p className="text-sm text-gray-400">Ask me anything - medical, legal, business, or technical questions</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4" data-testid="chat-messages-container">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-4">Start a Conversation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {examplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(prompt.substring(3))}
                    className="text-left p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-colors text-sm"
                    data-testid={`example-prompt-${idx}`}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`chat-bubble ${msg.role} rounded-2xl px-6 py-4 ${msg.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'}`}
                data-testid={`message-${idx}`}
              >
                <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start" data-testid="loading-indicator">
              <div className="chat-bubble assistant rounded-2xl rounded-bl-sm px-6 py-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-800">
          <div className="flex space-x-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything... (Press Enter to send)"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 resize-none"
              rows="2"
              disabled={loading}
              data-testid="chat-input"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="send-message-button"
            >
              {loading ? '⏳' : '🚀'} Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;