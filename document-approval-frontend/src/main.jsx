import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Importe o BrowserRouter
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* Envolva o App com o Router */}
      <App />
    </Router>
  </StrictMode>
);
