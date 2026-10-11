import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css';

const root = document.getElementById('root');

if (!root) {
  document.body.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:100vh;
      background:#000;color:#FBC518;font-family:Arial;font-size:24px;font-weight:bold;">
      ❌ Root element not found
    </div>`;
} else {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid #333',
              },
              success: { iconTheme: { primary: '#FBC518', secondary: '#000' } },
            }}
          />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
