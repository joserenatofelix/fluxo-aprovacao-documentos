import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const UploadDocument = () => {
  const handleUpload = (e) => {
    e.preventDefault();
    console.log("Documento enviado");
  };

  return (
    <div>
      <h1>Anexar Documento</h1>
      <form onSubmit={handleUpload}>
        <input type="text" placeholder="Nome do documento" required />
        <textarea placeholder="Comentários (opcional)" />
        <input type="file" required />
        <button type="submit">Enviar Documento</button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ...existing routes... */}
        <Route path="/UploadDocument" element={<UploadDocument />} />
      </Routes>
    </Router>
  );
};

export default UploadDocument;
