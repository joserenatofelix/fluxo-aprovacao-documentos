import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./../styles/Dashboard.css";

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");

  useEffect(() => {
    if (selectedArea) {
      fetch(`http://localhost:5000/documents?area=${selectedArea}`)
        .then((response) => response.json())
        .then((data) => setDocuments(data))
        .catch((error) => console.error("Erro ao buscar documentos:", error));
    }
  }, [selectedArea]);

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const handleSign = (documentId) => {
    fetch(`http://localhost:5000/documents/${documentId}/sign`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        setDocuments((prevDocuments) =>
          prevDocuments.map((doc) =>
            doc.id === documentId ? { ...doc, status: "ok" } : doc
          )
        );
      })
      .catch((error) => console.error("Erro ao assinar documento:", error));
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>Bem-vindo ao Dashboard</h1>
        <p>Selecione uma opção no menu acima.</p>
        <div className="document-status">
          <h2>Status dos Documentos</h2>
          <p>Aqui você verá os documentos separados por área.</p>
          <select value={selectedArea} onChange={handleAreaChange} required>
            <option value="">Selecione a área</option>
            <option value="Administracao">Administração</option>
            <option value="Aeronautica">Aeronáutica</option>
            <option value="Engenharia">Engenharia</option>
            <option value="RH">Recursos Humanos</option>
            <option value="TI">Tecnologia da Informação</option>
          </select>
          <div className="documents-list">
            {documents.map((doc) => (
              <div key={doc.id} className="document-item">
                <a href={`http://localhost:5000/uploads/${doc.area}/${doc.filename}`} target="_blank" rel="noopener noreferrer">
                  {doc.filename}
                </a>
                <p>Status: {doc.status}</p>
                {doc.status === "pendente" && (
                  <button onClick={() => handleSign(doc.id)}>Assinar</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
