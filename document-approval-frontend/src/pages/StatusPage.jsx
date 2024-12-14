import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DocumentCard from "../components/DocumentCard";
import "../styles/StatusPage.css";

const StatusPage = () => {
  // Exemplo de documentos. Em um sistema real, você faria isso via API.
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Documento Engenharia 1",
      status: "Aprovado",
      area: "Engenharia",
    },
    {
      id: 2,
      name: "Documento RH 1",
      status: "Pendente",
      area: "RH",
    },
    {
      id: 3,
      name: "Documento Aeronáutica 1",
      status: "Rejeitado",
      area: "Aeronáutica",
    },
  ]);

  useEffect(() => {
    // Simulação de chamada de API para obter documentos (remover este exemplo e fazer chamada real)
    // fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    // Simulação de chamada de API
    const response = await fetch("/api/documents"); // API para pegar os documentos
    const data = await response.json();
    setDocuments(data);
  };

  return (
    <div className="status-page-container">
      <h1>Status dos Documentos</h1>
      <div className="document-list">
        {documents.map((doc) => (
          <DocumentCard key={doc.id} document={doc} />
        ))}
      </div>
      <Link to="/upload" className="upload-link">
        Anexar novo documento
      </Link>
    </div>
  );
};

export default StatusPage;
