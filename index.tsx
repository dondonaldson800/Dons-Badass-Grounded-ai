
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <style>{`
      .crooked-card {
        transform: perspective(1000px) rotateX(1deg) rotateY(-1deg);
        transition: transform 0.3s ease;
      }
      .crooked-card:hover {
        transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
      }
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background: #000;
      }
      ::-webkit-scrollbar-thumb {
        background: #333;
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #444;
      }
    `}</style>
    <App />
  </React.StrictMode>
);
