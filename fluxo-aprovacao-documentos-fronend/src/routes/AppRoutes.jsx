import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';
import NotFoundPage from './pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Página de Login será a página inicial */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Página de Upload após o login */}
        <Route path="/upload" element={<UploadPage />} />
        
        {/* Página 404 para rotas não encontradas */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
