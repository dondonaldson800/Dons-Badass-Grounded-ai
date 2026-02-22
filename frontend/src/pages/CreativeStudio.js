import { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CreativeStudio = () => {
  const [activeTab, setActiveTab] = useState('generate'); // generate, gallery
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const loadGallery = async () => {
    try {
      const response = await axios.get(`${API}/gallery`);
      setGallery(response.data);
    } catch (error) {
      console.error('Error loading gallery:', error);
    }
  };

  const generateImage = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setGeneratedImage(null);

    try {
      const response = await axios.post(`${API}/generate-image`, {
        prompt: prompt
      });

      setGeneratedImage({
        image_data: response.data.image_data,
        text_response: response.data.text_response,
        prompt: prompt
      });

      // Reload gallery
      await loadGallery();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const viewImage = async (imageId) => {
    try {
      const response = await axios.get(`${API}/gallery/${imageId}`);
      setSelectedImage(response.data);
    } catch (error) {
      console.error('Error loading image:', error);
    }
  };

  const downloadImage = (imageData, filename) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${imageData}`;
    link.download = filename || 'empire-generated-image.png';
    link.click();
  };

  const examplePrompts = [
    'A futuristic logo for a tech company with neon colors',
    'Modern app icon with gradient purple and pink colors',
    'Professional business card design with minimalist style',
    'Social media banner for a fitness app'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" data-testid="creative-studio-page">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🎨 Creative Studio</h1>
        <p className="text-gray-400">Generate stunning images with AI</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => {
            setActiveTab('generate');
            setSelectedImage(null);
          }}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeTab === 'generate'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600'
              : 'bg-gray-800 hover:bg-gray-750'
          }`}
          data-testid="generate-tab"
        >
          ✨ Generate
        </button>
        <button
          onClick={() => {
            setActiveTab('gallery');
            loadGallery();
            setSelectedImage(null);
          }}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeTab === 'gallery'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600'
              : 'bg-gray-800 hover:bg-gray-750'
          }`}
          data-testid="gallery-tab"
        >
          🖼️ Gallery
        </button>
      </div>

      {/* Generate Tab */}
      {activeTab === 'generate' && (
        <div className="space-y-6">
          {/* Input Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">Describe Your Image</h3>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A futuristic city skyline at sunset with flying cars..."
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 resize-none"
              rows="4"
              disabled={loading}
              data-testid="image-prompt-input"
            />

            {/* Example Prompts */}
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPrompt(example)}
                    className="text-xs px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    data-testid={`example-prompt-${idx}`}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateImage}
              disabled={!prompt.trim() || loading}
              className="mt-6 w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="generate-image-button"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="spinner mr-3" style={{width: '20px', height: '20px', borderWidth: '2px'}}></div>
                  Generating...
                </span>
              ) : (
                '✨ Generate Image'
              )}
            </button>
          </div>

          {/* Generated Image Display */}
          {generatedImage && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 animate-fadeIn" data-testid="generated-image-display">
              <h3 className="text-xl font-bold mb-4">✨ Your Generated Image</h3>
              <div className="bg-gray-800 rounded-xl overflow-hidden mb-4">
                <img
                  src={`data:image/png;base64,${generatedImage.image_data}`}
                  alt="Generated"
                  className="w-full h-auto"
                  data-testid="generated-image"
                />
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-1">Prompt:</p>
                <p className="text-white">{generatedImage.prompt}</p>
              </div>
              {generatedImage.text_response && (
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-1">AI Response:</p>
                  <p className="text-white">{generatedImage.text_response}</p>
                </div>
              )}
              <button
                onClick={() => downloadImage(generatedImage.image_data, `empire-${Date.now()}.png`)}
                className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
                data-testid="download-image-button"
              >
                📥 Download Image
              </button>
            </div>
          )}
        </div>
      )}

      {/* Gallery Tab */}
      {activeTab === 'gallery' && (
        <div>
          {selectedImage ? (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6" data-testid="image-detail-view">
              <button
                onClick={() => setSelectedImage(null)}
                className="mb-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                data-testid="back-to-gallery-button"
              >
                ← Back to Gallery
              </button>
              <div className="bg-gray-800 rounded-xl overflow-hidden mb-4">
                <img
                  src={`data:image/png;base64,${selectedImage.image_data}`}
                  alt="Gallery item"
                  className="w-full h-auto"
                  data-testid="gallery-image-full"
                />
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-1">Prompt:</p>
                <p className="text-white">{selectedImage.prompt}</p>
              </div>
              {selectedImage.text_response && (
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-1">AI Response:</p>
                  <p className="text-white">{selectedImage.text_response}</p>
                </div>
              )}
              <button
                onClick={() => downloadImage(selectedImage.image_data, `empire-${selectedImage.id}.png`)}
                className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
                data-testid="download-selected-image-button"
              >
                📥 Download Image
              </button>
            </div>
          ) : (
            <div>
              {gallery.length === 0 ? (
                <div className="text-center py-20" data-testid="empty-gallery-state">
                  <div className="text-6xl mb-4">🖼️</div>
                  <h3 className="text-xl font-bold mb-2">No Images Yet</h3>
                  <p className="text-gray-400 mb-6">Generate your first image to see it here</p>
                  <button
                    onClick={() => setActiveTab('generate')}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    ✨ Generate Image
                  </button>
                </div>
              ) : (
                <div className="gallery-grid" data-testid="gallery-grid">
                  {gallery.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => viewImage(item.id)}
                      className="gallery-item bg-gray-900 border border-gray-800 cursor-pointer"
                      data-testid={`gallery-item-${idx}`}
                    >
                      <div className="aspect-square bg-gray-800 flex items-center justify-center text-gray-400">
                        {item.thumbnail ? (
                          <div className="w-full h-full flex items-center justify-center p-4 text-center text-sm">
                            Click to view image
                          </div>
                        ) : (
                          '🖼️'
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-400 line-clamp-2">{item.prompt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreativeStudio;