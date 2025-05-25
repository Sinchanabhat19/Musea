import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import { Web3Provider } from './contexts/Web3Context';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Web3Provider>
        <AuthProvider>
          <App />
          <ToastContainer 
            position="bottom-right"
            theme="dark"
            toastClassName="bg-gray-800 text-gray-100"
          />
        </AuthProvider>
      </Web3Provider>
    </BrowserRouter>
  </StrictMode>
);