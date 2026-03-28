/**
 * LAW AI - App #2
 * Legal guidance and advice assistant
 */

import { useState, useRef, useEffect } from 'react';
import { useEmpireTheme } from '../themes/ThemeContext';
import EmpireRevenueController from '../controllers/EmpireRevenueController';

// Create controller instance
const empireController = new EmpireRevenueController();

const LawAI = () => {
  const { theme } = useEmpireTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(`law_${Date.now()}`);
  const messagesEndRef = useRef(null);
  const speechSynthesis = window.speechSynthesis;
  const [speaking, setSpeaking] = useState(false);
  const [currentSpeakingId, setCurrentSpeakingId] = useState(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const speakText = (text, messageId) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    if (currentSpeakingId === messageId) {
      setSpeaking(false);
      setCurrentSpeakingId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 0.9;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setSpeaking(true);
      setCurrentSpeakingId(messageId);
    };

    utterance.onend = () => {
      setSpeaking(false);
      setCurrentSpeakingId(null);
    };

    speechSynthesis.speak(utterance);
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
      const response = await empireController.runEmpireTask('chat', {
        type: 'chat',
        prompt: `[Legal AI Context - Provide legal guidance] ${messageContent}`,
        sessionId: sessionId
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
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

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: theme.background }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#C5A572' }}>
            ⚖️ Law AI Assistant
          </h1>
          <p className="text-gray-400">Legal guidance & advice (not a substitute for a lawyer)</p>
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: '#3a2f1f', border: '1px solid #C5A572' }}>
          <p className="text-sm text-yellow-200">
            ⚠️ <strong>Disclaimer:</strong> This AI provides general legal information only. 
            Not legal advice. Consult a licensed attorney for your specific situation.
          </p>
        </div>

        {/* Chat Container */}
        <div 
          className="rounded-2xl p-6 mb-6"
          style={{ 
            backgroundColor: theme.surface || '#1a1a1a',
            minHeight: '500px',
            maxHeight: '600px',
            overflowY: 'auto'
          }}
        >
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <p className="text-6xl mb-4">⚖️</p>
              <p>Ask your legal question...</p>
              <div className="mt-6 text-sm text-gray-600">
                <p>Examples:</p>
                <p>"What is a power of attorney?"</p>
                <p>"How do I start an LLC?"</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex items-start space-x-2">
                    {msg.role === 'assistant' && (
                      <button
                        onClick={() => speakText(msg.content, idx)}
                        className={`mt-2 p-2 rounded-full transition-all ${
                          currentSpeakingId === idx ? 'bg-yellow-600' : 'bg-gray-700'
                        }`}
                      >
                        {currentSpeakingId === idx ? '⏸️' : '🔊'}
                      </button>
                    )}
                    
                    <div
                      className={`rounded-2xl px-6 py-4 max-w-md ${
                        msg.role === 'user' 
                          ? 'text-white'
                          : 'bg-gray-800 text-gray-100'
                      }`}
                      style={msg.role === 'user' ? { backgroundColor: '#C5A572' } : {}}
                    >
                      <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                    </div>
                    
                    {msg.role === 'user' && <div className="w-10"></div>}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
            placeholder="Ask your legal question..."
            className="flex-1 rounded-xl px-4 py-3 bg-gray-800 text-white resize-none"
            rows="2"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-6 rounded-xl font-bold transition-all text-white"
            style={{ backgroundColor: '#C5A572' }}
          >
            {loading ? '⏳' : '✈️'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LawAI;
